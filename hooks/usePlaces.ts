import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { placesService } from '../services/placesService';
import { favoritesService } from '../services/favoritesService';
import type { Place } from '../types';
import { STORAGE_KEYS } from '../constants';

interface PlacesContextType {
  places: Place[];
  filteredPlaces: Place[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  toggleFavorite: (placeId: string) => Promise<void>;
  isFavorite: (placeId: string) => boolean;
  refreshPlaces: () => Promise<void>;
  getPlaceById: (id: string) => Place | undefined;
}

export const usePlaces = (): PlacesContextType => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load places
  const loadPlaces = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await placesService.getPlaces();
      setPlaces(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load favorites from storage
  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  }, []);

  useEffect(() => {
    loadPlaces();
    loadFavorites();
  }, [loadPlaces, loadFavorites]);

  // Filter places based on search and category
  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      searchQuery === '' ||
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.nameAr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || selectedCategory === '' || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (placeId: string) => {
      const isFav = favorites.includes(placeId);
      const newFavorites = isFav
        ? favorites.filter((id) => id !== placeId)
        : [...favorites, placeId];

      setFavorites(newFavorites);

      try {
        await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
      } catch (err) {
        console.error('Error saving favorites:', err);
      }
    },
    [favorites]
  );

  // Check if place is favorite
  const isFavorite = useCallback(
    (placeId: string) => favorites.includes(placeId),
    [favorites]
  );

  // Refresh places
  const refreshPlaces = useCallback(async () => {
    await loadPlaces();
  }, [loadPlaces]);

  // Get place by ID
  const getPlaceById = useCallback(
    (id: string) => places.find((place) => place.id === id),
    [places]
  );

  return {
    places,
    filteredPlaces,
    favorites,
    isLoading,
    error,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    toggleFavorite,
    isFavorite,
    refreshPlaces,
    getPlaceById,
  };
};

export default usePlaces;