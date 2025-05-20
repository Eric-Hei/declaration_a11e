# Schu00e9ma de base de donnu00e9es pour le tu00e9lu00e9service de du00e9claration d'accessibilitu00e9

## Tables principales

### DECLARATION
Stocke les informations essentielles des du00e9clarations d'accessibilitu00e9.

| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique de la du00e9claration (clu00e9 primaire) |
| organisme | string | Nom de l'organisme public |
| url | string | URL du site web concernu00e9 |
| niveauConformite | string | Niveau de conformitu00e9 (conforme, partiellement conforme, non conforme) |
| resultatAudit | text | Ru00e9sultats de l'audit d'accessibilitu00e9 |
| planAction | text | Plan d'action pour amu00e9liorer l'accessibilitu00e9 (si applicable) |
| contactName | string | Nom de la personne u00e0 contacter |
| contactEmail | string | Email de la personne u00e0 contacter |
| dateCreation | datetime | Date de cru00e9ation de la du00e9claration |
| dateModification | datetime | Date de derniu00e8re modification |
| htmlContent | text | Contenu HTML gu00e9nu00e9ru00e9 de la du00e9claration |
| status | string | Statut de la du00e9claration (brouillon, publiu00e9e, archivu00e9e) |

### UTILISATEUR
Gestion des utilisateurs du tu00e9lu00e9service.

| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique de l'utilisateur (clu00e9 primaire) |
| email | string | Adresse email de l'utilisateur |
| nom | string | Nom de l'utilisateur |
| prenom | string | Pru00e9nom de l'utilisateur |
| organisme | string | Organisme de rattachement |
| role | string | Ru00f4le (administrateur, du00e9clarant, contru00f4leur) |

### DECLARATION_VERSION
Historique des versions des du00e9clarations.

| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique de la version (clu00e9 primaire) |
| declarationId | string | Ru00e9fu00e9rence u00e0 la du00e9claration (clu00e9 u00e9trangu00e8re) |
| htmlContent | text | Contenu HTML de cette version de la du00e9claration |
| dateCreation | datetime | Date de cru00e9ation de cette version |

## Relations entre tables

- Un **UTILISATEUR** peut cru00e9er/modifier plusieurs **DECLARATION**s (relation 1 u00e0 plusieurs)
- Une **DECLARATION** peut avoir plusieurs versions dans **DECLARATION_VERSION** (relation 1 u00e0 plusieurs)

## Notes techniques

1. La base de donnu00e9es doit u00eatre su00e9curisu00e9e selon les normes de l'ANSSI pour les donnu00e9es gouvernementales
2. Pru00e9voir des index sur les champs fru00e9quemment recherchu00e9s (organisme, url, niveauConformite)
3. Stocker les donnu00e9es sensibles de maniu00e8re chiffru00e9e si nu00e9cessaire
4. Mettre en place un systu00e8me de sauvegarde ru00e9guliu00e8re
5. Structure compatible avec les exigences de rapport pour la Commission Europu00e9enne
6. Pru00e9voir u00e9volution vers RGAA v5 en gardant une structure flexible