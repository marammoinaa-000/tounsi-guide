import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePlaces } from '../../hooks/usePlaces';
import { Button } from '../../components/ui';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../../constants';

export default function PlaceDetailScreen() {
  const router = useRouter();
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const insets = useSafeAreaInsets();
  const { getPlaceById, toggleFavorite, isFavorite } = usePlaces();

  const place = placeId ? getPlaceById(placeId) : null;

  if (!place) {
    return (
      <View style={styles.container}>
        <View style={styles.notFound}>
          <Ionicons name="location-outline" size={64} color={COLORS.gray300} />
          <Text style={styles.notFoundTitle}>Place not found</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  const handleCall = () => {
    if (place.phone) {
      // Open phone app
    }
  };

  const handleDirections = () => {
    // Open maps app with directions
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Header */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.image }} style={styles.image} />
          <View style={styles.imageOverlay} />

          {/* Back Button */}
          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + SPACING.md }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(place.id)}
          >
            <Ionicons
              name={isFavorite(place.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite(place.id) ? COLORS.tunisianRed : COLORS.text}
            />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Category & Title */}
          <View style={styles.headerSection}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{place.category}</Text>
            </View>
            <Text style={styles.title}>{place.name}</Text>
            {place.nameAr && <Text style={styles.titleAr}>{place.nameAr}</Text>}

            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color={COLORS.gray500} />
              <Text style={styles.locationText}>{place.location}, {place.region}</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={18} color={COLORS.gold} />
              <Text style={styles.ratingValue}>{place.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.reviewsText}>({place.reviews} reviews)</Text>
          </View>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={24} color={COLORS.tunisianRed} />
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{place.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="pricetag-outline" size={24} color={COLORS.tunisianRed} />
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>{place.price}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={24} color={COLORS.tunisianRed} />
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>~45 km</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{place.description}</Text>
          </View>

          {/* Features */}
          {place.features && place.features.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresGrid}>
                {place.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Opening Hours */}
          {place.openingHours && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Opening Hours</Text>
              <View style={styles.hoursRow}>
                <Ionicons name="time-outline" size={18} color={COLORS.gold} />
                <Text style={styles.hoursText}>{place.openingHours}</Text>
              </View>
            </View>
          )}

          {/* Bottom Padding */}
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + SPACING.md }]}>
        <View style={styles.actionBarContent}>
          {place.phone && (
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={24} color={COLORS.tunisianRed} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.directionsButton} onPress={handleDirections}>
            <Ionicons name="navigate-outline" size={20} color={COLORS.white} />
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color={COLORS.tunisianRed} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    position: 'absolute',
    left: SPACING.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: SPACING.md,
    top: 200,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    right: SPACING.md + 52,
    top: 200,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.lg,
  },
  headerSection: {
    marginBottom: SPACING.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.tunisianRed,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.display,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  titleAr: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.gold,
    marginBottom: SPACING.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gray500,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  ratingValue: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  reviewsText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gray500,
    marginLeft: SPACING.sm,
  },
  quickInfo: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
    marginTop: 2,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  hoursText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.md,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  actionButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tunisianRed,
    marginHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    gap: SPACING.sm,
  },
  directionsText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  notFoundTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
    marginVertical: SPACING.lg,
  },
});