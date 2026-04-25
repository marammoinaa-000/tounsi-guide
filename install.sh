#!/bin/bash
# Installation et démarrage rapide de Tounsi Guide

echo "🇹🇳 Bienvenue dans Tounsi Guide - Application Tourisme Tunisie"
echo "============================================================="
echo ""

echo "📦 Étape 1: Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation. Assurez-vous que Node.js est installé."
    echo "Télécharger Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Dépendances installées avec succès!"
echo ""

echo "⚙️ Étape 2: Configuration Supabase requise"
echo "=========================================="
echo ""
echo "1. Allez sur https://supabase.com"
echo "2. Créez un nouveau projet (c'est gratuit!)"
echo "3. Dans Project Settings > API > URL et anon key"
echo "4. Ouvrez supabase.js et mettez à jour:"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_ANON_KEY"
echo ""
echo "5. Exécutez les commandes SQL dans SUPABASE_SETUP.sql"
echo "6. Créez un bucket 'avatars' en Storage"
echo ""

read -p "Avez-vous configuré Supabase? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Vous pouvez configurer Supabase plus tard."
    echo "Consultez SETUP_GUIDE.md pour les détails."
fi

echo ""
echo "🚀 Étape 3: Démarrage de l'application"
echo "======================================"
echo ""
echo "Appuyez sur Entrée pour démarrer..."
read

npm start

echo ""
echo "📱 Instructions:"
echo "- iOS: Appuyez sur 'i'"
echo "- Android: Appuyez sur 'a'"
echo "- Web: Appuyez sur 'w'"
echo "- QR Code: Scannez avec Expo Go (https://expo.dev/client)"
echo ""
