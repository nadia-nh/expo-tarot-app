# Arcana Flux — Expo Tarot App

React Native / Expo port of the [Arcana Flux Android app](https://github.com/nadia-nh/rc-android-tarot). Runs on Android, iOS, and web from a single codebase.

## Features

- Daily card draw on the home screen
- 1-card and 3-card spread modes with an animated card flip on reveal
- Full card detail view with upright / reversed meanings
- Reading history with swipe-to-delete (native) or tap-to-delete (web)
- History persisted to SQLite on native and localStorage on web
- Light and dark themes (follows system on native, in-app toggle on web)
- Responsive portrait and landscape layouts

## Tech stack

| Layer | Library |
|---|---|
| Framework | Expo SDK 56 (React Native) |
| Navigation | React Navigation (bottom tabs + native stack) |
| State | Zustand |
| UI | React Native Paper (MD3) |
| Database | expo-sqlite (native) / localStorage (web) |
| Typography | Merriweather via @expo-google-fonts |
| Card data | tarotapi.dev with hardcoded 78-card fallback |

## Running locally

```bash
npm install
npx expo start          # opens Expo Dev Tools
npx expo start --web    # web only
```

Open the app in Expo Go on your device, or press `w` for web, `a` for Android emulator, `i` for iOS simulator.

## Deploying to web (Vercel)

The repo includes a `vercel.json` that configures the build automatically. Connect the GitHub repo in the Vercel dashboard and it will deploy on every push to `main`.

To build locally:

```bash
npx expo export --platform web   # outputs to dist/
```

## Project structure

```
src/
  data/         database, API, repository, web storage
  domain/       TypeScript types and card image map
  screens/      MenuScreen, ResultScreen, HistoryScreen, CardDetailScreen
  components/   CardDisplay, CardTitle, CardMeaning, StylizedButton, ...
  navigation/   AppNavigator (bottom tabs + stack)
  store/        tarotStore (Zustand)
  theme/        colors, typography
assets/cards/   78 card PNGs + card back
```

## Android source

The Android Kotlin / Jetpack Compose version lives at `D:\AndroidProjects\rc-android-tarot`. When new features are added there they should be ported here to keep both versions in sync.
