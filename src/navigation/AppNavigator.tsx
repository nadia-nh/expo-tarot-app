import { Platform, Pressable, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontFamilies } from '../theme/typography';
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
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: 64,
          paddingBottom: 8,
          paddingTop: 4,
          borderTopColor: theme.colors.outlineVariant,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.light,
          fontSize: 11,
          letterSpacing: 0.5,
        },
        headerStyle: { backgroundColor: theme.colors.surface, height: 72 },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: fontFamilies.light,
          fontSize: 20,
          letterSpacing: 2,
          color: theme.colors.onSurface,
        },
        headerTintColor: theme.colors.onSurface,
        headerRight,
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
            Menu: 'moon-waning-crescent',
            OneCard: 'cards-outline',
            ThreeCards: 'cards',
            History: 'history',
          };
          return (
            <View style={{
              paddingHorizontal: 16,
              paddingVertical: 4,
              borderRadius: 16,
              marginBottom: 4,
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: focused ? theme.colors.primaryContainer : 'transparent',
            }}>
              <MaterialCommunityIcons
                name={icons[route.name]}
                size={size}
                color={color}
                style={route.name === 'Menu' ? { marginLeft: 4 } : undefined}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: 'Arcana Flux Tarot',
          tabBarLabel: 'Menu',
          headerTitleStyle: {
            fontFamily: fontFamilies.light,
            fontSize: 24,
            letterSpacing: 4,
            color: theme.colors.onSurface,
          },
        }}
      />
      <Tab.Screen
        name="OneCard"
        component={ResultScreen}
        options={{ title: 'Your Card', tabBarLabel: '1 Card' }}
        initialParams={{ spreadSize: 1 }}
      />
      <Tab.Screen
        name="ThreeCards"
        component={ResultScreen}
        options={{ title: 'Your Spread', tabBarLabel: '3 Cards' }}
        initialParams={{ spreadSize: 3 }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'Tarot History', tabBarLabel: 'History' }}
      />
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
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: fontFamilies.light,
            fontSize: 20,
            letterSpacing: 2,
          },
          headerTintColor: theme.colors.onSurface,
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{ title: 'Card Reading' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
