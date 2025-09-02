#!/bin/bash

echo "🧹 Nettoyage des buckets de logs CloudFront existants"
echo ""

# Vérifier que AWS CLI est configuré
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ Erreur: AWS CLI n'est pas configuré"
    echo "💡 Exécutez: aws configure"
    exit 1
fi

echo "✅ AWS CLI configuré"
echo ""

# Lister les buckets de logs CloudFront existants
echo "🔍 Recherche des buckets de logs CloudFront..."
BUCKETS=$(aws s3 ls | grep "cf-logs" | awk '{print $3}')

if [ -z "$BUCKETS" ]; then
    echo "ℹ️ Aucun bucket de logs CloudFront trouvé"
else
    echo "📋 Buckets de logs trouvés :"
    echo "$BUCKETS"
    echo ""
    
    # Supprimer chaque bucket
    for bucket in $BUCKETS; do
        echo "🗑️ Suppression du bucket: $bucket"
        
        # Vider le bucket d'abord
        echo "   - Vidage du bucket..."
        aws s3 rm s3://$bucket --recursive
        
        # Supprimer le bucket
        echo "   - Suppression du bucket..."
        aws s3 rb s3://$bucket --force
        
        if [ $? -eq 0 ]; then
            echo "   ✅ Bucket supprimé avec succès"
        else
            echo "   ⚠️ Erreur lors de la suppression (peut-être déjà supprimé)"
        fi
        echo ""
    done
fi

echo "🎉 Nettoyage terminé !"
echo ""
echo "💡 Vous pouvez maintenant relancer le déploiement Terraform"
