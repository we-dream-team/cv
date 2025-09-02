# 🚨 Résolution des Conflits CloudFront

Ce guide vous aide à résoudre l'erreur `OriginAccessControlAlreadyExists` lors du déploiement Terraform.

## 🚨 **Erreur rencontrée :**

```
Error: operation error CloudFront: CreateOriginAccessControl, 
https response error StatusCode: 409, 
OriginAccessControlAlreadyExists: An origin access control with the same name already exists.
```

## 🔍 **Cause du problème :**

Cette erreur se produit quand :
- Un OAC avec le même nom existe déjà dans votre compte AWS
- L'infrastructure a été partiellement déployée précédemment
- Il y a eu un échec lors d'un déploiement précédent

## 🛠️ **Solutions :**

### **Option 1 : Nettoyage automatique (Recommandé)**

Utilisez le script de nettoyage fourni :

```bash
# Exécuter le script de nettoyage
./infra/cleanup-cloudfront.sh

# Puis relancer le déploiement
cd infra
terraform apply -auto-approve
```

### **Option 2 : Nettoyage manuel via AWS CLI**

```bash
# 1. Lister les OAC existants
aws cloudfront list-origin-access-controls

# 2. Supprimer l'OAC problématique
aws cloudfront delete-origin-access-control --id OAC_ID

# 3. Lister les distributions CloudFront
aws cloudfront list-distributions

# 4. Désactiver et supprimer la distribution
aws cloudfront update-distribution --id DIST_ID --distribution-config '{"Enabled": false}'
aws cloudfront wait distribution-deployed --id DIST_ID
aws cloudfront delete-distribution --id DIST_ID
```

### **Option 3 : Nettoyage via la console AWS**

1. **Allez dans CloudFront** → **Distributions**
2. **Supprimez la distribution** existante
3. **Allez dans Origin Access Control**
4. **Supprimez l'OAC** existant
5. **Relancez le déploiement Terraform**

## 🔧 **Corrections apportées :**

### **1. Noms uniques pour les OAC :**
```hcl
# Avant (problématique)
name = "${var.project_name}-oac"

# Après (solution)
name = "${var.project_name}-oac-${random_id.suffix.hex}"
```

### **2. Gestion du cycle de vie :**
```hcl
lifecycle {
  create_before_destroy = true
}
```

### **3. Script de nettoyage automatique :**
- Suppression des distributions CloudFront
- Suppression des OAC existants
- Suppression des certificats ACM

## 📋 **Étapes de résolution complètes :**

### **Étape 1 : Nettoyage**
```bash
# Exécuter le script de nettoyage
./infra/cleanup-cloudfront.sh
```

### **Étape 2 : Vérification**
```bash
# Vérifier qu'aucune ressource CloudFront n'existe
aws cloudfront list-distributions
aws cloudfront list-origin-access-controls
```

### **Étape 3 : Redéploiement**
```bash
cd infra
terraform apply -auto-approve
```

## 🚀 **Prévention des conflits futurs :**

### **1. Utilisation de noms uniques :**
- Toutes les ressources utilisent maintenant `random_id.suffix.hex`
- Évite les conflits de noms

### **2. Gestion du cycle de vie :**
- `create_before_destroy = true` pour les ressources critiques
- Suppression propre des anciennes ressources

### **3. Script de nettoyage :**
- Automatise la suppression des ressources existantes
- Facilite la résolution des conflits

## 🔍 **Vérification post-déploiement :**

### **1. Vérifier les ressources créées :**
```bash
# Vérifier l'OAC
aws cloudfront list-origin-access-controls

# Vérifier la distribution
aws cloudfront list-distributions

# Vérifier les outputs Terraform
terraform output
```

### **2. Tester l'accès :**
```bash
# Tester l'URL CloudFront
curl -I https://votre-distribution-id.cloudfront.net

# Vérifier les logs
aws logs describe-log-groups --log-group-name-prefix "/aws/cloudfront"
```

## 🆘 **En cas de problème persistant :**

### **1. Vérifiez les permissions AWS :**
```bash
# Tester les permissions
aws sts get-caller-identity
aws cloudfront list-distributions
```

### **2. Vérifiez la configuration Terraform :**
```bash
cd infra
terraform plan
terraform validate
```

### **3. Consultez les logs :**
- Logs CloudWatch
- Logs GitHub Actions
- Console AWS

## 💡 **Conseils :**

1. **Toujours nettoyer** avant de redéployer
2. **Utiliser le script** de nettoyage fourni
3. **Vérifier les noms** des ressources existantes
4. **Consulter la console AWS** pour identifier les conflits

---

**🎯 Avec ces corrections, vos déploiements CloudFront ne devraient plus avoir de conflits !**
