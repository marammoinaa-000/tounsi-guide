import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../constants';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || SPACING.md }]}>
      <View style={styles.tabsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = getTabIcon(route.name, isFocused);

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tab, isFocused && styles.tabFocused]}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, isFocused && styles.iconContainerFocused]}>
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isFocused ? COLORS.tunisianRed : COLORS.gray500}
                />
              </View>
              <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {getTabLabel(route.name)}
              </Text>
              {isFocused && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const getTabIcon = (name: string, isFocused: boolean): string => {
  const icons: Record<string, { active: string; inactive: string }> = {
    index: { active: 'compass', inactive: 'compass-outline' },
    explore: { active: 'search', inactive: 'search-outline' },
    favorites: { active: 'heart', inactive: 'heart-outline' },
    map: { active: 'map', inactive: 'map-outline' },
    profile: { active: 'person', inactive: 'person-outline' },
  };

  const icon = icons[name];
  return isFocused ? icon?.active : icon?.inactive || 'circle';
};

const getTabLabel = (name: string): string => {
  const labels: Record<string, { en: string; ar: string }> = {
    index: { en: 'Explore', ar: 'استكشف' },
    explore: { en: 'Search', ar: 'بحث' },
    favorites: { en: 'Saved', ar: 'المفضلة' },
    map: { en: 'Map', ar: 'الخريطة' },
    profile: { en: 'Profile', ar: 'حسابي' },
  };

  return labels[name]?.en || name;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.sm,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    ...SHADOWS.xl,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    position: 'relative',
  },
  tabFocused: {
    // Additional styles when focused
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerFocused: {
    backgroundColor: COLORS.tunisianRed + '15',
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.gray500,
    marginTop: SPACING.xxs,
  },
  labelFocused: {
    color: COLORS.tunisianRed,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  indicator: {
    position: 'absolute',
    top: -4,
    width: 20,
    height: 3,
    backgroundColor: COLORS.tunisianRed,
    borderRadius: RADIUS.full,
  },
});

export default TabBar;