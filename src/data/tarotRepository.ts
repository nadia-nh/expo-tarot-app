import { TarotCard, DrawnCard } from '../domain/TarotCard';
import { getDeck } from './hardcodedDeck';
import { fetchAllCards } from './tarotApiService';
import {
  getAllCards,
  getDeckCount,
  insertOrReplaceCards,
  insertReading,
  insertDrawnCards,
  deleteReading,
  getAllReadingsWithCards,
  ReadingWithCards,
} from './tarotDao';
import { getCardByName } from './hardcodedDeck';

let cachedDeck: TarotCard[] | null = null;

export async function getFullDeck(useNetwork: boolean): Promise<TarotCard[]> {
  if (cachedDeck) return cachedDeck;

  const count = await getDeckCount();
  if (count > 0) {
    cachedDeck = await getAllCards();
    return cachedDeck;
  }

  if (!useNetwork) {
    cachedDeck = getDeck();
    return cachedDeck;
  }

  try {
    const apiDeck = await fetchAllCards();
    await insertOrReplaceCards(apiDeck);
    cachedDeck = apiDeck;
    return apiDeck;
  } catch (e) {
    console.warn('[TarotRepository] API fetch failed, falling back to hardcoded deck', e);
  }

  cachedDeck = getDeck();
  return cachedDeck;
}

export async function saveReading(
  spreadType: string,
  cards: DrawnCard[]
): Promise<void> {
  const timestamp = Date.now();
  const readingId = await insertReading(timestamp, spreadType);
  await insertDrawnCards(
    readingId,
    cards.map((dc) => ({ name: dc.card.name, isReversed: dc.isReversed }))
  );
}

export async function removeReading(readingId: number): Promise<void> {
  await deleteReading(readingId);
}

export async function getReadingHistory(): Promise<ReadingWithCards[]> {
  return getAllReadingsWithCards();
}

export function resolveCardFromHistory(name: string): TarotCard | undefined {
  return getCardByName(name);
}
