import { create } from 'zustand';
import { TarotCard, DrawnCard, Suit } from '../domain/TarotCard';
import { getDeck, getCardByName } from '../data/hardcodedDeck';
import {
  getFullDeck,
  saveReading,
  removeReading,
  getReadingHistory,
} from '../data/tarotRepository';
import { ReadingWithCards } from '../data/tarotDao';

interface TarotState {
  deck: TarotCard[];
  currentSpread: DrawnCard[];
  dailyCard: DrawnCard | null;
  isSpreadSaved: boolean;
  selectedCard: DrawnCard | null;
  pendingDeletionId: number | null;
  readingHistory: ReadingWithCards[];
  isNetworkEnabled: boolean;
  isInitialized: boolean;

  init: () => Promise<void>;
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

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function drawN(deck: TarotCard[], count: number, revealed: boolean): DrawnCard[] {
  return pickRandom(deck, count).map((card) => ({
    card,
    isReversed: Math.random() < 0.5,
    isRevealed: revealed,
  }));
}

export const useTarotStore = create<TarotState>((set, get) => ({
  deck: [],
  currentSpread: [],
  dailyCard: null,
  isSpreadSaved: false,
  selectedCard: null,
  pendingDeletionId: null,
  readingHistory: [],
  isNetworkEnabled: false,
  isInitialized: false,

  init: async () => {
    const deck = await getFullDeck(get().isNetworkEnabled);
    const dailyDrawn = drawN(deck, 1, true);
    set({ deck, dailyCard: dailyDrawn[0] ?? null, isInitialized: true });
    await get().loadHistory();
  },

  drawCards: (count) => {
    const { deck } = get();
    const spread = drawN(deck, count, false);
    set({ currentSpread: spread, isSpreadSaved: false });
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
    const spreadType = currentSpread.length === 3 ? 'ThreeCardDraw' : 'SingleCardDraw';
    await saveReading(spreadType, currentSpread);
    set({ isSpreadSaved: true });
    await get().loadHistory();
  },

  loadHistory: async () => {
    const history = await getReadingHistory();
    set({ readingHistory: history });
  },

  scheduleDeletion: (readingId) => set({ pendingDeletionId: readingId }),

  cancelDeletion: () => set({ pendingDeletionId: null }),

  confirmDeletion: async () => {
    const { pendingDeletionId } = get();
    if (pendingDeletionId == null) return;
    await removeReading(pendingDeletionId);
    set({ pendingDeletionId: null });
    await get().loadHistory();
  },

  selectCard: (card) => set({ selectedCard: card }),

  clearSelectedCard: () => set({ selectedCard: null }),

  clearCurrentSpread: () => set({ currentSpread: [], isSpreadSaved: false }),

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
