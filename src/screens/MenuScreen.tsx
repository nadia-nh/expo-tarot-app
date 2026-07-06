import { useWindowDimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTarotStore } from '../store/tarotStore';
import { DrawnCard } from '../domain/TarotCard';
import { fontFamilies } from '../theme/typography';
import { RootStackParamList } from '../navigation/AppNavigator';
import CardDisplay from '../components/CardDisplay';
import GuidanceCallout from '../components/GuidanceCallout';

export default function MenuScreen() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { dailyCard, selectCard, seenTips, markTipSeen } = useTarotStore();

  const handleCardPress = (card: DrawnCard) => {
    markTipSeen('daily');
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
          { color: theme.colors.onBackground, fontFamily: fontFamilies.light },
        ]}
      >
        Arcana Flux
      </Text>

      {dailyCard && (
        <View style={styles.dailySection}>
          <Text
            style={[
              styles.dailyLabel,
              { color: theme.colors.onBackground, fontFamily: fontFamilies.regular },
            ]}
          >
            Your Daily Card
          </Text>
          <Text
            style={[styles.dateLabel, { color: theme.colors.onSurfaceVariant, fontFamily: fontFamilies.light }]}
          >
            {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
          {!seenTips.includes('daily') && (
            <GuidanceCallout
              text="This is your daily card. Let it guide you through the day — tap it for more details."
              onDismiss={() => markTipSeen('daily')}
            />
          )}
          <CardDisplay
            drawnCard={dailyCard}
            onReveal={() => {}}
            onCardPress={handleCardPress}
            cardWidth={isLandscape ? Math.round((height * 0.8) / 1.75) : Math.round((height * 0.7) / 1.75)}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headline: {
    fontSize: 28,
    letterSpacing: 6,
    marginBottom: 32,
  },
  dailySection: {
    alignItems: 'center',
    gap: 8,
  },
  dailyLabel: {
    fontSize: 32,
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  dateLabel: {
    fontSize: 12,
    letterSpacing: 1,
    opacity: 0.7,
  },
});
