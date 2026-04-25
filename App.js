import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { DatabaseProvider, AuthProvider, useAuth } from './context';
import { COLORS } from './data';
import { styles } from './styles';
import { LoadingScreen } from './components';

import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  FavoritesScreen,
  MapScreen,
  DetailScreen,
} from './screens';

// ========== NAVIGATORS ==========
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ========== AUTH STACK ==========
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// ========== BOTTOM TABS ==========
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray400,

      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Home: focused ? 'compass' : 'compass-outline',
          Favorites: focused ? 'heart' : 'heart-outline',
          Map: focused ? 'map' : 'map-outline',
        };

        return (
          <Ionicons
            name={icons[route.name]}
            size={size}
            color={color}
          />
        );
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Explore' }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{ title: 'Saved' }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{ title: 'Map' }}
    />
  </Tab.Navigator>
);

// ========== ROOT STACK ==========
const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{ animation: 'slide_from_right' }}
    />
  </Stack.Navigator>
);

// ========== APP NAVIGATION ==========
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return user ? <RootStack /> : <AuthStack />;
};

// ========== APP ==========
export default function App() {
  return (
    <DatabaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </DatabaseProvider>
  );
}