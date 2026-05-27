// expo-sqlite is not available on web — the repository catches this and
// falls back to the hardcoded deck / returns empty history.
export async function getDb(): Promise<never> {
  throw new Error('SQLite is not available on web');
}
