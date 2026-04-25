import { useState, useEffect, useCallback } from 'react';
import * as ExpoLocation from 'expo-location';
import type { MapRegion } from '../types';
import { MAP_CONFIG } from '../constants';

interface LocationType {
  latitude: number;
  longitude: number;
}

interface UseLocationReturn {
  location: LocationType | null;
  region: MapRegion;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationType | null>;
  watchLocation: () => Promise<void>;
  stopWatchingLocation: () => void;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [watchSubscription, setWatchSubscription] = useState<ExpoLocation.LocationSubscription | null>(null);

  const region: MapRegion = {
    latitude: location?.latitude || MAP_CONFIG.DEFAULT_REGION.latitude,
    longitude: location?.longitude || MAP_CONFIG.DEFAULT_REGION.longitude,
    latitudeDelta: MAP_CONFIG.DEFAULT_REGION.latitudeDelta,
    longitudeDelta: MAP_CONFIG.DEFAULT_REGION.longitudeDelta,
  };

  // Request permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);
      return granted;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }, []);

  // Get current location
  const getCurrentLocation = useCallback(async (): Promise<LocationType | null> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          setError('Location permission denied');
          return null;
        }
      }

      const currentLocation = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Balanced,
      });

      const loc = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(loc);
      return loc;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [hasPermission, requestPermission]);

  // Watch location
  const watchLocation = useCallback(async () => {
    try {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) return;
      }

      // Stop existing subscription
      if (watchSubscription) {
        watchSubscription.remove();
      }

      const subscription = await ExpoLocation.watchPositionAsync(
        {
          accuracy: ExpoLocation.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        }
      );

      setWatchSubscription(subscription);
    } catch (err: any) {
      setError(err.message);
    }
  }, [hasPermission, requestPermission, watchSubscription]);

  // Stop watching location
  const stopWatchingLocation = useCallback(() => {
    if (watchSubscription) {
      watchSubscription.remove();
      setWatchSubscription(null);
    }
  }, [watchSubscription]);

  // Check permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await ExpoLocation.getForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    checkPermission();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchSubscription) {
        watchSubscription.remove();
      }
    };
  }, [watchSubscription]);

  return {
    location,
    region,
    isLoading,
    error,
    hasPermission,
    requestPermission,
    getCurrentLocation,
    watchLocation,
    stopWatchingLocation,
  };
};

export default useLocation;