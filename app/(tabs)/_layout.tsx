import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, { active: string; inactive: string }> = {
    index: { active: 'compass', inactive: 'compass-outline' },
    favorites: { active: 'heart', inactive: 'heart-outline' },
    map: { active: 'map', inactive: 'map-outline' },
    profile: { active: 'person', inactive: 'person-outline' },
  };

  const icon = icons[name] || { active: 'circle', inactive: 'circle-outline' };

  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Ionicons
        name={(focused ? icon.active : icon.inactive) as any}
        size={24}
        color={focused ? COLORS.tunisianRed : COLORS.gray400}
      />
    </View>
  );
}

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: COLORS.tunisianRed,
        tabBarInactiveTintColor: COLORS.gray400,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
          tabBarLabelAr: 'استكشف',
          tabBarIcon: ({ focused }) => <TabBarIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: 'Saved',
          tabBarLabelAr: 'المفضلة',
          tabBarIcon: ({ focused }) => <TabBarIcon name="favorites" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: 'Map',
          tabBarLabelAr: 'الخريطة',
          tabBarIcon: ({ focused }) => <TabBarIcon name="map" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelAr: 'حسابي',
          tabBarIcon: ({ focused }) => <TabBarIcon name="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    height: 85,
    paddingBottom: SPACING.md,
    paddingTop: SPACING.sm,
    borderRadius: 24,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerFocused: {
    backgroundColor: COLORS.tunisianRed + '15',
  },
});