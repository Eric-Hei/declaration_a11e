import React from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Alert } from '@codegouvfr/react-dsfr/Alert';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';

const ActionPlanSection = ({ formData, handleChange }) => {
  // N'affiche cette section que pour les déclarations partiellement ou non conformes
  if (formData.niveauConformite !== 'partiel' && formData.niveauConformite !== 'non_conforme') {
    return null;
  }

  return (
    <div className={fr.cx('fr-container')}>
      <h2>Plan d'action</h2>
      
      <div className={fr.cx('fr-mb-3w')}>
        <Alert
          severity="info"
          small
          description="Un plan d'action est obligatoire pour tous les sites partiellement ou non conformes. Il doit détailler les mesures prévues pour améliorer l'accessibilité du site web."
        />
      </div>

      <Input
        label="Mesures correctives prévues"
        hintText="Décrivez les actions qui seront mises en œuvre pour corriger les non-conformités"
        textArea
        nativeTextAreaProps={{
          name: "mesuresCorrectivesPrevues",
          value: formData.mesuresCorrectivesPrevues || '',
          onChange: handleChange,
          rows: 5,
          required: true
        }}
        className={fr.cx('fr-mb-3w')}
      />
      
      <Input
        label="Date prévue de mise en conformité"
        hintText="Date à laquelle vous prévoyez que le site sera conforme ou plus accessible"
        nativeInputProps={{
          name: "datePrevueMiseEnConformite",
          value: formData.datePrevueMiseEnConformite || '',
          type: "date",
          onChange: handleChange,
          required: true
        }}
        className={fr.cx('fr-mb-3w')}
      />

      <Input
        label="Budget alloué (optionnel)"
        hintText="Montant estimé des travaux de mise en conformité"
        nativeInputProps={{
          name: "budgetAlloue",
          value: formData.budgetAlloue || '',
          type: "number",
          min: "0",
          onChange: handleChange
        }}
        className={fr.cx('fr-mb-3w')}
      />

      <Checkbox
        options={[
          {
            label: "Une étude d'accessibilité a été réalisée",
            nativeInputProps: {
              name: "etudeAccessibiliteRealisee",
              checked: formData.etudeAccessibiliteRealisee || false,
              onChange: (e) => handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked
                }
              })
            }
          },
          {
            label: "Des ressources humaines sont dédiées à l'accessibilité",
            nativeInputProps: {
              name: "ressourcesHumainesDediees",
              checked: formData.ressourcesHumainesDediees || false,
              onChange: (e) => handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked
                }
              })
            }
          },
          {
            label: "Des prestataires spécialisés sont impliqués",
            nativeInputProps: {
              name: "prestatairesSpecialises",
              checked: formData.prestatairesSpecialises || false,
              onChange: (e) => handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked
                }
              })
            }
          }
        ]}
        className={fr.cx('fr-mb-5w')}
      />
    </div>
  );
};

export default ActionPlanSection;