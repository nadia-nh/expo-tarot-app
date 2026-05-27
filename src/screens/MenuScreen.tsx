import { View, Text, StyleSheet } from 'react-native';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text>Menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
