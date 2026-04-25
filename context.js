/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOURIST_PLACES } from './data';
import 'react-native-url-polyfill/auto'

// Supabase client (inlined to avoid module resolution issues in Expo Snack)
import { supabase } from './supabase'
// ============== DATABASE CONTEXT ==============
const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [places] = useState(TOURIST_PLACES);
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const favData = await AsyncStorage.getItem('favorites');
      const recentData = await AsyncStorage.getItem('recentlyViewed');
      if (favData) setFavorites(JSON.parse(favData));
      if (recentData) setRecentlyViewed(JSON.parse(recentData));
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const isFavorite = useCallback((placeId) => favorites.includes(placeId), [favorites]);

  const toggleFavorite = useCallback(async (placeId) => {
    const newFavorites = favorites.includes(placeId)
      ? favorites.filter(id => id !== placeId)
      : [...favorites, placeId];
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  }, [favorites]);

  const addToRecentlyViewed = useCallback(async (placeId) => {
    const filtered = recentlyViewed.filter(id => id !== placeId);
    const newRecent = [placeId, ...filtered].slice(0, 10);
    setRecentlyViewed(newRecent);
    await AsyncStorage.setItem('recentlyViewed', JSON.stringify(newRecent));
  }, [recentlyViewed]);

  return (
    <DatabaseContext.Provider value={{ places, favorites, recentlyViewed, isFavorite, toggleFavorite, addToRecentlyViewed }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDatabase must be used within DatabaseProvider');
  return context;
};

// ============== AUTH CONTEXT ==============
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(setLoading);

  useEffect(() => { loadingRef.current = setLoading; }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email,
        });
      }
      loadingRef.current(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email,
        });
      } else {
        setUser(null);
      }
      loadingRef.current(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, message: error.message };
      return { success: true };
    } catch {
      return { success: false, message: 'Connection error' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Account created! Check your email.' };
    } catch {
      return { success: false, message: 'Registration error' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};