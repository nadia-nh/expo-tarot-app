# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

# Agent guidance for this project

## What this project is

A React Native / Expo web + mobile tarot app ported from an Android Kotlin app at `D:\AndroidProjects\rc-android-tarot`. When syncing features from Android, read the Kotlin source there first.

## Critical rules

**Never run `npm audit fix` or `npm audit fix --force`.** It downgrades the Expo SDK, breaking the project. The audit warnings are from transitive dependencies and are not actionable.

When installing packages always use `npx expo install <package>` (not plain `npm install`) so Expo picks the SDK-compatible version. After any install, commit both `package.json` and `package-lock.json` — Vercel uses the committed lockfile.

## Platform split: web vs native

`expo-sqlite` is unavailable on web. `src/data/db.web.ts` is a Metro platform stub that throws so the SQLite bundle is excluded entirely on web. All DB calls in `tarotRepository.ts` are wrapped in try/catch.

Web persistence falls back to `localStorage` via `src/data/webStorage.ts`. The Zustand store (`src/store/tarotStore.ts`) handles this in `saveCurrentReading`, `loadHistory`, and `confirmDeletion`.

`isNetworkEnabled` defaults to `true` on web so the deck is fetched from tarotapi.dev. On native it defaults to `false` (SQLite cache is used instead).

Dark mode: on native it follows `useColorScheme()` synced to the store in `App.tsx`. On web it is controlled by an in-app toggle (`DarkModeToggle` in `AppNavigator.tsx`, web-only).

## Navigation

- Root: `NativeStackNavigator` with one route wrapping the tab navigator
- Tabs: Menu / OneCard / ThreeCards / History — each tab has its own `title` (header) and `tabBarLabel` (bottom bar) set separately
- `CardDetailScreen` is pushed as a stack screen; its title is set dynamically in the screen via `useLayoutEffect` + `navigation.setOptions`

## Card flip animation

`CardDisplay.tsx` uses `Animated.Value` + `rotateY` with `backfaceVisibility: 'hidden'`. The card back is a styled `View` with a gold ★ symbol (not an image). `onReveal()` is called immediately on press (not in the animation callback) so the card title appears right away. The spring uses `tension: 40, friction: 8`.

The `flipAnim` ref is reset via `useEffect` on `drawnCard.card.name` change to handle the case where a new card is drawn into the same slot. Cards in `ResultScreen` are keyed by `item.card.name` (not index) to force React to re-create `CardDisplay` on new draws.

## Tab state

`currentSpreadSize` in the store tracks which tab last drew cards. `ResultScreen` uses `useFocusEffect` with a `currentSpreadSize !== spreadSize` guard so it only redraws when switching tabs, not when returning from `CardDetailScreen`.

## Theme conventions

Use `fontFamilies.light / .regular / .bold` from `src/theme/typography.ts` for all Merriweather font strings — never hardcode `'Merriweather_300Light'` etc. directly.

Use `colors.softGold` and other named values from `src/theme/colors.ts` rather than hex literals where the colour already has a name there.

Use `SpreadType.Single` / `SpreadType.Three` from `src/domain/TarotCard.ts` wherever spread type strings are needed — don't compare against raw `'SingleCardDraw'` / `'ThreeCardDraw'` literals.

## Image map

React Native's Metro bundler requires static `require()` calls — no dynamic paths. All 78 card images are mapped in `src/domain/cardImages.ts`. If new cards are added, a new static entry must be added there.

## Deployment

The web build deploys to Vercel. `vercel.json` at the repo root sets the build command (`npx expo export --platform web`) and output directory (`dist`). Pushing to `main` triggers an automatic redeploy.
