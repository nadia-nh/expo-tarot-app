import {
  Merriweather_300Light,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from '@expo-google-fonts/merriweather';

export const fonts = {
  Merriweather_300Light,
  Merriweather_400Regular,
  Merriweather_700Bold,
};

export const fontFamilies = {
  light:   'Merriweather_300Light',
  regular: 'Merriweather_400Regular',
  bold:    'Merriweather_700Bold',
};

export const typography = {
  headlineSmall: {
    fontFamily: fontFamilies.light,
    fontSize: 24,
    letterSpacing: 4,
  },
  labelSmall: {
    fontFamily: fontFamilies.light,
    fontSize: 12,
    letterSpacing: 2,
  },
  titleSmall: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    letterSpacing: 2,
  },
  titleMedium: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 2,
  },
  bodyMedium: {
    fontFamily: undefined as string | undefined,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  bodyLarge: {
    fontFamily: fontFamilies.regular,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
};
