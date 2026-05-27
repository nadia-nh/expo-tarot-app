import { getDb } from './db';
import { TarotCard, Suit, Rank, withRankAndSuit } from '../domain/TarotCard';

export interface ReadingRow {
  readingId: number;
  timestamp: number;
  spreadType: string;
}

export interface DrawnCardRow {
  cardId: number;
  readingOwnerId: number;
  name: string;
  isReversed: number;
}

export interface ReadingWithCards {
  reading: ReadingRow;
  cards: DrawnCardRow[];
}

export async function insertReading(timestamp: number, spreadType: string): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    'INSERT INTO readings (timestamp, spreadType) VALUES (?, ?)',
    timestamp,
    spreadType
  );
  return result.lastInsertRowId;
}

export async function insertDrawnCards(
  readingId: number,
  cards: Array<{ name: string; isReversed: boolean }>
): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const card of cards) {
      await db.runAsync(
        'INSERT INTO drawn_cards (readingOwnerId, name, isReversed) VALUES (?, ?, ?)',
        readingId,
        card.name,
        card.isReversed ? 1 : 0
      );
    }
  });
}

export async function getAllReadingsWithCards(): Promise<ReadingWithCards[]> {
  const db = await getDb();
  const readings = await db.getAllAsync<ReadingRow>(
    'SELECT * FROM readings ORDER BY timestamp DESC'
  );
  const result: ReadingWithCards[] = [];
  for (const reading of readings) {
    const cards = await db.getAllAsync<DrawnCardRow>(
      'SELECT * FROM drawn_cards WHERE readingOwnerId = ?',
      reading.readingId
    );
    result.push({ reading, cards });
  }
  return result;
}

export async function deleteReading(readingId: number): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM readings WHERE readingId = ?', readingId);
}

export async function insertOrReplaceCards(cards: TarotCard[]): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const card of cards) {
      await db.runAsync(
        'INSERT OR REPLACE INTO tarot_cards (name, uprightMeaning, reversedMeaning, suit, rank) VALUES (?, ?, ?, ?, ?)',
        card.name,
        card.uprightMeaning,
        card.reversedMeaning,
        card.suit,
        card.rank ?? ''
      );
    }
  });
}

export async function getAllCards(): Promise<TarotCard[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{
    name: string;
    uprightMeaning: string;
    reversedMeaning: string;
    suit: string;
    rank: string;
  }>('SELECT * FROM tarot_cards ORDER BY name');
  return rows.map((r) =>
    withRankAndSuit({
      name: r.name,
      uprightMeaning: r.uprightMeaning,
      reversedMeaning: r.reversedMeaning,
      suit: (r.suit as Suit) ?? Suit.Unknown,
      rank: (r.rank as Rank) || null,
    })
  );
}

export async function getDeckCount(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM tarot_cards'
  );
  return row?.count ?? 0;
}
