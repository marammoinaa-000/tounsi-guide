# Tounsi Guide - Application Mobile de Tourisme en Tunisie

## 📱 Description
Application mobile React Native/Expo permettant d'explorer les destinations touristiques en Tunisie, avec :
- ✅ Système d'authentification Supabase complet (Login/Register)
- ✅ Gestion de profil utilisateur avec photo
- ✅ Intégration base de données Supabase
- ✅ Interface moderne et intuitive
- ✅ Favoris et recherche
- ✅ Vue détaillée des lieux
- ✅ Navigation par onglets

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- npm ou yarn
- Expo CLI : `npm install -g expo-cli`
- Compte Supabase (gratuit sur https://supabase.com)

### Étapes d'installation

1. **Cloner ou télécharger le projet**
```bash
cd tounsi-guide
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configurer Supabase**
   - Créer un compte sur https://supabase.com
   - Créer un nouveau projet
   - Obtenir l'URL et la ANON_KEY du projet
   - Ouvrir `supabase.js` et mettre à jour :
     ```javascript
     const SUPABASE_URL = 'votre_url_supabase'
     const SUPABASE_ANON_KEY = 'votre_anon_key'
     ```

4. **Configuration base de données Supabase**
   - Aller dans SQL Editor du dashboard Supabase
   - Copier et exécuter tout le contenu de `SUPABASE_SETUP.sql`
   - Créer un bucket de stockage nommé `avatars` (public)

5. **Lancer l'application**
```bash
npm start
# ou
expo start
```

6. **Accéder l'app**
   - Sur téléphone : Scanner le QR code avec Expo Go app
   - Sur Android : Appuyer sur 'a' dans le terminal
   - Sur iOS : Appuyer sur 'i' dans le terminal
   - Sur web : Appuyer sur 'w' dans le terminal

## 🔐 Authentification

### Créer un compte
1. Cliquer sur "Sign up" sur l'écran de login
2. Entrer nom, email, mot de passe
3. Confirmer le mot de passe
4. L'account est créé immédiatement (email verification optionnelle)

### Se connecter
1. Entrer email et mot de passe
2. Cliquer "Sign In"
3. Accès à l'app

## 👤 Gestion du Profil

### Voir le profil
- Cliquer sur l'onglet "Profile" en bas
- Voir avatar, nom, email

### Modifier le profil
1. Cliquer sur l'icône "edit" en haut
2. Modifier les champs :
   - Nom complet
   - Numéro téléphone
   - Bio / Description personnelle
3. Cliquer "Save Changes"

### Ajouter une photo
1. Aller à l'édition du profil
2. Cliquer sur le bouton camera
3. Sélectionner une image de la galerie
4. La photo est uploadée automatiquement

### Se déconnecter
- Cliquer le bouton "Sign Out" en bas du profil

## 🏠 Fonctionnalités Principales

### 1. Explorer (Home)
- 📍 Voir tous les lieux touristiques de Tunisie
- 🔍 Rechercher par nom ou description
- 🏷️ Filtrer par catégorie (Plages, Monuments, etc.)
- ❤️ Ajouter aux favoris

### 2. Favoris (Saved)
- ❤️ Voir tous vos lieux sauvegardés
- ⭐ Notes et évaluations

### 3. Carte (Map)
- 🗺️ Vue cartographique des destinations
- 📌 Localisation des lieux

### 4. Profil
- 👤 Voir et modifier informations personnelles
- 📸 Charger photo de profil
- 📊 Statistiques (visites, reviews)
- 🚪 Se déconnecter

### 5. Détails du lieu
- 📸 Photos haute résolution
- 📍 Localisation et adresse
- ⭐ Note et avis
- 💰 Prix et durée
- 📞 Contacter le lieu
- 🗺️ Directions

## 🎨 Personnalisation

### Couleurs
Modifier `data.js` - Section `COLORS` :
```javascript
export const COLORS = {
  primary: '#E63946',      // Couleur principale
  secondary: '#457B9D',    // Couleur secondaire
  // ... autres couleurs
};
```

### Espacement
Modifier `data.js` - Section `SPACING` :
```javascript
export const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
  // ... autres espacements
};
```

### Lieux touristiques
Modifier `data.js` - Section `TOURIST_PLACES` pour ajouter/modifier les lieux

## 🛠️ Architecture

```
tounsi-guide/
├── App.js              # Point d'entrée, navigation
├── context.js          # Auth & Database contexts
├── screens.js          # Tous les écrans (Login, Home, Profile, etc.)
├── components.js       # Composants réutilisables
├── styles.js           # Styles globaux
├── data.js             # Couleurs, lieux, catégories
├── supabase.js         # Configuration Supabase
├── SUPABASE_SETUP.sql  # Scripts setup base de données
└── package.json        # Dépendances
```

## 📊 Structure Supabase

### Table: profiles
- `id` (uuid) - ID utilisateur
- `name` (text) - Nom complet
- `email` (text) - Email
- `phone` (text) - Téléphone
- `bio` (text) - Biographie
- `avatar_url` (text) - URL de la photo
- `created_at` - Date création
- `updated_at` - Date modification

### Storage: avatars
- Dossier public pour stocker les photos de profil
- Accessible publiquement

### Tables optionnelles
- `favorites` - Favoris des utilisateurs
- `reviews` - Avis et notes des lieux

## 🔧 Dépannage

### Erreur: "Cannot find module 'expo-image-picker'"
```bash
npm install expo-image-picker
```

### Erreur de connexion Supabase
- Vérifier l'URL et la clé dans `supabase.js`
- Vérifier que la table `profiles` existe
- Vérifier les RLS policies

### La photo de profil ne s'affiche pas
- Vérifier que le bucket `avatars` existe et est public
- Vérifier les permissions de stockage

### Erreur lors du login
- Vérifier que l'email est correct
- Vérifier que le mot de passe a 6+ caractères
- Vérifier la connexion internet

## 📦 Dépendances principales

```json
{
  "expo": "~54.0.33",
  "react-native": "0.81.5",
  "@react-navigation/native": "*",
  "@react-navigation/bottom-tabs": "*",
  "@supabase/supabase-js": "^2.39.0",
  "expo-image-picker": "^14.6.0",
  "react-native-paper": "4.9.2"
}
```

## 🚀 Déploiement

### Générer une build EAS
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

### Publier sur les stores
- Suivre la documentation Expo:
  - Android: https://docs.expo.dev/distribution/build-android/
  - iOS: https://docs.expo.dev/distribution/build-ios/

## 📝 Notes de développement

### Ajouter un nouveau lieu
1. Ouvrir `data.js`
2. Ajouter un objet dans `TOURIST_PLACES` :
```javascript
{
  id: 'new-place',
  name: 'Nom du lieu',
  location: 'Ville, Région',
  category: 'Plages',
  image: 'url_image',
  rating: 4.5,
  reviews: 120,
  description: 'Description...',
  duration: '2-3 heures',
  price: 'Gratuit'
}
```

### Ajouter une nouvelle catégorie
1. Ouvrir `data.js`
2. Ajouter dans `CATEGORIES` :
```javascript
{
  id: 'new-category',
  label: 'Nouvelle Catégorie',
  icon: 'icon-name'
}
```

## 📞 Support

Pour toute question ou problème :
1. Consulter le fichier README.md
2. Vérifier les logs de la console
3. Vérifier la documentation Expo: https://docs.expo.dev
4. Consulter la documentation Supabase: https://supabase.com/docs

## 📄 Licence

ISC (0BSD)

---

**Bienvenue en Tunisie ! Explorez nos magnifiques destinations ! 🇹🇳**
