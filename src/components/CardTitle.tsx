import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { fontFamilies } from '../theme/typography';

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
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 2,
  },
});
