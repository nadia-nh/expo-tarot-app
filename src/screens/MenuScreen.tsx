import { useWindowDimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTarotStore } from '../store/tarotStore';
import CardDisplay from '../components/CardDisplay';

export default function MenuScreen() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation<any>();
  const { dailyCard, selectCard } = useTarotStore();

  const handleCardPress = (card: any) => {
    selectCard(card);
    navigation.navigate('CardDetail');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text
        style={[
          styles.headline,
          { color: theme.colors.onBackground, fontFamily: 'Merriweather_300Light' },
        ]}
      >
        Arcana Flux
      </Text>

      {dailyCard && (
        <View style={styles.dailySection}>
          <Text
            style={[
              styles.dailyLabel,
              { color: theme.colors.onBackground, fontFamily: 'Merriweather_400Regular' },
            ]}
          >
            Your daily card
          </Text>
          <CardDisplay
            drawnCard={dailyCard}
            onReveal={() => {}}
            onCardPress={handleCardPress}
            cardWidth={isLandscape ? 100 : 140}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  headline: {
    fontSize: 28,
    letterSpacing: 6,
    marginBottom: 32,
  },
  dailySection: {
    alignItems: 'center',
    gap: 12,
  },
  dailyLabel: {
    fontSize: 14,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
});
