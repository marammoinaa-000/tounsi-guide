import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../../constants';
import type { Category } from '../../types';

interface CategoryChipProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
        <Ionicons
          name={category.icon as any}
          size={16}
          color={isSelected ? COLORS.white : COLORS.gray600}
        />
      </View>
      <View>
        <Text style={[styles.label, isSelected && styles.labelSelected]}>
          {category.name}
        </Text>
        <Text style={[styles.labelAr, isSelected && styles.labelArSelected]}>
          {category.nameAr}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface CategoryListProps {
  categories: readonly Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.chip, selectedCategory === null && styles.chipSelected]}
        onPress={() => onSelectCategory(null)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, selectedCategory === null && styles.iconContainerSelected]}>
          <Ionicons
            name="globe-outline"
            size={16}
            color={selectedCategory === null ? COLORS.white : COLORS.gray600}
          />
        </View>
        <View>
          <Text style={[styles.label, selectedCategory === null && styles.labelSelected]}>
            All
          </Text>
          <Text style={[styles.labelAr, selectedCategory === null && styles.labelArSelected]}>
            الكل
          </Text>
        </View>
      </TouchableOpacity>

      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          onPress={() =>
            onSelectCategory(selectedCategory === category.id ? null : category.id)
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  chipSelected: {
    backgroundColor: COLORS.tunisianRed,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text,
  },
  labelSelected: {
    color: COLORS.white,
  },
  labelAr: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  labelArSelected: {
    color: COLORS.white,
    opacity: 0.8,
  },
});

export default CategoryChip;