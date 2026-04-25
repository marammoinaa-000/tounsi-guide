import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../../constants';

interface SectionHeaderProps {
  title: string;
  titleAr?: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  titleAr,
  subtitle,
  action,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {titleAr && <Text style={styles.titleAr}>{titleAr}</Text>}
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {action && (
        <Text style={styles.action} onPress={action.onPress}>
          {action.label}
        </Text>
      )}
    </View>
  );
};

// Section with Zellige decoration
export const ZelligeSection: React.FC<SectionHeaderProps> = ({
  title,
  titleAr,
  subtitle,
  action,
}) => {
  return (
    <View style={styles.zelligeContainer}>
      <View style={styles.zelligePattern}>
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.zelligeDiamond}>
            <View style={[styles.zelligeInner, i % 2 === 0 ? styles.zelligeRed : styles.zelligeGold]} />
          </View>
        ))}
      </View>

      <View style={styles.zelligeTitleContainer}>
        <Text style={styles.zelligeTitle}>{title}</Text>
        {titleAr && <Text style={styles.zelligeTitleAr}>{titleAr}</Text>}
        {subtitle && <Text style={styles.zelligeSubtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.zelligePattern}>
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.zelligeDiamond}>
            <View style={[styles.zelligeInner, i % 2 === 0 ? styles.zelligeRed : styles.zelligeGold]} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    marginVertical: SPACING.md,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
  },
  titleAr: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.gold,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  action: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.tunisianRed,
  },

  // Zellige Styles
  zelligeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  zelligePattern: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  zelligeDiamond: {
    width: 16,
    height: 16,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  zelligeInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  zelligeRed: {
    backgroundColor: COLORS.tunisianRed,
  },
  zelligeGold: {
    backgroundColor: COLORS.gold,
  },
  zelligeTitleContainer: {
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  zelligeTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text,
    textAlign: 'center',
  },
  zelligeTitleAr: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.gold,
    textAlign: 'center',
    marginTop: SPACING.xxs,
  },
  zelligeSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default SectionHeader;