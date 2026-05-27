import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { DrawnCard } from '../domain/TarotCard';
import { getCardImage } from '../domain/cardImages';
import CardTitle from './CardTitle';

interface Props {
  drawnCard: DrawnCard;
  onReveal: () => void;
  onCardPress: (card: DrawnCard) => void;
  cardWidth?: number;
}

export default function CardDisplay({ drawnCard, onReveal, onCardPress, cardWidth = 120 }: Props) {
  const theme = useTheme();
  const flipAnim = useRef(new Animated.Value(drawnCard.isRevealed ? 180 : 0)).current;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const handlePress = () => {
    if (!drawnCard.isRevealed) {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start(() => onReveal());
    } else {
      onCardPress(drawnCard);
    }
  };

  const cardHeight = cardWidth * 1.75;
  const faceSource = getCardImage(drawnCard.card.name);
  const backSource = getCardImage('card_back');

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress}>
        <View style={{ width: cardWidth, height: cardHeight }}>
          {/* Card back */}
          <Animated.Image
            source={backSource}
            style={[
              styles.card,
              { width: cardWidth, height: cardHeight, borderRadius: 8 },
              { transform: [{ rotateY: backInterpolate }] },
            ]}
            resizeMode="contain"
          />
          {/* Card face */}
          <Animated.Image
            source={faceSource}
            style={[
              styles.card,
              styles.cardFace,
              { width: cardWidth, height: cardHeight, borderRadius: 8 },
              { transform: [{ rotateY: frontInterpolate }] },
            ]}
            resizeMode="contain"
          />
        </View>
      </Pressable>
      {drawnCard.isRevealed && (
        <CardTitle name={drawnCard.card.name} isReversed={drawnCard.isReversed} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  card: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  cardFace: {
    top: 0,
    left: 0,
  },
});
