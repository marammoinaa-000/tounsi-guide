import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePlaces } from '../../hooks/usePlaces';
import { useLocation } from '../../hooks/useLocation';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, MAP_CONFIG } from '../../constants';
import type { Place, MapMarker } from '../../types';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const { places, toggleFavorite, isFavorite } = usePlaces();
  const {
    location,
    region,
    isLoading: locationLoading,
    hasPermission,
    requestPermission,
    getCurrentLocation,
  } = useLocation();

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showUserLocation, setShowUserLocation] = useState(false);

  // Request permission on mount
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  // Convert places to markers
  const markers: MapMarker[] = places.map((place) => ({
    id: place.id,
    coordinate: {
      lat: place.coordinates.lat,
      lng: place.coordinates.lng,
    },
    title: place.name,
    description: place.shortDescription,
    category: place.category,
    imageUrl: place.image,
  }));

  const handleMarkerPress = (marker: MapMarker) => {
    const place = places.find((p) => p.id === marker.id);
    if (place) {
      setSelectedPlace(place);
    }
  };

  const handleViewDetails = () => {
    if (selectedPlace) {
      router.push(`/place/detail?placeId=${selectedPlace.id}`);
    }
  };

  const handleLocateMe = async () => {
    const loc = await getCurrentLocation();
    if (loc && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setShowUserLocation(true);
    }
  };

  const getMarkerColor = (category: string): string => {
    const colors: Record<string, string> = {
      beach: '#3498DB',
      history: '#9B59B6',
      culture: COLORS.gold,
      nature: '#27AE60',
      city: COLORS.tunisianRed,
      desert: '#D35400',
      religious: '#8E44AD',
      market: '#E67E22',
    };
    return colors[category] || COLORS.tunisianRed;
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: MAP_CONFIG.DEFAULT_REGION.latitude,
          longitude: MAP_CONFIG.DEFAULT_REGION.longitude,
          latitudeDelta: MAP_CONFIG.DEFAULT_REGION.latitudeDelta,
          longitudeDelta: MAP_CONFIG.DEFAULT_REGION.longitudeDelta,
        }}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={false}
        showsCompass={false}
        mapType="standard"
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.coordinate.lat,
              longitude: marker.coordinate.lng,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          >
            <View style={[styles.marker, { backgroundColor: getMarkerColor(marker.category) }]}>
              <Ionicons name="location" size={24} color={COLORS.white} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Header */}
      <View style={[styles.header, { top: insets.top + SPACING.md }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Explore Map</Text>
          <Text style={styles.headerSubtitle}>الخريطة</Text>
        </View>
      </View>

      {/* Locate Me Button */}
      <TouchableOpacity
        style={[styles.locateButton, { bottom: 120 + insets.bottom }]}
        onPress={handleLocateMe}
        disabled={locationLoading}
      >
        {locationLoading ? (
          <ActivityIndicator size="small" color={COLORS.tunisianRed} />
        ) : (
          <Ionicons name="locate" size={24} color={COLORS.tunisianRed} />
        )}
      </TouchableOpacity>

      {/* Selected Place Card */}
      {selectedPlace && (
        <TouchableOpacity
          style={[styles.placeCard, { bottom: 120 + insets.bottom }]}
          onPress={handleViewDetails}
          activeOpacity={0.95}
        >
          <View style={styles.placeCardContent}>
            <View style={styles.placeCardImage}>
              <View style={[styles.categoryDot, { backgroundColor: getMarkerColor(selectedPlace.category) }]} />
            </View>
            <View style={styles.placeCardInfo}>
              <Text style={styles.placeCardTitle}>{selectedPlace.name}</Text>
              <View style={styles.placeCardMeta}>
                <Ionicons name="star" size={14} color={COLORS.gold} />
                <Text style={styles.placeCardRating}>{selectedPlace.rating}</Text>
                <Text style={styles.placeCardLocation}>• {selectedPlace.location}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => {
                toggleFavorite(selectedPlace.id);
              }}
            >
              <Ionicons
                name={isFavorite(selectedPlace.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(selectedPlace.id) ? COLORS.tunisianRed : COLORS.gray400}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      )}

      {/* Bottom Tab Bar Spacer */}
      <View style={{ height: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    width: width,
    height: height,
  },
  header: {
    position: 'absolute',
    left: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gold,
  },
  marker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  locateButton: {
    position: 'absolute',
    right: SPACING.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  placeCard: {
    position: 'absolute',
    left: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  placeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  placeCardImage: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeCardInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  placeCardTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  placeCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xxs,
    gap: 4,
  },
  placeCardRating: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text,
  },
  placeCardLocation: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  favoriteButton: {
    padding: SPACING.sm,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tunisianRed,
    paddingVertical: SPACING.md,
    gap: SPACING.xs,
  },
  viewButtonText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.white,
  },
});