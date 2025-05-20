import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import des sections de formulaire
import GeneralInfoSection from '../components/FormSections/GeneralInfoSection';
import ConformitySection from '../components/FormSections/ConformitySection';
import ActionPlanSection from '../components/FormSections/ActionPlanSection';
import ContactSection from '../components/FormSections/ContactSection';
// TestSelectComponent supprimé

// Composants DSFR
const Button = ({ children, linkProps, size }) => (
  <Link 
    {...linkProps}
    className={`fr-btn ${size === 'large' ? 'fr-btn--lg' : ''}`}
  >
    {children}
  </Link>
);

const Alert = ({ children, severity = 'info' }) => (
  <div className={`fr-callout fr-callout--${severity}`}>
    {children}
  </div>
);

// Composant Stepper simplifié qui utilise directement les classes DSFR
const Stepper = ({ currentStep, stepCount, title, nextTitle }) => (
  <div className="fr-stepper">
    <h2 className="fr-stepper__title">
      <span className="fr-stepper__state">
        Étape {currentStep} sur {stepCount}
      </span>
      {title}
    </h2>
    <div className="fr-stepper__steps" data-fr-current-step={currentStep} data-fr-steps={stepCount}>
      <div className="fr-stepper__step" data-fr-current-step={currentStep === 1 ? "true" : "false"}>
        <div className="fr-stepper__step-icon">
          <span className="fr-stepper__state-indicator"></span>
        </div>
        <p className="fr-stepper__step-title">Informations générales</p>
      </div>
      <div className="fr-stepper__step" data-fr-current-step={currentStep === 2 ? "true" : "false"}>
        <div className="fr-stepper__step-icon">
          <span className="fr-stepper__state-indicator"></span>
        </div>
        <p className="fr-stepper__step-title">Niveau de conformité</p>
      </div>
      <div className="fr-stepper__step" data-fr-current-step={currentStep === 3 ? "true" : "false"}>
        <div className="fr-stepper__step-icon">
          <span className="fr-stepper__state-indicator"></span>
        </div>
        <p className="fr-stepper__step-title">Plan d'action</p>
      </div>
      <div className="fr-stepper__step" data-fr-current-step={currentStep === 4 ? "true" : "false"}>
        <div className="fr-stepper__step-icon">
          <span className="fr-stepper__state-indicator"></span>
        </div>
        <p className="fr-stepper__step-title">Informations de contact</p>
      </div>
    </div>
    {nextTitle && (
      <p className="fr-stepper__details">
        <span className="fr-text--bold">Prochaine étape : </span>
        {nextTitle}
      </p>
    )}
  </div>
);

function DeclarationForm() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Log pour déboguer
  console.log('ID récupéré depuis l\'URL:', id);
  const [formData, setFormData] = useState({
    // Informations générales
    organisme: '',
    typeOrganisme: '',
    siret: '',
    url: '',
    intituleSite: '',
    
    // Conformité
    niveauConformite: '',
    dateAudit: '',
    resultatAudit: '',
    derogationCharge: false,
    derogationExempt: false,
    detailDerogation: '',
    
    // Plan d'action
    mesuresCorrectivesPrevues: '',
    datePrevueMiseEnConformite: '',
    budgetAlloue: '',
    etudeAccessibiliteRealisee: false,
    ressourcesHumainesDediees: false,
    prestatairesSpecialises: false,
    
    // Contact
    contactName: '',
    contactFonction: '',
    contactEmail: '',
    contactPhone: '',
    adresseSiege: '',
    contactFormulaire: false,
    contactEmailDedie: false,
    contactTelephone: false,
    contactCourrier: false,
    certificationInfos: false
  });
  
  // Définir le mode édition dès que l'ID est disponible
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      console.log('Mode édition activé pour ID:', id);
    }
  }, [id]);
  
  // Charger les données si on est en mode édition
  useEffect(() => {
    const loadDeclarationData = async () => {
      if (id) {
        console.log('Chargement des données pour ID:', id);
        try {
          setLoading(true);
          // Importer le service de stockage
          const { getDeclaration } = await import('../services/dbStorageService');
          
          // Récupérer la déclaration
          const declaration = await getDeclaration(id);
          
          if (declaration) {
            console.log('Déclaration chargée pour modification:', declaration);
            setFormData({
              ...formData,
              ...declaration,
              // Conversion des valeurs booléennes si elles sont stockées comme des chaînes
              derogationCharge: declaration.derogationCharge === true || declaration.derogationCharge === 'true',
              derogationExempt: declaration.derogationExempt === true || declaration.derogationExempt === 'true',
              etudeAccessibiliteRealisee: declaration.etudeAccessibiliteRealisee === true || declaration.etudeAccessibiliteRealisee === 'true',
              ressourcesHumainesDediees: declaration.ressourcesHumainesDediees === true || declaration.ressourcesHumainesDediees === 'true',
              prestatairesSpecialises: declaration.prestatairesSpecialises === true || declaration.prestatairesSpecialises === 'true',
              contactFormulaire: declaration.contactFormulaire === true || declaration.contactFormulaire === 'true',
              contactEmailDedie: declaration.contactEmailDedie === true || declaration.contactEmailDedie === 'true',
              contactTelephone: declaration.contactTelephone === true || declaration.contactTelephone === 'true',
              contactCourrier: declaration.contactCourrier === true || declaration.contactCourrier === 'true',
              certificationInfos: declaration.certificationInfos === true || declaration.certificationInfos === 'true'
            });
          } else {
            console.error('Déclaration non trouvée avec l\'ID:', id);
            alert('Déclaration non trouvée. Vous allez créer une nouvelle déclaration.');
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la déclaration:', error);
          alert('Impossible de charger la déclaration. Vous allez créer une nouvelle déclaration.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadDeclarationData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    // Vérification des champs obligatoires pour l'étape actuelle
    let canProceed = true;
    let missingFields = [];
    
    if (step === 1) {
      // Vérification des champs de l'étape Informations générales
      if (!formData.organisme) missingFields.push('Nom de l\'organisme');
      if (!formData.typeOrganisme) missingFields.push('Type d\'organisme');
      if (!formData.url) missingFields.push('URL du site ou de l\'application');
      if (!formData.intituleSite) missingFields.push('Intitulé du site');
      
      if (missingFields.length > 0) canProceed = false;
    } else if (step === 2) {
      // Vérification des champs de l'étape Conformité
      if (!formData.niveauConformite) missingFields.push('Niveau de conformité');
      if (!formData.dateAudit) missingFields.push('Date de l\'audit');
      
      // Vérification conditionnelle pour les sites partiellement ou non conformes
      if ((formData.niveauConformite === 'partiel' || formData.niveauConformite === 'non_conforme')) {
        if (!formData.resultatAudit || formData.resultatAudit.trim() === '') {
          missingFields.push('Résultats d\'audit d\'accessibilité');
        }
      }
      
      // Vérification conditionnelle pour les dérogations
      if ((formData.derogationCharge || formData.derogationExempt)) {
        if (!formData.detailDerogation || formData.detailDerogation.trim() === '') {
          missingFields.push('Détail des dérogations');
        }
      }
      
      if (missingFields.length > 0) canProceed = false;
    } else if (step === 3) {
      // Vérification des champs de l'étape Plan d'action
      if (formData.niveauConformite === 'partiel' || formData.niveauConformite === 'non_conforme') {
        if (!formData.mesuresCorrectivesPrevues || formData.mesuresCorrectivesPrevues.trim() === '') {
          missingFields.push('Mesures correctives prévues');
        }
        if (!formData.datePrevueMiseEnConformite) {
          missingFields.push('Date prévue de mise en conformité');
        }
      }
      
      if (missingFields.length > 0) canProceed = false;
    }
    
    if (canProceed) {
      setStep(step + 1);
    } else {
      // Afficher une alerte avec les champs manquants
      alert(`Veuillez remplir tous les champs obligatoires avant de continuer:\n\n${missingFields.join('\n')}`);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification des champs obligatoires pour la dernière étape
    if (!formData.contactName || !formData.contactEmail || !formData.certificationInfos) {
      alert('Veuillez remplir tous les champs obligatoires et accepter les conditions.');
      return;
    }
    
    // Générer un ID unique pour la déclaration
    const declarationId = `decl-${Date.now()}`;
    
    // Préparation des données pour l'API
    const submissionData = {
      id: id || declarationId,
      ...formData,
      dateCreation: new Date().toISOString(),
      status: 'draft' // Par défaut, la déclaration est en brouillon
    };
    
    try {
      // Importer le service de stockage
      const { saveDeclaration } = await import('../services/dbStorageService');
      
      // Appel à l'API pour enregistrer les données et générer la déclaration HTML
      const response = await saveDeclaration(submissionData);
      
      console.log('Déclaration enregistrée avec succès:', response);
      
      // Redirection vers la page de la déclaration
      window.location.href = `/declaration/${response.id}`;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la déclaration:', error);
      alert('Une erreur est survenue lors de l\'enregistrement de la déclaration. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h1>{id ? 'Modifier' : 'Créer'} une déclaration d'accessibilité</h1>
      
      <Alert 
        severity="info"
        title="Informations importantes"
        description="Cette déclaration est conforme au modèle établi par le RGAA v4. Tous les champs marqués d'un * sont obligatoires."
        className="fr-mb-4w"
      />
      
      <Stepper
        currentStep={step}
        stepCount={4}
        title={id ? "Modification d'une déclaration d'accessibilité" : "Création d'une déclaration d'accessibilité"}
        nextTitle={step === 1 ? "Niveau de conformité" : 
                 step === 2 ? "Plan d'action" : 
                 step === 3 ? "Informations de contact" : 
                 "Finalisation"}
      />

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <GeneralInfoSection formData={formData} handleChange={handleChange} />
          </>
        )}
        {step === 2 && <ConformitySection formData={formData} handleChange={handleChange} />}
        {step === 3 && <ActionPlanSection formData={formData} handleChange={handleChange} />}
        {step === 4 && <ContactSection formData={formData} handleChange={handleChange} />}

        <div className="fr-grid-row fr-grid-row--right fr-mt-4w">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="fr-btn fr-btn--secondary fr-mr-2w"
            >
              Retour
            </button>
          )}
          
          {!isEditMode && (
            <button
              type="button"
              onClick={async () => {
                // Générer un ID unique pour la déclaration
                const declarationId = `decl-${Date.now()}`;
                
                // Préparer les données pour l'enregistrement
                const draftData = {
                  id: declarationId,
                  ...formData,
                  dateCreation: new Date().toISOString(),
                  status: 'draft'
                };
                
                try {
                  // Importer le service de stockage
                  const { saveDeclaration } = await import('../services/dbStorageService');
                  
                  // Enregistrer le brouillon
                  const response = await saveDeclaration(draftData);
                  
                  alert('Brouillon enregistré avec succès!');
                  console.log('Brouillon enregistré:', response);
                  
                  // Redirection vers la page d'accueil ou reste sur la page actuelle
                  if (window.confirm('Souhaitez-vous continuer à éditer cette déclaration?')) {
                    // Reste sur la page actuelle
                  } else {
                    // Redirection vers la page d'accueil
                    window.location.href = '/';
                  }
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement du brouillon:', error);
                  alert('Une erreur est survenue lors de l\'enregistrement du brouillon. Veuillez réessayer.');
                }
              }}
              className="fr-btn fr-btn--secondary fr-mr-2w"
            >
              Enregistrer comme brouillon
            </button>
          )}
          
          {isEditMode && (
            <button
              type="button"
              onClick={async () => {
                // Préparer les données pour l'enregistrement
                const updateData = {
                  ...formData,
                  dateModification: new Date().toISOString()
                };
                
                try {
                  // Importer le service de stockage
                  const { saveDeclaration } = await import('../services/dbStorageService');
                  
                  // Enregistrer les modifications
                  const response = await saveDeclaration(updateData);
                  
                  alert('Modifications enregistrées avec succès!');
                  console.log('Modifications enregistrées:', response);
                  
                  // Redirection vers la page d'accueil ou reste sur la page actuelle
                  if (window.confirm('Souhaitez-vous continuer à éditer cette déclaration?')) {
                    // Reste sur la page actuelle
                  } else {
                    // Redirection vers la page de la déclaration
                    window.location.href = `/declaration/${id}`;
                  }
                } catch (error) {
                  console.error('Erreur lors de l\'enregistrement des modifications:', error);
                  alert('Une erreur est survenue lors de l\'enregistrement des modifications. Veuillez réessayer.');
                }
              }}
              className="fr-btn fr-btn--secondary fr-mr-2w"
            >
              Enregistrer les modifications
            </button>
          )}
          
          {step < 4 ? (
            <button type="button" onClick={handleNext} className="fr-btn">
              Continuer
            </button>
          ) : (
            <button type="submit" className="fr-btn">
              {id ? 'Mettre à jour la déclaration' : 'Générer la déclaration'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DeclarationForm;