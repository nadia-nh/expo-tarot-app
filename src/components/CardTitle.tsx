import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  name: string;
  isReversed: boolean;
}

export default function CardTitle({ name, isReversed }: Props) {
  return (
    <Text style={styles.title} variant="titleMedium">
      {name}
      {isReversed ? ' (Reversed)' : ''}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Merriweather_700Bold',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 2,
  },
});
