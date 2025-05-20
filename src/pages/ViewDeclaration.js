import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fr } from '@codegouvfr/react-dsfr';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Notice } from '@codegouvfr/react-dsfr/Notice';

function ViewDeclaration() {
  const { id } = useParams();
  const [declaration, setDeclaration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    // Ici, nous simulons un chargement de déclaration
    // Dans un cas réel, nous ferions un appel à une API
    setTimeout(() => {
      // Exemple de données de test
      setDeclaration({
        id: id,
        organisme: "Direction Interministérielle du Numérique",
        url: "https://www.dinum.gouv.fr",
        niveauConformite: "partiellement conforme",
        resultatAudit: "L'audit réalisé le 01/01/2023 a révélé 12 non-conformités...",
        planAction: "Correction des problèmes d'accessibilité prévue pour le 31/12/2023",
        contactName: "Jean Dupont",
        contactEmail: "jean.dupont@dinum.gouv.fr",
        dateCreation: "2023-05-15"
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = () => {
    // Logique pour télécharger la déclaration en HTML
    alert('Téléchargement de la déclaration HTML');
  };

  if (loading) {
    return <div>Chargement de la déclaration...</div>;
  }

  if (error) {
    return (
      <Notice
        title="Erreur"
        type="error"
      >
        Impossible de charger la déclaration. Veuillez réessayer plus tard.
      </Notice>
    );
  }

  return (
    <div>
      <h1>Déclaration d'accessibilité</h1>
      
      <div className={fr.cx('fr-card', 'fr-p-3w', 'fr-mb-4w')}>
        <div className={fr.cx('fr-mb-3w')}>
          <strong>Date de création:</strong> {new Date(declaration.dateCreation).toLocaleDateString('fr-FR')}
        </div>
        
        <h2>{declaration.organisme}</h2>
        <p><strong>URL du site:</strong> <a href={declaration.url} target="_blank" rel="noopener noreferrer">{declaration.url}</a></p>
        
        <div className={fr.cx('fr-mb-3w')}>
          <h3>État de conformité</h3>
          <p>{declaration.niveauConformite}</p>
        </div>
        
        <div className={fr.cx('fr-mb-3w')}>
          <h3>Résultats d'audit</h3>
          <p>{declaration.resultatAudit}</p>
        </div>
        
        {declaration.planAction && (
          <div className={fr.cx('fr-mb-3w')}>
            <h3>Plan d'action</h3>
            <p>{declaration.planAction}</p>
          </div>
        )}
        
        <div>
          <h3>Contact</h3>
          <p>{declaration.contactName} - <a href={`mailto:${declaration.contactEmail}`}>{declaration.contactEmail}</a></p>
        </div>
      </div>
      
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-4')}>
          <Button
            onClick={handleDownload}
            iconId="fr-icon-download-line"
          >
            Télécharger la déclaration HTML
          </Button>
        </div>
        <div className={fr.cx('fr-col-4', 'fr-text--center')}>
          <Button
            linkProps={{
              href: '/declaration/new'
            }}
            priority="secondary"
            iconId="fr-icon-add-line"
          >
            Nouvelle déclaration
          </Button>
        </div>
        <div className={fr.cx('fr-col-4', 'fr-text--right')}>
          <Button
            linkProps={{
              href: `/declaration/${id}/edit`
            }}
            priority="secondary"
          >
            Modifier la déclaration
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewDeclaration;