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

export const typography = {
  headlineSmall: {
    fontFamily: 'Merriweather_300Light',
    fontSize: 24,
    letterSpacing: 4,
  },
  labelSmall: {
    fontFamily: 'Merriweather_300Light',
    fontSize: 12,
    letterSpacing: 2,
  },
  titleSmall: {
    fontFamily: 'Merriweather_700Bold',
    fontSize: 18,
    letterSpacing: 2,
  },
  titleMedium: {
    fontFamily: 'Merriweather_700Bold',
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
    fontFamily: 'Merriweather_400Regular',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
};
