import type { ImageSourcePropType } from 'react-native';

export const cardImages: Record<string, ImageSourcePropType> = {
  // Card back
  'card_back': require('../../assets/cards/card_back.png'),

  // Major Arcana
  'The Fool': require('../../assets/cards/major_the_fool.png'),
  'The Magician': require('../../assets/cards/major_the_magician.png'),
  'The High Priestess': require('../../assets/cards/major_the_high_priestess.png'),
  'The Empress': require('../../assets/cards/major_the_empress.png'),
  'The Emperor': require('../../assets/cards/major_the_emperor.png'),
  'The Hierophant': require('../../assets/cards/major_the_hierophant.png'),
  'The Lovers': require('../../assets/cards/major_the_lovers.png'),
  'The Chariot': require('../../assets/cards/major_the_chariot.png'),
  'Strength': require('../../assets/cards/major_strength.png'),
  'The Hermit': require('../../assets/cards/major_the_hermit.png'),
  'Wheel Of Fortune': require('../../assets/cards/major_wheel_of_fortune.png'),
  'Justice': require('../../assets/cards/major_justice.png'),
  'The Hanged Man': require('../../assets/cards/major_the_hanged_man.png'),
  'Death': require('../../assets/cards/major_death.png'),
  'Temperance': require('../../assets/cards/major_temperance.png'),
  'The Devil': require('../../assets/cards/major_the_devil.png'),
  'The Tower': require('../../assets/cards/major_the_tower.png'),
  'The Star': require('../../assets/cards/major_the_star.png'),
  'The Moon': require('../../assets/cards/major_the_moon.png'),
  'The Sun': require('../../assets/cards/major_the_sun.png'),
  'Judgement': require('../../assets/cards/major_judgement.png'),
  'The World': require('../../assets/cards/major_the_world.png'),

  // Wands
  'Ace of Wands': require('../../assets/cards/wands_ace.png'),
  'Two of Wands': require('../../assets/cards/wands_two.png'),
  'Three of Wands': require('../../assets/cards/wands_three.png'),
  'Four of Wands': require('../../assets/cards/wands_four.png'),
  'Five of Wands': require('../../assets/cards/wands_five.png'),
  'Six of Wands': require('../../assets/cards/wands_six.png'),
  'Seven of Wands': require('../../assets/cards/wands_seven.png'),
  'Eight of Wands': require('../../assets/cards/wands_eight.png'),
  'Nine of Wands': require('../../assets/cards/wands_nine.png'),
  'Ten of Wands': require('../../assets/cards/wands_ten.png'),
  'Page of Wands': require('../../assets/cards/wands_page.png'),
  'Knight of Wands': require('../../assets/cards/wands_knight.png'),
  'Queen of Wands': require('../../assets/cards/wands_queen.png'),
  'King of Wands': require('../../assets/cards/wands_king.png'),

  // Cups
  'Ace of Cups': require('../../assets/cards/cups_ace.png'),
  'Two of Cups': require('../../assets/cards/cups_two.png'),
  'Three of Cups': require('../../assets/cards/cups_three.png'),
  'Four of Cups': require('../../assets/cards/cups_four.png'),
  'Five of Cups': require('../../assets/cards/cups_five.png'),
  'Six of Cups': require('../../assets/cards/cups_six.png'),
  'Seven of Cups': require('../../assets/cards/cups_seven.png'),
  'Eight of Cups': require('../../assets/cards/cups_eight.png'),
  'Nine of Cups': require('../../assets/cards/cups_nine.png'),
  'Ten of Cups': require('../../assets/cards/cups_ten.png'),
  'Page of Cups': require('../../assets/cards/cups_page.png'),
  'Knight of Cups': require('../../assets/cards/cups_knight.png'),
  'Queen of Cups': require('../../assets/cards/cups_queen.png'),
  'King of Cups': require('../../assets/cards/cups_king.png'),

  // Swords
  'Ace of Swords': require('../../assets/cards/swords_ace.png'),
  'Two of Swords': require('../../assets/cards/swords_two.png'),
  'Three of Swords': require('../../assets/cards/swords_three.png'),
  'Four of Swords': require('../../assets/cards/swords_four.png'),
  'Five of Swords': require('../../assets/cards/swords_five.png'),
  'Six of Swords': require('../../assets/cards/swords_six.png'),
  'Seven of Swords': require('../../assets/cards/swords_seven.png'),
  'Eight of Swords': require('../../assets/cards/swords_eight.png'),
  'Nine of Swords': require('../../assets/cards/swords_nine.png'),
  'Ten of Swords': require('../../assets/cards/swords_ten.png'),
  'Page of Swords': require('../../assets/cards/swords_page.png'),
  'Knight of Swords': require('../../assets/cards/swords_knight.png'),
  'Queen of Swords': require('../../assets/cards/swords_queen.png'),
  'King of Swords': require('../../assets/cards/swords_king.png'),

  // Pentacles
  'Ace of Pentacles': require('../../assets/cards/pentacles_ace.png'),
  'Two of Pentacles': require('../../assets/cards/pentacles_two.png'),
  'Three of Pentacles': require('../../assets/cards/pentacles_three.png'),
  'Four of Pentacles': require('../../assets/cards/pentacles_four.png'),
  'Five of Pentacles': require('../../assets/cards/pentacles_five.png'),
  'Six of Pentacles': require('../../assets/cards/pentacles_six.png'),
  'Seven of Pentacles': require('../../assets/cards/pentacles_seven.png'),
  'Eight of Pentacles': require('../../assets/cards/pentacles_eight.png'),
  'Nine of Pentacles': require('../../assets/cards/pentacles_nine.png'),
  'Ten of Pentacles': require('../../assets/cards/pentacles_ten.png'),
  'Page of Pentacles': require('../../assets/cards/pentacles_page.png'),
  'Knight of Pentacles': require('../../assets/cards/pentacles_knight.png'),
  'Queen of Pentacles': require('../../assets/cards/pentacles_queen.png'),
  'King of Pentacles': require('../../assets/cards/pentacles_king.png'),
};

export function getCardImage(cardName: string): ImageSourcePropType {
  return cardImages[cardName] ?? cardImages['card_back'];
}
