import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('arcana_flux.db');
  await initTables(db);
  return db;
}

async function initTables(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS readings (
      readingId INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp INTEGER NOT NULL,
      spreadType TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS drawn_cards (
      cardId INTEGER PRIMARY KEY AUTOINCREMENT,
      readingOwnerId INTEGER NOT NULL REFERENCES readings(readingId) ON DELETE CASCADE,
      name TEXT NOT NULL,
      isReversed INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tarot_cards (
      name TEXT PRIMARY KEY,
      uprightMeaning TEXT NOT NULL,
      reversedMeaning TEXT NOT NULL,
      suit TEXT NOT NULL,
      rank TEXT NOT NULL
    );
  `);
}
