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

Design decisions:
- Tip `draw` appears contextually the first time the user visits a draw tab — not on a timer.
- No guidance on the Save button itself (self-explanatory); the moment of first save is used
  to introduce the History tab instead.

## Implementation (Expo)

- **Persistence**: `app_flags (key TEXT PRIMARY KEY, value TEXT)` table in SQLite with
  `setFlag`/`getFlag` in `tarotDao.ts`; seen tips stored as JSON array under key `tips_seen`.
  Web fallback: localStorage key `tarot_tips_seen` via `webStorage.ts`. Repository functions
  `getSeenTips`/`persistSeenTips` follow the same try/catch platform split as the daily card.
- **Store**: `seenTips: string[]` state; `markTipSeen(id)` (idempotent) and `resetTips()`
  actions; loaded in `init()`.
- **UI**: `GuidanceCallout` component — inline (non-blocking) rounded card, thin soft-gold
  border, leading ✦, light italic text, ✕ dismiss, gentle fade/slide-in.
- **Snackbar**: react-native-paper `Snackbar` in ResultScreen for the `history` tip.
- **Replay**: ✦ `headerRight` icon on the Menu tab (all platforms) calling `resetTips()`.

## Android port notes

- **Flags**: use Jetpack **DataStore Preferences** (`stringSetPreferencesKey("tips_seen")`)
  rather than a Room table — idiomatic key-value equivalent, no schema migration. Expose as
  `Flow<Set<String>>` from the repository, collect in `TarotViewModel`.
- **Callout**: `GuidanceCallout` composable — `Surface` with
  `border = BorderStroke(1.dp, SoftGold.copy(alpha = .33f))`, ✦ `Text` + message +
  ✕ `IconButton`, wrapped in `AnimatedVisibility(fadeIn() + slideInVertically())`.
  Place in `MenuScreenDailySpread`'s Column and in ResultScreen above the card row.
- **History snackbar**: `SnackbarHostState` on the existing Scaffold, launched from the
  save handler with the same copy.
- **Replay icon**: ✦ as a `TopAppBar` `actions` IconButton on the Menu destination.
- Keep the same tip ids (`daily`, `draw`, `history`) so behavior matches across platforms.
