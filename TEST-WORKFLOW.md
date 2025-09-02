# 🧪 Test du Workflow d'Infrastructure

Ce guide explique comment tester le workflow GitHub Actions pour l'infrastructure Terraform.

## 🚀 **Comment tester le workflow :**

### **1. Modification automatique (Recommandé)**
Faites une modification dans le dossier `infra/` :

```bash
# Exemple : modifiez une variable
echo "# Test modification" >> infra/terraform.tfvars.template

# Ou modifiez un fichier Terraform
echo "# Test comment" >> infra/lambda-notify.tf

# Commit et push
git add infra/
git commit -m "test: modification infrastructure"
git push origin main
```

### **2. Déclenchement manuel**
1. Allez dans **Actions** sur GitHub
2. Sélectionnez **🏗️ Deploy Infrastructure**
3. Cliquez sur **Run workflow**
4. Sélectionnez la branche `main`
5. Cliquez sur **Run workflow**

## 🔍 **Vérification du workflow :**

### **Étapes attendues :**
1. ✅ **📥 Checkout code** - Récupération du code
2. ✅ **🟢 Setup Node.js** - Configuration Node.js 20
3. ✅ **📋 Setup Terraform** - Installation Terraform 1.6.0
4. ✅ **📋 Setup AWS credentials** - Configuration AWS
5. ✅ **🔨 Build Lambda Function** - Construction de la Lambda
6. ✅ **🔧 Setup Terraform Variables** - Configuration des variables
7. ✅ **🔍 Terraform Init** - Initialisation Terraform
8. ✅ **🎨 Terraform Format** - Formatage automatique
9. ✅ **🔍 Terraform Validate** - Validation de la configuration
10. ✅ **📋 Terraform Plan** - Génération du plan
11. ✅ **🚀 Terraform Apply** - Déploiement (sur main uniquement)
12. ✅ **📤 Terraform Outputs** - Affichage des résultats

## 📋 **Secrets GitHub requis :**

| Secret | Description | Exemple |
|--------|-------------|---------|
| `AWS_ROLE_TO_ASSUME` | Rôle IAM pour déploiement | `arn:aws:iam::123456789012:role/github-actions` |
| `RESEND_API_KEY` | Clé API Resend | `re_abc123...` |
| `RESEND_ACCOUNT_EMAIL` | Email Resend | `votre@email.com` |

## 🔧 **Configuration des secrets :**

1. **Allez dans votre repo GitHub**
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. **Ajoutez les 3 secrets ci-dessus**

## 🚨 **Problèmes courants :**

### **Erreur "AWS credentials"**
- Vérifiez que `AWS_ROLE_TO_ASSUME` est configuré
- Vérifiez les permissions du rôle IAM

### **Erreur "Resend variables"**
- Vérifiez que `RESEND_API_KEY` est configuré
- Vérifiez que `RESEND_ACCOUNT_EMAIL` est configuré

### **Erreur "Terraform plan"**
- Vérifiez la configuration Terraform
- Vérifiez les variables requises

## 📊 **Vérification du déploiement :**

### **1. Vérifiez les outputs Terraform :**
Dans les logs du workflow, vous devriez voir :
```
📊 Outputs Terraform:
notify_api_url = "https://abc123.execute-api.eu-west-3.amazonaws.com/prod/notify"
```

### **2. Vérifiez AWS :**
```bash
# Vérifiez la Lambda
aws lambda list-functions --region eu-west-3

# Vérifiez l'API Gateway
aws apigateway get-rest-apis --region eu-west-3

# Vérifiez le bucket S3
aws s3 ls s3://portfolio-faycal-site-bucket-cv
```

### **3. Testez l'API :**
```bash
# Remplacez par votre URL
curl -X POST https://abc123.execute-api.eu-west-3.amazonaws.com/prod/notify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","downloadTime":"test"}'
```

## 🎯 **Test complet recommandé :**

### **Étape 1 : Test du workflow Infrastructure**
```bash
# Modifiez un fichier dans infra/
echo "# Test workflow" >> infra/README.md
git add infra/
git commit -m "test: workflow infrastructure"
git push origin main
```

### **Étape 2 : Vérification du déploiement**
- ✅ Workflow se lance automatiquement
- ✅ Infrastructure déployée avec succès
- ✅ Outputs affichés dans les logs

### **Étape 3 : Test de l'API**
- ✅ API Gateway accessible
- ✅ Lambda fonctionne
- ✅ Notifications envoyées

## 💡 **Conseils de test :**

1. **Commencez par de petites modifications** dans `infra/`
2. **Vérifiez les logs en temps réel** sur GitHub
3. **Testez l'API après déploiement**
4. **Vérifiez les ressources AWS** créées

## 🆘 **En cas de problème :**

1. **Vérifiez les logs** du workflow
2. **Consultez TROUBLESHOOTING.md**
3. **Vérifiez la configuration** des secrets
4. **Testez localement** avec `terraform plan`

---

**🎯 Votre infrastructure se déploie maintenant automatiquement !**
