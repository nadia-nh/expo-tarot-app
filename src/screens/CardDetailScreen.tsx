import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { fontFamilies } from '../theme/typography';
import { useTarotStore } from '../store/tarotStore';
import { getMeaning } from '../domain/TarotCard';
import CardImage from '../components/CardImage';
import CardMeaning from '../components/CardMeaning';

export default function CardDetailScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { selectedCard } = useTarotStore();

  useLayoutEffect(() => {
    if (selectedCard) {
      navigation.setOptions({
        title: selectedCard.isReversed
          ? `${selectedCard.card.name} (Rev.)`
          : selectedCard.card.name,
      });
    }
  }, [selectedCard, navigation]);

  if (!selectedCard) {
    return (
      <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.onBackground }}>No card selected.</Text>
      </View>
    );
  }

  const meaning = getMeaning(selectedCard);
  const imageWidth = isLandscape ? 140 : 220;

  if (isLandscape) {
    return (
      <View style={[styles.root, styles.rowLayout, { backgroundColor: theme.colors.background }]}>
        <CardImage cardName={selectedCard.card.name} isRevealed size={imageWidth} />
        <ScrollView style={styles.meaningColumn} contentContainerStyle={styles.meaningContent}>
          <MeaningSection selectedCard={selectedCard} meaning={meaning} theme={theme} />
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.portrait}
    >
      <CardImage cardName={selectedCard.card.name} isRevealed size={imageWidth} />
      <View style={{ height: 24 }} />
      <MeaningSection selectedCard={selectedCard} meaning={meaning} theme={theme} />
    </ScrollView>
  );
}

function MeaningSection({
  selectedCard,
  meaning,
  theme,
}: {
  selectedCard: NonNullable<ReturnType<typeof useTarotStore>['selectedCard']>;
  meaning: string;
  theme: any;
}) {
  return (
    <>
      <Text
        style={[
          styles.cardName,
          { color: theme.colors.onBackground, fontFamily: fontFamilies.bold },
        ]}
      >
        {selectedCard.card.name}
        {selectedCard.isReversed ? ' (Reversed)' : ''}
      </Text>
      <Text style={[styles.suitLabel, { color: theme.colors.primary }]}>
        {selectedCard.card.suit}
      </Text>
      <CardMeaning
        meaning={meaning}
        label={selectedCard.isReversed ? 'Reversed Meaning' : 'Upright Meaning'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  rowLayout: { flexDirection: 'row', gap: 24, alignItems: 'center' },
  portrait: { alignItems: 'center', padding: 24 },
  meaningColumn: { flex: 1 },
  meaningContent: { paddingVertical: 16 },
  cardName: { fontSize: 22, letterSpacing: 2, textAlign: 'center', marginBottom: 4 },
  suitLabel: { fontSize: 13, letterSpacing: 2, opacity: 0.7, marginBottom: 12, textAlign: 'center' },
});
