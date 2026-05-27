import { TarotCard, Suit, withRankAndSuit } from '../domain/TarotCard';

const baseDeck: TarotCard[] = [
  // Major Arcana
  { name: 'The Fool', uprightMeaning: 'New beginnings, spontaneity, trust', reversedMeaning: 'Recklessness, naivety, holding back', suit: Suit.MajorArcana, rank: null },
  { name: 'The Magician', uprightMeaning: 'Manifestation, resourcefulness, power', reversedMeaning: 'Manipulation, wasted talent, deception', suit: Suit.MajorArcana, rank: null },
  { name: 'The High Priestess', uprightMeaning: 'Intuition, mystery, inner voice', reversedMeaning: 'Secrets, disconnected from intuition, withdrawal', suit: Suit.MajorArcana, rank: null },
  { name: 'The Empress', uprightMeaning: 'Fertility, nurturing, abundance', reversedMeaning: 'Dependence, creative block, emptiness', suit: Suit.MajorArcana, rank: null },
  { name: 'The Emperor', uprightMeaning: 'Authority, structure, stability', reversedMeaning: 'Tyranny, rigidity, lack of discipline', suit: Suit.MajorArcana, rank: null },
  { name: 'The Hierophant', uprightMeaning: 'Tradition, learning, spiritual guidance', reversedMeaning: 'Rebellion, unconventionality, freedom', suit: Suit.MajorArcana, rank: null },
  { name: 'The Lovers', uprightMeaning: 'Partnership, harmony, choices', reversedMeaning: 'Imbalance, misalignment, disharmony', suit: Suit.MajorArcana, rank: null },
  { name: 'The Chariot', uprightMeaning: 'Determination, willpower, control', reversedMeaning: 'Lack of direction, self-doubt, aggression', suit: Suit.MajorArcana, rank: null },
  { name: 'Strength', uprightMeaning: 'Courage, patience, inner strength', reversedMeaning: 'Self-doubt, weakness, insecurity', suit: Suit.MajorArcana, rank: null },
  { name: 'The Hermit', uprightMeaning: 'Introspection, solitude, inner guidance', reversedMeaning: 'Isolation, loneliness, withdrawal', suit: Suit.MajorArcana, rank: null },
  { name: 'Wheel Of Fortune', uprightMeaning: 'Change, cycles, destiny', reversedMeaning: 'Bad luck, resistance to change, setbacks', suit: Suit.MajorArcana, rank: null },
  { name: 'Justice', uprightMeaning: 'Truth, fairness, accountability', reversedMeaning: 'Dishonesty, unfairness, corruption', suit: Suit.MajorArcana, rank: null },
  { name: 'The Hanged Man', uprightMeaning: 'Pause, surrender, new perspective', reversedMeaning: 'Delays, resistance, stalling', suit: Suit.MajorArcana, rank: null },
  { name: 'Death', uprightMeaning: 'Transformation, endings, renewal', reversedMeaning: 'Resistance to change, stagnation, fear', suit: Suit.MajorArcana, rank: null },
  { name: 'Temperance', uprightMeaning: 'Balance, harmony, moderation', reversedMeaning: 'Excess, imbalance, conflict', suit: Suit.MajorArcana, rank: null },
  { name: 'The Devil', uprightMeaning: 'Bondage, addiction, materialism', reversedMeaning: 'Release, freedom, detachment', suit: Suit.MajorArcana, rank: null },
  { name: 'The Tower', uprightMeaning: 'Sudden change, upheaval, revelation', reversedMeaning: 'Avoidance of disaster, fear of change', suit: Suit.MajorArcana, rank: null },
  { name: 'The Star', uprightMeaning: 'Hope, inspiration, renewal', reversedMeaning: 'Despair, lack of faith, discouragement', suit: Suit.MajorArcana, rank: null },
  { name: 'The Moon', uprightMeaning: 'Illusion, intuition, dreams', reversedMeaning: 'Confusion, fear, misinterpretation', suit: Suit.MajorArcana, rank: null },
  { name: 'The Sun', uprightMeaning: 'Joy, success, vitality', reversedMeaning: 'Sadness, pessimism, lack of clarity', suit: Suit.MajorArcana, rank: null },
  { name: 'Judgement', uprightMeaning: 'Awakening, reflection, reckoning', reversedMeaning: 'Self-doubt, denial, avoidance', suit: Suit.MajorArcana, rank: null },
  { name: 'The World', uprightMeaning: 'Completion, accomplishment, travel', reversedMeaning: 'Lack of closure, delays, incompletion', suit: Suit.MajorArcana, rank: null },

  // Wands
  { name: 'Ace of Wands', uprightMeaning: 'Inspiration, new opportunity, growth', reversedMeaning: 'Delays, lack of motivation, false start', suit: Suit.Wands, rank: null },
  { name: 'Two of Wands', uprightMeaning: 'Planning, progress, decisions', reversedMeaning: 'Fear of change, playing safe, bad planning', suit: Suit.Wands, rank: null },
  { name: 'Three of Wands', uprightMeaning: 'Expansion, foresight, opportunities', reversedMeaning: 'Delays, obstacles, frustration', suit: Suit.Wands, rank: null },
  { name: 'Four of Wands', uprightMeaning: 'Celebration, home, community', reversedMeaning: 'Conflict, instability, transition', suit: Suit.Wands, rank: null },
  { name: 'Five of Wands', uprightMeaning: 'Competition, challenge, tension', reversedMeaning: 'Avoiding conflict, cooperation, resolution', suit: Suit.Wands, rank: null },
  { name: 'Six of Wands', uprightMeaning: 'Victory, recognition, success', reversedMeaning: 'Ego, fall from grace, lack of recognition', suit: Suit.Wands, rank: null },
  { name: 'Seven of Wands', uprightMeaning: 'Perseverance, defense, standing ground', reversedMeaning: 'Giving up, overwhelm, vulnerability', suit: Suit.Wands, rank: null },
  { name: 'Eight of Wands', uprightMeaning: 'Speed, movement, swift change', reversedMeaning: 'Delays, frustration, resisting change', suit: Suit.Wands, rank: null },
  { name: 'Nine of Wands', uprightMeaning: 'Resilience, persistence, boundaries', reversedMeaning: 'Exhaustion, defensiveness, giving up', suit: Suit.Wands, rank: null },
  { name: 'Ten of Wands', uprightMeaning: 'Burden, responsibility, hard work', reversedMeaning: 'Burnout, stress, letting go', suit: Suit.Wands, rank: null },
  { name: 'Page of Wands', uprightMeaning: 'Exploration, enthusiasm, discovery', reversedMeaning: 'Lack of direction, immaturity, procrastination', suit: Suit.Wands, rank: null },
  { name: 'Knight of Wands', uprightMeaning: 'Energy, passion, adventure', reversedMeaning: 'Recklessness, haste, scattered energy', suit: Suit.Wands, rank: null },
  { name: 'Queen of Wands', uprightMeaning: 'Confidence, independence, warmth', reversedMeaning: 'Jealousy, insecurity, selfishness', suit: Suit.Wands, rank: null },
  { name: 'King of Wands', uprightMeaning: 'Leadership, vision, honor', reversedMeaning: 'Impulsiveness, overbearing, ruthless', suit: Suit.Wands, rank: null },

  // Cups
  { name: 'Ace of Cups', uprightMeaning: 'Love, compassion, new feelings', reversedMeaning: 'Blocked emotions, emptiness, coldness', suit: Suit.Cups, rank: null },
  { name: 'Two of Cups', uprightMeaning: 'Connection, partnership, attraction', reversedMeaning: 'Breakup, imbalance, tension', suit: Suit.Cups, rank: null },
  { name: 'Three of Cups', uprightMeaning: 'Friendship, joy, celebration', reversedMeaning: 'Gossip, overindulgence, isolation', suit: Suit.Cups, rank: null },
  { name: 'Four of Cups', uprightMeaning: 'Apathy, contemplation, reevaluation', reversedMeaning: 'Awareness, acceptance, choosing happiness', suit: Suit.Cups, rank: null },
  { name: 'Five of Cups', uprightMeaning: 'Loss, grief, disappointment', reversedMeaning: 'Acceptance, moving on, healing', suit: Suit.Cups, rank: null },
  { name: 'Six of Cups', uprightMeaning: 'Nostalgia, innocence, reunion', reversedMeaning: 'Stuck in past, naivety, unrealistic', suit: Suit.Cups, rank: null },
  { name: 'Seven of Cups', uprightMeaning: 'Choices, fantasy, illusion', reversedMeaning: 'Clarity, decisiveness, realism', suit: Suit.Cups, rank: null },
  { name: 'Eight of Cups', uprightMeaning: 'Walking away, seeking truth', reversedMeaning: 'Fear of change, avoidance, stagnation', suit: Suit.Cups, rank: null },
  { name: 'Nine of Cups', uprightMeaning: 'Satisfaction, gratitude, contentment', reversedMeaning: 'Greed, dissatisfaction, smugness', suit: Suit.Cups, rank: null },
  { name: 'Ten of Cups', uprightMeaning: 'Harmony, happiness, family', reversedMeaning: 'Disconnection, broken relationships, disharmony', suit: Suit.Cups, rank: null },
  { name: 'Page of Cups', uprightMeaning: 'Imagination, sensitivity, curiosity', reversedMeaning: 'Emotional immaturity, insecurity, escapism', suit: Suit.Cups, rank: null },
  { name: 'Knight of Cups', uprightMeaning: 'Charm, romance, idealism', reversedMeaning: 'Moodiness, disappointment, jealousy', suit: Suit.Cups, rank: null },
  { name: 'Queen of Cups', uprightMeaning: 'Compassion, care, intuition', reversedMeaning: 'Codependency, insecurity, smothering', suit: Suit.Cups, rank: null },
  { name: 'King of Cups', uprightMeaning: 'Balance, diplomacy, emotional control', reversedMeaning: 'Manipulation, coldness, mood swings', suit: Suit.Cups, rank: null },

  // Swords
  { name: 'Ace of Swords', uprightMeaning: 'Clarity, truth, breakthroughs', reversedMeaning: 'Confusion, dishonesty, chaos', suit: Suit.Swords, rank: null },
  { name: 'Two of Swords', uprightMeaning: 'Indecision, stalemate, choices', reversedMeaning: 'Lies, confusion, indecision', suit: Suit.Swords, rank: null },
  { name: 'Three of Swords', uprightMeaning: 'Heartbreak, sorrow, betrayal', reversedMeaning: 'Recovery, forgiveness, reconciliation', suit: Suit.Swords, rank: null },
  { name: 'Four of Swords', uprightMeaning: 'Rest, recovery, meditation', reversedMeaning: 'Restlessness, burnout, stress', suit: Suit.Swords, rank: null },
  { name: 'Five of Swords', uprightMeaning: 'Conflict, defeat, competition', reversedMeaning: 'Reconciliation, compromise, harmony', suit: Suit.Swords, rank: null },
  { name: 'Six of Swords', uprightMeaning: 'Transition, moving on, change', reversedMeaning: 'Resistance to change, stuck, baggage', suit: Suit.Swords, rank: null },
  { name: 'Seven of Swords', uprightMeaning: 'Deception, stealth, strategy', reversedMeaning: 'Confession, clarity, turning over new leaf', suit: Suit.Swords, rank: null },
  { name: 'Eight of Swords', uprightMeaning: 'Restriction, fear, helplessness', reversedMeaning: 'Freedom, empowerment, clarity', suit: Suit.Swords, rank: null },
  { name: 'Nine of Swords', uprightMeaning: 'Anxiety, guilt, worry', reversedMeaning: 'Hope, comfort, letting go of fear', suit: Suit.Swords, rank: null },
  { name: 'Ten of Swords', uprightMeaning: 'Endings, betrayal, collapse', reversedMeaning: 'Recovery, regeneration, resisting an end', suit: Suit.Swords, rank: null },
  { name: 'Page of Swords', uprightMeaning: 'Curiosity, truth-seeking, vigilance', reversedMeaning: 'Deception, cynicism, manipulation', suit: Suit.Swords, rank: null },
  { name: 'Knight of Swords', uprightMeaning: 'Ambition, action, drive', reversedMeaning: 'Impulsiveness, recklessness, impatience', suit: Suit.Swords, rank: null },
  { name: 'Queen of Swords', uprightMeaning: 'Independence, perception, clarity', reversedMeaning: 'Bitterness, coldness, manipulation', suit: Suit.Swords, rank: null },
  { name: 'King of Swords', uprightMeaning: 'Logic, authority, truth', reversedMeaning: 'Tyranny, cruelty, manipulation', suit: Suit.Swords, rank: null },

  // Pentacles
  { name: 'Ace of Pentacles', uprightMeaning: 'Opportunity, prosperity, stability', reversedMeaning: 'Lost opportunity, scarcity, instability', suit: Suit.Pentacles, rank: null },
  { name: 'Two of Pentacles', uprightMeaning: 'Balance, adaptability, priorities', reversedMeaning: 'Imbalance, overcommitment, disorganization', suit: Suit.Pentacles, rank: null },
  { name: 'Three of Pentacles', uprightMeaning: 'Teamwork, collaboration, learning', reversedMeaning: 'Disharmony, poor teamwork, mediocrity', suit: Suit.Pentacles, rank: null },
  { name: 'Four of Pentacles', uprightMeaning: 'Security, stability, control', reversedMeaning: 'Greed, materialism, insecurity', suit: Suit.Pentacles, rank: null },
  { name: 'Five of Pentacles', uprightMeaning: 'Poverty, hardship, loss', reversedMeaning: 'Recovery, improvement, relief', suit: Suit.Pentacles, rank: null },
  { name: 'Six of Pentacles', uprightMeaning: 'Generosity, sharing, charity', reversedMeaning: 'Debt, selfishness, inequality', suit: Suit.Pentacles, rank: null },
  { name: 'Seven of Pentacles', uprightMeaning: 'Patience, long-term view, investment', reversedMeaning: 'Impatience, waste, lack of reward', suit: Suit.Pentacles, rank: null },
  { name: 'Eight of Pentacles', uprightMeaning: 'Skill, mastery, hard work', reversedMeaning: 'Perfectionism, lack of focus, mediocrity', suit: Suit.Pentacles, rank: null },
  { name: 'Nine of Pentacles', uprightMeaning: 'Luxury, independence, success', reversedMeaning: 'Recklessness, overindulgence, dependence', suit: Suit.Pentacles, rank: null },
  { name: 'Ten of Pentacles', uprightMeaning: 'Legacy, wealth, stability', reversedMeaning: 'Loss, instability, financial failure', suit: Suit.Pentacles, rank: null },
  { name: 'Page of Pentacles', uprightMeaning: 'Ambition, learning, diligence', reversedMeaning: 'Laziness, lack of commitment, foolishness', suit: Suit.Pentacles, rank: null },
  { name: 'Knight of Pentacles', uprightMeaning: 'Reliability, hard work, responsibility', reversedMeaning: 'Stagnation, boredom, laziness', suit: Suit.Pentacles, rank: null },
  { name: 'Queen of Pentacles', uprightMeaning: 'Nurturing, security, practicality', reversedMeaning: 'Selfishness, imbalance, work-home conflict', suit: Suit.Pentacles, rank: null },
  { name: 'King of Pentacles', uprightMeaning: 'Wealth, discipline, leadership', reversedMeaning: 'Greed, stubbornness, exploitation', suit: Suit.Pentacles, rank: null },
];

const cardNameMap = new Map<string, TarotCard>(
  baseDeck.map((c) => [c.name, c])
);

const NAME_ALIASES: Record<string, string> = {
  Fortitude: 'Strength',
  'The Last Judgment': 'Judgement',
};

export function getDeck(): TarotCard[] {
  return baseDeck.map(withRankAndSuit);
}

export function getCardByName(name: string): TarotCard | undefined {
  const resolved = NAME_ALIASES[name] ?? name;
  const card = cardNameMap.get(resolved);
  return card ? withRankAndSuit(card) : undefined;
}
