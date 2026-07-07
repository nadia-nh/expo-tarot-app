# In-app guidance / tutorial

Unobtrusive, staged onboarding in the app's mystical voice (✦, Merriweather italic, soft gold).
Expo-first; Android port notes at the end.

## The three guidance steps

| id | Where | Copy | Dismissed by |
|----|-------|------|------|
| `daily` | MenuScreen, below the date / above the card | "This is your daily card ✦ Let it guide you through the day — tap it for more details." | ✕ button, or tapping the daily card |
| `draw` | ResultScreen (OneCard & ThreeCards), above the cards | "Take a slow breath and hold an open question in mind — *what do I need to focus on in love, work, life?* Then reveal your cards ✦" | ✕ button, or revealing all cards |
| `history` | Snackbar after the user's **first** save in ResultScreen | "Reading saved ✦ Find all your past readings in the History tab." | auto-dismiss (~4s) |

Each step is shown only until dismissed, then never again (persisted). A ✦ icon in the
Menu header resets all three (tutorial replay).

**Auto-dismiss**: if the user never taps ✕, a callout tip (`daily`/`draw`) auto-dismisses
itself for good after being shown 3 times (e.g. 3 app opens / screen visits) — it doesn't
linger forever for someone who's just ignoring it. The `history` Snackbar isn't part of this
since it already only ever shows once, right after the first save.

Design decisions:
- Tip `draw` appears contextually the first time the user visits a draw tab — not on a timer.
- No guidance on the Save button itself (self-explanatory); the moment of first save is used
  to introduce the History tab instead.

## Implementation (Expo)

- **Persistence**: `app_flags (key TEXT PRIMARY KEY, value TEXT)` table in SQLite with
  `setFlag`/`getFlag` in `tarotDao.ts`. Two keys: `tips_seen` (JSON array of dismissed tip
  ids) and `tips_shown_count` (JSON object of id → times shown). Web fallback: localStorage
  keys `tarot_tips_seen` / `tarot_tips_shown_count` via `webStorage.ts`. Repository functions
  `getSeenTips`/`persistSeenTips` and `getShownCounts`/`persistShownCounts` follow the same
  try/catch platform split as the daily card.
- **Store**: `seenTips: string[]` and `shownCounts: Record<string, number>` state.
  `markTipSeen(id)` (idempotent) marks a tip permanently dismissed. `recordTipShown(id)`
  increments the count each time a tip renders and calls `markTipSeen` once the count hits
  `MAX_TIP_SHOWN_COUNT` (3). `resetTips()` clears both, for tutorial replay. Both loaded in
  `init()`.
- **UI**: `GuidanceCallout` component — inline (non-blocking) rounded card, thin soft-gold
  border, leading ✦, light italic text, ✕ dismiss, gentle fade/slide-in. `MenuScreen` and
  `ResultScreen` call `recordTipShown` once per mount (when the tip is still unseen) to count
  that appearance.
- **Snackbar**: react-native-paper `Snackbar` in ResultScreen for the `history` tip.
- **Replay**: ✦ `headerRight` icon on the Menu tab (all platforms) calling `resetTips()`.

## Android port notes

- **Flags**: use Jetpack **DataStore Preferences** — `stringSetPreferencesKey("tips_seen")`
  and an `intPreferencesKey` per tip (or a JSON string preference) for the shown counts —
  rather than a Room table. No schema migration needed. Expose as `Flow`s from the
  repository, collect in `TarotViewModel`; mirror `recordTipShown`'s 3-strikes auto-dismiss
  logic there.
- **Callout**: `GuidanceCallout` composable — `Surface` with
  `border = BorderStroke(1.dp, SoftGold.copy(alpha = .33f))`, ✦ `Text` + message +
  ✕ `IconButton`, wrapped in `AnimatedVisibility(fadeIn() + slideInVertically())`.
  Place in `MenuScreenDailySpread`'s Column and in ResultScreen above the card row.
  Call the shown-count increment once in a `LaunchedEffect(Unit)` when the tip is visible.
- **History snackbar**: `SnackbarHostState` on the existing Scaffold, launched from the
  save handler with the same copy.
- **Replay icon**: ✦ as a `TopAppBar` `actions` IconButton on the Menu destination.
- Keep the same tip ids (`daily`, `draw`, `history`) and the same max-shown-count (3) so
  behavior matches across platforms.
