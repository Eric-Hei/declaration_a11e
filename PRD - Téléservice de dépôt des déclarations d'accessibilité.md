# PRD - Téléservice de dépôt des déclarations d'accessibilité

## Présentation du projet

Le téléservice de dépôt des déclarations d'accessibilité est une application web permettant aux organismes publics et aux organismes privés chargés d'une mission de service public de créer, gérer et publier leurs déclarations d'accessibilité conformément aux obligations légales en vigueur.

### Objectifs

- Faciliter la création de déclarations d'accessibilité conformes au format réglementaire
- Permettre la gestion centralisée des déclarations pour un même organisme
- Offrir la possibilité d'exporter les déclarations en format PDF pour publication
- Fournir des informations sur les obligations légales en matière d'accessibilité numérique

## Architecture technique

### Frontend

- **Framework** : React.js
- **Design System** : DSFR (Design System de l'État)
- **Bibliothèques principales** :
  - `react-router-dom` pour la navigation
  - `axios` pour les requêtes HTTP
  - `html2pdf.js` pour la génération de PDF

### Backend

- **Framework** : Node.js avec Express
- **Base de données** : SQLite
- **ORM** : Prisma
- **API** : RESTful

### Stockage des données

- Utilisation d'une base de données SQLite avec Prisma comme ORM
- Structure de données définie dans le schéma Prisma
- API REST pour permettre l'accès aux données depuis le frontend

## Fonctionnalités principales

### 1. Gestion des déclarations

- **Création** : Formulaire en 4 étapes pour saisir toutes les informations nécessaires
- **Consultation** : Affichage détaillé des déclarations avec sections dépliables
- **Modification** : Possibilité de mettre à jour les déclarations existantes
- **Suppression** : Option pour supprimer des déclarations obsolètes

### 2. Filtrage et recherche

- Recherche textuelle sur les noms d'organismes et intitulés de sites
- Filtrage par type d'organisme
- Filtrage par niveau de conformité
- Persistance des filtres lors de la navigation entre les pages

### 3. Export des déclarations

- Export au format PDF avec en-tête officiel
- Mise en page structurée respectant la charte graphique
- Génération à la demande depuis la page de détail d'une déclaration

### 4. Pages d'information

- Page d'aide détaillée sur l'utilisation du service
- Page d'informations sur les obligations légales en matière d'accessibilité
- FAQ avec les questions les plus fréquentes

## Parcours utilisateur

### Création d'une déclaration

1. L'utilisateur accède à la page d'accueil
2. Il clique sur "Nouvelle déclaration"
3. Il remplit les 4 étapes du formulaire :
   - Informations générales (organisme, type, URL, etc.)
   - Niveau de conformité (résultats d'audit, dérogations)
   - Plan d'action (mesures correctives, échéances)
   - Informations de contact
4. Il valide la déclaration qui est alors enregistrée dans la base de données

### Consultation et modification

1. L'utilisateur accède à la liste des déclarations
2. Il peut filtrer la liste selon différents critères
3. Il clique sur une déclaration pour en voir les détails
4. Sur la page de détail, il peut :
   - Déplier/replier les sections
   - Télécharger la déclaration en PDF
   - Modifier la déclaration
   - Retourner à la liste des déclarations

## Améliorations récentes

### Transition vers une base de données

- Migration depuis le stockage localStorage vers une base de données SQLite
- Implémentation de Prisma comme ORM pour une gestion typée des données
- Création d'une API REST pour les opérations CRUD sur les déclarations

### Amélioration de l'interface utilisateur

- Ajout du bouton d'export PDF avec en-tête officiel
- Remplacement du bouton "Nouvelle déclaration" par "Retourner à la liste" sur la page de détail
- Alignement des boutons d'action à droite pour une meilleure ergonomie
- Correction de l'affichage des types d'organismes dans la liste

### Ajout de pages d'information

- Création d'une page d'aide complète avec guide d'utilisation et FAQ
- Création d'une page sur les obligations légales en matière d'accessibilité
- Intégration de ces pages dans la navigation du site

### Améliorations de l'expérience utilisateur

- Persistance des filtres lors de la navigation entre les pages
- Correction des erreurs 500 lors de la création/modification de déclarations
- Amélioration de l'affichage des dérogations et des détails des déclarations

## Prochaines étapes

### Améliorations prévues

- Implémentation d'un système d'authentification pour sécuriser l'accès
- Ajout de fonctionnalités d'export en masse des déclarations
- Création d'un tableau de bord pour suivre l'évolution de l'accessibilité
- Intégration d'outils d'aide à l'audit d'accessibilité

### Corrections à apporter

- Optimisation des performances de chargement des déclarations
- Amélioration de la validation des données côté client et serveur
- Résolution des avertissements ESLint concernant les variables non utilisées

## Conclusion

Le téléservice de dépôt des déclarations d'accessibilité est désormais fonctionnel avec une base de données robuste et une interface utilisateur améliorée. Les récentes modifications ont permis d'ajouter l'export PDF, d'améliorer la navigation et de fournir des informations complètes sur l'utilisation du service et les obligations légales.

L'application répond aux besoins des organismes soumis aux obligations d'accessibilité numérique en leur offrant un outil simple et efficace pour créer et gérer leurs déclarations d'accessibilité.
