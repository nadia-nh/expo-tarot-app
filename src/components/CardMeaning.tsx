import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { fontFamilies } from '../theme/typography';

interface Props {
  meaning: string;
  label?: string;
}

export default function CardMeaning({ meaning, label }: Props) {
  return (
    <>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Text style={styles.meaning}>{meaning}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 4,
    opacity: 0.7,
  },
  meaning: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
});
