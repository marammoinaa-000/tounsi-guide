# 📱 Guide Complet Tounsi Guide - Application Mobile Tunisie

## ✨ Fonctionnalités Implémentées

### ✅ Authentification Complète
- ✔️ Système de login avec email/password
- ✔️ Création de compte (Register)
- ✔️ Validation des formulaires
- ✔️ Gestion des erreurs
- ✔️ Déconnexion sécurisée
- ✔️ Persistance de session avec Supabase

### ✅ Gestion du Profil Utilisateur
- ✔️ Affichage du profil
- ✔️ Modifier informations (nom, téléphone, bio)
- ✔️ **Upload de photo de profil** 
- ✔️ Stockage des photos dans Supabase Storage
- ✔️ Affichage du profil avec photo

### ✅ Interface Améliorée
- ✔️ Design moderne et premium
- ✔️ Navigation par onglets (Explore, Favoris, Carte, Profil)
- ✔️ Écrans animés avec transitions fluides
- ✔️ Icônes professionnelles
- ✔️ Palette de couleurs cohérente
- ✔️ Responsive design

### ✅ Fonctionnalités Principales
- ✔️ Affichage de 8 destinations touristiques
- ✔️ Recherche en temps réel
- ✔️ Filtrage par catégorie
- ✔️ Ajouter/Retirer des favoris
- ✔️ Vue détaillée de chaque lieu
- ✔️ Notes et évaluations
- ✔️ Informations de contact

### ✅ Base de Données Supabase
- ✔️ Table `profiles` avec RLS policies
- ✔️ Storage bucket `avatars` pour les photos
- ✔️ Tables optionnelles `favorites` et `reviews`
- ✔️ Authentification JWT intégrée

---

## 🚀 Installation Rapide

### Étape 1: Cloner/Télécharger le projet
```bash
cd tounsi-guide
```

### Étape 2: Installer Node.js (si nécessaire)
Télécharger depuis: https://nodejs.org/

### Étape 3: Installer les dépendances
```bash
npm install
```

### Étape 4: Configurer Supabase

1. **Créer un compte Supabase**
   - Aller sur https://supabase.com
   - Cliquer "Start your project"
   - Créer un nouveau projet

2. **Obtenir les credentials**
   - Dans Dashboard, aller à Settings > API
   - Copier l'URL et la ANON_KEY publique

3. **Mettre à jour supabase.js**
   ```javascript
   const SUPABASE_URL = 'votre_url_supabase'
   const SUPABASE_ANON_KEY = 'votre_anon_key'
   ```

4. **Setup la base de données**
   - Dans Supabase, ouvrir SQL Editor
   - Copier tout le contenu de `SUPABASE_SETUP.sql`
   - Exécuter les commandes

5. **Créer le bucket de stockage**
   - Aller à Storage
   - Créer un nouveau bucket nommé `avatars`
   - Le mettre en public

### Étape 5: Lancer l'application
```bash
npm start
```

Puis:
- **iOS**: Appuyer sur `i`
- **Android**: Appuyer sur `a`  
- **Web**: Appuyer sur `w`
- **Mobile**: Scanner le QR code avec Expo Go

---

## 🧪 Test de l'Application

### Compte de test
```
Email: test@example.com
Password: password123
```

Ou créer votre propre compte!

### Test des fonctionnalités

1. **Login/Register**
   - [ ] Créer un compte
   - [ ] Se connecter
   - [ ] Voir les erreurs de validation

2. **Home Screen**
   - [ ] Voir les destinations
   - [ ] Chercher une destination
   - [ ] Filtrer par catégorie
   - [ ] Cliquer sur une destination

3. **Favoris**
   - [ ] Ajouter aux favoris ❤️
   - [ ] Voir les favoris
   - [ ] Retirer des favoris

4. **Profil**
   - [ ] Voir les infos de profil
   - [ ] Cliquer edit
   - [ ] Modifier nom/téléphone/bio
   - [ ] Upload une photo
   - [ ] Sauvegarder
   - [ ] Se déconnecter

5. **Détails du lieu**
   - [ ] Voir l'image
   - [ ] Voir les infos (prix, durée)
   - [ ] Ajouter/retirer des favoris
   - [ ] Partager (fonctionnalité future)

---

## 📂 Structure du Projet

```
tounsi-guide/
├── App.js                    # Point d'entrée + Navigation
├── context.js                # Auth & Database contexts
├── screens.js                # Tous les écrans
│   ├── LoginScreen
│   ├── RegisterScreen
│   ├── HomeScreen
│   ├── FavoritesScreen
│   ├── MapScreen
│   ├── ProfileScreen
│   └── DetailScreen
├── components.js             # Composants réutilisables
├── styles.js                 # Styles globaux
├── data.js                   # Constantes et données
├── supabase.js               # Config Supabase
├── package.json              # Dépendances
├── SUPABASE_SETUP.sql        # SQL pour la base de données
├── SETUP_GUIDE.md            # Guide détaillé
├── install.sh                # Script d'installation
└── README.md                 # Ce fichier
```

---

## 🎨 Personnalisation

### Changer les couleurs
Ouvrir `data.js` et modifier `COLORS`:
```javascript
export const COLORS = {
  primary: '#E63946',      // Couleur principale (boutons, icônes actives)
  secondary: '#457B9D',    // Couleur secondaire
  black: '#1A1A2E',       // Texte principal
  // ... voir data.js pour toutes les couleurs
};
```

### Ajouter une destination
Dans `data.js`, ajouter un objet au tableau `TOURIST_PLACES`:
```javascript
{
  id: 'unique-id',
  name: 'Nom du lieu',
  location: 'Ville',
  category: 'beach', // plage, history, culture, nature, city
  rating: 4.7,
  reviews: 150,
  price: '20 DT',
  duration: '2-3 heures',
  description: 'Description détaillée...',
  image: 'url_image',
  features: ['Feature 1', 'Feature 2'],
  coordinates: { lat: 36.XXX, lng: 10.XXX }
}
```

### Changer le thème
- Modifier les COLORS dans data.js
- Modifier les SPACING pour la mise en page
- Modifier les RADIUS pour les bordures

---

## 🔧 Dépannage

### "Cannot find module 'expo-image-picker'"
```bash
npm install expo-image-picker
npm start
```

### "Supabase connection error"
1. Vérifier l'URL et la clé dans supabase.js
2. Vérifier la connexion internet
3. Vérifier que le projet Supabase est actif

### "Photo de profil ne s'affiche pas"
1. Vérifier que le bucket 'avatars' existe
2. Vérifier qu'il est en PUBLIC
3. Vérifier l'URL de la photo dans le profil

### "Login ne fonctionne pas"
1. Vérifier que l'email existe
2. Vérifier que le mot de passe est correct (min 6 caractères)
3. Vérifier que la table 'profiles' existe dans Supabase

### "Erreur lors de l'upload de photo"
1. Vérifier les permissions du bucket
2. Vérifier la taille de l'image (< 5MB)
3. Vérifier la connexion internet

---

## 📊 Statut des Fonctionnalités

| Fonctionnalité | Statut | Notes |
|---|---|---|
| Login | ✅ Complet | Email/password |
| Register | ✅ Complet | Création de compte |
| Profil | ✅ Complet | Avec photo |
| Photo de profil | ✅ Complet | Upload + stockage |
| Destinations | ✅ Complet | 8 lieux intégrés |
| Recherche | ✅ Complet | Temps réel |
| Catégories | ✅ Complet | 6 catégories |
| Favoris | ✅ Complet | Local storage |
| Détails lieu | ✅ Complet | Infos complètes |
| Carte | 🔄 Partial | Placeholder (futur: Google Maps) |
| Avis/Reviews | 📋 Planned | Structure prête |
| Notifications | 📋 Planned | Futur |
| Paiement | 📋 Planned | Futur |

---

## 🌐 Déploiement sur les Stores

### Pour Android (Google Play)
```bash
npm install -g eas-cli
eas build --platform android
eas submit --platform android
```

### Pour iOS (App Store)
```bash
eas build --platform ios
eas submit --platform ios
```

Voir: https://docs.expo.dev/distribution/

---

## 📚 Documentation Utile

- **Expo**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org
- **Supabase**: https://supabase.com/docs
- **React Native**: https://reactnative.dev

---

## 👨‍💻 Contribution

Pour améliorer l'app:
1. Forker le projet
2. Créer une branche (git checkout -b feature/YourFeature)
3. Commit vos changements
4. Push à la branche
5. Ouvrir une Pull Request

---

## 📝 Changelog

### v1.0.0 (Initial)
- ✅ Système d'authentification complet
- ✅ Gestion du profil avec photo
- ✅ 8 destinations touristiques
- ✅ Recherche et filtrage
- ✅ Intégration Supabase
- ✅ Interface moderne
- ✅ Navigation par onglets

---

## 📞 Support

Questions? Consultez:
1. SETUP_GUIDE.md pour l'installation
2. SUPABASE_SETUP.sql pour la base de données
3. La documentation Expo
4. GitHub issues (si applicable)

---

## 📄 Licence

ISC (0BSD)

---

## 🇹🇳 Merci!

Merci d'utiliser Tounsi Guide. 
Bon voyage en Tunisie! 🏖️⛱️🏜️

**Dernière mise à jour: 2026-04-25**
