import { supabase } from './supabase';
import type { Review, ReviewCreateInput, PaginatedResponse } from '../types';

export const reviewsService = {
  // Get reviews for a place
  async getPlaceReviews(
    placeId: string,
    options?: {
      limit?: number;
      offset?: number;
      sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest';
    }
  ): Promise<PaginatedResponse<Review>> {
    let query = supabase
      .from('reviews')
      .select('*, user:profiles(name, avatar_url)')
      .eq('place_id', placeId);

    // Apply sorting
    switch (options?.sortBy) {
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'highest':
        query = query.order('rating', { ascending: false });
        break;
      case 'lowest':
        query = query.order('rating', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 20) - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching reviews:', error);
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

  // Get user's reviews
  async getUserReviews(userId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, place:places(name, image)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user reviews:', error);
      return [];
    }

    return data || [];
  },

  // Create a review
  async createReview(userId: string, review: ReviewCreateInput): Promise<Review | null> {
    // Check if user already reviewed this place
    const existing = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('place_id', review.placeId)
      .single();

    if (existing.data) {
      console.error('User already reviewed this place');
      return null;
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: userId,
        place_id: review.placeId,
        rating: review.rating,
        comment: review.comment,
        created_at: new Date().toISOString(),
      })
      .select('*, user:profiles(name, avatar_url)')
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return null;
    }

    return data;
  },

  // Update a review
  async updateReview(
    reviewId: string,
    userId: string,
    updates: { rating?: number; comment?: string }
  ): Promise<Review | null> {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', reviewId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating review:', error);
      return null;
    }

    return data;
  },

  // Delete a review
  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting review:', error);
      return false;
    }

    return true;
  },

  // Get place's average rating
  async getPlaceRating(placeId: string): Promise<{ average: number; count: number }> {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('place_id', placeId);

    if (error) {
      console.error('Error fetching place rating:', error);
      return { average: 0, count: 0 };
    }

    if (!data || data.length === 0) {
      return { average: 0, count: 0 };
    }

    const sum = data.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: sum / data.length,
      count: data.length,
    };
  },

  // Get user's review for a place
  async getUserReviewForPlace(userId: string, placeId: string): Promise<Review | null> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('place_id', placeId)
      .single();

    if (error) {
      return null;
    }

    return data;
  },
};

export default reviewsService;