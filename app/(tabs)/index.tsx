import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { usePlaces } from '../../hooks/usePlaces';
import { PlaceCard, FeaturedPlaceCard } from '../../components/cards';
import { SearchBar, CategoryList, EmptyState } from '../../components/ui';
import { SectionHeader } from '../../components/layout';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, CATEGORIES } from '../../constants';

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const {
    filteredPlaces,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    toggleFavorite,
    isFavorite,
    refreshPlaces,
    getPlaceById,
  } = usePlaces();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshPlaces();
    setRefreshing(false);
  }, [refreshPlaces]);

  const featuredPlaces = filteredPlaces.slice(0, 3);
  const allPlaces = filteredPlaces;

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/detail?placeId=${placeId}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.userName}>{user?.name || 'Explorer'}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile/edit')}
          >
            <Ionicons name="person" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search destinations..."
        />

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <CategoryList
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <SectionHeader
            title="Featured"
            titleAr="المميزة"
            subtitle={`${featuredPlaces.length} places`}
          />
          <FlatList
            horizontal
            data={featuredPlaces}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <FeaturedPlaceCard
                place={item}
                onPress={() => handlePlacePress(item.id)}
                onFavoritePress={() => toggleFavorite(item.id)}
                isFavorite={isFavorite(item.id)}
              />
            )}
          />
        </View>

        {/* All Places */}
        <View style={styles.section}>
          <SectionHeader
            title="All Places"
            titleAr="جميع الأماكن"
            subtitle={`${allPlaces.length} destinations`}
          />
          {allPlaces.length === 0 ? (
            <EmptyState
              icon="location-outline"
              title="No places found"
              titleAr="لم يتم العثور على أماكن"
              subtitle="Try adjusting your search or filters"
              actionLabel="Clear filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            />
          ) : (
            allPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onPress={() => handlePlacePress(place.id)}
                onFavoritePress={() => toggleFavorite(place.id)}
                isFavorite={isFavorite(place.id)}
              />
            ))
          )}
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.tunisianRed,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  userName: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.md,
  },
  categoriesSection: {
    marginVertical: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  horizontalList: {
    paddingHorizontal: SPACING.md,
  },
});

import { TouchableOpacity } from 'react-native';