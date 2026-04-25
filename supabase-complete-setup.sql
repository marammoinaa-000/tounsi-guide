// ===============================================
// TOUNSI GUIDE - COMPLETE SUPABASE SETUP
// ===============================================
// Run this SQL in your Supabase SQL Editor
// ===============================================

-- ============== ENABLE EXTENSIONS ==============
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============== CREATE TABLES ==============

-- 1. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  bio TEXT,
  city TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Places table
CREATE TABLE IF NOT EXISTS places (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT NOT NULL,
  short_description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  region TEXT NOT NULL,
  city TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  price TEXT,
  duration TEXT,
  image TEXT,
  images TEXT[],
  features TEXT[],
  phone TEXT,
  website TEXT,
  opening_hours TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, place_id)
);

-- 5. Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, place_id)
);

-- ============== ROW LEVEL SECURITY ==============

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- ============== PROFILES POLICIES ==============
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============== PLACES POLICIES ==============
CREATE POLICY "Places are viewable by everyone"
  ON places FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert places"
  ON places FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update places they created"
  ON places FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can delete places they created"
  ON places FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============== FAVORITES POLICIES ==============
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============== REVIEWS POLICIES ==============
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ============== FUNCTIONS ==============

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get nearby places using PostGIS
CREATE OR REPLACE FUNCTION public.get_nearby_places(
  lat_param DOUBLE PRECISION,
  lng_param DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 50
)
RETURNS SETOF places AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM places
  WHERE (
    6371 * acos(
      cos(radians(lat_param)) * cos(radians(latitude)) *
      cos(radians(longitude) - radians(lng_param)) +
      sin(radians(lat_param)) * sin(radians(latitude))
    )
  ) <= radius_km
  ORDER BY rating DESC;
END;
$$ LANGUAGE plpgsql;

-- ============== STORAGE ==============

-- Create storage bucket for avatars (run in Storage dashboard or via SQL)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for place images
INSERT INTO storage.buckets (id, name, public)
VALUES ('places', 'places', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (name.split('/'))[1]);

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (name.split('/'))[1]);

-- Storage policies for places
CREATE POLICY "Place images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'places');

CREATE POLICY "Authenticated users can upload place images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'places' AND auth.role() = 'authenticated');

-- ============== SEED DATA ==============

-- Insert sample categories
INSERT INTO categories (name, name_ar, icon, color) VALUES
  ('Beaches', 'الشواطئ', 'sunny-outline', '#3498DB'),
  ('Historical', 'تاريخية', 'library-outline', '#9B59B6'),
  ('Cultural', 'ثقافية', 'color-palette-outline', '#E8B84B'),
  ('Nature', 'طبيعة', 'leaf-outline', '#27AE60'),
  ('Cities', 'مدن', 'business-outline', '#E74C3C'),
  ('Desert', 'صحراء', 'sunny-outline', '#D35400'),
  ('Religious', 'دينية', 'church-outline', '#8E44AD'),
  ('Markets', 'أسواق', 'storefront-outline', '#E67E22')
ON CONFLICT DO NOTHING;

-- Insert sample places
INSERT INTO places (
  name, name_ar, description, short_description, category,
  location, region, city, latitude, longitude, rating, reviews,
  price, duration, image, features, is_featured
) VALUES
  (
    'Sidi Bou Said',
    'سيدي بوسعيد',
    'Village pittoresque aux maisons bleu et blanc dominant la mer Méditerranée. Un des sites les plus photographiés de Tunisie.',
    'Iconic blue and white village above the Mediterranean.',
    'culture',
    'Tunis', 'Grand Tunis', 'sidi-bou-said',
    36.8705, 10.3417, 4.8, 2340,
    'Free', '2-3 hours',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sidi_Bou_Said_-_TN_-_26.7.2013.jpg/1280px-Sidi_Bou_Said_-_TN_-_26.7.2013.jpg',
    ARRAY['Panoramic views', 'Unique architecture', 'Café des Nattes', 'Local crafts'],
    true
  ),
  (
    'Carthage',
    'قرطاج',
    'Ancienne capitale de l''empire carthaginois, classée au patrimoine mondial de l''UNESCO.',
    'UNESCO World Heritage ancient Phoenician city ruins.',
    'history',
    'Tunis', 'Grand Tunis', 'carthage',
    36.8525, 10.3233, 4.6, 3120,
    '12 DT', '2-4 hours',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/CarthagoRuins.jpg/1280px-CarthagoRuins.jpg',
    ARRAY['UNESCO Site', 'Museum', 'Roman Baths', 'Amphitheatre'],
    true
  ),
  (
    'Djerba',
    'جربة',
    'L''île de Djerba, surnommée l''île des rêves, offre des plages de sable blanc et une culture riche.',
    'Dream island with white sand beaches and rich culture.',
    'beach',
    'Médenine', 'South Tunisia', 'djerba',
    33.8075, 10.8451, 4.7, 4560,
    '20-50 DT', '3-7 days',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Djerba_Houmt_Souk_04.jpg/1280px-Djerba_Houmt_Souk_04.jpg',
    ARRAY['Beaches', 'Medina', 'Ghriba Synagogue', 'Water sports'],
    true
  ),
  (
    'Médina of Tunis',
    'مدينة تونس',
    'Classée au patrimoine mondial de l''UNESCO, la médina est un labyrinthe fascinant de ruelles et souks.',
    'UNESCO-listed medieval medina with vibrant souks.',
    'culture',
    'Tunis', 'Grand Tunis', 'tunis',
    36.7992, 10.1699, 4.5, 5670,
    'Free', '3-4 hours',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tunis_Medina_2.jpg/1280px-Tunis_Medina_2.jpg',
    ARRAY['Souk El Attarine', 'Zitouna Mosque', 'Handicrafts', 'Street food'],
    true
  ),
  (
    'Sahara of Douz',
    'صحراء دوز',
    'Porte du Sahara, Douz offre des dunes de sable dorées et des expériences de bivouac inoubliables.',
    'Gateway to the Sahara with golden dunes and camel rides.',
    'desert',
    'Kébili', 'South West Tunisia', 'douz',
    33.4603, 9.0225, 4.9, 1890,
    '50-100 DT', '2-3 days',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sahara_Desert.jpg/1280px-Sahara_Desert.jpg',
    ARRAY['Sand dunes', 'Camping', 'Camel rides', 'Sahara Festival'],
    false
  ),
  (
    'El Djem Amphitheatre',
    'مدرج الجم',
    'L''amphithéâtre d''El Djem est l''un des mieux conservés du monde romain, classé UNESCO.',
    'One of the world''s best-preserved Roman amphitheatres.',
    'history',
    'Mahdia', 'Center Tunisia', 'mahdia',
    35.2967, 10.7067, 4.8, 2780,
    '10 DT', '1-2 hours',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/El_Jem-_Roman_Amphitheater_2.jpg/1280px-El_Jem-_Roman_Amphitheater_2.jpg',
    ARRAY['Roman Amphitheatre', 'Archaeological Museum', 'International Festival', 'UNESCO Site'],
    false
  ),
  (
    'Hammamet',
    'الحمامات',
    'Station balnéaire par excellence, Hammamet séduit par ses plages et sa médina historique.',
    'Premier beach resort with a charming historic medina.',
    'beach',
    'Nabeul', 'Cap Bon', 'hamammet',
    36.4000, 10.6167, 4.5, 6230,
    '20-30 DT', '3-7 days',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Hammamet_vue_g%C3%A9n%C3%A9rale.jpg/1280px-Hammamet_vue_g%C3%A9n%C3%A9rale.jpg',
    ARRAY['Beaches', 'Medina', 'Jasmin Festival', 'Golf'],
    false
  ),
  (
    'Tozeur',
    'توزر',
    'Oasis magique aux confins du désert, Tozeur est célèbre pour son architecture en briques de sable.',
    'Magical oasis city with unique brick architecture and gorges.',
    'nature',
    'Tozeur', 'South West Tunisia', 'tozeur',
    33.9197, 8.1338, 4.7, 2100,
    '30-50 DT', '2-3 days',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tozeur%2C_Tunisia.jpg/1280px-Tozeur%2C_Tunisia.jpg',
    ARRAY['Oasis', 'Chebika Gorges', 'Chott El Jerid', 'Traditional architecture'],
    false
  )
ON CONFLICT DO NOTHING;

-- ============== VERIFICATION ==============
-- Run these queries to verify setup:
-- SELECT * FROM profiles LIMIT 5;
-- SELECT * FROM places LIMIT 5;
-- SELECT * FROM categories;

-- ============== NEXT STEPS ==============
-- 1. Go to Authentication > Providers and enable:
--    - Email/Password
--    - Google OAuth (optional)
--    - Apple (optional for iOS)
-- 2. Configure OAuth providers with your credentials
-- 3. Update your app's supabase.ts with the correct URL and anon key
-- 4. For Google Maps, get an API key from Google Cloud Console