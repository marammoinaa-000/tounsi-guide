// Type definitions for Tounsi Guide

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Place types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  shortDescription: string;
  category: string;
  location: string;
  region: string;
  city?: string;
  coordinates: Coordinates;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  image: string;
  images?: string[];
  features?: string[];
  phone?: string;
  website?: string;
  openingHours?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaceCreateInput {
  name: string;
  nameAr?: string;
  description: string;
  category: string;
  location: string;
  region: string;
  coordinates: Coordinates;
  price: string;
  duration: string;
  image: string;
}

export interface PlaceUpdateInput extends Partial<PlaceCreateInput> {
  id: string;
}

// Favorite types
export interface Favorite {
  id: string;
  userId: string;
  placeId: string;
  createdAt: Date;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  placeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface ReviewCreateInput {
  placeId: string;
  rating: number;
  comment: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
}

// City types
export interface City {
  id: string;
  name: string;
  nameAr: string;
  region: string;
}

// Map types
export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker {
  id: string;
  coordinate: Coordinates;
  title: string;
  description?: string;
  category: string;
  imageUrl?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Navigation types
export type RootStackParamList = {
  '(tabs)': undefined;
  'auth/login': undefined;
  'auth/signup': undefined;
  'auth/forgot-password': undefined;
  'place/detail': { placeId: string };
  'profile/edit': undefined;
  'map/full-screen': undefined;
};

export type TabParamList = {
  'index': undefined;
  'explore': undefined;
  'favorites': undefined;
  'map': undefined;
  'profile': undefined;
};