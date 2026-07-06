import { getDeck } from '../../data/hardcodedDeck';
import { useTarotStore } from '../tarotStore';
import type { DrawnCard } from '../../domain/TarotCard';

// Mock the data layer so tests never touch SQLite or localStorage
jest.mock('../../data/tarotRepository', () => ({
  getFullDeck: jest.fn().mockResolvedValue([]),
  saveReading: jest.fn().mockResolvedValue(undefined),
  removeReading: jest.fn().mockResolvedValue(undefined),
  getReadingHistory: jest.fn().mockResolvedValue([]),
  getDailyCard: jest.fn().mockResolvedValue(null),
  persistDailyCard: jest.fn().mockResolvedValue(undefined),
  getSeenTips: jest.fn().mockResolvedValue([]),
  persistSeenTips: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../../data/webStorage', () => ({
  loadWebHistory: jest.fn().mockReturnValue([]),
  saveWebHistory: jest.fn(),
  addWebHistoryEntry: jest.fn((entry: unknown) => [entry]),
  removeWebHistoryEntry: jest.fn().mockReturnValue([]),
}));

const deck = getDeck();

// Reset store to a known state before each test
beforeEach(() => {
  useTarotStore.setState({
    deck,
    currentSpread: [],
    currentSpreadSize: null,
    dailyCard: null,
    isSpreadSaved: false,
    selectedCard: null,
    pendingDeletionId: null,
    readingHistory: [],
    isNetworkEnabled: false,
    isInitialized: true,
    isDark: false,
    seenTips: [],
  });
});

describe('drawCards', () => {
  it('fills currentSpread with 1 card', () => {
    useTarotStore.getState().drawCards(1);
    expect(useTarotStore.getState().currentSpread).toHaveLength(1);
  });

  it('fills currentSpread with 3 cards', () => {
    useTarotStore.getState().drawCards(3);
    expect(useTarotStore.getState().currentSpread).toHaveLength(3);
  });

  it('marks all drawn cards as not revealed', () => {
    useTarotStore.getState().drawCards(3);
    useTarotStore.getState().currentSpread.forEach((c) => {
      expect(c.isRevealed).toBe(false);
    });
  });

  it('resets isSpreadSaved to false', () => {
    useTarotStore.setState({ isSpreadSaved: true });
    useTarotStore.getState().drawCards(1);
    expect(useTarotStore.getState().isSpreadSaved).toBe(false);
  });

  it('sets currentSpreadSize to the draw count', () => {
    useTarotStore.getState().drawCards(3);
    expect(useTarotStore.getState().currentSpreadSize).toBe(3);
  });
});

describe('revealCard', () => {
  beforeEach(() => {
    useTarotStore.getState().drawCards(3);
  });

  it('reveals the card at the given index', () => {
    useTarotStore.getState().revealCard(0);
    expect(useTarotStore.getState().currentSpread[0].isRevealed).toBe(true);
  });

  it('does not reveal other cards', () => {
    useTarotStore.getState().revealCard(0);
    expect(useTarotStore.getState().currentSpread[1].isRevealed).toBe(false);
    expect(useTarotStore.getState().currentSpread[2].isRevealed).toBe(false);
  });

  it('does nothing for an out-of-bounds index', () => {
    const before = [...useTarotStore.getState().currentSpread];
    useTarotStore.getState().revealCard(99);
    const after = useTarotStore.getState().currentSpread;
    expect(after.map((c) => c.isRevealed)).toEqual(before.map((c) => c.isRevealed));
  });
});

describe('toggleDark', () => {
  it('flips isDark from false to true', () => {
    useTarotStore.getState().toggleDark();
    expect(useTarotStore.getState().isDark).toBe(true);
  });

  it('flips isDark back to false on second call', () => {
    useTarotStore.getState().toggleDark();
    useTarotStore.getState().toggleDark();
    expect(useTarotStore.getState().isDark).toBe(false);
  });
});

describe('selectCard / clearSelectedCard', () => {
  const drawn: DrawnCard = {
    card: deck[0],
    isReversed: false,
    isRevealed: true,
  };

  it('sets selectedCard', () => {
    useTarotStore.getState().selectCard(drawn);
    expect(useTarotStore.getState().selectedCard).toBe(drawn);
  });

  it('clears selectedCard', () => {
    useTarotStore.getState().selectCard(drawn);
    useTarotStore.getState().clearSelectedCard();
    expect(useTarotStore.getState().selectedCard).toBeNull();
  });
});

describe('scheduleDeletion / cancelDeletion', () => {
  it('sets pendingDeletionId', () => {
    useTarotStore.getState().scheduleDeletion(42);
    expect(useTarotStore.getState().pendingDeletionId).toBe(42);
  });

  it('clears pendingDeletionId on cancel', () => {
    useTarotStore.getState().scheduleDeletion(42);
    useTarotStore.getState().cancelDeletion();
    expect(useTarotStore.getState().pendingDeletionId).toBeNull();
  });
});

describe('saveCurrentReading', () => {
  it('is a no-op when isSpreadSaved is already true', async () => {
    const { saveReading } = jest.requireMock('../../data/tarotRepository');
    useTarotStore.setState({ isSpreadSaved: true });
    await useTarotStore.getState().saveCurrentReading();
    expect(saveReading).not.toHaveBeenCalled();
  });
});

describe('markTipSeen / resetTips', () => {
  it('adds a tip id and persists it', async () => {
    const { persistSeenTips } = jest.requireMock('../../data/tarotRepository');
    await useTarotStore.getState().markTipSeen('daily');
    expect(useTarotStore.getState().seenTips).toEqual(['daily']);
    expect(persistSeenTips).toHaveBeenCalledWith(['daily']);
  });

  it('is idempotent for an already-seen tip', async () => {
    const { persistSeenTips } = jest.requireMock('../../data/tarotRepository');
    await useTarotStore.getState().markTipSeen('daily');
    persistSeenTips.mockClear();
    await useTarotStore.getState().markTipSeen('daily');
    expect(useTarotStore.getState().seenTips).toEqual(['daily']);
    expect(persistSeenTips).not.toHaveBeenCalled();
  });

  it('accumulates multiple tip ids', async () => {
    await useTarotStore.getState().markTipSeen('daily');
    await useTarotStore.getState().markTipSeen('draw');
    expect(useTarotStore.getState().seenTips).toEqual(['daily', 'draw']);
  });

  it('resetTips clears all tips and persists the empty list', async () => {
    const { persistSeenTips } = jest.requireMock('../../data/tarotRepository');
    await useTarotStore.getState().markTipSeen('daily');
    await useTarotStore.getState().resetTips();
    expect(useTarotStore.getState().seenTips).toEqual([]);
    expect(persistSeenTips).toHaveBeenLastCalledWith([]);
  });
});

describe('resolveCardFromHistory', () => {
  it('returns a DrawnCard with the requested name from the deck', () => {
    const result = useTarotStore.getState().resolveCardFromHistory('The Fool', false);
    expect(result.card.name).toBe('The Fool');
    expect(result.isReversed).toBe(false);
    expect(result.isRevealed).toBe(true);
  });

  it('returns reversed DrawnCard when isReversed=true', () => {
    const result = useTarotStore.getState().resolveCardFromHistory('The Fool', true);
    expect(result.isReversed).toBe(true);
  });

  it('falls back gracefully for unknown card names', () => {
    const result = useTarotStore.getState().resolveCardFromHistory('Unknown Card', false);
    expect(result.card.name).toBe('Unknown Card');
    expect(result.isRevealed).toBe(true);
  });
});
