#!/bin/bash

echo "🔨 Construction de la fonction Lambda..."

# Aller dans le dossier lambda depuis infra
cd ../lambda-notify

# Installer les dépendances et créer le zip
npm install --production
zip -r ../infra/lambda-notify.zip .

echo "✅ Lambda construite avec succès !"
echo "📦 Fichier créé: infra/lambda-notify.zip"

# Retourner dans infra
cd ../infra

echo "🚀 Prêt pour le déploiement Terraform !"
echo "💡 Exécutez: terraform apply"
