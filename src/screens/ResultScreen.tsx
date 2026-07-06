import { useCallback, useEffect, useState } from 'react';
import {
  useWindowDimensions,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, TabParamList } from '../navigation/AppNavigator';
import { useTarotStore } from '../store/tarotStore';
import { DrawnCard } from '../domain/TarotCard';
import CardDisplay from '../components/CardDisplay';
import StylizedButton from '../components/StylizedButton';
import GuidanceCallout from '../components/GuidanceCallout';

export default function ResultScreen() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<TabParamList, 'OneCard'>>();
  const spreadSize: number = route.params?.spreadSize ?? 1;

  const { currentSpread, currentSpreadSize, isSpreadSaved, isInitialized, drawCards, revealCard, saveCurrentReading, selectCard, seenTips, markTipSeen } =
    useTarotStore();
  const [showHistoryTip, setShowHistoryTip] = useState(false);

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

  // Once the user has revealed a full spread, the draw guidance has served its purpose
  useEffect(() => {
    if (allRevealed) markTipSeen('draw');
  }, [allRevealed]);

  const handleSave = async () => {
    const isFirstSave = !seenTips.includes('history');
    await saveCurrentReading();
    if (isFirstSave) {
      setShowHistoryTip(true);
      markTipSeen('history');
    }
  };

  const handleCardPress = (card: DrawnCard) => {
    selectCard(card);
    navigation.navigate('CardDetail');
  };

  const cardWidth = isLandscape ? 100 : 120;

  const renderCard = (item: DrawnCard, index: number) => (
    <CardDisplay
      key={item.card.name}
      drawnCard={item}
      onReveal={() => revealCard(index)}
      onCardPress={handleCardPress}
      cardWidth={cardWidth}
    />
  );

  const saveButton = (
    <StylizedButton
      label={isSpreadSaved ? 'Saved' : 'Save Reading'}
      onPress={handleSave}
      disabled={!allRevealed || isSpreadSaved}
      style={styles.saveButton}
    />
  );

  const drawTip = !seenTips.includes('draw') && (
    <View style={styles.tipWrapper}>
      <GuidanceCallout
        text="Take a slow breath and hold an open question in mind — what do I need to focus on in love, work, life? Then reveal your cards."
        onDismiss={() => markTipSeen('draw')}
      />
    </View>
  );

  const historySnackbar = (
    <Snackbar
      visible={showHistoryTip}
      onDismiss={() => setShowHistoryTip(false)}
      duration={4000}
    >
      Reading saved ✦ Find all your past readings in the History tab.
    </Snackbar>
  );

  if (isLandscape) {
    return (
      <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
        {drawTip}
        <FlatList
          horizontal
          data={currentSpread}
          keyExtractor={(item) => item.card.name}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item, index }) => renderCard(item, index)}
        />
        {saveButton}
        {historySnackbar}
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {drawTip}
      <ScrollView contentContainerStyle={styles.verticalList}>
        {currentSpread.map(renderCard)}
      </ScrollView>
      {saveButton}
      {historySnackbar}
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
  tipWrapper: { alignItems: 'center', paddingTop: 12 },
});
