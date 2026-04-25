import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../constants';
import type { Place } from '../../types';

interface PlaceCardProps {
  place: Place;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onPress,
  onFavoritePress,
  isFavorite = false,
  variant = 'default',
}) => {
  if (variant === 'compact') {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: place.image }} style={styles.compactImage} />
        <View style={styles.compactOverlay} />
        <TouchableOpacity style={styles.compactFavorite} onPress={onFavoritePress}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={16}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <View style={styles.compactContent}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {place.name}
          </Text>
          <View style={styles.compactRating}>
            <Ionicons name="star" size={10} color={COLORS.gold} />
            <Text style={styles.compactRatingText}>{place.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: place.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.imageOverlay} />

        {/* Favorite Button */}
        {onFavoritePress && (
          <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? COLORS.tunisianRed : COLORS.white}
            />
          </TouchableOpacity>
        )}

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Ionicons
            name={getCategoryIcon(place.category)}
            size={12}
            color={COLORS.white}
          />
          <Text style={styles.categoryText}>{place.category}</Text>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={COLORS.gold} />
          <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {place.name}
          </Text>
          {place.nameAr && <Text style={styles.titleAr}>{place.nameAr}</Text>}
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={COLORS.gray500} />
          <Text style={styles.location} numberOfLines={1}>
            {place.location}, {place.region}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {place.shortDescription}
        </Text>

        <View style={styles.footer}>
          <View style={styles.metaInfo}>
            <Ionicons name="chatbubble-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.metaText}>{place.reviews} reviews</Text>
          </View>

          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{place.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Get icon for category
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    beach: 'sunny-outline',
    history: 'library-outline',
    culture: 'color-palette-outline',
    nature: 'leaf-outline',
    city: 'business-outline',
    desert: 'sunny-outline',
    religious: 'church-outline',
    market: 'storefront-outline',
  };
  return icons[category] || 'location-outline';
};

// Featured Place Card (larger with more details)
export const FeaturedPlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.95}>
      <Image source={{ uri: place.image }} style={styles.featuredImage} />
      <View style={styles.featuredOverlay} />

      <View style={styles.featuredHeader}>
        <View style={styles.featuredBadge}>
          <Ionicons name="star" size={14} color={COLORS.gold} />
          <Text style={styles.featuredBadgeText}>Featured</Text>
        </View>

        {onFavoritePress && (
          <TouchableOpacity style={styles.featuredFavorite} onPress={onFavoritePress}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{place.name}</Text>
        {place.nameAr && <Text style={styles.featuredTitleAr}>{place.nameAr}</Text>}

        <View style={styles.featuredMeta}>
          <View style={styles.featuredLocation}>
            <Ionicons name="location" size={14} color={COLORS.white} />
            <Text style={styles.featuredLocationText}>{place.location}</Text>
          </View>
          <View style={styles.featuredRating}>
            <Ionicons name="star" size={14} color={COLORS.gold} />
            <Text style={styles.featuredRatingText}>{place.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Default Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  imageContainer: {
    height: 200,
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
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tunisianRed,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    gap: 4,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  ratingText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
    flex: 1,
  },
  titleAr: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.gold,
    marginLeft: SPACING.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: 4,
  },
  location: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
    flex: 1,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
  },
  priceTag: {
    backgroundColor: COLORS.gold + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  priceText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.gold,
  },

  // Compact Card
  compactCard: {
    width: 150,
    height: 180,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SHADOWS.md,
  },
  compactImage: {
    width: '100%',
    height: '100%',
  },
  compactOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  compactFavorite: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactContent: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: SPACING.sm,
    right: SPACING.sm,
  },
  compactTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
    marginBottom: 2,
  },
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  compactRatingText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
  },

  // Featured Card
  featuredCard: {
    width: 300,
    height: 200,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SHADOWS.lg,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    gap: 4,
  },
  featuredBadgeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  featuredFavorite: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
  },
  featuredTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
  },
  featuredTitleAr: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.gold,
    marginTop: 2,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  featuredLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredLocationText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
  },
  featuredRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredRatingText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
  },
});

export default PlaceCard;