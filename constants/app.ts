// App-wide constants

export const APP_NAME = 'Tounsi Guide';
export const APP_TAGLINE = 'تونسي كير - Votre guide de la Tunisie';

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PROFILE: 'user_profile',
  FAVORITES: 'favorites',
  RECENT_PLACES: 'recent_places',
  SETTINGS: 'app_settings',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_MAP: true,
  ENABLE_REVIEWS: true,
  ENABLE_CHAT: false,
  ENABLE_BOOKING: false,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Map Settings
export const MAP_CONFIG = {
  DEFAULT_REGION: {
    latitude: 36.8065,
    longitude: 10.1815,
    latitudeDelta: 5,
    longitudeDelta: 5,
  },
  DEFAULT_ZOOM: 12,
  MARKER_SIZE: 40,
} as const;

// Place Categories
export const CATEGORIES = [
  {
    id: 'beach',
    name: 'Beaches',
    nameAr: 'الشواطئ',
    icon: 'sunny-outline',
    color: '#3498DB',
  },
  {
    id: 'history',
    name: 'Historical',
    nameAr: 'تاريخية',
    icon: 'library-outline',
    color: '#9B59B6',
  },
  {
    id: 'culture',
    name: 'Cultural',
    nameAr: 'ثقافية',
    icon: 'color-palette-outline',
    color: '#E8B84B',
  },
  {
    id: 'nature',
    name: 'Nature',
    nameAr: 'طبيعة',
    icon: 'leaf-outline',
    color: '#27AE60',
  },
  {
    id: 'city',
    name: 'Cities',
    nameAr: 'مدن',
    icon: 'business-outline',
    color: '#E74C3C',
  },
  {
    id: 'desert',
    name: 'Desert',
    nameAr: 'صحراء',
    icon: 'sunny-outline',
    color: '#D35400',
  },
  {
    id: 'religious',
    name: 'Religious',
    nameAr: 'دينية',
    icon: 'church-outline',
    color: '#8E44AD',
  },
  {
    id: 'market',
    name: 'Markets',
    nameAr: 'أسواق',
    icon: 'storefront-outline',
    color: '#E67E22',
  },
] as const;

export const TUNISIAN_CITIES = [
  { id: 'tunis', name: 'Tunis', nameAr: 'تونس', region: 'Grand Tunis' },
  { id: 'sidi-bou-said', name: 'Sidi Bou Said', nameAr: 'سيدي بوسعيد', region: 'Grand Tunis' },
  { id: 'carthage', name: 'Carthage', nameAr: 'قرطاج', region: 'Grand Tunis' },
  { id: 'hamammet', name: 'Hammamet', nameAr: 'الحمامات', region: 'Cap Bon' },
  { id: 'nabeul', name: 'Nabeul', nameAr: 'نابل', region: 'Cap Bon' },
  { id: 'kelibia', name: 'Kélibia', nameAr: 'قليبية', region: 'Cap Bon' },
  { id: 'sfax', name: 'Sfax', nameAr: 'صفاقس', region: 'Sfax' },
  { id: 'sousse', name: 'Sousse', nameAr: 'سوسة', region: 'Sousse' },
  { id: 'monastir', name: 'Monastir', nameAr: 'المنستير', region: 'Sousse' },
  { id: 'mahdia', name: 'Mahdia', nameAr: 'المهدية', region: 'Center' },
  { id: 'kairouan', name: 'Kairouan', nameAr: 'القيروان', region: 'Center' },
  { id: 'djerba', name: 'Djerba', nameAr: 'جربة', region: 'South' },
  { id: 'gabes', name: 'Gabès', nameAr: 'قابس', region: 'South' },
  { id: 'tozeur', name: 'Tozeur', nameAr: 'توزر', region: 'South West' },
  { id: 'douz', name: 'Douz', nameAr: 'دوز', region: 'South West' },
  { id: 'tataouine', name: 'Tataouine', nameAr: 'تطاوين', region: 'Far South' },
] as const;