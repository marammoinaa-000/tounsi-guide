/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform,
} 
from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth, useDatabase } from './context';
import { COLORS, SPACING, RADIUS, CATEGORIES } from './data';
import { styles } from './styles';
import {
  PlaceCard,
  SmallPlaceCard,
  SearchBar,
  CategoryChip,
  EmptyState,
  SectionHeader,
} from './components';


// ================= LOGIN =================
export const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Minimum 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Error', result.message);
    }
  };

  return (
    <ScrollView style={styles.authContainer} contentContainerStyle={localStyles.scrollContent}>
      <View style={styles.authHeader}>
        <View style={styles.authLogo}>
          <Ionicons name="planet" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.authTitle}>Welcome back</Text>
        <Text style={styles.authSubtitle}>Sign in to continue exploring Tunisia</Text>
      </View>

      <View style={styles.authForm}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={18} color={COLORS.gray400} />
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>
          {errors.email && <Text style={localStyles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray400} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color={COLORS.gray400}
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={localStyles.errorText}>{errors.password}</Text>}
        </View>

        <TouchableOpacity
          style={localStyles.primaryButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={localStyles.primaryButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={localStyles.switchText}>
            Don't have an account? <Text style={localStyles.switchLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


// ================= REGISTER =================
export const RegisterScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const result = await signup(name, email, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Error', result.message);
    } else {
      Alert.alert('Success', 'Account created! Please sign in.');
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView style={styles.authContainer} contentContainerStyle={localStyles.scrollContent}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
      </TouchableOpacity>

      <View style={styles.authHeader}>
        <View style={styles.authLogo}>
          <Ionicons name="person-add" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.authTitle}>Create Account</Text>
        <Text style={styles.authSubtitle}>Join us to save your favorite places</Text>
      </View>

      <View style={styles.authForm}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={18} color={COLORS.gray400} />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
          </View>
          {errors.name && <Text style={localStyles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={18} color={COLORS.gray400} />
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>
          {errors.email && <Text style={localStyles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray400} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>
          {errors.password && <Text style={localStyles.errorText}>{errors.password}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.gray400} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>
          {errors.confirmPassword && <Text style={localStyles.errorText}>{errors.confirmPassword}</Text>}
        </View>

        <TouchableOpacity
          style={localStyles.primaryButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={localStyles.primaryButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={localStyles.switchText}>
            Already have an account? <Text style={localStyles.switchLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


// ================= HOME =================
export const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { places, favorites } = useDatabase();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchText.toLowerCase()) ||
        place.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = !selectedCategory || place.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchText, selectedCategory, places]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Welcome</Text>
            <Text style={styles.headerTitle}>{user?.name || 'Explorer'}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.listContent} showsVerticalScrollIndicator={false}>
        <SearchBar value={searchText} onChangeText={setSearchText} />

        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={cat => cat.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
            renderItem={({ item: category }) => (
              <CategoryChip
                category={category}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Popular Destinations"
            subtitle={`${filteredPlaces.length} places found`}
          />
          {filteredPlaces.map((place, index) => (
            <PlaceCard
              key={place.id}
              place={place}
              index={index}
              onPress={() => navigation.navigate('Detail', { placeId: place.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


// ================= FAVORITES =================
export const FavoritesScreen = ({ navigation }) => {
  const { places, favorites } = useDatabase();
  const favoritePlaces = places.filter(p => favorites.includes(p.id));

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Saved Places</Text>
            <Text style={styles.headerTitle}>My Favorites</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.listContent} showsVerticalScrollIndicator={false}>
        {favoritePlaces.length === 0 ? (
          <EmptyState
            icon="heart-outline"
            title="No Favorites Yet"
            subtitle="Save your favorite places to access them quickly"
            action={{
              label: 'Explore',
              onPress: () => navigation.navigate('Home'),
            }}
          />
        ) : (
          <View style={styles.section}>
            {favoritePlaces.map((place, index) => (
              <PlaceCard
                key={place.id}
                place={place}
                index={index}
                onPress={() => navigation.navigate('Detail', { placeId: place.id })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};


// ================= MAP =================
export const MapScreen = () => {
  const { places } = useDatabase();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerGreeting}>Explore</Text>
            <Text style={styles.headerTitle}>Map View</Text>
          </View>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color={COLORS.gray300} />
          <Text style={styles.mapPlaceholderTitle}>Map Coming Soon</Text>
          <Text style={styles.mapPlaceholderSubtitle}>
            Interactive map view with all tourist destinations
          </Text>
        </View>
      </View>
    </View>
  );
};


// ================= PROFILE =================
export const ProfileScreen = ({ navigation }) => {
  const { user, logout, updateProfile, uploadProfileImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setLoading(true);
        const uploadResult = await uploadProfileImage(result.assets[0].uri);
        setLoading(false);
        if (uploadResult.success) {
          Alert.alert('Success', 'Profile photo updated');
        } else {
          Alert.alert('Error', uploadResult.message);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const result = await updateProfile(formData);
    setLoading(false);
    if (result.success) {
      Alert.alert('Success', 'Profile updated');
      setIsEditing(false);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={styles.profileButton}
          >
            <Ionicons name={isEditing ? 'close' : 'create'} size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={localStyles.profileContent}>
        {/* Avatar */}
        <View style={localStyles.avatarContainer}>
          {user?.avatar_url ? (
            <Image source={{ uri: user.avatar_url }} style={localStyles.avatar} />
          ) : (
            <View style={localStyles.avatarPlaceholder}>
              <Ionicons name="person" size={48} color={COLORS.primary} />
            </View>
          )}
          {isEditing && (
            <TouchableOpacity
              style={localStyles.cameraButton}
              onPress={handlePickImage}
              disabled={loading}
            >
              <Ionicons name="camera" size={18} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Info */}
        <View style={localStyles.infoSection}>
          <Text style={localStyles.nameText}>{formData.name || 'User'}</Text>
          <Text style={localStyles.emailText}>{formData.email}</Text>
        </View>

        {/* Edit Form */}
        {isEditing && (
          <View style={localStyles.formSection}>
            <View style={localStyles.inputGroup}>
              <Text style={localStyles.label}>Full Name</Text>
              <TextInput
                style={localStyles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter full name"
              />
            </View>

            <View style={localStyles.inputGroup}>
              <Text style={localStyles.label}>Phone</Text>
              <TextInput
                style={localStyles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>

            <View style={localStyles.inputGroup}>
              <Text style={localStyles.label}>Bio</Text>
              <TextInput
                style={[localStyles.input, localStyles.bioInput]}
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity
              style={localStyles.saveButton}
              onPress={handleSaveProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={18} color={COLORS.white} />
                  <Text style={localStyles.saveButtonText}>Save Changes</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Stats */}
        {!isEditing && (
          <View style={localStyles.statsContainer}>
            <View style={localStyles.statItem}>
              <Text style={localStyles.statNumber}>0</Text>
              <Text style={localStyles.statLabel}>Visits</Text>
            </View>
            <View style={localStyles.statDivider} />
            <View style={localStyles.statItem}>
              <Text style={localStyles.statNumber}>0</Text>
              <Text style={localStyles.statLabel}>Reviews</Text>
            </View>
            <View style={localStyles.statDivider} />
            <View style={localStyles.statItem}>
              <Text style={localStyles.statNumber}>0</Text>
              <Text style={localStyles.statLabel}>Followers</Text>
            </View>
          </View>
        )}

        {/* About Section */}
        {!isEditing && formData.bio && (
          <View style={localStyles.aboutSection}>
            <Text style={localStyles.sectionTitle}>About</Text>
            <Text style={localStyles.bioText}>{formData.bio}</Text>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity
          style={localStyles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={18} color={COLORS.white} />
          <Text style={localStyles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


// ================= DETAIL =================
export const DetailScreen = ({ route, navigation }) => {
  const { placeId } = route.params;
  const { places, isFavorite, toggleFavorite } = useDatabase();
  const [isPlaceFavorite, setIsPlaceFavorite] = useState(false);

  const place = places.find(p => p.id === placeId);

  useEffect(() => {
    if (place) {
      setIsPlaceFavorite(isFavorite(place.id));
    }
  }, [place, isFavorite]);

  if (!place) {
    return (
      <View style={styles.detailScreen}>
        <TouchableOpacity
          style={styles.detailBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Place not found</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.detailScreen}>
      <View style={styles.detailImageContainer}>
        <Image source={{ uri: place.image }} style={styles.detailImage} />
        <View style={styles.detailImageOverlay} />

        <TouchableOpacity
          style={styles.detailBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailShareButton}
          onPress={() => Alert.alert('Share', `Sharing ${place.name}`)}
        >
          <Ionicons name="share-social" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.detailFavoriteButton,
            isPlaceFavorite && styles.detailFavoriteButtonActive,
          ]}
          onPress={() => {
            toggleFavorite(place.id);
            setIsPlaceFavorite(!isPlaceFavorite);
          }}
        >
          <Ionicons
            name={isPlaceFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isPlaceFavorite ? COLORS.white : COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailContent}>
        <View style={styles.detailTitleSection}>
          <Text style={styles.detailCategory}>{place.category}</Text>
          <Text style={styles.detailTitle}>{place.name}</Text>
          <View style={styles.detailLocationRow}>
            <Ionicons name="location" size={16} color={COLORS.gray500} />
            <Text style={styles.detailLocation}>{place.location}</Text>
          </View>
        </View>

        <View style={styles.detailRatingRow}>
          <View style={styles.detailRatingBadge}>
            <Ionicons name="star" size={18} color={COLORS.golden} />
            <Text style={styles.detailRatingValue}>{place.rating}</Text>
          </View>
          <Text style={styles.detailReviews}>({place.reviews} reviews)</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailSection}>
          <Text style={styles.detailSectionTitle}>About</Text>
          <Text style={styles.detailDescription}>{place.description}</Text>
        </View>

        <View style={styles.infoCardsRow}>
          <View style={styles.infoCard}>
            <Ionicons name="time" size={20} color={COLORS.primary} />
            <Text style={styles.infoCardLabel}>Duration</Text>
            <Text style={styles.infoCardValue}>{place.duration}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="pricetag" size={20} color={COLORS.primary} />
            <Text style={styles.infoCardLabel}>Price</Text>
            <Text style={styles.infoCardValue}>{place.price}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="call" size={18} color={COLORS.white} />
            <Text style={styles.primaryButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="directions" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};


// ================= STYLES =================
const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 0,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: RADIUS.md,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
  switchText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    color: COLORS.gray500,
  },
  switchLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  profileContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  formSection: {
    marginBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.gray700,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xl,
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.gray200,
  },
  aboutSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  bioText: {
    fontSize: 14,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
