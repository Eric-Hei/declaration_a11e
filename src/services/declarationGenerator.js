/**
 * Service pour la génération des déclarations d'accessibilité au format HTML
 * Conformément au modèle du RGAA v4
 */

/**
 * Génère le contenu HTML de la déclaration d'accessibilité à partir des données du formulaire
 * @param {Object} formData - Les données du formulaire de déclaration
 * @returns {String} - Le contenu HTML de la déclaration
 */
export function generateDeclarationHTML(formData) {
  const {
    organisme,
    typeOrganisme,
    url,
    intituleSite,
    niveauConformite,
    dateAudit,
    resultatAudit,
    derogationCharge,
    derogationExempt,
    detailDerogation,
    mesuresCorrectivesPrevues,
    datePrevueMiseEnConformite,
    contactName,
    contactFonction,
    contactEmail,
    contactPhone,
    adresseSiege,
    contactFormulaire,
    contactEmailDedie,
    contactTelephone,
    contactCourrier
  } = formData;

  // Conversion de la date d'audit au format français
  const dateAuditFormatted = new Date(dateAudit).toLocaleDateString('fr-FR');
  
  // Conversion de la date de mise en conformité prévue (si elle existe)
  const datePrevueFormatted = datePrevueMiseEnConformite 
    ? new Date(datePrevueMiseEnConformite).toLocaleDateString('fr-FR')
    : '';

  // Sélection du texte de conformité selon le niveau déclaré
  let texteConformite = '';
  if (niveauConformite === 'conforme') {
    texteConformite = `<p>${organisme} s'engage à rendre son/ses service(s) numérique(s) accessibles conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.</p>
    <p>Cette déclaration d'accessibilité s'applique à <strong>${intituleSite}</strong> (${url}).</p>
    <p>À cette fin, ${organisme} met en œuvre la stratégie et les actions suivantes :</p>
    <ul>
      <li>Suivi et mise à jour régulière de l'accessibilité</li>
      <li>Tests utilisateurs incluant des personnes en situation de handicap</li>
      <li>Formation continue des équipes au RGAA</li>
    </ul>
    <p><strong>Ce site est totalement conforme au RGAA version 4.</strong></p>`;
  } else if (niveauConformite === 'partiel') {
    texteConformite = `<p>${organisme} s'engage à rendre son/ses service(s) numérique(s) accessibles conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.</p>
    <p>Cette déclaration d'accessibilité s'applique à <strong>${intituleSite}</strong> (${url}).</p>
    <p><strong>Ce site est partiellement conforme au RGAA version 4.</strong></p>`;
  } else {
    texteConformite = `<p>${organisme} s'engage à rendre son/ses service(s) numérique(s) accessibles conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.</p>
    <p>Cette déclaration d'accessibilité s'applique à <strong>${intituleSite}</strong> (${url}).</p>
    <p><strong>Ce site n'est pas conforme au RGAA version 4.</strong> Les non-conformités sont énumérées ci-dessous.</p>`;
  }

  // Section sur les résultats des tests
  let sectionResultats = '';
  if (niveauConformite === 'conforme') {
    sectionResultats = `<h2>Résultats des tests</h2>
    <p>L'audit de conformité réalisé le ${dateAuditFormatted} révèle que le site est 100 % conforme aux critères du RGAA 4.</p>`;
  } else {
    sectionResultats = `<h2>Résultats des tests</h2>
    <p>L'audit de conformité réalisé le ${dateAuditFormatted} révèle les non-conformités suivantes :</p>
    <div class="fr-highlight">
      ${resultatAudit}
    </div>`;
  }

  // Section sur les dérogations (si applicable)
  let sectionDerogations = '';
  if (derogationCharge || derogationExempt) {
    sectionDerogations = `<h2>Contenus non accessibles</h2>`;
    
    if (derogationCharge) {
      sectionDerogations += `<h3>Dérogation pour charge disproportionnée</h3>`;
    }
    
    if (derogationExempt) {
      sectionDerogations += `<h3>Contenus exemptés</h3>`;
    }
    
    sectionDerogations += `<div class="fr-highlight">
      ${detailDerogation}
    </div>`;
  }

  // Section du plan d'action (si applicable)
  let sectionPlanAction = '';
  if ((niveauConformite === 'partiel' || niveauConformite === 'non_conforme') && mesuresCorrectivesPrevues) {
    sectionPlanAction = `<h2>Amélioration et plan d'action</h2>
    <p>${organisme} s'engage à améliorer l'accessibilité de son service numérique avec les mesures suivantes :</p>
    <div class="fr-highlight">
      ${mesuresCorrectivesPrevues}
    </div>
    ${datePrevueFormatted ? `<p><strong>Date de mise en conformité prévue :</strong> ${datePrevueFormatted}</p>` : ''}`;
  }

  // Section contact
  let sectionContact = `<h2>Voie de recours</h2>
  <p>Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d'accessibilité qui vous empêche d'accéder à un contenu ou à un des services du portail et vous n'avez pas obtenu de réponse satisfaisante.</p>
  
  <p>Vous pouvez :</p>
  <ul>
    <li>Écrire un message au <a href="https://formulaire.defenseurdesdroits.fr/">Défenseur des droits</a></li>
    <li>Contacter le délégué du <a href="https://www.defenseurdesdroits.fr/saisir/delegues">Défenseur des droits dans votre région</a></li>
    <li>Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :<br>
      Défenseur des droits<br>
      Libre réponse 71120<br>
      75342 Paris CEDEX 07</li>
  </ul>
  
  <h2>Contact</h2>
  <p><strong>${contactName}</strong>${contactFonction ? ` - ${contactFonction}` : ''}</p>
  <p>Pour toute question relative à l'accessibilité de ce site, vous pouvez :</p>
  <ul>`;

  if (contactEmailDedie) {
    sectionContact += `<li>Envoyer un email à <a href="mailto:${contactEmail}">${contactEmail}</a></li>`;
  }
  
  if (contactTelephone && contactPhone) {
    sectionContact += `<li>Appeler au ${contactPhone}</li>`;
  }
  
  if (contactFormulaire) {
    sectionContact += `<li>Utiliser notre <a href="/contact">formulaire de contact</a></li>`;
  }
  
  if (contactCourrier && adresseSiege) {
    sectionContact += `<li>Envoyer un courrier postal à :<br>${adresseSiege.replace(/\n/g, '<br>')}</li>`;
  }
  
  sectionContact += `</ul>`;

  // Génération du document HTML complet
  const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Déclaration d'accessibilité - ${intituleSite}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.9.0/dist/dsfr.min.css">
</head>
<body>
  <div class="fr-container fr-py-4w">
    <h1>Déclaration d'accessibilité</h1>
    
    <div class="fr-mb-3w fr-highlight fr-highlight--blue-cumulus">
      <p>Établie le ${new Date().toLocaleDateString('fr-FR')}</p>
    </div>

    <h2>État de conformité</h2>
    ${texteConformite}
    
    ${sectionResultats}
    
    ${sectionDerogations}
    
    ${sectionPlanAction}
    
    ${sectionContact}
    
    <h2>Réalisation de cette déclaration</h2>
    <p>Cette déclaration a été établie le ${new Date().toLocaleDateString('fr-FR')}.<br>
    Elle a été générée via le téléservice de dépôt des déclarations d'accessibilité fourni par la DINUM.</p>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.9.0/dist/dsfr.module.min.js"></script>
</body>
</html>`;

  return htmlContent;
}

/**
 * Génère un aperçu de la déclaration (version simplifiée)
 * @param {Object} formData - Les données du formulaire de déclaration
 * @returns {String} - Le contenu HTML de l'aperçu de la déclaration
 */
export function generatePreview(formData) {
  const {
    organisme,
    intituleSite,
    url,
    niveauConformite
  } = formData;

  let statutText = '';
  switch (niveauConformite) {
    case 'conforme':
      statutText = 'totalement conforme';
      break;
    case 'partiel':
      statutText = 'partiellement conforme';
      break;
    case 'non_conforme':
      statutText = 'non conforme';
      break;
    default:
      statutText = 'non renseigné';
  }

  return `
    <div class="fr-highlight fr-highlight--blue-cumulus fr-p-3w">
      <h3>${intituleSite}</h3>
      <p><strong>Organisme :</strong> ${organisme}</p>
      <p><strong>URL :</strong> <a href="${url}" target="_blank">${url}</a></p>
      <p><strong>Statut :</strong> ${statutText} au RGAA v4</p>
      <p><strong>Date de déclaration :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
    </div>
  `;
}

/**
 * Sauvegarde la déclaration dans le format d'échange nécessaire pour l'API
 * @param {Object} formData - Les données du formulaire
 * @returns {Object} Les données formatées pour l'API
 */
export function prepareForAPI(formData) {
  // Création d'un ID unique pour la déclaration
  const declarationId = `decl-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Génération du HTML
  const htmlContent = generateDeclarationHTML(formData);
  
  // Préparation des données pour l'API
  return {
    id: declarationId,
    organisme: formData.organisme,
    typeOrganisme: formData.typeOrganisme,
    siret: formData.siret || null,
    url: formData.url,
    intituleSite: formData.intituleSite,
    niveauConformite: formData.niveauConformite,
    dateAudit: formData.dateAudit,
    resultatAudit: formData.resultatAudit || null,
    derogations: {
      charge: formData.derogationCharge || false,
      exempt: formData.derogationExempt || false,
      details: formData.detailDerogation || null
    },
    planAction: {
      mesures: formData.mesuresCorrectivesPrevues || null,
      datePrevue: formData.datePrevueMiseEnConformite || null,
      budget: formData.budgetAlloue || null,
      etudeRealisee: formData.etudeAccessibiliteRealisee || false,
      ressourcesHumaines: formData.ressourcesHumainesDediees || false,
      prestataires: formData.prestatairesSpecialises || false
    },
    contact: {
      nom: formData.contactName,
      fonction: formData.contactFonction || null,
      email: formData.contactEmail,
      telephone: formData.contactPhone || null,
      adresse: formData.adresseSiege || null,
      canaux: {
        formulaire: formData.contactFormulaire || false,
        email: formData.contactEmailDedie || false,
        telephone: formData.contactTelephone || false,
        courrier: formData.contactCourrier || false
      }
    },
    htmlContent: htmlContent,
    dateCreation: new Date().toISOString(),
    dateModification: new Date().toISOString(),
    status: 'draft'
  };
}