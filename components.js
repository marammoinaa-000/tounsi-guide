// components.js - Reusable Components
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDatabase } from './context';
import { COLORS } from './data';
import { styles } from './styles';

const useFadeAnimation = (delay = 0) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const delayRef = useRef(delay);
  useEffect(() => { delayRef.current = delay; }, [delay]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    }, delayRef.current);
    return () => clearTimeout(timeout);
  }, [fadeAnim]);
  return fadeAnim;
};

export const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loadingLogo}>
      <Ionicons name="planet" size={48} color={COLORS.primary} />
    </View>
    <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 16 }} />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export const PlaceCard = ({ place, onPress, index = 0 }) => {
  const { isFavorite, toggleFavorite } = useDatabase();
  const isPlaceFavorite = isFavorite(place.id);
  const fadeAnim = useFadeAnimation(index * 100);
  return (
    <Animated.View style={[styles.cardWrapper, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
        <View style={styles.cardImageWrapper}>
          <Image source={{ uri: place.image }} style={styles.cardImage} resizeMode="cover" />
          <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(place.id)}>
            <Ionicons
              name={isPlaceFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isPlaceFavorite ? COLORS.primary : COLORS.white}
            />
          </TouchableOpacity>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={COLORS.black} />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={1}>{place.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.gray500} />
            <Text style={styles.cardLocation} numberOfLines={1}>{place.location}, {place.region}</Text>
          </View>
          <Text style={styles.cardDescription} numberOfLines={2}>{place.shortDescription}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.reviewsText}>{place.reviews} reviews</Text>
            <View style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>View</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const SmallPlaceCard = ({ place, onPress }) => {
  const { isFavorite, toggleFavorite } = useDatabase();
  const isPlaceFavorite = isFavorite(place.id);
  return (
    <TouchableOpacity style={styles.smallCard} onPress={onPress}>
      <Image source={{ uri: place.image }} style={styles.smallCardImage} />
      <View style={styles.smallCardOverlay} />
      <TouchableOpacity style={styles.smallFavoriteButton} onPress={() => toggleFavorite(place.id)}>
        <Ionicons name={isPlaceFavorite ? 'heart' : 'heart-outline'} size={16} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.smallCardContent}>
        <Text style={styles.smallCardTitle} numberOfLines={1}>{place.name}</Text>
        <View style={styles.smallCardRating}>
          <Ionicons name="star" size={10} color={COLORS.golden} />
          <Text style={styles.smallCardRatingText}>{place.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SectionHeader = ({ title, subtitle, action }) => (
  <View style={styles.sectionHeader}>
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {action && (
      <TouchableOpacity>
        <Text style={styles.sectionAction}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export const SearchBar = ({ value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
      <Ionicons name="search" size={20} color={isFocused ? COLORS.primary : COLORS.gray400} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search destinations..."
        placeholderTextColor={COLORS.gray400}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={18} color={COLORS.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const CategoryChip = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
    onPress={onPress}
  >
    <Ionicons name={category.icon} size={16} color={isSelected ? COLORS.white : COLORS.gray600} />
    <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextSelected]}>
      {category.label}
    </Text>
  </TouchableOpacity>
);

export const EmptyState = ({ icon, title, subtitle, action }) => (
  <View style={styles.emptyState}>
    <Ionicons name={icon} size={64} color={COLORS.gray300} />
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptySubtitle}>{subtitle}</Text>
    {action && (
      <TouchableOpacity style={styles.emptyButton} onPress={action.onPress}>
        <Text style={styles.emptyButtonText}>{action.label}</Text>
      </TouchableOpacity>
    )}
  </View>
);