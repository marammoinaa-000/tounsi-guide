import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

// Environment variables - in production, use process.env or expo constants
const SUPABASE_URL = 'https://tttflsxpkfmyrmjfmtjx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dGZsc3hwa2ZteXJtamZtdGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTIxMDIsImV4cCI6MjA5MjQ2ODEwMn0.cZ_tdl1MPLV_QWr5BfqPeP7FD_7aNNmB6VtHfuqvm4';

// Create Supabase client
let supabaseClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  return supabaseClient;
};

export const supabase = getSupabaseClient();

// Helper to get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
};

// Helper to get session
export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export default supabase;