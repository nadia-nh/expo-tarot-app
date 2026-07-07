import { Platform } from 'react-native';
import { ReadingWithCards } from './tarotDao';

const HISTORY_KEY = 'tarot_history';

function isWeb() {
  return Platform.OS === 'web' && typeof localStorage !== 'undefined';
}

export function loadWebHistory(): ReadingWithCards[] {
  if (!isWeb()) return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as ReadingWithCards[]) : [];
  } catch {
    return [];
  }
}

export function saveWebHistory(history: ReadingWithCards[]): void {
  if (!isWeb()) return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

export function addWebHistoryEntry(entry: ReadingWithCards): ReadingWithCards[] {
  const history = [entry, ...loadWebHistory()];
  saveWebHistory(history);
  return history;
}

export function removeWebHistoryEntry(readingId: number): ReadingWithCards[] {
  const history = loadWebHistory().filter((r) => r.reading.readingId !== readingId);
  saveWebHistory(history);
  return history;
}

const DAILY_CARD_KEY = 'tarot_daily_card';

interface WebDailyCard { date: string; name: string; isReversed: boolean; }

export function loadWebDailyCard(): WebDailyCard | null {
  if (!isWeb()) return null;
  try {
    const raw = localStorage.getItem(DAILY_CARD_KEY);
    return raw ? (JSON.parse(raw) as WebDailyCard) : null;
  } catch {
    return null;
  }
}

export function saveWebDailyCard(date: string, name: string, isReversed: boolean): void {
  if (!isWeb()) return;
  try {
    localStorage.setItem(DAILY_CARD_KEY, JSON.stringify({ date, name, isReversed }));
  } catch {}
}

const TIPS_SEEN_KEY = 'tarot_tips_seen';

export function loadWebSeenTips(): string[] {
  if (!isWeb()) return [];
  try {
    const raw = localStorage.getItem(TIPS_SEEN_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveWebSeenTips(tips: string[]): void {
  if (!isWeb()) return;
  try {
    localStorage.setItem(TIPS_SEEN_KEY, JSON.stringify(tips));
  } catch {}
}

const TIPS_SHOWN_COUNT_KEY = 'tarot_tips_shown_count';

export function loadWebShownCounts(): Record<string, number> {
  if (!isWeb()) return {};
  try {
    const raw = localStorage.getItem(TIPS_SHOWN_COUNT_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function saveWebShownCounts(counts: Record<string, number>): void {
  if (!isWeb()) return;
  try {
    localStorage.setItem(TIPS_SHOWN_COUNT_KEY, JSON.stringify(counts));
  } catch {}
}
