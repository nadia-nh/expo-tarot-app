import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
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
  OneCard: undefined;
  ThreeCards: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
      }}
    >
      <Tab.Screen name="Menu" component={MenuScreen} options={{ title: 'Arcana Flux' }} />
      <Tab.Screen name="OneCard" component={ResultScreen} options={{ title: '1 Card' }} />
      <Tab.Screen name="ThreeCards" component={ResultScreen} options={{ title: '3 Cards' }} />
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
        <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{ title: 'Card' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
