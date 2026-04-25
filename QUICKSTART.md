# 🚀 DÉMARRAGE RAPIDE - Tounsi Guide

## ⏱️ 5 minutes pour mettre en route l'application

### Étape 1: Installation (2 min)
```bash
cd tounsi-guide
npm install
```

### Étape 2: Configuration Supabase (2 min)

1. Aller sur https://supabase.com
2. Créer un compte (gratuit)
3. Créer un nouveau projet
4. Aller à Settings > API
5. Copier l'**URL** et la **ANON_KEY**
6. Ouvrir `supabase.js`
7. Remplacer les valeurs:
   ```javascript
   const SUPABASE_URL = 'VOTRE_URL_ICI'
   const SUPABASE_ANON_KEY = 'VOTRE_ANON_KEY_ICI'
   ```

### Étape 3: Setup Base de Données (1 min)

1. Dans Supabase, ouvrir "SQL Editor"
2. Copier le contenu de `SUPABASE_SETUP.sql`
3. Coller dans l'éditeur SQL
4. Cliquer "Execute" ou Cmd+Enter
5. Attendre que ça se termine ✅

### Étape 4: Créer le bucket Storage (1 min)

1. Aller à "Storage" dans Supabase
2. Cliquer "New Bucket"
3. Nommer: `avatars`
4. Cocher "Public bucket"
5. Cliquer "Create bucket" ✅

### Étape 5: Lancer l'app (1 min)
```bash
npm start
```

**Puis choisir:**
- `i` pour iOS
- `a` pour Android
- `w` pour Web
- Ou scanner le QR code avec Expo Go

---

## 🧪 Tester Immédiatement

### Compte de test
```
Email: test@example.com
Mot de passe: password123
```

Ou **créer votre propre compte**!

### Tester les features
1. ✅ **Login** - Se connecter
2. ✅ **Home** - Voir 8 destinations
3. ✅ **Recherche** - Chercher "Djerba"
4. ✅ **Filtrer** - Cliquer "Beaches"
5. ✅ **Favoris** - Ajouter ❤️
6. ✅ **Détails** - Cliquer une destination
7. ✅ **Profil** - Modifier infos
8. ✅ **Photo** - Ajouter une photo

---

## 📂 Structure du Projet

```
tounsi-guide/
├── App.js                    ← Navigation principale
├── context.js                ← Auth & Database
├── screens.js                ← Tous les écrans
├── components.js             ← Composants
├── styles.js                 ← Styles
├── data.js                   ← Destinations
├── supabase.js               ← Config (À CONFIGURER!)
│
├── SUPABASE_SETUP.sql        ← SQL à exécuter
├── SETUP_GUIDE.md            ← Guide complet
├── DEPLOYMENT_GUIDE.md       ← Déploiement
├── IMPLEMENTATION_SUMMARY.md ← Résumé
├── TEST_CHECKLIST.md         ← Tests
│
└── package.json              ← Dépendances
```

---

## 🎯 Checklist de Vérification

- [ ] Node.js installé
- [ ] npm install réussi
- [ ] Supabase account créé
- [ ] supabase.js configuré
- [ ] SQL exécuté dans Supabase
- [ ] Bucket 'avatars' créé
- [ ] npm start fonctionne
- [ ] App visible sur téléphone

---

## 🔍 Vérification Rapide

### Si ça ne marche pas:

**Erreur: "Cannot find module"**
```bash
npm install
npm start
```

**Erreur: "Supabase connection failed"**
- Vérifier les credentials dans supabase.js
- Vérifier la connexion internet
- Vérifier que le projet Supabase est actif

**Erreur: "Photo upload failed"**
- Vérifier le bucket 'avatars' existe
- Vérifier qu'il est PUBLIC
- Vérifier la taille de l'image (< 5MB)

**Erreur: "Login failed"**
- Vérifier l'email existe
- Vérifier le mot de passe (min 6 caractères)
- Vérifier la table 'profiles' existe

---

## 💡 Conseils Utiles

### Pour développer localement
```bash
npm start    # Démarre le serveur
# Puis appuyer sur 'a' ou 'i' ou 'w'
```

### Pour ajouter une destination
Ouvrir `data.js` et ajouter à `TOURIST_PLACES`:
```javascript
{
  id: 'new-place',
  name: 'Mon Lieu',
  location: 'Ma Ville',
  category: 'beach',
  image: 'url',
  rating: 4.5,
  reviews: 100,
  price: '10 DT',
  duration: '2 heures',
  description: 'Description...'
}
```

### Pour changer les couleurs
Ouvrir `data.js` et modifier `COLORS`:
```javascript
export const COLORS = {
  primary: '#E63946',   // Changez cette couleur
  // ...
};
```

---

## 📱 Fonctionnalités Principales

### Authentification ✅
- Login avec email/password
- Création de compte
- Déconnexion sécurisée

### Profil Utilisateur ✅
- Affichage des infos
- Modification des infos
- **Upload de photo**
- Statistiques

### Destinations ✅
- 8 destinations réelles
- Recherche en temps réel
- Filtrage par catégorie
- Favoris

### Interface ✅
- 4 onglets (Explore, Favoris, Carte, Profil)
- Design moderne
- Animations fluides
- Responsive

---

## 🚀 Prochaines Étapes

### Court terme
1. Tester tous les écrans
2. Vérifier les erreurs console
3. Tester sur téléphone réel
4. Ajouter plus de destinations

### Moyen terme
1. Intégrer Google Maps
2. Ajouter système d'avis
3. Ajouter notifications
4. Ajouter chat support

### Long terme
1. Déployer sur Google Play
2. Déployer sur App Store
3. Ajouter paiement
4. Ajouter réservations

---

## 📞 Support

**Documentation:**
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Installation détaillée
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Guide complet
- [TEST_CHECKLIST.md](./TEST_CHECKLIST.md) - Liste de test

**Ressources:**
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Supabase Docs](https://supabase.com/docs)
- [React Native](https://reactnative.dev)

---

## ✨ Points Clés

✅ **Authentification complète** - Login/Register fonctionnels
✅ **Gestion de profil** - Avec photo de profil
✅ **8 destinations** - Prêtes à l'emploi
✅ **Interface moderne** - Premium design
✅ **Supabase intégré** - Base de données complète
✅ **Code documenté** - Facile à comprendre
✅ **Prêt à déployer** - Juste configurer Supabase

---

## 🎉 C'est Prêt!

Votre application mobile **Tounsi Guide** est prête à être utilisée!

**Bon courage! 🚀**

**Dernière mise à jour: 2026-04-25**
