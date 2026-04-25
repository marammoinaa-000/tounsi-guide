import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../../constants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search destinations...',
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? COLORS.tunisianRed : COLORS.gray400}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray400}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color={COLORS.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Arabic Search Bar with RTL support
export const ArabicSearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'البحث عن الوجهات...',
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused, styles.rtl]}>
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? COLORS.tunisianRed : COLORS.gray400}
      />
      <TextInput
        style={[styles.input, styles.inputRTL]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray400}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        textAlign="right"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color={COLORS.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  containerFocused: {
    borderColor: COLORS.tunisianRed,
    borderWidth: 2,
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  inputRTL: {
    marginLeft: 0,
    marginRight: SPACING.sm,
  },
  clearButton: {
    padding: SPACING.xs,
  },
});

export default SearchBar;