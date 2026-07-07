import { create } from 'zustand';
import { Platform } from 'react-native';
import { TarotCard, DrawnCard, Suit, SpreadType } from '../domain/TarotCard';
import { pickRandom, drawN, getTodayKey } from './storeUtils';
import { getDeck, getCardByName } from '../data/hardcodedDeck';
import {
  getFullDeck,
  saveReading,
  removeReading,
  getReadingHistory,
  getDailyCard,
  persistDailyCard,
  getSeenTips,
  persistSeenTips,
  getShownCounts,
  persistShownCounts,
} from '../data/tarotRepository';

const MAX_TIP_SHOWN_COUNT = 3;
import { ReadingWithCards } from '../data/tarotDao';
import { addWebHistoryEntry, loadWebHistory, removeWebHistoryEntry } from '../data/webStorage';

interface TarotState {
  deck: TarotCard[];
  currentSpread: DrawnCard[];
  currentSpreadSize: number | null;
  dailyCard: DrawnCard | null;
  isSpreadSaved: boolean;
  selectedCard: DrawnCard | null;
  pendingDeletionId: number | null;
  readingHistory: ReadingWithCards[];
  isNetworkEnabled: boolean;
  isInitialized: boolean;
  isDark: boolean;
  seenTips: string[];
  shownCounts: Record<string, number>;

  init: () => Promise<void>;
  markTipSeen: (id: string) => Promise<void>;
  recordTipShown: (id: string) => Promise<void>;
  resetTips: () => Promise<void>;
  toggleDark: () => void;
  drawCards: (count: number) => void;
  revealCard: (index: number) => void;
  saveCurrentReading: () => Promise<void>;
  loadHistory: () => Promise<void>;
  scheduleDeletion: (readingId: number) => void;
  cancelDeletion: () => void;
  confirmDeletion: () => Promise<void>;
  selectCard: (card: DrawnCard) => void;
  clearSelectedCard: () => void;
  clearCurrentSpread: () => void;
  resolveCardFromHistory: (name: string, isReversed: boolean) => DrawnCard;
}


export const useTarotStore = create<TarotState>((set, get) => ({
  deck: [],
  currentSpread: [],
  currentSpreadSize: null,
  dailyCard: null,
  isSpreadSaved: false,
  selectedCard: null,
  pendingDeletionId: null,
  readingHistory: [],
  isNetworkEnabled: Platform.OS === 'web',
  isInitialized: false,
  isDark: false,
  seenTips: [],
  shownCounts: {},

  init: async () => {
    const deck = await getFullDeck(get().isNetworkEnabled);
    const today = getTodayKey();
    const existing = await getDailyCard(today);
    const seenTips = await getSeenTips();
    const shownCounts = await getShownCounts();

    let dailyCard: DrawnCard | null = null;
    if (existing) {
      const card = deck.find((c) => c.name === existing.name) ?? getCardByName(existing.name);
      if (card) dailyCard = { card, isReversed: existing.isReversed, isRevealed: true };
    }
    if (!dailyCard) {
      dailyCard = drawN(deck, 1, true)[0] ?? null;
      if (dailyCard) await persistDailyCard(today, dailyCard);
    }

    set({ deck, dailyCard, seenTips, shownCounts, isInitialized: true });
    await get().loadHistory();
  },

  markTipSeen: async (id) => {
    const { seenTips } = get();
    if (seenTips.includes(id)) return;
    const updated = [...seenTips, id];
    set({ seenTips: updated });
    await persistSeenTips(updated);
  },

  recordTipShown: async (id) => {
    const { seenTips, shownCounts } = get();
    if (seenTips.includes(id)) return;
    const count = (shownCounts[id] ?? 0) + 1;
    if (count >= MAX_TIP_SHOWN_COUNT) {
      await get().markTipSeen(id);
      return;
    }
    const updated = { ...shownCounts, [id]: count };
    set({ shownCounts: updated });
    await persistShownCounts(updated);
  },

  resetTips: async () => {
    set({ seenTips: [], shownCounts: {} });
    await persistSeenTips([]);
    await persistShownCounts({});
  },

  drawCards: (count) => {
    const { deck } = get();
    const spread = drawN(deck, count, false);
    set({ currentSpread: spread, currentSpreadSize: count, isSpreadSaved: false });
  },

  revealCard: (index) => {
    const spread = [...get().currentSpread];
    if (index >= 0 && index < spread.length) {
      spread[index] = { ...spread[index], isRevealed: true };
      set({ currentSpread: spread });
    }
  },

  saveCurrentReading: async () => {
    if (get().isSpreadSaved) return;
    const { currentSpread } = get();
    const spreadType = currentSpread.length === 3 ? SpreadType.Three : SpreadType.Single;
    await saveReading(spreadType, currentSpread);
    set({ isSpreadSaved: true });

    const dbHistory = await getReadingHistory();
    if (dbHistory.length > 0) {
      set({ readingHistory: dbHistory });
    } else {
      // DB unavailable (web) — persist to localStorage
      const id = Date.now();
      const entry: ReadingWithCards = {
        reading: { readingId: id, timestamp: id, spreadType },
        cards: currentSpread.map((dc, i) => ({
          cardId: i,
          readingOwnerId: id,
          name: dc.card.name,
          isReversed: dc.isReversed ? 1 : 0,
        })),
      };
      set({ readingHistory: addWebHistoryEntry(entry) });
    }
  },

  loadHistory: async () => {
    const history = await getReadingHistory();
    if (history.length > 0) {
      set({ readingHistory: history });
    } else {
      set({ readingHistory: loadWebHistory() });
    }
  },

  scheduleDeletion: (readingId) => set({ pendingDeletionId: readingId }),

  cancelDeletion: () => set({ pendingDeletionId: null }),

  confirmDeletion: async () => {
    const { pendingDeletionId } = get();
    if (pendingDeletionId == null) return;
    await removeReading(pendingDeletionId);
    set({ pendingDeletionId: null, readingHistory: removeWebHistoryEntry(pendingDeletionId) });
    await get().loadHistory();
  },

  selectCard: (card) => set({ selectedCard: card }),

  clearSelectedCard: () => set({ selectedCard: null }),

  clearCurrentSpread: () => set({ currentSpread: [], isSpreadSaved: false }),

  toggleDark: () => set((s) => ({ isDark: !s.isDark })),

  resolveCardFromHistory: (name, isReversed) => {
    const fromDeck = get().deck.find((c) => c.name === name);
    const card = fromDeck ?? getCardByName(name) ?? {
      name,
      uprightMeaning: '',
      reversedMeaning: '',
      suit: Suit.Unknown,
      rank: null,
    };
    return { card, isReversed, isRevealed: true };
  },
}));
