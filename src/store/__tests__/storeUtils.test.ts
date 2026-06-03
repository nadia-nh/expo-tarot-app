import { pickRandom, drawN } from '../storeUtils';
import { getDeck } from '../../data/hardcodedDeck';

const deck = getDeck();

describe('pickRandom', () => {
  it('returns the requested number of items', () => {
    expect(pickRandom(deck, 3)).toHaveLength(3);
  });

  it('returns 1 item when count is 1', () => {
    expect(pickRandom(deck, 1)).toHaveLength(1);
  });

  it('returns no duplicate cards (by name)', () => {
    const result = pickRandom(deck, 10);
    const names = result.map((c) => c.name);
    expect(new Set(names).size).toBe(10);
  });

  it('clamps to array length when count exceeds array size', () => {
    const small = deck.slice(0, 5);
    const result = pickRandom(small, 99);
    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('does not mutate the source array', () => {
    const source = deck.slice(0, 10);
    const originalNames = source.map((c) => c.name);
    pickRandom(source, 5);
    expect(source.map((c) => c.name)).toEqual(originalNames);
  });

  it('returns items that all come from the original array', () => {
    const deckNames = new Set(deck.map((c) => c.name));
    const result = pickRandom(deck, 5);
    result.forEach((c) => expect(deckNames.has(c.name)).toBe(true));
  });
});

describe('drawN', () => {
  it('returns the correct number of DrawnCards', () => {
    expect(drawN(deck, 3, false)).toHaveLength(3);
  });

  it('sets isRevealed to false when revealed=false', () => {
    drawN(deck, 5, false).forEach((dc) => expect(dc.isRevealed).toBe(false));
  });

  it('sets isRevealed to true when revealed=true', () => {
    drawN(deck, 5, true).forEach((dc) => expect(dc.isRevealed).toBe(true));
  });

  it('all drawn cards come from the deck', () => {
    const deckNames = new Set(deck.map((c) => c.name));
    drawN(deck, 5, false).forEach((dc) => expect(deckNames.has(dc.card.name)).toBe(true));
  });

  it('drawn cards have no duplicates', () => {
    const result = drawN(deck, 10, false);
    const names = result.map((dc) => dc.card.name);
    expect(new Set(names).size).toBe(10);
  });
});
