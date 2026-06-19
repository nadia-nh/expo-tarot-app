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
  const rows = await db.getAllAsync<ReadingRow & DrawnCardRow>(`
    SELECT r.readingId, r.timestamp, r.spreadType,
           dc.cardId, dc.readingOwnerId, dc.name, dc.isReversed
    FROM readings r
    LEFT JOIN drawn_cards dc ON r.readingId = dc.readingOwnerId
    ORDER BY r.timestamp DESC
  `);
  const map = new Map<number, ReadingWithCards>();
  for (const row of rows) {
    if (!map.has(row.readingId)) {
      map.set(row.readingId, {
        reading: { readingId: row.readingId, timestamp: row.timestamp, spreadType: row.spreadType },
        cards: [],
      });
    }
    if (row.cardId != null) {
      map.get(row.readingId)!.cards.push({
        cardId: row.cardId,
        readingOwnerId: row.readingOwnerId,
        name: row.name,
        isReversed: row.isReversed,
      });
    }
  }
  return Array.from(map.values());
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

export async function saveDailyCard(date: string, name: string, isReversed: boolean): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT OR REPLACE INTO daily_card (date, name, isReversed) VALUES (?, ?, ?)',
    date,
    name,
    isReversed ? 1 : 0
  );
}

export async function getDailyCardByDate(date: string): Promise<{ name: string; isReversed: number } | null> {
  const db = await getDb();
  return db.getFirstAsync<{ name: string; isReversed: number }>(
    'SELECT name, isReversed FROM daily_card WHERE date = ?',
    date
  );
}

export async function getDeckCount(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM tarot_cards'
  );
  return row?.count ?? 0;
}
