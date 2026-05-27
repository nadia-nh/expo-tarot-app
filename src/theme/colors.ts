import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

// === Primary Palettes ===
const MysticPurple = '#4A148C';
const MossGreen = '#1B5E20';
const LavenderText = '#D1C4E9';

// === Utility ===
const SoftGold = '#D4AF37';
const PureWhite = '#FFFFFF';
const MidnightBlack = '#000000';

// === Light Mode (Zen Cream) ===
const LightBackground = '#FFFDF5';
const LightSurface = '#F8F4EA';
const LightOnSurface = '#211E16';

// === Dark Mode (Obsidian Arcana) ===
const DarkBackground = '#0E051A';
const DarkSurface = '#000D04';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: MysticPurple,
    onPrimary: PureWhite,
    primaryContainer: '#EDE7F6',
    onPrimaryContainer: MysticPurple,
    secondary: MossGreen,
    onSecondary: PureWhite,
    secondaryContainer: LightSurface,
    onSecondaryContainer: LightOnSurface,
    background: LightBackground,
    onBackground: LightOnSurface,
    surface: PureWhite,
    onSurface: LightOnSurface,
    surfaceVariant: LightSurface,
    onSurfaceVariant: MysticPurple,
    outline: '#E0D9C8',
    outlineVariant: '#E0D9C8',
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level0: 'transparent',
      level1: LightSurface,
      level2: LightSurface,
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: LavenderText,
    onPrimary: DarkBackground,
    primaryContainer: '#2D1B5E',
    onPrimaryContainer: LavenderText,
    secondary: MossGreen,
    onSecondary: PureWhite,
    background: DarkBackground,
    onBackground: LavenderText,
    surface: MidnightBlack,
    onSurface: LavenderText,
    surfaceVariant: DarkSurface,
    onSurfaceVariant: PureWhite,
    outline: 'rgba(255,255,255,0.3)',
    outlineVariant: 'rgba(255,255,255,0.1)',
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level0: 'transparent',
      level1: DarkSurface,
      level2: DarkSurface,
    },
  },
};

export const colors = {
  mysticPurple: MysticPurple,
  mossGreen: MossGreen,
  lavenderText: LavenderText,
  softGold: SoftGold,
  pureWhite: PureWhite,
  midnightBlack: MidnightBlack,
  lightBackground: LightBackground,
  lightSurface: LightSurface,
  lightOnSurface: LightOnSurface,
  darkBackground: DarkBackground,
  darkSurface: DarkSurface,
};
