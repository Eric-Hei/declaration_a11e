# Téléservice de dépôt des déclarations d'accessibilité

![Logo République Française](https://user-images.githubusercontent.com/1234567/example-image-url.png)

## 📋 Présentation

Application web permettant aux organismes publics et aux organismes privés chargés d'une mission de service public de créer, gérer et publier leurs déclarations d'accessibilité conformément aux obligations légales en vigueur.

Ce projet a été développé en utilisant le [Design System de l'État](https://www.systeme-de-design.gouv.fr/) (DSFR) pour garantir une cohérence visuelle avec les autres services publics numériques.

## ✨ Fonctionnalités

- **Création de déclarations** : Formulaire en 4 étapes pour saisir toutes les informations nécessaires
- **Gestion des déclarations** : Consultation, modification et suppression des déclarations existantes
- **Filtrage et recherche** : Recherche par nom d'organisme, filtrage par type et niveau de conformité
- **Export PDF** : Génération de déclarations au format PDF avec en-tête officiel
- **Pages d'information** : Guide d'utilisation et informations sur les obligations légales

## 🛠️ Technologies utilisées

### Frontend
- **React.js** : Bibliothèque JavaScript pour la construction d'interfaces utilisateur
- **React Router** : Gestion de la navigation entre les pages
- **DSFR** : Design System de l'État pour l'interface utilisateur
- **html2pdf.js** : Génération de documents PDF

### Backend
- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express** : Framework web pour Node.js
- **Prisma** : ORM (Object-Relational Mapping) pour la gestion de la base de données
- **SQLite** : Base de données relationnelle légère

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

### Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-organisation/declaration_a11e.git
cd declaration_a11e
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez la base de données :
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Démarrez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse http://localhost:3000

### Production

Pour construire l'application pour la production :

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
declaration_a11e/
├── public/                # Fichiers statiques
├── server/                # Code du serveur backend
│   ├── prisma/            # Schéma et migrations Prisma
│   ├── routes/            # Routes API
│   └── server.js          # Point d'entrée du serveur
├── src/                   # Code source frontend
│   ├── components/        # Composants React réutilisables
│   │   └── FormSections/  # Sections du formulaire de déclaration
│   ├── pages/             # Pages de l'application
│   ├── services/          # Services (API, stockage, etc.)
│   ├── styles/            # Feuilles de style
│   ├── App.js             # Composant principal
│   └── index.js           # Point d'entrée
└── package.json           # Dépendances et scripts
```

## 📝 Utilisation

### Création d'une déclaration

1. Accédez à la page d'accueil
2. Cliquez sur "Nouvelle déclaration"
3. Remplissez les 4 étapes du formulaire :
   - Informations générales (organisme, type, URL, etc.)
   - Niveau de conformité (résultats d'audit, dérogations)
   - Plan d'action (mesures correctives, échéances)
   - Informations de contact
4. Validez la déclaration

### Consultation et modification

1. Accédez à la liste des déclarations
2. Utilisez les filtres pour trouver une déclaration spécifique
3. Cliquez sur une déclaration pour en voir les détails
4. Sur la page de détail, vous pouvez :
   - Déplier/replier les sections
   - Télécharger la déclaration en PDF
   - Modifier la déclaration
   - Retourner à la liste des déclarations

## 🔍 Obligations légales

Les déclarations d'accessibilité sont obligatoires pour tous les services publics numériques selon :

- **Loi n° 2005-102 du 11 février 2005** (modifiée par la loi n° 2018-771 du 5 septembre 2018)
- **Décret n° 2019-768 du 24 juillet 2019**
- **Référentiel Général d'Amélioration de l'Accessibilité (RGAA)**

Pour plus d'informations, consultez la page "Obligations" dans l'application.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence [EUPL-1.2](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12) - voir le fichier LICENSE pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion, veuillez contacter [votre-email@example.com](mailto:votre-email@example.com).
