import { Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useTheme } from 'react-native-paper';
import { useTarotStore } from '../store/tarotStore';
import MenuScreen from '../screens/MenuScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CardDetailScreen from '../screens/CardDetailScreen';

export type RootStackParamList = {
  Tabs: undefined;
  CardDetail: undefined;
};

export type TabParamList = {
  Menu: undefined;
  OneCard: { spreadSize: 1 };
  ThreeCards: { spreadSize: 3 };
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function DarkModeToggle() {
  const theme = useTheme();
  const { isDark, toggleDark } = useTarotStore();
  return (
    <Pressable onPress={toggleDark} style={{ paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 18, color: theme.colors.onSurface }}>
        {isDark ? '☀️' : '🌙'}
      </Text>
    </Pressable>
  );
}

function TabNavigator() {
  const theme = useTheme();
  const headerRight = Platform.OS === 'web' ? () => <DarkModeToggle /> : undefined;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
        headerRight,
      }}
    >
      <Tab.Screen name="Menu" component={MenuScreen} options={{ title: 'Arcana Flux' }} />
      <Tab.Screen
        name="OneCard"
        component={ResultScreen}
        options={{ title: '1 Card' }}
        initialParams={{ spreadSize: 1 }}
      />
      <Tab.Screen
        name="ThreeCards"
        component={ResultScreen}
        options={{ title: '3 Cards' }}
        initialParams={{ spreadSize: 3 }}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.onSurface,
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{ title: 'Card Reading' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
