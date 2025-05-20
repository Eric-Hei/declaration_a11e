import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getDeclaration } from '../services/dbStorageService';
import html2pdf from 'html2pdf.js';

const Button = ({ children, linkProps, size, onClick }) => {
  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className={`fr-btn ${size === 'large' ? 'fr-btn--lg' : ''}`}
      >
        {children}
      </button>
    );
  }
  
  return (
    <Link 
      {...linkProps}
      className={`fr-btn ${size === 'large' ? 'fr-btn--lg' : ''}`}
    >
      {children}
    </Link>
  );
};

const Notice = ({ children, severity = 'info' }) => (
  <div className={`fr-callout fr-callout--${severity}`}>
    {children}
  </div>
);

const Accordion = ({ title, children, expanded, id, onToggle }) => {
  // Utiliser l'état expanded fourni par le parent
  
  return (
    <div className="fr-accordion">
      <h3 className="fr-accordion__title">
        <button 
          className="fr-accordion__btn" 
          aria-expanded={expanded} 
          aria-controls={`accordion-${id}`}
          onClick={onToggle}
        >
          {title}
        </button>
      </h3>
      <div className="fr-collapse" id={`accordion-${id}`} style={{ display: expanded ? 'block' : 'none' }}>
        <div className="fr-accordion__inner">
          {children}
        </div>
      </div>
    </div>
  );
};

function ViewDeclaration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [declaration, setDeclaration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    'general-info': true,
    'conformity': false,
    'action-plan': false,
    'contact': false
  });

  useEffect(() => {
    // Récupérer les données de la déclaration depuis le stockage local
    const fetchDeclaration = async () => {
      try {
        setLoading(true);
        
        // Récupérer la déclaration
        const declarationData = await getDeclaration(id);
        
        if (declarationData) {
          setDeclaration(declarationData);
        } else {
          setError('Déclaration non trouvée. Veuillez vérifier l\'identifiant ou créer une nouvelle déclaration.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la déclaration:', error);
        setError('Impossible de charger la déclaration. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeclaration();
  }, [id]);

  const handleDownloadHTML = () => {
    // Logique pour télécharger la déclaration en HTML
    if (!declaration) return;
    
    // Créer le contenu HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Déclaration d'accessibilité - ${declaration.organisme}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          h1 { color: #000091; }
          h2 { color: #000091; margin-top: 30px; }
          .section { margin-bottom: 30px; }
          .info-row { display: flex; margin-bottom: 10px; }
          .info-label { font-weight: bold; min-width: 200px; }
        </style>
      </head>
      <body>
        <h1>Déclaration d'accessibilité</h1>
        <p><strong>Organisme :</strong> ${declaration.organisme}</p>
        <p><strong>Date de création :</strong> ${new Date(declaration.dateCreation).toLocaleDateString('fr-FR')}</p>
        
        <div class="section">
          <h2>Informations générales</h2>
          <div class="info-row">
            <div class="info-label">Type d'organisme :</div>
            <div>${declaration.typeOrganisme || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">SIRET :</div>
            <div>${declaration.siret || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">URL du site :</div>
            <div>${declaration.url || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Intitulé du site :</div>
            <div>${declaration.intituleSite || 'Non spécifié'}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>État de conformité</h2>
          <div class="info-row">
            <div class="info-label">Niveau de conformité :</div>
            <div>${declaration.niveauConformite || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Date de l'audit :</div>
            <div>${declaration.dateAudit ? new Date(declaration.dateAudit).toLocaleDateString('fr-FR') : 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Résultats d'audit :</div>
            <div>${declaration.resultatAudit || 'Aucun résultat d\'audit spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Dérogations :</div>
            <div>
              ${declaration.derogationCharge ? 'Charge disproportionnée<br>' : ''}
              ${declaration.derogationExempt ? 'Contenu exempté<br>' : ''}
              ${!declaration.derogationCharge && !declaration.derogationExempt ? 'Aucune dérogation' : ''}
              ${(declaration.derogationCharge || declaration.derogationExempt) && declaration.detailDerogation ? '<br>Motif : ' + declaration.detailDerogation : ''}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Plan d'actions</h2>
          <div class="info-row">
            <div class="info-label">Mesures correctives prévues :</div>
            <div>${declaration.mesuresCorrectivesPrevues || 'Aucune mesure corrective spécifiée'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Date prévue de mise en conformité :</div>
            <div>${declaration.datePrevueMiseEnConformite ? new Date(declaration.datePrevueMiseEnConformite).toLocaleDateString('fr-FR') : 'Non spécifiée'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Budget alloué :</div>
            <div>${declaration.budgetAlloue ? declaration.budgetAlloue + ' €' : 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Moyens engagés :</div>
            <div>
              ${declaration.etudeAccessibiliteRealisee ? '- Étude d\'accessibilité réalisée<br>' : ''}
              ${declaration.ressourcesHumainesDediees ? '- Ressources humaines dédiées<br>' : ''}
              ${declaration.prestatairesSpecialises ? '- Prestataires spécialisés<br>' : ''}
              ${!declaration.etudeAccessibiliteRealisee && !declaration.ressourcesHumainesDediees && !declaration.prestatairesSpecialises ? 'Aucun moyen spécifié' : ''}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Informations de contact</h2>
          <div class="info-row">
            <div class="info-label">Nom :</div>
            <div>${declaration.contactName || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Fonction :</div>
            <div>${declaration.contactFonction || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Email :</div>
            <div>${declaration.contactEmail || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Téléphone :</div>
            <div>${declaration.contactPhone || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Adresse :</div>
            <div>${declaration.adresseSiege || 'Non spécifiée'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Canaux de contact disponibles :</div>
            <div>
              ${declaration.contactFormulaire ? '- Formulaire de contact<br>' : ''}
              ${declaration.contactEmailDedie ? '- Email dédié<br>' : ''}
              ${declaration.contactTelephone ? '- Téléphone<br>' : ''}
              ${declaration.contactCourrier ? '- Courrier postal<br>' : ''}
              ${!declaration.contactFormulaire && !declaration.contactEmailDedie && !declaration.contactTelephone && !declaration.contactCourrier ? 'Aucun canal de contact spécifié' : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Crée un objet Blob avec le contenu HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Crée une URL pour le Blob
    const url = window.URL.createObjectURL(blob);
    
    // Crée un élément a pour déclencher le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = `declaration-accessibilite-${declaration.organisme.toLowerCase().replace(/\s+/g, '-')}.html`;
    
    // Simule un clic pour démarrer le téléchargement
    document.body.appendChild(a);
    a.click();
    
    // Nettoie
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  const handleDownloadPDF = () => {
    if (!declaration) return;
    
    // Créer le contenu HTML pour le PDF avec l'en-tête du site
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Déclaration d'accessibilité - ${declaration.organisme}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Marianne:wght@300;400;500;700&display=swap');
          body { font-family: 'Marianne', Arial, sans-serif; margin: 0; padding: 20px; }
          .header { display: flex; align-items: center; margin-bottom: 30px; border-bottom: 1px solid #e5e5e5; padding-bottom: 20px; }
          .header-logo { display: flex; flex-direction: column; margin-right: 20px; }
          .fr-logo { font-size: 16px; font-weight: bold; }
          .header-title { display: flex; flex-direction: column; }
          .header-service-title { font-size: 20px; font-weight: bold; margin: 0; color: #000091; }
          .header-service-tagline { font-size: 14px; margin: 5px 0 0 0; color: #666; }
          h1 { color: #000091; margin-top: 30px; }
          h2 { color: #000091; margin-top: 20px; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px; }
          .section { margin-bottom: 30px; }
          .info-row { display: flex; margin-bottom: 10px; }
          .info-label { font-weight: bold; min-width: 200px; }
          .info-value { flex: 1; }
          ul { margin-top: 5px; padding-left: 20px; }
          .footer { margin-top: 30px; border-top: 1px solid #e5e5e5; padding-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-logo">
            <div class="fr-logo">RÉPUBLIQUE<br>FRANÇAISE</div>
          </div>
          <div class="header-title">
            <p class="header-service-title">Déclarations d'accessibilité</p>
            <p class="header-service-tagline">Téléservice de dépôt des déclarations d'accessibilité</p>
          </div>
        </div>
        
        <h1>Déclaration d'accessibilité</h1>
        <p><strong>Organisme :</strong> ${declaration.organisme}</p>
        <p><strong>Date de création :</strong> ${new Date(declaration.dateCreation).toLocaleDateString('fr-FR')}</p>
        
        <div class="section">
          <h2>Informations générales</h2>
          <div class="info-row">
            <div class="info-label">Type d'organisme :</div>
            <div class="info-value">${declaration.typeOrganisme || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">SIRET :</div>
            <div class="info-value">${declaration.siret || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">URL du site :</div>
            <div class="info-value">${declaration.url || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Intitulé du site :</div>
            <div class="info-value">${declaration.intituleSite || 'Non spécifié'}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>État de conformité</h2>
          <div class="info-row">
            <div class="info-label">Niveau de conformité :</div>
            <div class="info-value">${declaration.niveauConformite || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Date de l'audit :</div>
            <div class="info-value">${declaration.dateAudit ? new Date(declaration.dateAudit).toLocaleDateString('fr-FR') : 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Résultats d'audit :</div>
            <div class="info-value">${declaration.resultatAudit || 'Aucun résultat d\'audit spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Dérogations :</div>
            <div class="info-value">
              <ul>
                ${declaration.derogationCharge ? '<li>Charge disproportionnée</li>' : ''}
                ${declaration.derogationExempt ? '<li>Contenu exempté</li>' : ''}
                ${!declaration.derogationCharge && !declaration.derogationExempt ? '<li>Aucune dérogation</li>' : ''}
              </ul>
              ${(declaration.derogationCharge || declaration.derogationExempt) && declaration.detailDerogation ? '<p><strong>Motif :</strong> ' + declaration.detailDerogation + '</p>' : ''}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Plan d'actions</h2>
          <div class="info-row">
            <div class="info-label">Mesures correctives prévues :</div>
            <div class="info-value">${declaration.mesuresCorrectivesPrevues || 'Aucune mesure corrective spécifiée'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Date prévue de mise en conformité :</div>
            <div class="info-value">${declaration.datePrevueMiseEnConformite ? new Date(declaration.datePrevueMiseEnConformite).toLocaleDateString('fr-FR') : 'Non spécifiée'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Budget alloué :</div>
            <div class="info-value">${declaration.budgetAlloue ? declaration.budgetAlloue + ' €' : 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Moyens engagés :</div>
            <div class="info-value">
              <ul>
                ${declaration.etudeAccessibiliteRealisee ? '<li>Étude d\'accessibilité réalisée</li>' : ''}
                ${declaration.ressourcesHumainesDediees ? '<li>Ressources humaines dédiées</li>' : ''}
                ${declaration.prestatairesSpecialises ? '<li>Prestataires spécialisés</li>' : ''}
                ${!declaration.etudeAccessibiliteRealisee && !declaration.ressourcesHumainesDediees && !declaration.prestatairesSpecialises ? '<li>Aucun moyen spécifié</li>' : ''}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Informations de contact</h2>
          <div class="info-row">
            <div class="info-label">Nom :</div>
            <div class="info-value">${declaration.contactName || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Fonction :</div>
            <div class="info-value">${declaration.contactFonction || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Email :</div>
            <div class="info-value">${declaration.contactEmail || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Téléphone :</div>
            <div class="info-value">${declaration.contactPhone || 'Non spécifié'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Adresse :</div>
            <div class="info-value">${declaration.adresseSiege || 'Non spécifiée'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Canaux de contact disponibles :</div>
            <div class="info-value">
              <ul>
                ${declaration.contactFormulaire ? '<li>Formulaire de contact</li>' : ''}
                ${declaration.contactEmailDedie ? '<li>Email dédié</li>' : ''}
                ${declaration.contactTelephone ? '<li>Téléphone</li>' : ''}
                ${declaration.contactCourrier ? '<li>Courrier postal</li>' : ''}
                ${!declaration.contactFormulaire && !declaration.contactEmailDedie && !declaration.contactTelephone && !declaration.contactCourrier ? '<li>Aucun canal de contact spécifié</li>' : ''}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
        </div>
      </body>
      </html>
    `;
    
    // Options pour html2pdf
    const options = {
      margin: 10,
      filename: `declaration-accessibilite-${declaration.organisme.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Générer le PDF
    html2pdf().from(htmlContent).set(options).save();
  }; 
  
  // Fonction pour retourner à la liste des déclarations en conservant les filtres
  const handleReturnToList = () => {
    // Récupérer les filtres de sessionStorage s'ils existent
    const savedFilters = sessionStorage.getItem('declarationFilters');
    if (savedFilters) {
      // Conserver les filtres en sessionStorage pour qu'ils soient appliqués sur la page d'accueil
      // La page d'accueil les récupérera et les appliquera
    } else {
      // Si pas de filtres sauvegardés, créer une entrée vide pour éviter de perdre les filtres futurs
      sessionStorage.setItem('declarationFilters', JSON.stringify({
        searchTerm: '',
        typeOrganisme: '',
        niveauConformite: ''
      }));
    }
    navigate('/');
  };
  
  const toggleAllAccordions = () => {
    const newExpandedState = !Object.values(expandedSections).every(value => value);
    
    // Mettre à jour tous les accordéons avec le même état
    setExpandedSections({
      'general-info': newExpandedState,
      'conformity': newExpandedState,
      'action-plan': newExpandedState,
      'contact': newExpandedState
    });
  };
  
  // Fonction pour basculer un accordéon spécifique
  const toggleAccordion = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="fr-container fr-mt-4w fr-mb-4w">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8">
            <div className="fr-callout fr-callout--blue-cumulus">
              <p className="fr-callout__text">Chargement de la déclaration...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fr-container fr-mt-4w fr-mb-4w">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8">
            <div className="fr-callout fr-callout--red-marianne">
              <p className="fr-callout__title">Erreur</p>
              <p className="fr-callout__text">{error}</p>
              <div className="fr-mt-2w">
                <Button linkProps={{ to: "/" }}>Retour à l'accueil</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!declaration) {
    return (
      <div className="fr-container fr-mt-4w fr-mb-4w">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8">
            <div className="fr-callout fr-callout--brown-cafe-creme">
              <p className="fr-callout__title">Déclaration non trouvée</p>
              <p className="fr-callout__text">La déclaration demandée n'existe pas ou a été supprimée.</p>
              <div className="fr-mt-2w">
                <Button linkProps={{ to: "/" }}>Retour à l'accueil</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fr-container fr-mt-4w fr-mb-4w">
      <div className="fr-grid-row fr-grid-row--middle fr-mb-3w">
        <div className="fr-col">
          <h1>Déclaration d'accessibilité</h1>
          <p className="fr-text--sm fr-mb-0">
            <strong>Organisme :</strong> {declaration.organisme}
          </p>
          <p className="fr-text--sm fr-mb-0">
            <strong>Date de création :</strong> {new Date(declaration.dateCreation).toLocaleDateString('fr-FR')}
          </p>
        </div>
        <div className="fr-col-auto fr-mt-2w">
          <div className="fr-btns-group fr-btns-group--inline">
            <Button onClick={toggleAllAccordions}>
              {Object.values(expandedSections).every(value => value) ? "Tout replier" : "Tout déplier"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="fr-card fr-p-3w fr-mb-4w">
        
        <Accordion 
          title="Informations générales" 
          id="general-info" 
          expanded={expandedSections['general-info']}
          onToggle={() => toggleAccordion('general-info')}
        >
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>Type d'organisme :</strong> {declaration.typeOrganisme || 'Non spécifié'}</p>
              <p><strong>SIRET :</strong> {declaration.siret || 'Non spécifié'}</p>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>URL du site :</strong> {declaration.url ? (
                <a href={declaration.url} target="_blank" rel="noopener noreferrer">{declaration.url}</a>
              ) : 'Non spécifié'}</p>
              <p><strong>Intitulé du site :</strong> {declaration.intituleSite || 'Non spécifié'}</p>
            </div>
          </div>
        </Accordion>
        
        <Accordion 
          title="État de conformité" 
          id="conformity" 
          expanded={expandedSections['conformity']}
          onToggle={() => toggleAccordion('conformity')}
        >
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>Niveau de conformité :</strong> {declaration.niveauConformite || 'Non spécifié'}</p>
              <p><strong>Date de l'audit :</strong> {declaration.dateAudit ? new Date(declaration.dateAudit).toLocaleDateString('fr-FR') : 'Non spécifié'}</p>
            </div>
            <div className="fr-col-12">
              <p><strong>Résultats d'audit :</strong></p>
              <div className="fr-callout fr-callout--grey">
                <p className="fr-callout__text">{declaration.resultatAudit || 'Aucun résultat d\'audit spécifié'}</p>
              </div>
            </div>
            <div className="fr-col-12">
              <p><strong>Dérogations :</strong></p>
              <div className="fr-callout fr-callout--grey">
                <ul className="fr-list">
                  {declaration.derogationCharge && <li>Charge disproportionnée</li>}
                  {declaration.derogationExempt && <li>Contenu exempté</li>}
                  {!declaration.derogationCharge && !declaration.derogationExempt && <li>Aucune dérogation</li>}
                </ul>
                {(declaration.derogationCharge || declaration.derogationExempt) && (
                  <div>
                    <p><strong>Motif de dérogation :</strong></p>
                    <p>{declaration.detailDerogation || 'Aucun motif spécifié'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Accordion>
        
        <Accordion 
          title="Plan d'actions" 
          id="action-plan" 
          expanded={expandedSections['action-plan']}
          onToggle={() => toggleAccordion('action-plan')}
        >
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <p><strong>Mesures correctives prévues :</strong></p>
              <div className="fr-callout fr-callout--grey">
                <p className="fr-callout__text">{declaration.mesuresCorrectivesPrevues || declaration.planAction?.mesures || 'Aucune mesure corrective spécifiée'}</p>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>Date prévue de mise en conformité :</strong> {declaration.datePrevueMiseEnConformite || declaration.planAction?.datePrevue ? new Date(declaration.datePrevueMiseEnConformite || declaration.planAction?.datePrevue).toLocaleDateString('fr-FR') : 'Non spécifiée'}</p>
              <p><strong>Budget alloué :</strong> {declaration.budgetAlloue || declaration.planAction?.budget ? `${declaration.budgetAlloue || declaration.planAction?.budget} €` : 'Non spécifié'}</p>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>Moyens engagés :</strong></p>
              <ul className="fr-list">
                {(declaration.etudeAccessibiliteRealisee || declaration.planAction?.etudeRealisee) && <li>Étude d'accessibilité réalisée</li>}
                {(declaration.ressourcesHumainesDediees || declaration.planAction?.ressourcesHumaines) && <li>Ressources humaines dédiées</li>}
                {(declaration.prestatairesSpecialises || declaration.planAction?.prestataires) && <li>Prestataires spécialisés</li>}
                {!declaration.etudeAccessibiliteRealisee && !declaration.planAction?.etudeRealisee && 
                 !declaration.ressourcesHumainesDediees && !declaration.planAction?.ressourcesHumaines && 
                 !declaration.prestatairesSpecialises && !declaration.planAction?.prestataires && 
                 <li>Aucun moyen spécifié</li>}
              </ul>
            </div>
          </div>
        </Accordion>
        
        <Accordion 
          title="Informations de contact" 
          id="contact" 
          expanded={expandedSections['contact']}
          onToggle={() => toggleAccordion('contact')}
        >
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>Nom :</strong> {declaration.contactName || declaration.contact?.nom || 'Non spécifié'}</p>
              <p><strong>Fonction :</strong> {declaration.contactFonction || declaration.contact?.fonction || 'Non spécifié'}</p>
              <p><strong>Email :</strong> {declaration.contactEmail || declaration.contact?.email || 'Non spécifié'}</p>
              <p><strong>Téléphone :</strong> {declaration.contactPhone || declaration.contact?.telephone || 'Non spécifié'}</p>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <p><strong>Adresse :</strong></p>
              <div className="fr-callout fr-callout--grey">
                <p className="fr-callout__text">{declaration.adresseSiege || declaration.contact?.adresse || 'Non spécifiée'}</p>
              </div>
              <p><strong>Canaux de contact disponibles :</strong></p>
              <ul className="fr-list">
                {(declaration.contactFormulaire || declaration.contact?.canaux?.formulaire) && <li>Formulaire de contact</li>}
                {(declaration.contactEmailDedie || declaration.contact?.canaux?.email) && <li>Email dédié</li>}
                {(declaration.contactTelephone || declaration.contact?.canaux?.telephone) && <li>Téléphone</li>}
                {(declaration.contactCourrier || declaration.contact?.canaux?.courrier) && <li>Courrier postal</li>}
                {!declaration.contactFormulaire && !declaration.contact?.canaux?.formulaire && 
                 !declaration.contactEmailDedie && !declaration.contact?.canaux?.email && 
                 !declaration.contactTelephone && !declaration.contact?.canaux?.telephone && 
                 !declaration.contactCourrier && !declaration.contact?.canaux?.courrier && 
                 <li>Aucun canal de contact spécifié</li>}
              </ul>
            </div>
          </div>
        </Accordion>
      </div>
      
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12" style={{ textAlign: 'right' }}>
          <div className="fr-btns-group fr-btns-group--inline">
            <Button onClick={handleDownloadPDF}>
              Télécharger en PDF
            </Button>
            <Button
              onClick={handleReturnToList}
            >
              Retourner à la liste
            </Button>
            <Link 
              to={`/declaration/${id}/edit`} 
              className="fr-btn"
            >
              Modifier la déclaration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDeclaration;