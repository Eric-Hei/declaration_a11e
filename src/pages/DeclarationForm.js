import React, { useState } from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Stepper } from '@codegouvfr/react-dsfr/Stepper';
import { Alert } from '@codegouvfr/react-dsfr/Alert';

// Import des sections de formulaire
import GeneralInfoSection from '../components/FormSections/GeneralInfoSection';
import ConformitySection from '../components/FormSections/ConformitySection';
import ActionPlanSection from '../components/FormSections/ActionPlanSection';
import ContactSection from '../components/FormSections/ContactSection';
import TestSelectComponent from '../components/FormSections/TestSelectComponent';

function DeclarationForm() {
  const [step, setStep] = useState(1);
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
    
    if (step === 1) {
      // Vérification des champs de l'étape Informations générales
      if (!formData.organisme || !formData.typeOrganisme || !formData.url || !formData.intituleSite) {
        canProceed = false;
      }
    } else if (step === 2) {
      // Vérification des champs de l'étape Conformité
      if (!formData.niveauConformite || !formData.dateAudit) {
        canProceed = false;
      }
      if ((formData.niveauConformite === 'partiel' || formData.niveauConformite === 'non_conforme') && !formData.resultatAudit) {
        canProceed = false;
      }
      if ((formData.derogationCharge || formData.derogationExempt) && !formData.detailDerogation) {
        canProceed = false;
      }
    } else if (step === 3) {
      // Vérification des champs de l'étape Plan d'action
      if ((formData.niveauConformite === 'partiel' || formData.niveauConformite === 'non_conforme') && 
          (!formData.mesuresCorrectivesPrevues || !formData.datePrevueMiseEnConformite)) {
        canProceed = false;
      }
    }
    
    if (canProceed) {
      setStep(step + 1);
    } else {
      // Afficher une alerte que des champs sont manquants
      alert('Veuillez remplir tous les champs obligatoires avant de continuer.');
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
      id: declarationId,
      ...formData,
      dateCreation: new Date().toISOString(),
      status: 'draft' // Par défaut, la déclaration est en brouillon
    };
    
    try {
      // Importer le service de stockage
      const { saveDeclaration } = await import('../services/storageService');
      
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
      <h1>Créer une déclaration d'accessibilité</h1>
      
      <Alert 
        severity="info"
        title="Informations importantes"
        description="Cette déclaration est conforme au modèle établi par le RGAA v4. Tous les champs marqués d'un * sont obligatoires."
        className={fr.cx('fr-mb-4w')}
      />
      
      <Stepper
        currentStep={step}
        stepCount={4}
        title={"Étapes de création d'une déclaration"}
        nextTitle={step < 4 ? "Étape suivante" : "Finalisation"}
        className={fr.cx('fr-mb-6w')}
      />

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <GeneralInfoSection formData={formData} handleChange={handleChange} />
            <TestSelectComponent />
          </>
        )}
        {step === 2 && <ConformitySection formData={formData} handleChange={handleChange} />}
        {step === 3 && <ActionPlanSection formData={formData} handleChange={handleChange} />}
        {step === 4 && <ContactSection formData={formData} handleChange={handleChange} />}

        <div className={fr.cx('fr-grid-row', 'fr-grid-row--right', 'fr-mt-4w')}>
          {step > 1 && (
            <Button
              onClick={handlePrev}
              priority="secondary"
              className={fr.cx('fr-mr-2w')}
            >
              Retour
            </Button>
          )}
          
          <Button
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
                const { saveDeclaration } = await import('../services/storageService');
                
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
            priority="secondary"
            className={fr.cx('fr-mr-2w')}
          >
            Enregistrer comme brouillon
          </Button>
          
          {step < 4 ? (
            <Button onClick={handleNext}>Continuer</Button>
          ) : (
            <Button type="submit">Générer la déclaration</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DeclarationForm;