# 🔐 Configuration des Secrets GitHub

Ce guide explique comment configurer les secrets GitHub pour sécuriser vos clés API et informations sensibles.

## ⚠️ **Pourquoi utiliser les secrets GitHub ?**

- ✅ **Sécurité** : Les clés API ne sont jamais exposées dans le code
- ✅ **Collaboration** : L'équipe peut travailler sans partager les secrets
- ✅ **Automatisation** : Déploiement automatique sécurisé
- ✅ **Audit** : Traçabilité des accès aux secrets

## 🚀 **Configuration des Secrets**

### 1. **Accéder aux secrets GitHub :**
1. Allez dans votre repository GitHub
2. Cliquez sur **Settings** (onglet)
3. Dans le menu gauche, cliquez sur **Secrets and variables**
4. Sélectionnez **Actions**

### 2. **Ajouter les secrets requis :**

#### **Secrets Resend :**
| Nom du secret | Description | Exemple |
|---------------|-------------|---------|
| `RESEND_API_KEY` | Votre clé API Resend | `re_d1qN26Fd_EHQ1QyLXL5nhB6wAwt7jMjxa` |
| `RESEND_ACCOUNT_EMAIL` | Email de votre compte Resend | `votre.email@gmail.com` |

#### **Secrets AWS :**
| Nom du secret | Description | Exemple |
|---------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | Clé d'accès AWS | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | Clé secrète AWS | `wJalr...` |

### 3. **Comment ajouter un secret :**
1. Cliquez sur **"New repository secret"**
2. **Name** : Entrez le nom du secret (ex: `RESEND_API_KEY`)
3. **Value** : Entrez la valeur du secret
4. Cliquez sur **"Add secret"**

## 🔧 **Utilisation dans le Workflow**

Le workflow GitHub Actions utilise automatiquement ces secrets :

```yaml
- name: 🔧 Setup environment variables
  run: |
    echo "RESEND_API_KEY=${{ secrets.RESEND_API_KEY }}" >> .env.production
    echo "RESEND_ACCOUNT_EMAIL=${{ secrets.RESEND_ACCOUNT_EMAIL }}" >> .env.production
```

## 📋 **Liste complète des secrets à configurer :**

### **Obligatoires :**
- `RESEND_API_KEY` - Clé API Resend
- `RESEND_ACCOUNT_EMAIL` - Email Resend
- `AWS_ACCESS_KEY_ID` - Clé AWS
- `AWS_SECRET_ACCESS_KEY` - Clé secrète AWS

### **Optionnels :**
- `AWS_REGION` - Région AWS (par défaut: eu-west-3)

## 🚨 **Sécurité des secrets :**

### **Ne jamais commiter :**
- ❌ `.env.local`
- ❌ `.env.production`
- ❌ Fichiers contenant des clés API
- ❌ Clés dans le code source

### **Toujours utiliser :**
- ✅ Secrets GitHub
- ✅ Variables d'environnement dans les workflows
- ✅ Fichiers `.env.example` (sans vraies valeurs)

## 🔍 **Vérification de la configuration :**

### 1. **Vérifier les secrets :**
- Repository → Settings → Secrets and variables → Actions
- Vérifiez que tous les secrets sont présents

### 2. **Tester le workflow :**
- Faites un push sur la branche main
- Vérifiez que le workflow se lance
- Vérifiez les logs pour les erreurs

### 3. **Vérifier le déploiement :**
- Vérifiez que votre site est mis à jour
- Vérifiez que les notifications fonctionnent

## 🆘 **Dépannage des secrets :**

### **Erreur "Secret not found" :**
1. Vérifiez le nom exact du secret
2. Vérifiez que le secret est dans le bon repository
3. Vérifiez les permissions du workflow

### **Erreur "Invalid secret value" :**
1. Vérifiez que la valeur du secret est correcte
2. Vérifiez qu'il n'y a pas d'espaces en trop
3. Vérifiez le format de la clé API

### **Erreur AWS :**
1. Vérifiez que les clés AWS sont valides
2. Vérifiez les permissions IAM
3. Vérifiez la région AWS

## 💡 **Bonnes pratiques :**

1. **Rotation régulière** des clés API
2. **Permissions minimales** pour les clés AWS
3. **Audit régulier** des secrets utilisés
4. **Documentation** des secrets requis
5. **Tests** du workflow avant production

## 🔄 **Mise à jour des secrets :**

Pour modifier un secret :
1. Allez dans Settings → Secrets and variables → Actions
2. Cliquez sur le secret à modifier
3. Cliquez sur **"Update"**
4. Entrez la nouvelle valeur
5. Cliquez sur **"Update secret"**

---

**🎯 Votre CV est maintenant configuré de manière sécurisée avec GitHub Actions !**
