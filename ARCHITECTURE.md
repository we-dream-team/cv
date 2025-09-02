# 🏗️ Architecture du Projet CV

Ce document explique l'architecture complète du projet et comment les différentes parties interagissent.

## 🎯 **Vue d'ensemble**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Lambda    │    │   Services      │
│   (S3 + CF)     │◄──►│   + API Gateway │◄──►│   (Resend)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 **Structure des composants**

### **1. Frontend Statique (S3 + CloudFront)**
- **S3 Bucket** : Stockage des fichiers statiques
- **CloudFront** : CDN et cache global
- **Route53** : Gestion DNS et domaine personnalisé

**Contenu :**
- ✅ Pages HTML statiques
- ✅ CSS, JavaScript, images
- ✅ Fichier PDF du CV
- ❌ **Pas d'API routes** (Next.js)

### **2. API Backend (Lambda + API Gateway)**
- **Lambda Function** : Logique des notifications
- **API Gateway** : Point d'entrée HTTP
- **IAM Roles** : Permissions et sécurité

**Fonctionnalités :**
- ✅ Endpoint `/notify` pour les notifications
- ✅ Intégration avec Resend
- ✅ Logs CloudWatch
- ✅ Gestion des erreurs

### **3. Services Externes**
- **Resend** : Service d'envoi d'emails
- **AWS IAM** : Gestion des permissions

## 🔄 **Flux de données**

### **Téléchargement du CV :**
```
1. Utilisateur visite le site (S3 + CloudFront)
2. Clic sur "Télécharger CV"
3. Modal de saisie d'email s'ouvre
4. Formulaire soumis vers API Gateway
5. Lambda traite la requête
6. Email envoyé via Resend
7. Réponse retournée au frontend
8. PDF téléchargé depuis S3
```

### **Architecture détaillée :**
```
┌─────────────┐  HTTP POST  ┌─────────────┐  AWS SDK  ┌─────────────┐
│   Frontend  │ ──────────► │ API Gateway │ ─────────► │   Lambda    │
│   (S3/CF)   │             │             │           │             │
└─────────────┘             └─────────────┘           └─────────────┘
                                                              │
                                                              ▼
                                                       ┌─────────────┐
                                                       │   Resend    │
                                                       │   (Email)   │
                                                       └─────────────┘
```

## 🚀 **Déploiement**

### **Workflow GitHub Actions :**
1. **Build** : Construction de l'app Next.js
2. **Lambda** : Construction et déploiement de la fonction
3. **Infra** : Déploiement Terraform (Lambda + API Gateway)
4. **S3** : Synchronisation des fichiers statiques
5. **CloudFront** : Invalidation du cache

### **Ordre des opérations :**
```
1. npm run build          → Génère ./out/
2. Build Lambda           → Génère lambda-notify.zip
3. Terraform apply        → Déploie Lambda + API Gateway
4. S3 sync               → Déploie frontend
5. CloudFront invalidation → Rafraîchit le cache
```

## 🔐 **Sécurité**

### **Secrets GitHub :**
- `RESEND_API_KEY` : Clé API Resend
- `RESEND_ACCOUNT_EMAIL` : Email de notification
- `AWS_ROLE_TO_ASSUME` : Rôle IAM pour déploiement
- `DISTRIBUTION_ID` : ID CloudFront

### **IAM Permissions :**
- **Lambda** : Exécution + logs CloudWatch
- **API Gateway** : Invocation Lambda
- **S3** : Lecture/écriture bucket
- **CloudFront** : Invalidation cache

## 💰 **Coûts estimés**

### **AWS (par mois) :**
- **S3** : ~$0.50 (stockage + requêtes)
- **CloudFront** : ~$1-5 (transfert de données)
- **Lambda** : ~$0.10 (1000 invocations)
- **API Gateway** : ~$1 (1M requêtes)
- **Route53** : ~$0.50 (zone hébergée)

**Total estimé : $3-8/mois**

### **Resend :**
- **Gratuit** : 100 emails/jour
- **Payant** : $20/mois pour 50k emails

## 🧪 **Tests et développement**

### **Local :**
```bash
# Frontend
npm run dev

# Test API
http://localhost:3000/test-api.html

# Test Lambda
cd lambda-notify && npm test
```

### **Production :**
```bash
# Déploiement automatique
git push origin main

# Vérification
- Site accessible
- API fonctionne
- Notifications reçues
```

## 🔧 **Maintenance**

### **Mise à jour Lambda :**
1. Modifier le code dans `lambda-notify/`
2. Push sur GitHub
3. Déploiement automatique

### **Mise à jour Frontend :**
1. Modifier le code Next.js
2. Push sur GitHub
3. Déploiement automatique

### **Monitoring :**
- **CloudWatch** : Logs Lambda
- **Resend Dashboard** : Emails envoyés
- **GitHub Actions** : Historique déploiements

## 🆘 **Dépannage**

### **Problèmes courants :**

#### **API ne répond pas :**
1. Vérifier que Lambda est déployée
2. Vérifier les permissions IAM
3. Vérifier les logs CloudWatch

#### **Emails non reçus :**
1. Vérifier la clé API Resend
2. Vérifier les variables d'environnement
3. Vérifier les logs Lambda

#### **Site non accessible :**
1. Vérifier le déploiement S3
2. Vérifier la configuration CloudFront
3. Vérifier les permissions bucket

## 📚 **Ressources**

- [Documentation Lambda](https://docs.aws.amazon.com/lambda/)
- [Documentation API Gateway](https://docs.aws.amazon.com/apigateway/)
- [Documentation Resend](https://resend.com/docs)
- [Documentation Terraform](https://www.terraform.io/docs)

---

**🎯 Cette architecture garantit un déploiement sécurisé, scalable et économique !**
