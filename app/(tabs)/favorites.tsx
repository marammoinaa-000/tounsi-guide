import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePlaces } from '../../hooks/usePlaces';
import { PlaceCard, PlaceListItem } from '../../components/cards';
import { SearchBar, EmptyState } from '../../components/ui';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../../constants';

export default function FavoritesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    places,
    favorites,
    toggleFavorite,
    isFavorite,
  } = usePlaces();

  // Get favorite places
  const favoritePlaces = places.filter((place) => favorites.includes(place.id));

  const handlePlacePress = (placeId: string) => {
    router.push(`/place/detail?placeId=${placeId}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>تونسي كير</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favoritePlaces.length === 0 ? (
          <EmptyState
            icon="heart-outline"
            title="No Favorites Yet"
            titleAr="لا توجد مفضلات بعد"
            subtitle="Start exploring and save your favorite places"
            actionLabel="Explore Places"
            onAction={() => router.push('/')}
          />
        ) : (
          <>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="heart" size={24} color={COLORS.tunisianRed} />
                <Text style={styles.statNumber}>{favoritePlaces.length}</Text>
                <Text style={styles.statLabel}>Saved Places</Text>
              </View>
            </View>

            <View style={styles.listSection}>
              {favoritePlaces.map((place) => (
                <PlaceListItem
                  key={place.id}
                  place={place}
                  onPress={() => handlePlacePress(place.id)}
                  onFavoritePress={() => toggleFavorite(place.id)}
                  isFavorite={isFavorite(place.id)}
                />
              ))}
            </View>
          </>
        )}

        {/* Bottom Padding */}
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
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gold,
    marginTop: SPACING.xxs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    flexGrow: 1,
  },
  statsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSize.display,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.tunisianRed,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xxs,
  },
  listSection: {
    gap: SPACING.sm,
  },
});