# Arcana Flux — React Native Implementation Notes

Android source: `D:\AndroidProjects\rc-android-tarot`

---

## Image Mapping

React Native's bundler requires **static `require()` calls** — images cannot be required with dynamic paths.  
All 78 card images + card back live in `assets/cards/` using the original Android drawable names (snake_case).  
`src/domain/cardImages.ts` is a large static record:

```ts
export const cardImages: Record<string, ImageSourcePropType> = {
  'The Fool': require('../../assets/cards/major_the_fool.png'),
  // ... one entry per card
};
```

File names must match the Android drawable names exactly.

---

## Database Schema (expo-sqlite v14)

Use `openDatabaseAsync` (not the deprecated `openDatabase`). Three tables mirror Android Room:

```sql
CREATE TABLE IF NOT EXISTS readings (
  readingId INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER NOT NULL,
  spreadType TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS drawn_cards (
  cardId INTEGER PRIMARY KEY AUTOINCREMENT,
  readingOwnerId INTEGER NOT NULL REFERENCES readings(readingId) ON DELETE CASCADE,
  name TEXT NOT NULL,
  isReversed INTEGER NOT NULL  -- 0 or 1
);

CREATE TABLE IF NOT EXISTS tarot_cards (
  name TEXT PRIMARY KEY,
  uprightMeaning TEXT NOT NULL,
  reversedMeaning TEXT NOT NULL,
  suit TEXT NOT NULL,
  rank TEXT NOT NULL
);
```

Initialize tables on app startup in `src/data/db.ts`.

---

## Zustand Store State Shape

Replaces `TarotViewModel.kt` + Kotlin StateFlow.

```ts
interface TarotState {
  deck: TarotCard[];
  currentSpread: DrawnCard[];
  dailySpread: DrawnCard | null;
  isSpreadSaved: boolean;
  selectedCard: DrawnCard | null;

  drawCards: (count: number) => void;
  revealCard: (index: number) => void;
  saveReading: () => Promise<void>;
  deleteReading: (id: number) => Promise<void>;
  initDailyCard: () => Promise<void>;
}
```

Store lives in `src/store/tarotStore.ts`.

---

## Navigation Structure

```
NativeStack (root)
└── Tabs (AppNavigator)
    ├── Menu tab     → MenuScreen
    ├── 1 Card tab   → ResultScreen (spreadSize=1)
    ├── 3 Cards tab  → ResultScreen (spreadSize=3)
    └── History tab  → HistoryScreen
CardDetailScreen  ← pushed on top of tabs from any screen
```

`AppNavigator.tsx` lives in `src/navigation/`.  
Use `useWindowDimensions` for portrait/landscape layout switch — cards go horizontal in landscape.

---

## Card Flip Animation

Cards start face-down. Tap triggers a 3D flip using `Animated.Value` + `rotateY` interpolation:

```ts
const flipAnim = useRef(new Animated.Value(0)).current;

const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
const backInterpolate  = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });

const flip = () => Animated.spring(flipAnim, { toValue: 180, useNativeDriver: true }).start();
```

Implemented in `src/components/CardDisplay.tsx`.

---

## Tech Stack

| Android | React Native |
|---|---|
| Jetpack Compose | React Native core + StyleSheet |
| Material 3 | react-native-paper (MD3) |
| Navigation | React Navigation (bottom tabs + native stack) |
| Room Database | expo-sqlite v14 |
| Retrofit + Kotlinx | `fetch` + TypeScript types |
| ViewModel + StateFlow | Zustand |
| Swipe-to-delete | react-native-gesture-handler `Swipeable` |
| Orientation layout | `useWindowDimensions` hook |
| Fonts | expo-font + @expo-google-fonts/merriweather |

---

## Commit Checklist

- [ ] commit 1 — scaffold (Expo app + deps + card images + this file)
- [ ] commit 2 — theme (colors.ts, typography.ts, PaperProvider, dark mode)
- [ ] commit 3 — domain types (TarotCard.ts: Suit/Rank enums, TarotCard/DrawnCard interfaces)
- [ ] commit 4 — hardcoded deck (hardcodedDeck.ts — 78 cards converted from Kotlin)
- [ ] commit 5 — image map (cardImages.ts — static require() for all 78 cards + back)
- [ ] commit 6 — database (db.ts + tarotDao.ts)
- [ ] commit 7 — API + repository (tarotApiService.ts + tarotRepository.ts)
- [ ] commit 8 — store (tarotStore.ts — Zustand)
- [ ] commit 9 — navigation shell (AppNavigator.tsx with placeholder screens)
- [ ] commit 10 — shared components (CardImage, CardTitle, CardMeaning, StylizedButton, DeleteConfirmationDialog)
- [ ] commit 11 — CardDisplay + flip animation
- [ ] commit 12 — MenuScreen
- [ ] commit 13 — ResultScreen
- [ ] commit 14 — HistoryScreen (swipe-to-delete)
- [ ] commit 15 — CardDetailScreen
- [ ] commit 16 — landscape layout pass
- [ ] commit 17 — polish + verification
