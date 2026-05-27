import { useCallback } from 'react';
import {
  useWindowDimensions,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useTarotStore } from '../store/tarotStore';
import { DrawnCard } from '../domain/TarotCard';
import CardDisplay from '../components/CardDisplay';
import StylizedButton from '../components/StylizedButton';

export default function ResultScreen() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const spreadSize: number = route.params?.spreadSize ?? 1;

  const { currentSpread, currentSpreadSize, isSpreadSaved, isInitialized, drawCards, revealCard, saveCurrentReading, selectCard } =
    useTarotStore();

  // Redraw when tab comes into focus, but not when returning from CardDetail.
  // currentSpreadSize tracks which tab last drew — if it doesn't match this
  // tab's spreadSize, we're arriving from a different tab and need a fresh draw.
  useFocusEffect(
    useCallback(() => {
      if (isInitialized && currentSpreadSize !== spreadSize) {
        drawCards(spreadSize);
      }
    }, [isInitialized, spreadSize, currentSpreadSize])
  );

  const allRevealed = currentSpread.length > 0 && currentSpread.every((c) => c.isRevealed);

  const handleCardPress = (card: DrawnCard) => {
    selectCard(card);
    navigation.navigate('CardDetail');
  };

  const cardWidth = isLandscape ? 100 : 120;

  if (isLandscape) {
    return (
      <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
        <FlatList
          horizontal
          data={currentSpread}
          keyExtractor={(item) => item.card.name}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item, index }) => (
            <CardDisplay
              drawnCard={item}
              onReveal={() => revealCard(index)}
              onCardPress={handleCardPress}
              cardWidth={cardWidth}
            />
          )}
        />
        <StylizedButton
          label={isSpreadSaved ? 'Saved' : 'Save Reading'}
          onPress={saveCurrentReading}
          disabled={!allRevealed || isSpreadSaved}
          style={styles.saveButton}
        />
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.verticalList}>
        {currentSpread.map((item, index) => (
          <CardDisplay
            key={item.card.name}
            drawnCard={item}
            onReveal={() => revealCard(index)}
            onCardPress={handleCardPress}
            cardWidth={cardWidth}
          />
        ))}
      </ScrollView>
      <StylizedButton
        label={isSpreadSaved ? 'Saved' : 'Save Reading'}
        onPress={saveCurrentReading}
        disabled={!allRevealed || isSpreadSaved}
        style={styles.saveButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  horizontalList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  verticalList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 16,
  },
  saveButton: { margin: 16 },
});
