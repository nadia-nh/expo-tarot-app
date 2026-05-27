import { Image, StyleSheet, View } from 'react-native';
import { getCardImage } from '../domain/cardImages';

interface Props {
  cardName: string;
  isRevealed: boolean;
  isReversed?: boolean;
  size?: number;
}

export default function CardImage({ cardName, isRevealed, isReversed = false, size = 120 }: Props) {
  const source = isRevealed ? getCardImage(cardName) : getCardImage('card_back');
  return (
    <View style={[styles.container, { width: size, height: size * 1.75 }]}>
      <Image
        source={source}
        style={[styles.image, isReversed && { transform: [{ rotate: '180deg' }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', borderRadius: 8 },
  image: { width: '100%', height: '100%' },
});
