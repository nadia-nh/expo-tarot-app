import { getDeck, getCardByName } from '../hardcodedDeck';
import { Suit } from '../../domain/TarotCard';

describe('getDeck', () => {
  const deck = getDeck();

  it('returns exactly 78 cards', () => {
    expect(deck).toHaveLength(78);
  });

  it('contains exactly 22 Major Arcana cards', () => {
    const major = deck.filter((c) => c.suit === Suit.MajorArcana);
    expect(major).toHaveLength(22);
  });

  it('Major Arcana cards have null rank', () => {
    const major = deck.filter((c) => c.suit === Suit.MajorArcana);
    major.forEach((c) => expect(c.rank).toBeNull());
  });

  it('contains exactly 14 Wands cards', () => {
    expect(deck.filter((c) => c.suit === Suit.Wands)).toHaveLength(14);
  });

  it('contains exactly 14 Cups cards', () => {
    expect(deck.filter((c) => c.suit === Suit.Cups)).toHaveLength(14);
  });

  it('contains exactly 14 Swords cards', () => {
    expect(deck.filter((c) => c.suit === Suit.Swords)).toHaveLength(14);
  });

  it('contains exactly 14 Pentacles cards', () => {
    expect(deck.filter((c) => c.suit === Suit.Pentacles)).toHaveLength(14);
  });

  it('every card has a non-empty name', () => {
    deck.forEach((c) => expect(c.name.length).toBeGreaterThan(0));
  });

  it('every card has a non-empty uprightMeaning', () => {
    deck.forEach((c) => expect(c.uprightMeaning.length).toBeGreaterThan(0));
  });

  it('every card has a non-empty reversedMeaning', () => {
    deck.forEach((c) => expect(c.reversedMeaning.length).toBeGreaterThan(0));
  });

  it('card names are unique', () => {
    const names = deck.map((c) => c.name);
    expect(new Set(names).size).toBe(78);
  });
});

describe('getCardByName', () => {
  it('returns The Fool by exact name', () => {
    const card = getCardByName('The Fool');
    expect(card).toBeDefined();
    expect(card!.name).toBe('The Fool');
  });

  it('returns Ace of Wands with correct suit', () => {
    const card = getCardByName('Ace of Wands');
    expect(card).toBeDefined();
    expect(card!.suit).toBe(Suit.Wands);
  });

  it('returns undefined for a non-existent card name', () => {
    expect(getCardByName('The Joker')).toBeUndefined();
  });
});
