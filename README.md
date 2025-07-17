<div align="center">
  ![Logo Axignis](./public/images/logo-axignis.png)

  <h1>Registre Sécurité API</h1>
  <p><strong>Un système complet de gestion de registre de sécurité construit avec NestJS</strong></p>
  
  [![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red.svg)](https://nestjs.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
  [![Docker](https://img.shields.io/badge/Docker-✓-blue.svg)](https://www.docker.com/)
  [![License](https://img.shields.io/badge/License-UNLICENSED-gray.svg)](LICENSE)
</div>

---

## 📋 Aperçu

**Registre Sécurité API** est un système robuste et évolutif de gestion de registre de sécurité conçu pour aider les organisations à maintenir des registres de sécurité complets, gérer les interventions, suivre les équipements et générer des rapports détaillés. Construit avec NestJS et TypeScript, il fournit une API REST sécurisée pour gérer tous les aspects de la conformité et de la documentation de sécurité.

## ✨ Fonctionnalités

### 🔐 Authentification et Autorisation

- **Authentification basée sur JWT** avec contrôle d'accès basé sur les rôles
- **Système multi-rôles** : Administrateur, Gestionnaire d'entreprise, Membre d'entreprise
- **Hachage sécurisé des mots de passe** et gestion des utilisateurs
- **Journalisation d'activité** pour les pistes d'audit

### 🏢 Gestion des Organisations

- **Gestion des entreprises** avec validation du numéro SIRET
- **Gestion des utilisateurs** avec attribution des rôles
- **Gestion des plans** avec types d'abonnement
- **Gestion des sites et bâtiments** avec structure hiérarchique

### 🏗️ Localisation et Infrastructure

- **Gestion des sites** avec associations d'entreprises
- **Gestion des bâtiments** avec catégories ERP et classifications IGH
- **Gestion des parties** avec suivi de conformité ICPE
- **Gestion des étages et lots** pour l'organisation détaillée des espaces

### 🔧 Équipements et Inventaire

- **Gestion des équipements** avec catégorisation par type et famille
- **Suivi des inventaires** avec gestion détaillée des articles
- **Gestion des marques et produits** avec groupes de compatibilité
- **Gestion des documents** pour les équipements et produits

### 🚨 Gestion des Interventions

- **Planification des interventions** et programmation
- **Suivi des statuts** (Planifié, En cours, Terminé, Annulé)
- **Catégorisation par type** pour différents types d'interventions
- **Attribution d'employés** et suivi des responsabilités

### 📊 Rapports et Observations

- **Génération de rapports** avec types personnalisables
- **Gestion des observations** avec suivi des statuts
- **Gestion des organisations** pour la catégorisation des rapports
- **Support des pièces jointes** pour la documentation

### 🔍 Fonctionnalités Avancées

- **Documentation API complète** avec Swagger/OpenAPI
- **Migrations de base de données** avec TypeORM
- **Fonctionnalité de suppression douce** pour la préservation des données
- **Support de pagination** pour les grands ensembles de données
- **Validation et gestion d'erreurs** avec messages d'erreur détaillés
- **Support CORS** pour les requêtes cross-origin

## 🏗️ Architecture

```
src/
├── auth/                 # Authentification et autorisation
├── users/               # Gestion des utilisateurs, entreprises et plans
├── location/            # Gestion des sites, bâtiments, parties
├── bet/                 # Gestion des équipements, inventaires, produits
├── intervention/        # Planification et suivi des interventions
├── report/              # Système de rapports et observations
├── activity-logger/     # Piste d'audit et journalisation d'activité
├── common/              # Utilitaires partagés et classes de base
├── config/              # Gestion de la configuration
├── orm/                 # Configuration et migrations de base de données
└── paginator/           # Utilitaires de pagination
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** (v18 ou supérieur)
- **PostgreSQL** (v16 ou supérieur)
- **Docker** (optionnel, pour la configuration conteneurisée)

### Installation

1. **Cloner le dépôt**

   ```bash
   git clone <url-du-depot>
   cd registre-securite-api
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configuration de l'environnement**

   ```bash
   cp .env.example .env
   # Éditer .env avec votre configuration
   ```

4. **Configuration de la base de données**

   ```bash
   # Utiliser Docker (recommandé)
   docker-compose up -d db

   # Ou se connecter à votre instance PostgreSQL
   ```

5. **Exécuter les migrations**

   ```bash
   npm run migration:run
   ```

6. **Démarrer l'application**

   ```bash
   # Mode développement
   npm run start:dev

   # Mode production
   npm run start:prod
   ```

### Configuration Docker

Pour une configuration complètement conteneurisée :

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f app
```

## 📚 Documentation API

Une fois l'application démarrée, vous pouvez accéder à la documentation API interactive :

- **Swagger UI** : `http://localhost:3004/api-docs`
- **URL de base de l'API** : `http://localhost:3004/api/v1`

### Authentification

La plupart des endpoints nécessitent une authentification. Incluez le token JWT dans l'en-tête Authorization :

```
Authorization: Bearer <votre-token-jwt>
```

### Endpoints Disponibles

| Module            | Endpoints                              | Description                                   |
| ----------------- | -------------------------------------- | --------------------------------------------- |
| **Auth**          | `/auth/*`                              | Authentification et inscription d'utilisateur |
| **Users**         | `/users/*`                             | Gestion des utilisateurs et entreprises       |
| **Location**      | `/sites/*`, `/buildings/*`, `/parts/*` | Gestion des sites et bâtiments                |
| **Equipment**     | `/equipment/*`, `/inventories/*`       | Gestion des équipements et inventaires        |
| **Interventions** | `/interventions/*`                     | Planification et suivi des interventions      |
| **Reports**       | `/reports/*`, `/observations/*`        | Système de rapports et observations           |

## 🛠️ Développement

### Scripts Disponibles

```bash
# Développement
npm run start:dev          # Démarrer en mode développement
npm run start:debug        # Démarrer avec le débogage activé

# Compilation
npm run build              # Compiler l'application
npm run start:prod         # Démarrer en mode production

# Base de données
npm run migration:create   # Créer une nouvelle migration
npm run migration:generate # Générer une migration à partir des changements
npm run migration:run      # Exécuter les migrations en attente
npm run migration:revert   # Annuler la dernière migration

# Tests
npm run test               # Exécuter les tests unitaires
npm run test:e2e           # Exécuter les tests end-to-end
npm run test:cov           # Exécuter les tests avec couverture

# Qualité du code
npm run lint               # Exécuter ESLint
npm run format             # Formater le code avec Prettier

# Utilitaires
npm run create-user        # Créer un nouvel utilisateur via CLI
```

### Variables d'Environnement

Créez un fichier `.env` avec les variables suivantes :

```env
# Application
NODE_ENV=development
PORT=3004
APP_URL=http://localhost:3004
API_VERSION=1

# Base de données
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=votre_utilisateur
POSTGRES_PASSWORD=votre_mot_de_passe
POSTGRES_NAME=registre-securite
POSTGRES_SYNCHRONIZE=false
POSTGRES_LOGGING=true

# JWT
JWT_SECRET=votre_secret_jwt
JWT_DURATION=3600

# APIs externes
BET_BASE_URL=http://localhost:3005/api/v1
BET_API_KEY=votre_cle_api

# Email (optionnel)
MAIL_HOST=smtp.exemple.com
MAIL_PORT=587
MAIL_USER=votre_email
MAIL_PASS=votre_mot_de_passe
MAIL_FROM=noreply@exemple.com
MAIL_SECURE=false
MAIL_ADMIN=admin@exemple.com
```

## 🧪 Tests

```bash
# Exécuter tous les tests
npm run test

# Exécuter les tests en mode watch
npm run test:watch

# Exécuter les tests end-to-end
npm run test:e2e

# Générer le rapport de couverture
npm run test:cov
```

## 📦 Déploiement

### Build de Production

```bash
# Compiler l'application
npm run build

# Démarrer le serveur de production
npm run start:prod
```

### Déploiement Docker

```bash
# Compiler et exécuter avec Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Ou compiler manuellement
docker build -t registre-securite-api .
docker run -p 3004:3004 registre-securite-api
```

## Conventions

- **Commits**: Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/)
- **Branches**: `feature/*`, `fix/*`, `refactor/*`, etc.
- **Pull Requests**: Pull requests obligatoires pour `main` et `dev`

## 👨‍💻 Contributeurs

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LoanCB">
        <img src="https://github.com/LoanCB.png" width="100px;" alt="Loan Courchinoux-Billonnet"/>
        <br />
        <sub><b>Loan Courchinoux-Billonnet</b></sub>
      </a>
      <br />
      <sub>LoanCB</sub>
    </td>
    <td align="center">
      <a href="https://github.com/operdrix">
        <img src="https://github.com/operdrix.png" width="100px;" alt="Olivier PERDRIX"/>
        <br />
        <sub><b>Olivier PERDRIX</b></sub>
      </a>
      <br />
      <sub>operdrix</sub>
    </td>
    <td align="center">
      <a href="https://github.com/s-kenza">
        <img src="https://github.com/s-kenza.png" width="100px;" alt="Kenza Schuler"/>
        <br />
        <sub><b>Kenza Schuler</b></sub>
      </a>
      <br />
      <sub>s-kenza</sub>
    </td>
  </tr>
</table>

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE).

## 🙏 Remerciements

- L'équipe Axignis pour leur vision et leur expertise
- Tous les contributeurs qui ont rendu ce projet possible

---

<div align="center">
  <p>Construit avec ❤️ en utilisant <a href="https://nestjs.com">NestJS</a></p>
  <p><em>Registre Sécurité API - Gestion Complète du Registre de Sécurité</em></p>
</div>
