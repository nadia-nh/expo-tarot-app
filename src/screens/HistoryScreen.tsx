import { Animated, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import { useTarotStore } from '../store/tarotStore';
import { DrawnCard } from '../domain/TarotCard';
import { ReadingWithCards } from '../data/tarotDao';
import CardImage from '../components/CardImage';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface ReadingItemProps {
  item: ReadingWithCards;
  onDeleteSwipe: (id: number) => void;
  onCardPress: (card: DrawnCard) => void;
  resolveCard: (name: string, isReversed: boolean) => DrawnCard;
}

function ReadingItem({ item, onDeleteSwipe, onCardPress, resolveCard }: ReadingItemProps) {
  const theme = useTheme();

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.deleteAction, { backgroundColor: theme.colors.error, opacity }]}>
        <Text style={{ color: theme.colors.onError, fontWeight: 'bold' }}>Delete</Text>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => onDeleteSwipe(item.reading.readingId)}
    >
      <Surface style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
        <View style={styles.header}>
          <Text style={[styles.spreadType, { fontFamily: 'Merriweather_700Bold' }]}>
            {item.reading.spreadType === 'ThreeCardDraw' ? '3 Card Draw' : '1 Card Draw'}
          </Text>
          <Text style={{ opacity: 0.6, fontSize: 12 }}>{formatDate(item.reading.timestamp)}</Text>
        </View>
        <View style={styles.cardsRow}>
          {item.cards.map((c) => {
            const drawn = resolveCard(c.name, c.isReversed === 1);
            return (
              <Pressable key={c.cardId} onPress={() => onCardPress(drawn)}>
                <CardImage cardName={c.name} isRevealed size={60} />
              </Pressable>
            );
          })}
        </View>
      </Surface>
    </Swipeable>
  );
}

export default function HistoryScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const {
    readingHistory,
    pendingDeletionId,
    scheduleDeletion,
    cancelDeletion,
    confirmDeletion,
    selectCard,
    resolveCardFromHistory,
  } = useTarotStore();

  const handleCardPress = (card: DrawnCard) => {
    selectCard(card);
    navigation.navigate('CardDetail');
  };

  if (readingHistory.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: theme.colors.background }]}>
        <Text style={{ opacity: 0.3, fontSize: 64 }}>☽</Text>
        <Text
          style={{
            color: theme.colors.onBackground,
            fontFamily: 'Merriweather_300Light',
            letterSpacing: 3,
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          No readings saved yet
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={readingHistory}
        keyExtractor={(item) => String(item.reading.readingId)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <ReadingItem
            item={item}
            onDeleteSwipe={scheduleDeletion}
            onCardPress={handleCardPress}
            resolveCard={resolveCardFromHistory}
          />
        )}
      />
      <DeleteConfirmationDialog
        visible={pendingDeletionId != null}
        onConfirm={confirmDeletion}
        onDismiss={cancelDeletion}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { padding: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  card: { borderRadius: 12, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  spreadType: { fontSize: 16 },
  cardsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginLeft: 8,
  },
});
