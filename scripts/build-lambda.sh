#!/bin/bash

echo "🔨 Construction de la fonction Lambda..."

# Aller dans le dossier lambda
cd lambda-notify

# Installer les dépendances et créer le zip
npm run build

echo "✅ Lambda construite avec succès !"
echo "📦 Fichier créé: lambda-notify.zip"

# Retourner à la racine
cd ..

echo "🚀 Prêt pour le déploiement Terraform !"
echo "💡 Exécutez: cd infra && terraform apply"
