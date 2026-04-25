import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS, TYPOGRAPHY } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  style?: object;
  onPress?: () => void;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, shadow = 'md' }) => {
  const cardStyle = [
    styles.card,
    shadow !== 'none' && SHADOWS[shadow],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  transparent = false,
}) => {
  return (
    <View style={[styles.header, transparent && styles.headerTransparent]}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          {leftIcon && (
            <TouchableOpacity onPress={onLeftPress} style={styles.headerButton}>
              <Ionicons name={leftIcon as any} size={24} color={transparent ? COLORS.white : COLORS.text} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, transparent && styles.headerTitleTransparent]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.headerSubtitle, transparent && styles.headerSubtitleTransparent]}>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.headerRight}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.headerButton}>
              <Ionicons name={rightIcon as any} size={24} color={transparent ? COLORS.white : COLORS.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// Zellige Pattern Header Decoration
export const ZelligeHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <View style={styles.zelligeHeader}>
      <View style={styles.zelligePattern}>
        <View style={[styles.zelligeTile, styles.zelligeRed]} />
        <View style={[styles.zelligeTile, styles.zelligeGold]} />
        <View style={[styles.zelligeTile, styles.zelligeWhite]} />
        <View style={[styles.zelligeTile, styles.zelligeGold]} />
        <View style={[styles.zelligeTile, styles.zelligeRed]} />
      </View>
      <View style={styles.zelligeContent}>
        <Text style={styles.zelligeTitle}>{title}</Text>
        {subtitle && <Text style={styles.zelligeSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.zelligePattern}>
        <View style={[styles.zelligeTile, styles.zelligeRed]} />
        <View style={[styles.zelligeTile, styles.zelligeGold]} />
        <View style={[styles.zelligeTile, styles.zelligeWhite]} />
        <View style={[styles.zelligeTile, styles.zelligeGold]} />
        <View style={[styles.zelligeTile, styles.zelligeRed]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.sm,
  },
  headerTransparent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
  },
  headerTitleTransparent: {
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  headerSubtitleTransparent: {
    color: COLORS.white,
    opacity: 0.8,
  },
  // Zellige Pattern Styles
  zelligeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.tunisianRed,
  },
  zelligeContent: {
    paddingHorizontal: SPACING.md,
  },
  zelligeTitle: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  zelligeSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.gold,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  zelligePattern: {
    flexDirection: 'row',
    gap: 4,
  },
  zelligeTile: {
    width: 20,
    height: 20,
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  zelligeRed: {
    backgroundColor: COLORS.white,
  },
  zelligeGold: {
    backgroundColor: COLORS.gold,
  },
  zelligeWhite: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
});

export default Card;