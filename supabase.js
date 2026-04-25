import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://tttflsxpkfmyrmjfmtjx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dGZsc3hwa2ZteXJtamZtdGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTIxMDIsImV4cCI6MjA5MjQ2ODEwMn0.cZ_tdl1MPLV_QWr5BfqPeP7FD_7aNNmB6VtHfuqMvm4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})