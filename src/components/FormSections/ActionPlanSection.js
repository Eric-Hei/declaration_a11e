import React from 'react';
// Composants DSFR simplifiés
const Input = ({ label, hintText, textArea, nativeInputProps, nativeTextAreaProps, className }) => (
  <div className={`fr-input-group ${className || ''}`}>
    {label && <label className="fr-label">{label}</label>}
    {hintText && <span className="fr-hint-text">{hintText}</span>}
    {textArea ? 
      <textarea className="fr-textarea" {...nativeTextAreaProps} /> : 
      <input className="fr-input" {...nativeInputProps} />
    }
  </div>
);

const Alert = ({ severity = 'info', small, description }) => (
  <div className={`fr-alert fr-alert--${severity} ${small ? 'fr-alert--sm' : ''}`}>
    <p>{description}</p>
  </div>
);

const Checkbox = ({ options, className }) => (
  <div className={`fr-form-group ${className || ''}`}>
    {options.map((option, index) => (
      <div className="fr-checkbox-group" key={index}>
        <input type="checkbox" id={`checkbox-${index}`} {...option.nativeInputProps} />
        <label className="fr-label" htmlFor={`checkbox-${index}`}>{option.label}</label>
      </div>
    ))}
  </div>
);

const ActionPlanSection = ({ formData, handleChange }) => {
  // N'affiche cette section que pour les déclarations partiellement ou non conformes
  if (formData.niveauConformite !== 'partiel' && formData.niveauConformite !== 'non_conforme') {
    return null;
  }

  return (
    <div className="fr-container">
      <h2>Plan d'actions</h2>
      
      <div className="fr-mb-3w">
        <Alert
          severity="info"
          small
          description="Un plan d'action est obligatoire pour tous les sites partiellement ou non conformes. Il doit détailler les mesures prévues pour améliorer l'accessibilité du site web."
        />
      </div>

      <div className="fr-mb-3w">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="mesuresCorrectivesPrevues">
            Mesures correctives prévues
            <span className="fr-hint-text fr-text--bold"> *</span>
          </label>
          <span className="fr-hint-text">Décrivez les actions qui seront mises en œuvre pour corriger les non-conformités</span>
          <textarea 
            className="fr-textarea" 
            id="mesuresCorrectivesPrevues"
            name="mesuresCorrectivesPrevues"
            value={formData.mesuresCorrectivesPrevues || ''}
            onChange={handleChange}
            rows="8"
            style={{ minHeight: '150px', width: '100%', border: '1px solid #3a3a3a' }}
            required={true}
          />
        </div>
      </div>
      
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
        className="fr-mb-3w"
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
        className="fr-mb-3w"
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
        className="fr-mb-5w"
      />
    </div>
  );
};

export default ActionPlanSection;