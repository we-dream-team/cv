# 🎯 CV Fayçal ZOUAOUI - Portfolio Professionnel

Portfolio moderne et interactif développé avec Next.js, TypeScript et Tailwind CSS. Inclut un système de notifications automatiques lors du téléchargement du CV.

## ✨ Fonctionnalités

### 🎨 Interface
- **Design moderne** avec thème clair/sombre
- **Responsive** pour tous les appareils
- **Interface intuitive** avec recherche et filtres
- **Mode impression** optimisé pour le PDF

### 📊 Contenu
- **Profil professionnel** complet
- **Historique des missions** détaillé
- **Compétences techniques** avec tags
- **Statistiques** en temps réel

### 🔔 Notifications
- **Système de notifications** automatiques
- **Formulaire de saisie d'email** avant téléchargement
- **Notifications par email** via Resend
- **Suivi des téléchargements** avec logs

### 📱 Responsive
- **Mobile-first** design
- **Navigation intuitive**
- **Performance optimisée**

## 🚀 Technologies utilisées

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **Email** : Resend API
- **Infrastructure** : AWS (S3 + CloudFront + Route53)

## 📋 Prérequis

- Node.js >= 18
- npm ou yarn
- Compte Resend pour les notifications
- AWS CLI (pour le déploiement)

## 🛠️ Installation

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd cv-clean
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration des variables d'environnement

#### **Option A : Développement local**
```bash
# Copier le fichier d'exemple
cp env.example .env.local

# Configurer avec vos vraies valeurs
RESEND_API_KEY=re_votre_cle_api
RESEND_ACCOUNT_EMAIL=votre.email.personnel@gmail.com
```

#### **Option B : Production avec GitHub Secrets (Recommandé)**
Suivez le guide [GITHUB-SECRETS.md](./GITHUB-SECRETS.md) pour configurer vos secrets GitHub.

### 4. Lancer en développement
```bash
npm run dev
```

Votre CV sera accessible sur `http://localhost:3000`

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `RESEND_API_KEY` | Clé API Resend pour les notifications | `re_abc123...` |
| `RESEND_ACCOUNT_EMAIL` | Email personnel de votre compte Resend | `votre@email.com` |

### Configuration Resend

1. **Créer un compte** sur [resend.com](https://resend.com)
2. **Obtenir votre clé API** dans le dashboard
3. **Configurer votre domaine** (ou utiliser le domaine de test)
4. **Mettre à jour `.env.local`** avec vos informations

## 🧪 Tests

### Test de l'API
```bash
# Page de test des notifications
http://localhost:3000/test-api.html
```

### Test des notifications
1. Ouvrir la console du navigateur (F12)
2. Télécharger le CV avec un email
3. Vérifier les logs dans la console
4. Vérifier votre boîte email

## 🚀 Déploiement

### Déploiement local
```bash
npm run build
npm start
```

### Déploiement sur AWS

#### **Option A : Déploiement manuel**
```bash
# 1. Build de l'application
npm run build

# 2. Déploiement Terraform
cd infra
terraform plan -out tf.plan
terraform apply tf.plan

# 3. Sync vers S3
cd ..
aws s3 sync ./out s3://$(terraform -chdir=infra output -raw site_bucket_name) --delete

# 4. Invalidation CloudFront
aws cloudfront create-invalidation --distribution-id $(terraform -chdir=infra output -raw cloudfront_distribution_id) --paths "/*"
```

#### **Option B : Déploiement automatique (Recommandé)**
Le projet inclut un workflow GitHub Actions qui déploie automatiquement à chaque push sur la branche `main`.

**Configuration requise :**
1. Configurez vos [secrets GitHub](./GITHUB-SECRETS.md)
2. Faites un push sur la branche `main`
3. Le déploiement se lance automatiquement

**Avantages :**
- ✅ Déploiement automatique
- ✅ Sécurisé avec secrets GitHub
- ✅ Pas de clés API dans le code
- ✅ Traçabilité des déploiements

## 📁 Structure du projet

```
cv-clean/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── notify/          # API notifications
│   │   ├── globals.css          # Styles globaux
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Page principale du CV
│   └── ...
├── infra/                        # Infrastructure Terraform
├── public/                       # Assets statiques
├── .env.local                    # Variables locales
├── env.production               # Variables de production
└── README.md                    # Ce fichier
```

## 🔧 Fonctionnalités avancées

### Système de notifications
- **API Route** : `/api/notify`
- **Validation** des données d'entrée
- **Gestion d'erreurs** robuste
- **Logs détaillés** pour le débogage

### Compteur de visites
- **Compteur invisible** sur la page
- **Stockage local** avec localStorage
- **Visible uniquement** lors de l'inspection

### Recherche et filtres
- **Recherche textuelle** dans tout le contenu
- **Filtrage par technologies** avec tags
- **Interface intuitive** avec boutons de réinitialisation

## 🆘 Dépannage

### Problèmes courants

#### Notifications non reçues
1. **Vérifier la clé API** Resend dans `.env.local`
2. **Vérifier l'email** de notification
3. **Consulter les logs** du serveur
4. **Vérifier le compte** Resend

#### Erreurs de build
1. **Vérifier les dépendances** : `npm install`
2. **Vérifier TypeScript** : `npm run lint`
3. **Nettoyer le cache** : `rm -rf .next out`

#### Problèmes de déploiement
1. **Vérifier AWS CLI** : `aws configure`
2. **Vérifier Terraform** : `terraform version`
3. **Vérifier les permissions** AWS

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Resend](https://resend.com/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Terraform](https://www.terraform.io/docs)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Email** : faycal.zouaoui@wedreamteam.com
- **LinkedIn** : [Fayçal ZOUAOUI](http://www.linkedin.com/in/faycal-zouaoui-65b0a5201)
- **Site** : [Portfolio en ligne](https://votre-domaine.com)

---

**Développé avec ❤️ par Fayçal ZOUAOUI**
