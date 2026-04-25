import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../constants';
import type { Place } from '../../types';

interface PlaceListItemProps {
  place: Place;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
}

export const PlaceListItem: React.FC<PlaceListItemProps> = ({
  place,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: place.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {place.name}
            </Text>
            {place.nameAr && (
              <Text style={styles.titleAr} numberOfLines={1}>
                {place.nameAr}
              </Text>
            )}
          </View>
          {onFavoritePress && (
            <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? COLORS.tunisianRed : COLORS.gray400}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color={COLORS.gray500} />
          <Text style={styles.location} numberOfLines={1}>
            {place.location}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.gold} />
            <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({place.reviews})</Text>
          </View>

          <Text style={styles.price}>{place.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Horizontal Place Card (for horizontal lists)
export const PlaceHorizontalCard: React.FC<PlaceListItemProps> = ({
  place,
  onPress,
  onFavoritePress,
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity style={styles.horizontalContainer} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: place.image }} style={styles.horizontalImage} />

      <View style={styles.horizontalOverlay} />

      <View style={styles.horizontalContent}>
        <View style={styles.horizontalHeader}>
          <View style={styles.horizontalBadge}>
            <Text style={styles.horizontalBadgeText}>{place.category}</Text>
          </View>
          {onFavoritePress && (
            <TouchableOpacity onPress={onFavoritePress} style={styles.horizontalFavorite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={18}
                color={COLORS.white}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.horizontalFooter}>
          <Text style={styles.horizontalTitle} numberOfLines={1}>
            {place.name}
          </Text>
          <View style={styles.horizontalMeta}>
            <Ionicons name="location" size={12} color={COLORS.white} />
            <Text style={styles.horizontalLocation}>{place.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // List Item
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
  },
  content: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  titleAr: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gold,
    marginTop: 2,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.xs,
  },
  location: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  reviews: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
  },
  price: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.gold,
  },

  // Horizontal Card
  horizontalContainer: {
    width: 280,
    height: 160,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginRight: SPACING.md,
    ...SHADOWS.md,
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
  },
  horizontalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  horizontalContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalBadge: {
    backgroundColor: COLORS.tunisianRed,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    borderRadius: RADIUS.full,
  },
  horizontalBadgeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  horizontalFavorite: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalFooter: {
    marginTop: 'auto',
  },
  horizontalTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  horizontalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  horizontalLocation: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    opacity: 0.9,
  },
});

export default PlaceListItem;