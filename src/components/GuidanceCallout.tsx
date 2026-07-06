import { useRef, useEffect } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { colors } from '../theme/colors';
import { fontFamilies } from '../theme/typography';

interface Props {
  text: string;
  onDismiss: () => void;
}

export default function GuidanceCallout({ text, onDismiss }: Props) {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface },
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) },
          ],
        },
      ]}
    >
      <Text style={styles.star}>✦</Text>
      <Text style={[styles.text, { color: theme.colors.onSurface, fontFamily: fontFamilies.light }]}>
        {text}
      </Text>
      <Pressable onPress={onDismiss} hitSlop={12} style={styles.dismiss}>
        <Text style={[styles.dismissText, { color: theme.colors.onSurfaceVariant }]}>✕</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: 380,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.softGold + '55',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 16,
  },
  star: {
    fontSize: 16,
    color: colors.softGold,
  },
  text: {
    flex: 1,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 19,
  },
  dismiss: {
    padding: 2,
  },
  dismissText: {
    fontSize: 13,
  },
});
