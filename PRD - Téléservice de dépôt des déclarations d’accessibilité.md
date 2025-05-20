# Product Requirement Document (PRD) : Téléservice de dépôt des déclarations d’accessibilité

## 1. Contexte et objectif
### Contexte
Ce projet s’inscrit dans le cadre du décret n°2019-768 du 24 juillet 2019, qui oblige les organismes publics à publier une déclaration d’accessibilité pour leurs sites web, conformément au Référentiel Général d’Amélioration de l’Accessibilité (RGAA v4). Inspiré d’un modèle italien, un téléservice est envisagé pour simplifier ce processus.

### Objectif
Développer un téléservice permettant aux organismes publics (assujettis) de soumettre les informations nécessaires via un formulaire en ligne, de générer automatiquement une déclaration d’accessibilité au format HTML, et de centraliser ces données pour les autorités de contrôle et la Direction Interministérielle du Numérique (DINUM).

---

## 2. Parties prenantes
- **DINUM** : Responsable de la conception, du développement et de la gestion du téléservice.
- **ARCOM** : Participe à l’étude des options de stockage des données.
- **Assujettis** : Organismes publics soumis à l’obligation de déclaration.
- **Autorité de contrôle** : Vérifie la conformité des déclarations.
- **Grand public** : Pourrait consulter les déclarations via un portail public (optionnel).

---

## 3. Exigences fonctionnelles
### Formulaire de collecte
- Collecte des données conformes au RGAA v4, incluant :
  - Nom de l’organisme.
  - URL du site web.
  - Niveau de conformité (conforme, partiellement conforme, non conforme).
  - Résultats d’audit d’accessibilité.
  - Plan d’action (si applicable).
- Interface simple et accessible.

### Génération de la déclaration
- Génération automatique d’une déclaration au format HTML à partir des données saisies.
- Options de livraison :
  - Téléchargement du fichier HTML par l’assujetti pour publication sur son site.
  - Hébergement de la déclaration par le téléservice avec fourniture d’un lien à intégrer.

### Stockage et gestion des données
- Centralisation des déclarations dans une base de données sécurisée.
- Export des données pour les rapports européens.
- Option : Portail public avec recherche et filtrage des déclarations.

### Évolution vers RGAA v5
- Préparation pour une mise à jour des formulaires et modèles de déclaration lors de la sortie du RGAA v5.

---

## 4. Exigences techniques
- **Plateforme** : Utilisation de Démarches Simplifiées pour le formulaire.
- **Génération HTML** : Étude pour une génération native ou via un service externe.
- **Stockage** :
  - Infrastructure sécurisée (serveurs DINUM ou cloud).
  - Conformité aux normes de sécurité et confidentialité.
- Design :
  Utilisation du DSFR : https://www.systeme-de-design.gouv.fr/ et https://github.com/codegouvfr/react-dsfr

- **Portail public ** :
  - Développement d’une interface web.
  - Fonctionnalités de recherche par organisme ou niveau de conformité.

---

## 5. Contraintes et dépendances
- **Dépendance au RGAA v5** : Synchronisation avec sa publication. Infos sur les RGAA : https://accessibilite.numerique.gouv.fr/
- **Arrêté officiel** : Nécessité d’un texte juridique pour officialiser le téléservice.
- **Collaboration** : Coordination avec l’ARCOM pour le stockage.

---


---

## 7. Risques et mitigation
- **Retard du RGAA v5** : Prévoir des versions itératives.
- **Problèmes techniques (HTML)** : Tester des solutions alternatives (ex. : API).
- **Stockage** : Collaboration étroite avec l’ARCOM et la DINUM.

---

## 8. Budget et ressources
- **Équipe** : Projet porté par la DINUM (développeurs, juristes).
- **Budget** : À estimer selon les choix techniques (hébergement, portail, etc.).