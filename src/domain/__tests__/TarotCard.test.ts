import {
  Suit,
  Rank,
  SpreadType,
  withRankAndSuit,
  getMeaning,
  rankFromLabel,
} from '../TarotCard';
import type { TarotCard, DrawnCard } from '../TarotCard';

function makeCard(overrides: Partial<TarotCard> = {}): TarotCard {
  return {
    name: 'The Fool',
    uprightMeaning: 'New beginnings',
    reversedMeaning: 'Recklessness',
    suit: Suit.MajorArcana,
    rank: null,
    ...overrides,
  };
}

function makeDrawnCard(card: TarotCard, isReversed: boolean): DrawnCard {
  return { card, isReversed, isRevealed: true };
}

describe('withRankAndSuit', () => {
  it('assigns Wands suit and Ace rank to "Ace of Wands"', () => {
    const card = withRankAndSuit(makeCard({ name: 'Ace of Wands', suit: Suit.Unknown, rank: null }));
    expect(card.suit).toBe(Suit.Wands);
    expect(card.rank).toBe(Rank.Ace);
  });

  it('assigns Pentacles suit and King rank to "King of Pentacles"', () => {
    const card = withRankAndSuit(makeCard({ name: 'King of Pentacles', suit: Suit.Unknown, rank: null }));
    expect(card.suit).toBe(Suit.Pentacles);
    expect(card.rank).toBe(Rank.King);
  });

  it('assigns Cups suit and Two rank to "Two of Cups"', () => {
    const card = withRankAndSuit(makeCard({ name: 'Two of Cups', suit: Suit.Unknown, rank: null }));
    expect(card.suit).toBe(Suit.Cups);
    expect(card.rank).toBe(Rank.Two);
  });

  it('assigns Swords suit and Page rank to "Page of Swords"', () => {
    const card = withRankAndSuit(makeCard({ name: 'Page of Swords', suit: Suit.Unknown, rank: null }));
    expect(card.suit).toBe(Suit.Swords);
    expect(card.rank).toBe(Rank.Page);
  });

  it('assigns MajorArcana suit and null rank to "The Fool"', () => {
    const card = withRankAndSuit(makeCard({ name: 'The Fool', suit: Suit.Unknown, rank: null }));
    expect(card.suit).toBe(Suit.MajorArcana);
    expect(card.rank).toBeNull();
  });

  it('assigns MajorArcana to "Wheel Of Fortune" (no suit suffix)', () => {
    const card = withRankAndSuit(makeCard({ name: 'Wheel Of Fortune', suit: Suit.Unknown, rank: null }));
    expect(card.suit).toBe(Suit.MajorArcana);
    expect(card.rank).toBeNull();
  });

  it('does not mutate the original card', () => {
    const original = makeCard({ name: 'Ace of Wands', suit: Suit.Unknown, rank: null });
    withRankAndSuit(original);
    expect(original.suit).toBe(Suit.Unknown);
  });
});

describe('getMeaning', () => {
  const card = makeCard({ uprightMeaning: 'Upright text', reversedMeaning: 'Reversed text' });

  it('returns uprightMeaning when not reversed', () => {
    expect(getMeaning(makeDrawnCard(card, false))).toBe('Upright text');
  });

  it('returns reversedMeaning when reversed', () => {
    expect(getMeaning(makeDrawnCard(card, true))).toBe('Reversed text');
  });
});

describe('rankFromLabel', () => {
  it('returns Rank.Ace for "Ace"', () => {
    expect(rankFromLabel('Ace')).toBe(Rank.Ace);
  });

  it('returns Rank.King for "King"', () => {
    expect(rankFromLabel('King')).toBe(Rank.King);
  });

  it('returns Rank.Knight for "Knight"', () => {
    expect(rankFromLabel('Knight')).toBe(Rank.Knight);
  });

  it('returns null for an invalid string', () => {
    expect(rankFromLabel('Joker')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(rankFromLabel('')).toBeNull();
  });
});

describe('SpreadType', () => {
  it('Single equals "SingleCardDraw"', () => {
    expect(SpreadType.Single).toBe('SingleCardDraw');
  });

  it('Three equals "ThreeCardDraw"', () => {
    expect(SpreadType.Three).toBe('ThreeCardDraw');
  });
});
