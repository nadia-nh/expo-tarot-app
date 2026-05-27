import { View, Text, StyleSheet } from 'react-native';

export default function CardDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Card Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
