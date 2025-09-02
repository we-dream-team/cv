# 🚀 Configuration Rapide - Resend

## ⚡ Étapes à suivre :

### 1. **Obtenir votre clé API Resend :**
- Allez sur [resend.com](https://resend.com)
- Créez un compte gratuit
- Dans le dashboard → "API Keys" → "Create API Key"
- Copiez la clé qui commence par `re_`

### 2. **Configurer votre fichier .env.local :**
```bash
# Copiez ce fichier et remplacez par vos vraies valeurs
RESEND_API_KEY=re_votre_vraie_cle_api
NOTIFICATION_EMAIL=faycal.zouaoui@wedreamteam.com
```

### 3. **Redémarrer le serveur :**
```bash
npm run dev
```

### 4. **Tester :**
- Téléchargez le CV avec un email
- Vérifiez votre boîte email
- Vérifiez la console du navigateur et du serveur

## 📧 Format de l'email reçu :

Vous recevrez un email avec :
- **Sujet** : 🎯 Nouveau téléchargement de CV
- **Contenu** : Email du visiteur + date/heure + timestamp
- **Design** : Email HTML professionnel et responsive

## 🔧 Dépannage :

- **Clé API manquante** : Vérifiez le fichier `.env.local`
- **Email non reçu** : Vérifiez les logs dans la console
- **Erreur Resend** : Vérifiez que votre compte est activé

## 💡 Avantages de Resend :

- ✅ 100 emails gratuits/jour
- ✅ API simple et moderne
- ✅ Délivrabilité excellente
- ✅ Support TypeScript natif
- ✅ Dashboard en temps réel
