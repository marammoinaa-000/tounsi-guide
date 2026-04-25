import { supabase } from './supabase';
import type { Profile } from '../types';

export const profileService = {
  // Get user profile
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, profile: data };
  },

  // Create user profile
  async createProfile(userId: string, profile: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        ...profile,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, profile: data };
  },

  // Upload avatar to storage
  async uploadAvatar(userId: string, fileUri: string) {
    try {
      // Get file extension
      const extension = fileUri.split('.').pop() || 'jpg';
      const filePath = `${userId}/avatar.${extension}`;

      // Read file
      const response = await fetch(fileUri);
      const blob = await response.blob();

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          contentType: `image/${extension}`,
          upsert: true,
        });

      if (uploadError) {
        return { success: false, error: uploadError.message };
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      await this.updateProfile(userId, { avatarUrl: urlData.publicUrl });

      return { success: true, url: urlData.publicUrl };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Delete avatar
  async deleteAvatar(userId: string) {
    const filePath = `${userId}/avatar.jpg`;

    const { error } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (error) {
      return { success: false, error: error.message };
    }

    // Update profile
    await this.updateProfile(userId, { avatarUrl: undefined });

    return { success: true };
  },

  // Get public avatar URL
  getAvatarUrl(userId: string, filename?: string) {
    if (!filename) return null;
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${userId}/${filename}`);
    return data.publicUrl;
  },
};

export default profileService;