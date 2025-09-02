#!/bin/bash

echo "🧹 Nettoyage des ressources CloudFront existantes..."

# Variables
PROJECT_NAME="portfolio-faycal"
REGION="eu-west-3"

echo "🔍 Recherche des distributions CloudFront existantes..."

# Lister les distributions CloudFront
DISTRIBUTIONS=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(Comment, '$PROJECT_NAME') || contains(Origins.Items[0].DomainName, '$PROJECT_NAME')].Id" --output text)

if [ -n "$DISTRIBUTIONS" ]; then
    echo "📋 Distributions trouvées: $DISTRIBUTIONS"
    
    for DIST_ID in $DISTRIBUTIONS; do
        echo "🗑️ Suppression de la distribution: $DIST_ID"
        
        # Désactiver la distribution
        aws cloudfront update-distribution \
            --id $DIST_ID \
            --distribution-config file://<(aws cloudfront get-distribution-config --id $DIST_ID --query 'DistributionConfig' --output json | jq '.Enabled = false') \
            --if-match $(aws cloudfront get-distribution-config --id $DIST_ID --query 'ETag' --output text)
        
        # Attendre que la distribution soit désactivée
        echo "⏳ Attente de la désactivation..."
        aws cloudfront wait distribution-deployed --id $DIST_ID
        
        # Supprimer la distribution
        aws cloudfront delete-distribution \
            --id $DIST_ID \
            --if-match $(aws cloudfront get-distribution-config --id $DIST_ID --query 'ETag' --output text)
        
        echo "✅ Distribution $DIST_ID supprimée"
    done
else
    echo "ℹ️ Aucune distribution CloudFront trouvée pour $PROJECT_NAME"
fi

echo "🔍 Recherche des OAC existants..."

# Lister les OAC existants
OAC_LIST=$(aws cloudfront list-origin-access-controls --query "OriginAccessControlList.Items[?contains(Name, '$PROJECT_NAME')].Id" --output text)

if [ -n "$OAC_LIST" ]; then
    echo "📋 OAC trouvés: $OAC_LIST"
    
    for OAC_ID in $OAC_LIST; do
        echo "🗑️ Suppression de l'OAC: $OAC_ID"
        aws cloudfront delete-origin-access-control --id $OAC_ID
        echo "✅ OAC $OAC_ID supprimé"
    done
else
    echo "ℹ️ Aucun OAC trouvé pour $PROJECT_NAME"
fi

echo "🔍 Recherche des certificats ACM existants..."

# Lister les certificats ACM
CERT_LIST=$(aws acm list-certificates --region us-east-1 --query "CertificateSummaryList[?contains(DomainName, 'faycal') || contains(DomainName, 'portfolio')].CertificateArn" --output text)

if [ -n "$CERT_LIST" ]; then
    echo "📋 Certificats trouvés: $CERT_LIST"
    
    for CERT_ARN in $CERT_LIST; do
        echo "🗑️ Suppression du certificat: $CERT_ARN"
        aws acm delete-certificate --certificate-arn $CERT_ARN --region us-east-1
        echo "✅ Certificat $CERT_ARN supprimé"
    done
else
    echo "ℹ️ Aucun certificat ACM trouvé"
fi

echo "🧹 Nettoyage terminé !"
echo "💡 Vous pouvez maintenant relancer le déploiement Terraform"
