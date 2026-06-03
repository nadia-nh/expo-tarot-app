import { TarotCard, Suit, withRankAndSuit } from '../domain/TarotCard';

const BASE_URL = 'https://tarotapi.dev/api/v1';

interface ApiCard {
  name_short: string;
  name: string;
  meaning_up: string;
  meaning_rev: string;
  type: string;
  value: string;
  value_int: number;
  desc: string;
}

interface TarotApiResponse {
  nhits: number;
  cards: ApiCard[];
}

const NAME_ALIASES: Record<string, string> = {
  Fortitude: 'Strength',
  'The Last Judgment': 'Judgement',
};

function apiCardToDomain(apiCard: ApiCard): TarotCard {
  const name = NAME_ALIASES[apiCard.name] ?? apiCard.name;
  return withRankAndSuit({
    name,
    uprightMeaning: apiCard.meaning_up,
    reversedMeaning: apiCard.meaning_rev,
    suit: Suit.MajorArcana,
    rank: null,
  });
}

export async function fetchAllCards(): Promise<TarotCard[]> {
  const response = await fetch(`${BASE_URL}/cards/`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data: TarotApiResponse = await response.json();
  return data.cards.map(apiCardToDomain);
}
