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

const Alert = ({ severity = 'info', small, closable, title, description }) => (
  <div className={`fr-alert fr-alert--${severity} ${small ? 'fr-alert--sm' : ''}`}>
    {title && <h3 className="fr-alert__title">{title}</h3>}
    <p>{description}</p>
  </div>
);

const RadioButtons = ({ legend, hintText, options, className }) => (
  <div className={`fr-form-group ${className || ''}`}>
    <fieldset className="fr-fieldset">
      <legend className="fr-fieldset__legend">{legend}</legend>
      {hintText && <p className="fr-hint-text">{hintText}</p>}
      <div className="fr-fieldset__content">
        {options.map((option, index) => (
          <div className="fr-radio-group" key={index}>
            <input type="radio" id={`radio-${index}`} {...option.nativeInputProps} />
            <label className="fr-label" htmlFor={`radio-${index}`}>{option.label}</label>
            {option.hintText && <p className="fr-hint-text">{option.hintText}</p>}
          </div>
        ))}
      </div>
    </fieldset>
  </div>
);

const Checkbox = ({ legend, options, className }) => (
  <div className={`fr-form-group ${className || ''}`}>
    <fieldset className="fr-fieldset">
      {legend && <legend className="fr-fieldset__legend">{legend}</legend>}
      <div className="fr-fieldset__content">
        {options.map((option, index) => (
          <div className="fr-checkbox-group" key={index}>
            <input type="checkbox" id={`checkbox-${index}`} {...option.nativeInputProps} />
            <label className="fr-label" htmlFor={`checkbox-${index}`}>{option.label}</label>
            {option.hintText && <p className="fr-hint-text">{option.hintText}</p>}
          </div>
        ))}
      </div>
    </fieldset>
  </div>
);

const ConformitySection = ({ formData, handleChange }) => {
  return (
    <div className="fr-container">
      <h2>Niveau de conformité</h2>

      <div className="fr-mb-4w">
        <Alert
          severity="info"
          small
          closable
          title="Information sur les niveaux de conformité"
          description="Le niveau de conformité est déterminé après un audit d'accessibilité selon le RGAA. Un site est 'conforme' s'il respecte tous les critères, 'partiellement conforme' s'il respecte la majorité des critères, et 'non conforme' s'il présente des non-conformités majeures."
        />
      </div>

      <RadioButtons
        legend="Sélectionnez le niveau de conformité"
        hintText="Niveau basé sur l'audit d'accessibilité RGAA"
        options={[
          {
            label: "Conforme",
            hintText: "Tous les critères RGAA sont respectés",
            nativeInputProps: {
              value: "conforme",
              name: "niveauConformite",
              onChange: handleChange,
              checked: formData.niveauConformite === "conforme"
            }
          },
          {
            label: "Partiellement conforme",
            hintText: "Certains critères RGAA ne sont pas respectés",
            nativeInputProps: {
              value: "partiel",
              name: "niveauConformite",
              onChange: handleChange,
              checked: formData.niveauConformite === "partiel"
            }
          },
          {
            label: "Non conforme",
            hintText: "De nombreux critères RGAA ne sont pas respectés",
            nativeInputProps: {
              value: "non_conforme",
              name: "niveauConformite",
              onChange: handleChange,
              checked: formData.niveauConformite === "non_conforme"
            }
          }
        ]}
        className="fr-mb-4w"
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
        className="fr-mb-4w"
      />

      <div className="fr-mb-4w">
        <div className="fr-input-group">
          <label className="fr-label" htmlFor="resultatAudit">
            Résultats d'audit d'accessibilité
            {formData.niveauConformite !== "conforme" && <span className="fr-hint-text fr-text--bold"> *</span>}
          </label>
          <span className="fr-hint-text">Mentionnez les non-conformités détectées lors de l'audit</span>
          <textarea 
            className="fr-textarea" 
            id="resultatAudit"
            name="resultatAudit"
            value={formData.resultatAudit || ''}
            onChange={handleChange}
            rows="8"
            style={{ minHeight: '150px', width: '100%', border: '1px solid #3a3a3a' }}
            required={formData.niveauConformite !== "conforme"}
          />
        </div>
      </div>
      
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
                hintText: "Contenu non soumis à l'obligation d'accessibilité",
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
            className="fr-mb-3w"
          />
          
          <div className="fr-mb-5w">
            <div className="fr-input-group">
              <label className="fr-label" htmlFor="detailDerogation">
                Détail des dérogations
                {(formData.derogationCharge || formData.derogationExempt) && <span className="fr-hint-text fr-text--bold"> *</span>}
              </label>
              <span className="fr-hint-text">Précisez les contenus concernés et les motifs de dérogation</span>
              <textarea 
                className="fr-textarea" 
                id="detailDerogation"
                name="detailDerogation"
                value={formData.detailDerogation || ''}
                onChange={handleChange}
                rows="6"
                style={{ minHeight: '120px', width: '100%', border: '1px solid #3a3a3a' }}
                required={formData.derogationCharge || formData.derogationExempt}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConformitySection;