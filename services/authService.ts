import { supabase } from './supabase';
import type { User } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export const authService = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  },

  // Sign up with email and password
  async signUp(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  },

  // Sign in with Google OAuth
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'tounsi-guide://auth-callback',
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, url: data.url };
  },

  // Sign in with Apple
  async signInWithApple() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'tounsi-guide://auth-callback',
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, url: data.url };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },

  // Get current session
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      avatarUrl: user.user_metadata?.avatar_url,
    };
  },

  // Send password reset email
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'tounsi-guide://reset-password',
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  // Update user metadata
  async updateUserMetadata(metadata: Record<string, any>) {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return data.subscription;
  },
};

export default authService;