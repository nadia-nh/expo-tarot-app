# Arcana Flux — Commit Checklist

Each commit is a self-contained, runnable increment.

- [x] commit 1 — scaffold (Expo app + deps + card images + notes files)
- [x] commit 2 — theme (colors.ts, typography.ts, PaperProvider, dark mode)
- [x] commit 3 — domain types (TarotCard.ts: Suit/Rank enums, TarotCard/DrawnCard interfaces)
- [x] commit 4 — hardcoded deck (hardcodedDeck.ts — 78 cards converted from Kotlin)
- [x] commit 5 — image map (cardImages.ts — static require() for all 78 cards + back)
- [x] commit 6 — database (db.ts + tarotDao.ts)
- [x] commit 7 — API + repository (tarotApiService.ts + tarotRepository.ts)
- [x] commit 8 — store (tarotStore.ts — Zustand)
- [x] commit 9 — navigation shell (AppNavigator.tsx with placeholder screens)
- [x] commit 10 — shared components (CardImage, CardTitle, CardMeaning, StylizedButton, DeleteConfirmationDialog)
- [x] commit 11 — CardDisplay + flip animation
- [x] commit 12 — MenuScreen
- [x] commit 13 — ResultScreen
- [x] commit 14 — HistoryScreen (swipe-to-delete)
- [x] commit 15 — CardDetailScreen
- [x] commit 16 — landscape layout (orientation: default in app.json, per-screen useWindowDimensions)
- [x] commit 17 — polish + split checklist into this file
