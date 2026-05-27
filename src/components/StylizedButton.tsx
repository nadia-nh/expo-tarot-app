import { StyleSheet, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  outlined?: boolean;
  style?: ViewStyle;
}

export default function StylizedButton({ label, onPress, disabled, outlined = true, style }: Props) {
  const theme = useTheme();
  return (
    <Button
      mode={outlined ? 'outlined' : 'contained'}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
      labelStyle={{ fontFamily: 'Merriweather_300Light', letterSpacing: 2 }}
      textColor={theme.colors.primary}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 8 },
});
