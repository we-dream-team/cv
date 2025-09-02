# 🆘 Guide de Dépannage

Ce guide vous aide à résoudre les problèmes courants rencontrés lors du déploiement.

## 🚨 **Erreurs Terraform courantes**

### **1. Erreur "Terraform Format Check"**

**Symptôme :**
```
Error: Terraform exited with code 3.
Error: Process completed with exit code 1.
step: 🔍 Terraform Format Check
```

**Cause :** Les fichiers Terraform ne sont pas formatés correctement.

**Solution :**
```bash
# Localement
cd infra
terraform fmt -recursive

# Ou via le workflow (automatique)
git push origin main
```

### **2. Erreur "Backend configuration"**

**Symptôme :**
```
Error: Backend configuration changed
```

**Cause :** Changement de configuration du backend Terraform.

**Solution :**
```bash
cd infra
terraform init -reconfigure
```

### **3. Erreur "Provider not found"**

**Symptôme :**
```
Error: Failed to query available provider packages
```

**Cause :** Version du provider AWS incompatible.

**Solution :**
```bash
cd infra
terraform init -upgrade
```

## 🔧 **Dépannage des workflows GitHub Actions**

### **1. Workflow Infrastructure ne se lance pas**

**Vérifiez :**
- [ ] Modifications dans le dossier `infra/`
- [ ] Branche `main` (pas `master`)
- [ ] Permissions du repository

**Déclenchement manuel :**
1. Allez dans Actions
2. Sélectionnez "🏗️ Deploy Infrastructure"
3. Cliquez sur "Run workflow"

### **2. Workflow Deploy ne se lance pas**

**Vérifiez :**
- [ ] Push sur la branche `main`
- [ ] Infrastructure déjà déployée
- [ ] Secrets GitHub configurés

## 🐛 **Problèmes de déploiement**

### **1. Lambda ne se déploie pas**

**Vérifiez :**
```bash
# Construction locale
cd lambda-notify
npm install --production
zip -r ../infra/lambda-notify.zip .
```

**Logs :**
- Vérifiez les logs du workflow GitHub Actions
- Vérifiez CloudWatch pour les erreurs Lambda

### **2. API Gateway inaccessible**

**Vérifiez :**
- [ ] Lambda déployée avec succès
- [ ] Permissions IAM correctes
- [ ] URL de l'API Gateway dans les outputs

**Test :**
```bash
curl -X POST https://votre-api-gateway-url/notify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","downloadTime":"test"}'
```

### **3. S3 sync échoue**

**Vérifiez :**
- [ ] Permissions AWS correctes
- [ ] Nom du bucket correct
- [ ] Rôle IAM avec permissions S3

## 🔍 **Commandes de diagnostic**

### **Terraform :**
```bash
cd infra

# Vérifier l'état
terraform show

# Vérifier le plan
terraform plan

# Vérifier la configuration
terraform validate

# Formater les fichiers
terraform fmt -recursive
```

### **AWS CLI :**
```bash
# Vérifier les buckets S3
aws s3 ls

# Vérifier les fonctions Lambda
aws lambda list-functions

# Vérifier les distributions CloudFront
aws cloudfront list-distributions
```

### **Local :**
```bash
# Tester l'API localement
npm run dev
curl http://localhost:3000/api/notify

# Tester la Lambda
cd lambda-notify
node -e "require('./index.js').handler({body: '{\"email\":\"test@example.com\",\"downloadTime\":\"test\"}'})"
```

## 📋 **Checklist de résolution**

### **Avant de déployer :**
- [ ] `terraform fmt -recursive` exécuté
- [ ] `terraform validate` passe
- [ ] Lambda construite (`lambda-notify.zip` existe)
- [ ] Secrets GitHub configurés

### **Après déploiement :**
- [ ] Infrastructure accessible (API Gateway)
- [ ] Frontend accessible (S3 + CloudFront)
- [ ] Notifications fonctionnent
- [ ] Logs CloudWatch disponibles

## 🚀 **Solutions rapides**

### **Redémarrage complet :**
```bash
# 1. Nettoyer
cd infra
terraform destroy -auto-approve
rm -rf .terraform

# 2. Reconstruire
terraform init
terraform apply -auto-approve
```

### **Mise à jour des secrets :**
1. Allez dans Settings → Secrets and variables → Actions
2. Mettez à jour les secrets nécessaires
3. Relancez le workflow manuellement

### **Debug du workflow :**
1. Ajoutez `ACTIONS_STEP_DEBUG: true` dans les secrets
2. Relancez le workflow
3. Vérifiez les logs détaillés

## 📞 **Support**

Si les problèmes persistent :

1. **Vérifiez les logs** GitHub Actions
2. **Consultez CloudWatch** pour les erreurs AWS
3. **Testez localement** avec les commandes ci-dessus
4. **Vérifiez la documentation** [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**💡 La plupart des problèmes se résolvent avec un redémarrage du workflow !**
