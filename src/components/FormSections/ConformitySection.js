import React from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';
import { Alert } from '@codegouvfr/react-dsfr/Alert';

const ConformitySection = ({ formData, handleChange }) => {
  return (
    <div className={fr.cx('fr-container')}>
      <h2>Niveau de conformité</h2>

      <div className={fr.cx('fr-mb-4w')}>
        <Alert
          severity="info"
          small
          closable
          title="Information sur les niveaux de conformité"
          description="Le niveau de conformité est déterminé apr\u00e8s un audit d'accessibilité selon le RGAA. Un site est 'conforme' s'il respecte tous les crit\u00e8res, 'partiellement conforme' s'il respecte la majorité des crit\u00e8res, et 'non conforme' s'il présente des non-conformités majeures."
        />
      </div>

      <RadioButtons
        legend="Sélectionnez le niveau de conformité"
        hintText="Niveau basé sur l'audit d'accessibilité RGAA"
        options={[
          {
            label: "Conforme",
            hintText: "Tous les crit\u00e8res RGAA sont respectés",
            nativeInputProps: {
              value: "conforme",
              name: "niveauConformite",
              onChange: handleChange,
              checked: formData.niveauConformite === "conforme"
            }
          },
          {
            label: "Partiellement conforme",
            hintText: "Certains crit\u00e8res RGAA ne sont pas respectés",
            nativeInputProps: {
              value: "partiel",
              name: "niveauConformite",
              onChange: handleChange,
              checked: formData.niveauConformite === "partiel"
            }
          },
          {
            label: "Non conforme",
            hintText: "De nombreux crit\u00e8res RGAA ne sont pas respectés",
            nativeInputProps: {
              value: "non_conforme",
              name: "niveauConformite",
              onChange: handleChange,
              checked: formData.niveauConformite === "non_conforme"
            }
          }
        ]}
        className={fr.cx('fr-mb-4w')}
      />
      
      <Input
        label="Date de l'audit"
        hintText="Date de l'audit ayant déterminé ce niveau de conformité"
        nativeInputProps={{
          name: "dateAudit",
          value: formData.dateAudit || '',
          type: "date",
          onChange: handleChange,
          required: true
        }}
        className={fr.cx('fr-mb-4w')}
      />

      <Input
        label="Résultats d'audit d'accessibilité"
        hintText="Mentionnez les non-conformités détectées lors de l'audit"
        textArea
        nativeTextAreaProps={{
          name: "resultatAudit",
          value: formData.resultatAudit || '',
          onChange: handleChange,
          rows: 5,
          required: formData.niveauConformite !== "conforme"
        }}
        className={fr.cx('fr-mb-4w')}
      />
      
      {(formData.niveauConformite === "partiel" || formData.niveauConformite === "non_conforme") && (
        <div>
          <h3>Dérogations</h3>
          <Checkbox
            legend="Motifs de dérogation"
            options={[
              {
                label: "Charge disproportionnée",
                hintText: "La mise en accessibilité représente une charge excessive",
                nativeInputProps: {
                  name: "derogationCharge",
                  checked: formData.derogationCharge || false,
                  onChange: (e) => handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked
                    }
                  })
                }
              },
              {
                label: "Contenu exempt",
                hintText: "Contenu non soumis \u00e0 l'obligation d'accessibilité",
                nativeInputProps: {
                  name: "derogationExempt",
                  checked: formData.derogationExempt || false,
                  onChange: (e) => handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked
                    }
                  })
                }
              }
            ]}
            className={fr.cx('fr-mb-3w')}
          />
          
          <Input
            label="Détail des dérogations"
            hintText="Précisez les contenus concernés et les motifs de dérogation"
            textArea
            nativeTextAreaProps={{
              name: "detailDerogation",
              value: formData.detailDerogation || '',
              onChange: handleChange,
              rows: 4,
              required: formData.derogationCharge || formData.derogationExempt
            }}
            className={fr.cx('fr-mb-5w')}
          />
        </div>
      )}
    </div>
  );
};

export default ConformitySection;