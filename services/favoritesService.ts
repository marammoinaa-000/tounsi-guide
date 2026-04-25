import { supabase } from './supabase';
import type { Favorite } from '../types';

export const favoritesService = {
  // Get user's favorites
  async getFavorites(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    return data || [];
  },

  // Get user's favorite place IDs
  async getFavoritePlaceIds(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('place_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching favorite IDs:', error);
      return [];
    }

    return (data || []).map(f => f.place_id);
  },

  // Check if place is favorited
  async isFavorite(userId: string, placeId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('place_id', placeId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  },

  // Add to favorites
  async addFavorite(userId: string, placeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        place_id: placeId,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error adding favorite:', error);
      return false;
    }

    return true;
  },

  // Remove from favorites
  async removeFavorite(userId: string, placeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('place_id', placeId);

    if (error) {
      console.error('Error removing favorite:', error);
      return false;
    }

    return true;
  },

  // Toggle favorite
  async toggleFavorite(userId: string, placeId: string): Promise<boolean> {
    const isFav = await this.isFavorite(userId, placeId);

    if (isFav) {
      return await this.removeFavorite(userId, placeId);
    } else {
      return await this.addFavorite(userId, placeId);
    }
  },

  // Get favorites count for user
  async getFavoritesCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      console.error('Error counting favorites:', error);
      return 0;
    }

    return count || 0;
  },
};

export default favoritesService;