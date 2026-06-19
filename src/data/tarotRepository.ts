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
  saveDailyCard as daoSaveDailyCard,
  getDailyCardByDate,
  ReadingWithCards,
} from './tarotDao';
import { loadWebDailyCard, saveWebDailyCard } from './webStorage';

let cachedDeck: TarotCard[] | null = null;

export async function getFullDeck(useNetwork: boolean): Promise<TarotCard[]> {
  if (cachedDeck) return cachedDeck;

  // DB is unavailable on web — skip gracefully
  try {
    const count = await getDeckCount();
    if (count > 0) {
      cachedDeck = await getAllCards();
      return cachedDeck;
    }
  } catch {
    console.warn('[TarotRepository] DB unavailable, skipping cache lookup');
  }

  if (!useNetwork) {
    cachedDeck = getDeck();
    return cachedDeck;
  }

  try {
    const apiDeck = await fetchAllCards();
    try { await insertOrReplaceCards(apiDeck); } catch {}
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
  try {
    const timestamp = Date.now();
    const readingId = await insertReading(timestamp, spreadType);
    await insertDrawnCards(
      readingId,
      cards.map((dc) => ({ name: dc.card.name, isReversed: dc.isReversed }))
    );
  } catch (e) {
    console.warn('[TarotRepository] saveReading failed (DB unavailable on web)', e);
  }
}

export async function removeReading(readingId: number): Promise<void> {
  try {
    await deleteReading(readingId);
  } catch (e) {
    console.warn('[TarotRepository] removeReading failed (DB unavailable on web)', e);
  }
}

export async function getReadingHistory(): Promise<ReadingWithCards[]> {
  try {
    return await getAllReadingsWithCards();
  } catch {
    return [];
  }
}

export async function getDailyCard(date: string): Promise<{ name: string; isReversed: boolean } | null> {
  try {
    const row = await getDailyCardByDate(date);
    if (row) return { name: row.name, isReversed: row.isReversed === 1 };
  } catch {}
  const web = loadWebDailyCard();
  return web?.date === date ? { name: web.name, isReversed: web.isReversed } : null;
}

export async function persistDailyCard(date: string, card: DrawnCard): Promise<void> {
  try {
    await daoSaveDailyCard(date, card.card.name, card.isReversed);
    return;
  } catch {}
  saveWebDailyCard(date, card.card.name, card.isReversed);
}

