export enum Suit {
  Unknown = 'Unknown',
  MajorArcana = 'Major Arcana',
  Wands = 'Wands',
  Cups = 'Cups',
  Swords = 'Swords',
  Pentacles = 'Pentacles',
}

export enum Rank {
  Unknown = 'Unknown',
  Ace = 'Ace',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Page = 'Page',
  Knight = 'Knight',
  Queen = 'Queen',
  King = 'King',
}

export interface TarotCard {
  name: string;
  uprightMeaning: string;
  reversedMeaning: string;
  suit: Suit;
  rank: Rank | null;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  isRevealed: boolean;
}

const MINOR_ARCANA_SUITS = [Suit.Wands, Suit.Cups, Suit.Swords, Suit.Pentacles];

function getSuit(name: string): Suit {
  return (
    MINOR_ARCANA_SUITS.find((s) => name.endsWith(` of ${s}`)) ?? Suit.MajorArcana
  );
}

function getRank(name: string, suit: Suit): Rank | null {
  if (suit === Suit.MajorArcana) return null;
  const rankName = name.replace(` of ${suit}`, '').trim();
  return (Object.values(Rank) as string[]).includes(rankName)
    ? (rankName as Rank)
    : null;
}

export function withRankAndSuit(card: TarotCard): TarotCard {
  const suit = getSuit(card.name);
  return { ...card, suit, rank: getRank(card.name, suit) };
}

export function getMeaning(drawn: DrawnCard): string {
  return drawn.isReversed ? drawn.card.reversedMeaning : drawn.card.uprightMeaning;
}

export function rankFromLabel(label: string): Rank | null {
  return (Object.values(Rank) as string[]).includes(label) ? (label as Rank) : null;
}

export const SpreadType = {
  Single: 'SingleCardDraw',
  Three:  'ThreeCardDraw',
} as const;
export type SpreadType = typeof SpreadType[keyof typeof SpreadType];
