# ✅ CHECKLIST DE TEST - Tounsi Guide

## 🧪 Test Complet de l'Application

### PARTIE 1: Configuration & Installation

- [ ] Node.js installé (v18+)
- [ ] npm install exécuté sans erreur
- [ ] Supabase compte créé
- [ ] Supabase credentials dans supabase.js
- [ ] SQL de SUPABASE_SETUP.sql exécuté
- [ ] Bucket 'avatars' créé et public
- [ ] npm start fonctionne
- [ ] Expo Go installée sur téléphone

---

### PARTIE 2: Authentification

#### 2.1 Login Screen
- [ ] Page login s'affiche
- [ ] Champs email et password visibles
- [ ] Placeholder text correct
- [ ] Icônes email/lock affichées
- [ ] Bouton "Show/Hide password" fonctionne
- [ ] Logo Expo affiche "Welcome back"

#### 2.2 Login Validation
- [ ] Email vide = erreur
- [ ] Email invalide = erreur
- [ ] Password vide = erreur
- [ ] Password < 6 caractères = erreur
- [ ] Email valide + password = OK

#### 2.3 Login Fonctionnel
- [ ] Email valide + password valide = Login OK
- [ ] Redirection vers Home screen
- [ ] Erreur email non existant = message
- [ ] Erreur password incorrect = message
- [ ] Bouton disabled pendant le chargement

#### 2.4 Register Screen
- [ ] Lien "Don't have account" sur Login
- [ ] Register screen s'affiche
- [ ] Champs: Name, Email, Password, Confirm
- [ ] Tous les champs valident
- [ ] Mismatch password = erreur
- [ ] Création compte = OK
- [ ] Redirection vers Login
- [ ] Nouveau compte peut se connecter

#### 2.5 Déconnexion
- [ ] Bouton "Sign Out" sur profil
- [ ] Alerte de confirmation
- [ ] Retour à l'écran login
- [ ] Session bien fermée

---

### PARTIE 3: Écran Profil

#### 3.1 Affichage du Profil
- [ ] Onglet "Profile" visible en bas
- [ ] Icône personne affichée
- [ ] Nom de l'utilisateur affiché
- [ ] Email affiche l'adresse
- [ ] Avatar placeholder sans photo
- [ ] Bouton edit en haut

#### 3.2 Modification du Profil
- [ ] Cliquer edit = mode édition
- [ ] Champs deviennent éditables
- [ ] Bouton camera visible
- [ ] Pouvoir modifier nom
- [ ] Pouvoir ajouter téléphone
- [ ] Pouvoir ajouter bio
- [ ] Bouton "Save Changes" visible

#### 3.3 Upload Photo de Profil
- [ ] Cliquer bouton camera
- [ ] Image picker s'ouvre
- [ ] Pouvoir sélectionner une image
- [ ] Image cropped en carré
- [ ] Upload vers Supabase
- [ ] Avatar s'affiche après upload
- [ ] URL sauvegardée dans profil

#### 3.4 Sauvegarde des Modifications
- [ ] Pouvoir modifier tous les champs
- [ ] Cliquer "Save Changes"
- [ ] Message de succès
- [ ] Données bien sauvegardées
- [ ] Données persistent après reload
- [ ] Données dans Supabase database

#### 3.5 Statistiques
- [ ] Afficher 3 statistiques
- [ ] Visits: 0
- [ ] Reviews: 0
- [ ] Followers: 0

---

### PARTIE 4: Écran Home

#### 4.1 Affichage Principal
- [ ] 8 destinations affichées
- [ ] Chaque carte a une image
- [ ] Titre du lieu affiché
- [ ] Location (ville) affichée
- [ ] Rating et nombre d'avis affichés
- [ ] Bouton favoris (cœur) affichée
- [ ] Design card moderne avec ombre

#### 4.2 Recherche
- [ ] Barre de recherche en haut
- [ ] Placeholder "Search destinations..."
- [ ] Taper du texte filtre les lieux
- [ ] Cœur vide pour clear
- [ ] Résultats affichent le nombre
- [ ] Recherche par nom fonctionne
- [ ] Recherche par description fonctionne

#### 4.3 Catégories
- [ ] 6 catégories affichées horizontalement
- [ ] Chaque catégorie a une icône
- [ ] Labels corrects
- [ ] Cliquer catégorie filtre
- [ ] Catégorie sélectionnée en blanc
- [ ] Re-cliquer désélectionne
- [ ] Filtre + recherche ensemble OK

#### 4.4 Favoris
- [ ] Bouton cœur vide au départ
- [ ] Cliquer cœur = cœur rempli
- [ ] Re-cliquer = cœur vide
- [ ] Favoris persistent après reload

---

### PARTIE 5: Écran Favoris

#### 5.1 Avec Favoris
- [ ] Onglet "Saved" visible
- [ ] Seuls les favoris affichés
- [ ] Mêmes cartes que Home
- [ ] Nombre correct de favoris

#### 5.2 Sans Favoris
- [ ] Message "No Favorites Yet"
- [ ] Icône cœur vide
- [ ] Bouton "Explore" pour retourner

---

### PARTIE 6: Écran Détail

#### 6.1 Navigation & Affichage
- [ ] Cliquer sur une carte = détail
- [ ] Grande image du lieu
- [ ] Bouton back en haut gauche
- [ ] Bouton share en haut
- [ ] Bouton favorite en haut droit

#### 6.2 Informations
- [ ] Catégorie du lieu affichée (badge)
- [ ] Nom en grand
- [ ] Location avec icône
- [ ] Rating avec étoile + nombre avis
- [ ] Description complète
- [ ] Durée recommandée
- [ ] Prix d'entrée
- [ ] 2 cartes info (temps, prix)

#### 6.3 Actions
- [ ] Bouton "Call" fonctionne (intent)
- [ ] Bouton "Directions" fonctionne
- [ ] Bouton favorite toggle
- [ ] Cœur remplit quand favorite
- [ ] Bouton back retourne
- [ ] Bouton share affiche dialog

#### 6.4 Navigation
- [ ] Bouton back retourne à Home
- [ ] Favorite persist après retour

---

### PARTIE 7: Écran Carte

#### 7.1 Map Screen
- [ ] Onglet "Map" visible
- [ ] Message "Map Coming Soon"
- [ ] Icône map affichée
- [ ] Placeholder style OK

---

### PARTIE 8: Navigation

#### 8.1 Onglets
- [ ] 4 onglets en bas
- [ ] Home, Favorites, Map, Profile
- [ ] Icons corrects
- [ ] Active color = primary color
- [ ] Inactive color = gray

#### 8.2 Transitions
- [ ] Onglets changent fluidement
- [ ] Pas de lag
- [ ] Retour à même position après retour

#### 8.3 Avec Detail Screen
- [ ] Detail screen accessible depuis Home
- [ ] Detail screen accessible depuis Favorites
- [ ] Retour au bon onglet

---

### PARTIE 9: Intégration Supabase

#### 9.1 Database
- [ ] Table profiles existe
- [ ] Table favorites existe (optional)
- [ ] Table reviews existe (optional)
- [ ] RLS policies activées

#### 9.2 Authentication
- [ ] Users créés dans auth.users
- [ ] user_metadata contient full_name
- [ ] Profiles créés pour chaque user

#### 9.3 Storage
- [ ] Bucket avatars existe
- [ ] Bucket est public
- [ ] Photos uploadées correctement
- [ ] URLs sont accessibles

---

### PARTIE 10: Performance & Bugs

#### 10.1 Performance
- [ ] App démarre rapidement
- [ ] Transitions fluides
- [ ] Pas de lag lors du scroll
- [ ] Images chargent correctement
- [ ] Pas de crash

#### 10.2 Stabilité
- [ ] Pas d'erreur dans console
- [ ] Pas de crash lors du login
- [ ] Pas de crash lors du register
- [ ] Pas de crash lors de l'upload photo
- [ ] Pas de crash lors du scroll
- [ ] Pas de crash lors de la recherche

#### 10.3 Design
- [ ] Responsive sur tous les appareils
- [ ] Texte lisible partout
- [ ] Boutons cliquables facilement
- [ ] Couleurs cohérentes
- [ ] Espacement harmonieux
- [ ] Pas de contenu coupé

---

### PARTIE 11: Données

#### 11.1 Destinations
- [ ] 8 destinations affichées
- [ ] Toutes les images OK
- [ ] Tous les textes corrects
- [ ] Tous les prix affichés
- [ ] Toutes les catégories OK

#### 11.2 Favoris
- [ ] Favoris sauvegardés localement
- [ ] Favoris persistent après reload
- [ ] Ajouter/retirer favoris OK

---

## 📋 Résumé de Test

### Test Total: __ / 200 points

**Critères de succès:**
- ✅ 180+ points = Application prête
- ⚠️ 140-179 points = Bugs mineurs à corriger
- ❌ < 140 points = Problèmes majeurs

---

## 🐛 Bugs Rencontrés & Solutions

| Bug | Cause | Solution |
|-----|-------|----------|
| Photo ne s'affiche pas | Permissions storage | Vérifier bucket public |
| Login échoue | Credentials incorrects | Vérifier supabase.js |
| Images ne chargent pas | URL invalide | Vérifier TOURIST_PLACES |
| App crash | Dépendance manquante | npm install |
| Recherche lente | Performance | Vérifier useMemo |

---

## ✨ Points Forts de l'Application

✅ Authentification Supabase complète
✅ Gestion de profil avec photo
✅ 8 destinations touristiques réelles
✅ Interface moderne et intuitive
✅ Recherche et filtrage en temps réel
✅ Système de favoris
✅ Design responsive
✅ Code structuré et documenté
✅ Base de données intégrée
✅ Prêt pour le déploiement

---

## 📞 Support

Si un test échoue:
1. Consulter SETUP_GUIDE.md
2. Vérifier SUPABASE_SETUP.sql
3. Regarder la console pour les erreurs
4. Vérifier les permissions Supabase

---

**Date de test: __________**
**Testeur: __________**
**Statut: ☐ PASS   ☐ FAIL**

