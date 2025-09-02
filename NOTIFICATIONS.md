# 🔔 Configuration des Notifications de Téléchargement

Ce guide explique comment configurer les notifications par email lorsque quelqu'un télécharge votre CV.

## 📋 Ce qui est déjà configuré

✅ **API Route créée** : `/api/notify`  
✅ **Formulaire modifié** : Envoi automatique de la notification  
✅ **Logs console** : Affichage des téléchargements en développement  

## 🚀 Options de configuration

### Option 1: Webhook personnalisé (Recommandé pour débuter)

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez votre URL de webhook :
   ```bash
   WEBHOOK_URL=https://votre-service.com/webhook
   ```

### Option 2: Service d'email Resend

1. Créez un compte sur [resend.com](https://resend.com)
2. Obtenez votre clé API
3. Ajoutez dans `.env.local` :
   ```bash
   RESEND_API_KEY=re_votre_cle_api
   ```

### Option 3: SendGrid

1. Créez un compte sur [sendgrid.com](https://sendgrid.com)
2. Obtenez votre clé API
3. Ajoutez dans `.env.local` :
   ```bash
   SENDGRID_API_KEY=SG.votre_cle_api
   ```

### Option 4: Mailgun

1. Créez un compte sur [mailgun.com](https://mailgun.com)
2. Obtenez votre clé API et domaine
3. Ajoutez dans `.env.local` :
   ```bash
   MAILGUN_API_KEY=votre_cle_api
   MAILGUN_DOMAIN=votre-domaine.com
   ```

## 🔧 Activation des notifications

1. **Décommentez** la section correspondante dans `src/app/api/notify/route.ts`
2. **Configurez** votre service d'email préféré
3. **Redémarrez** le serveur de développement

## 📊 Test des notifications

1. Démarrez le serveur : `npm run dev`
2. Ouvrez la console du navigateur (F12)
3. Téléchargez le CV avec un email
4. Vérifiez les logs dans la console et dans le terminal

## 📧 Format de la notification

Chaque notification contient :
- **Email du visiteur** qui a téléchargé le CV
- **Date et heure** du téléchargement
- **Timestamp** ISO pour le suivi

## 🆘 Dépannage

- **Vérifiez la console** du navigateur pour les erreurs
- **Vérifiez les logs** du serveur dans le terminal
- **Testez l'API** directement avec Postman ou curl

## 💡 Services recommandés

- **Débutant** : Webhook vers Zapier ou Make.com
- **Professionnel** : Resend ou SendGrid
- **Entreprise** : Mailgun ou AWS SES
