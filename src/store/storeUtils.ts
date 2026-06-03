import { TarotCard, DrawnCard } from '../domain/TarotCard';

export function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function drawN(deck: TarotCard[], count: number, revealed: boolean): DrawnCard[] {
  return pickRandom(deck, count).map((card) => ({
    card,
    isReversed: Math.random() < 0.5,
    isRevealed: revealed,
  }));
}
