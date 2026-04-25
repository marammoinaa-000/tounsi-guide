import { supabase } from './supabase';
import type { Place, PlaceCreateInput, PlaceUpdateInput, PaginatedResponse } from '../types';

export const placesService = {
  // Get all places with optional filtering
  async getPlaces(options?: {
    category?: string;
    city?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Place>> {
    let query = supabase.from('places').select('*', { count: 'exact' });

    if (options?.category && options.category !== 'all') {
      query = query.eq('category', options.category);
    }

    if (options?.city) {
      query = query.eq('city', options.city);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,name_ar.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching places:', error);
      return { data: [], total: 0, page: 1, pageSize: options?.limit || 20, hasMore: false };
    }

    return {
      data: data || [],
      total: count || 0,
      page: Math.floor((options?.offset || 0) / (options?.limit || 20)) + 1,
      pageSize: options?.limit || 20,
      hasMore: (count || 0) > (options?.offset || 0) + (options?.limit || 20),
    };
  },

  // Get single place by ID
  async getPlaceById(placeId: string): Promise<Place | null> {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('id', placeId)
      .single();

    if (error) {
      console.error('Error fetching place:', error);
      return null;
    }

    return data;
  },

  // Get places by category
  async getPlacesByCategory(category: string, limit?: number): Promise<Place[]> {
    let query = supabase
      .from('places')
      .select('*')
      .eq('category', category)
      .order('rating', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching places by category:', error);
      return [];
    }

    return data || [];
  },

  // Get places by city
  async getPlacesByCity(city: string, limit?: number): Promise<Place[]> {
    let query = supabase
      .from('places')
      .select('*')
      .eq('city', city)
      .order('rating', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching places by city:', error);
      return [];
    }

    return data || [];
  },

  // Search places
  async searchPlaces(query: string, limit?: number): Promise<Place[]> {
    let supabaseQuery = supabase
      .from('places')
      .select('*')
      .or(`name.ilike.%${query}%,name_ar.ilike.%${query}%,description.ilike.%${query}%`)
      .order('rating', { ascending: false })
      .limit(limit || 20);

    const { data, error } = await supabaseQuery;

    if (error) {
      console.error('Error searching places:', error);
      return [];
    }

    return data || [];
  },

  // Get nearby places
  async getNearbyPlaces(lat: number, lng: number, radiusKm: number = 50): Promise<Place[]> {
    // Using PostGIS for distance calculation if available
    // Otherwise, we'll filter client-side
    const { data, error } = await supabase.rpc('get_nearby_places', {
      lat_param: lat,
      lng_param: lng,
      radius_km: radiusKm,
    });

    if (error) {
      console.error('Error fetching nearby places:', error);
      return [];
    }

    return data || [];
  },

  // Create new place (admin only)
  async createPlace(place: PlaceCreateInput): Promise<Place | null> {
    const { data, error } = await supabase
      .from('places')
      .insert({
        ...place,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating place:', error);
      return null;
    }

    return data;
  },

  // Update place (admin only)
  async updatePlace(updates: PlaceUpdateInput): Promise<Place | null> {
    const { id, ...rest } = updates;

    const { data, error } = await supabase
      .from('places')
      .update({
        ...rest,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating place:', error);
      return null;
    }

    return data;
  },

  // Delete place (admin only)
  async deletePlace(placeId: string): Promise<boolean> {
    const { error } = await supabase
      .from('places')
      .delete()
      .eq('id', placeId);

    if (error) {
      console.error('Error deleting place:', error);
      return false;
    }

    return true;
  },

  // Get popular places
  async getPopularPlaces(limit: number = 10): Promise<Place[]> {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .order('reviews', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching popular places:', error);
      return [];
    }

    return data || [];
  },

  // Get featured places
  async getFeaturedPlaces(limit: number = 10): Promise<Place[]> {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured places:', error);
      return [];
    }

    return data || [];
  },
};

export default placesService;