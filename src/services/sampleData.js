/**
 * Données d'exemple pour les déclarations d'accessibilité
 */

export const sampleDeclarations = [
  {
    id: 'decl-1',
    organisme: 'Direction Interministérielle du Numérique',
    typeOrganisme: 'admin_etat',
    siret: '13001045600013',
    url: 'https://www.numerique.gouv.fr',
    intituleSite: 'Site de la DINUM',
    niveauConformite: 'partiel',
    dateAudit: '2023-03-15',
    resultatAudit: 'L\'audit réalisé révèle 12 non-conformités de niveau A et AA. Les principales concernent le contraste des couleurs et les alternatives textuelles des images.',
    derogations: {
      charge: true,
      exempt: false,
      details: 'Les contenus cartographiques sont exemptés car ils nécessiteraient une refonte complète.'
    },
    planAction: {
      mesures: 'Refonte de l\'interface utilisateur et correction des problèmes d\'accessibilité.',
      datePrevue: '2023-12-31',
      budget: '50000',
      etudeRealisee: true,
      ressourcesHumaines: true,
      prestataires: true
    },
    contact: {
      nom: 'Jean Dupont',
      fonction: 'Responsable accessibilité',
      email: 'accessibilite@dinum.gouv.fr',
      telephone: '01 23 45 67 89',
      adresse: '20 avenue de Ségur\n75007 Paris',
      canaux: {
        formulaire: true,
        email: true,
        telephone: true,
        courrier: false
      }
    },
    dateCreation: '2023-05-15T14:30:00.000Z',
    dateModification: '2023-05-15T14:30:00.000Z',
    status: 'published'
  },
  {
    id: 'decl-2',
    organisme: 'Ministère de l\'Intérieur',
    typeOrganisme: 'admin_etat',
    siret: '12345678901234',
    url: 'https://www.interieur.gouv.fr',
    intituleSite: 'Site du Ministère de l\'Intérieur',
    niveauConformite: 'conforme',
    dateAudit: '2023-02-10',
    resultatAudit: 'L\'audit réalisé confirme la conformité du site aux exigences du RGAA 4.1.',
    derogations: null,
    planAction: {
      mesures: 'Maintien de la conformité et veille technologique',
      datePrevue: '2024-02-10',
      budget: '20000',
      etudeRealisee: true,
      ressourcesHumaines: true,
      prestataires: false
    },
    contact: {
      nom: 'Marie Martin',
      fonction: 'Cheffe du service numérique',
      email: 'accessibilite@interieur.gouv.fr',
      telephone: '01 49 27 49 27',
      adresse: 'Place Beauvau\n75008 Paris',
      canaux: {
        formulaire: true,
        email: true,
        telephone: true,
        courrier: true
      }
    },
    dateCreation: '2023-02-15T10:15:00.000Z',
    dateModification: '2023-02-15T10:15:00.000Z',
    status: 'published'
  },
  {
    id: 'decl-3',
    organisme: 'Ville de Lyon',
    typeOrganisme: 'collectivite',
    siret: '21690123400017',
    url: 'https://www.lyon.fr',
    intituleSite: 'Site officiel de la Ville de Lyon',
    niveauConformite: 'non_conforme',
    dateAudit: '2023-01-20',
    resultatAudit: 'L\'audit a identifié de nombreuses non-conformités qui nécessitent une refonte importante du site.',
    derogations: null,
    planAction: {
      mesures: 'Refonte complète du site prévue avec intégration des normes d\'accessibilité dès la conception',
      datePrevue: '2024-06-30',
      budget: '150000',
      etudeRealisee: true,
      ressourcesHumaines: false,
      prestataires: true
    },
    contact: {
      nom: 'Pierre Durand',
      fonction: 'Directeur des services numériques',
      email: 'accessibilite@lyon.fr',
      telephone: '04 72 10 30 30',
      adresse: 'Place de la Comédie\n69001 Lyon',
      canaux: {
        formulaire: true,
        email: true,
        telephone: false,
        courrier: false
      }
    },
    dateCreation: '2023-01-25T09:45:00.000Z',
    dateModification: '2023-01-25T09:45:00.000Z',
    status: 'published'
  },
  {
    id: 'decl-4',
    organisme: 'Université de Bordeaux',
    typeOrganisme: 'etablissement',
    siret: '13001835000019',
    url: 'https://www.u-bordeaux.fr',
    intituleSite: 'Site de l\'Université de Bordeaux',
    niveauConformite: 'partiel',
    dateAudit: '2023-04-05',
    resultatAudit: 'L\'audit a révélé une conformité partielle avec 15 critères non respectés sur les 106 du RGAA.',
    derogations: {
      charge: false,
      exempt: true,
      details: 'Certains contenus pédagogiques complexes sont exemptés.'
    },
    planAction: {
      mesures: 'Correction progressive des non-conformités et formation des contributeurs',
      datePrevue: '2024-04-05',
      budget: '35000',
      etudeRealisee: true,
      ressourcesHumaines: true,
      prestataires: true
    },
    contact: {
      nom: 'Sophie Blanc',
      fonction: 'Référente accessibilité numérique',
      email: 'accessibilite@u-bordeaux.fr',
      telephone: '05 40 00 60 00',
      adresse: '35 place Pey Berland\n33000 Bordeaux',
      canaux: {
        formulaire: false,
        email: true,
        telephone: true,
        courrier: false
      }
    },
    dateCreation: '2023-04-10T11:20:00.000Z',
    dateModification: '2023-04-10T11:20:00.000Z',
    status: 'published'
  },
  {
    id: 'decl-5',
    organisme: 'Pôle Emploi',
    typeOrganisme: 'etablissement',
    siret: '13000548100034',
    url: 'https://www.pole-emploi.fr',
    intituleSite: 'Site de Pôle Emploi',
    niveauConformite: 'partiel',
    dateAudit: '2023-05-20',
    resultatAudit: 'L\'audit a identifié 22 non-conformités, principalement sur les formulaires et la navigation au clavier.',
    derogations: null,
    planAction: {
      mesures: 'Plan de mise en conformité progressif avec priorisation des services les plus utilisés',
      datePrevue: '2024-03-15',
      budget: '75000',
      etudeRealisee: true,
      ressourcesHumaines: true,
      prestataires: true
    },
    contact: {
      nom: 'Thomas Leroy',
      fonction: 'Chef de projet accessibilité',
      email: 'accessibilite@pole-emploi.fr',
      telephone: '01 40 30 60 00',
      adresse: '1 avenue du Docteur Gley\n75020 Paris',
      canaux: {
        formulaire: true,
        email: true,
        telephone: true,
        courrier: false
      }
    },
    dateCreation: '2023-05-25T15:40:00.000Z',
    dateModification: '2023-05-25T15:40:00.000Z',
    status: 'published'
  }
];

/**
 * Initialise le stockage local avec des données d'exemple
 */
export const initSampleData = () => {
  const STORAGE_KEY = 'declarations_accessibilite';
  
  // Vérifier si le stockage est déjà initialisé
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (existingData && Object.keys(JSON.parse(existingData)).length > 0) {
    console.log('Le stockage contient déjà des données, pas d\'initialisation nécessaire');
    return;
  }
  
  // Convertir le tableau en objet indexé par id
  const declarations = {};
  sampleDeclarations.forEach(declaration => {
    declarations[declaration.id] = declaration;
  });
  
  // Sauvegarder dans localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(declarations));
  console.log('Données d\'exemple initialisées avec succès');
};
