import { useRef, useEffect } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { DrawnCard } from '../domain/TarotCard';
import { getCardImage } from '../domain/cardImages';
import { colors } from '../theme/colors';
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

  // Reset animation when a different card is drawn into this slot
  useEffect(() => {
    flipAnim.setValue(drawnCard.isRevealed ? 180 : 0);
  }, [drawnCard.card.name]);

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
      onReveal();
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      onCardPress(drawnCard);
    }
  };

  const cardHeight = cardWidth * 1.75;
  const faceSource = getCardImage(drawnCard.card.name);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress}>
        <View style={{ width: cardWidth, height: cardHeight }}>
          {/* Card back — styled View with gold star, matching Android */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              { width: cardWidth, height: cardHeight, borderRadius: 8, backgroundColor: theme.colors.surface },
              { transform: [{ rotateY: backInterpolate }] },
            ]}
          >
            <Text style={[styles.starSymbol, { color: colors.softGold }]}>★</Text>
          </Animated.View>
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
  cardBack: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.softGold + '55',
  },
  cardFace: {
    top: 0,
    left: 0,
  },
  starSymbol: {
    fontSize: 40,
  },
});
