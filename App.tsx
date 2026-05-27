import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fonts } from './src/theme/typography';
import { lightTheme, darkTheme } from './src/theme/colors';
import AppNavigator from './src/navigation/AppNavigator';
import { useTarotStore } from './src/store/tarotStore';

export default function App() {
  const systemColorScheme = useColorScheme();
  const [fontsLoaded] = useFonts(fonts);
  const init = useTarotStore((s) => s.init);
  const isDark = useTarotStore((s) => s.isDark);

  // On native, follow the system color scheme.
  // On web, isDark is controlled by the in-app toggle.
  useEffect(() => {
    if (Platform.OS !== 'web') {
      useTarotStore.setState({ isDark: systemColorScheme === 'dark' });
    }
  }, [systemColorScheme]);

  useEffect(() => {
    init();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
