// Theme constants for Tounsi Guide
// Tunisian-inspired color palette

export const COLORS = {
  // Primary Colors (Tunisian Flag)
  tunisianRed: '#C8102E',
  white: '#FFFFFF',

  // Secondary Colors (Sidi Bou Said blue + traditional gold)
  sidiBlue: '#1A5276',
  gold: '#E8B84B',
  goldLight: '#F5D78E',

  // Background Colors
  background: '#FAF7F2',      // Warm off-white (like medina walls)
  card: '#FFFFFF',
  surface: '#F5F1EB',

  // Text Colors
  text: '#1A1A2E',
  textSecondary: '#5D6D7E',
  textLight: '#85929E',

  // Accent Colors
  accent: '#E8B84B',
  accentDark: '#D4A03A',

  // Status Colors
  success: '#27AE60',
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',

  // Gray Scale
  gray50: '#F8F9FA',
  gray100: '#F1F3F4',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Shadows
  shadowColor: '#000000',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export const TYPOGRAPHY = {
  // Font sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 32,
    displayLg: 40,
  },
  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
  },
} as const;

// Z-index layers
export const ZINDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;

export type Colors = typeof COLORS;
export type Spacing = typeof SPACING;
export type Radius = typeof RADIUS;
export type Shadows = typeof SHADOWS;