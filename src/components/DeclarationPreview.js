import React, { useEffect, useState } from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { generatePreview } from '../services/declarationGenerator';

/**
 * Composant d'aperçu de la déclaration d'accessibilité
 * Permet de visualiser un aperçu de la déclaration avant de la générer et l'enregistrer
 */
const DeclarationPreview = ({ formData, onEdit, onSubmit }) => {
  const [previewHtml, setPreviewHtml] = useState('');

  useEffect(() => {
    // Génération de l'aperçu HTML
    if (formData) {
      const htmlPreview = generatePreview(formData);
      setPreviewHtml(htmlPreview);
    }
  }, [formData]);

  if (!formData) {
    return <div>Aucune donnée disponible pour l'aperçu</div>;
  }

  return (
    <div className={fr.cx('fr-container')}>
      <div className={fr.cx('fr-grid-row', 'fr-mb-2w')}>
        <div className={fr.cx('fr-col-12')}>
          <h2>Aperçu de votre déclaration</h2>
          <p className={fr.cx('fr-text--sm')}>
            Voici un aperçu simplifié de la déclaration d'accessibilité qui sera générée. 
            Veuillez vérifier les informations avant de finaliser.
          </p>
        </div>
      </div>

      <div className={fr.cx('fr-grid-row', 'fr-mb-4w')}>
        <div className={fr.cx('fr-col-12')}>
          <div 
            className={fr.cx('fr-p-2w', 'fr-mb-3w')} 
            style={{ border: '1px solid #e5e5e5', borderRadius: '4px' }}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>

      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-12')}>
          <h3>Informations complémentaires sur la déclaration</h3>
          
          <div className={fr.cx('fr-table')}>
            <table>
              <tbody>
                <tr>
                  <th scope="row">Type d'organisme</th>
                  <td>
                    {formData.typeOrganisme === 'admin_etat' && 'Administration de l\'État'}
                    {formData.typeOrganisme === 'collectivite' && 'Collectivité territoriale'}
                    {formData.typeOrganisme === 'etablissement_public' && 'Établissement public'}
                    {formData.typeOrganisme === 'entreprise_publique' && 'Entreprise publique'}
                    {formData.typeOrganisme === 'autre' && 'Autre organisme'}
                  </td>
                </tr>
                {formData.dateAudit && (
                  <tr>
                    <th scope="row">Date de l'audit</th>
                    <td>{new Date(formData.dateAudit).toLocaleDateString('fr-FR')}</td>
                  </tr>
                )}
                {formData.niveauConformite !== 'conforme' && formData.datePrevueMiseEnConformite && (
                  <tr>
                    <th scope="row">Date prévue de mise en conformité</th>
                    <td>{new Date(formData.datePrevueMiseEnConformite).toLocaleDateString('fr-FR')}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Contact</th>
                  <td>{formData.contactName} - {formData.contactEmail}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={fr.cx('fr-grid-row', 'fr-grid-row--right', 'fr-mt-4w')}>
        <Button
          onClick={onEdit}
          priority="secondary"
          className={fr.cx('fr-mr-2w')}
        >
          Modifier
        </Button>
        <Button
          onClick={onSubmit}
        >
          Générer et enregistrer la déclaration
        </Button>
      </div>
    </div>
  );
};

export default DeclarationPreview;