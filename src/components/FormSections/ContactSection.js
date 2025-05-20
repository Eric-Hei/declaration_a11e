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

const Checkbox = ({ legend, options, className }) => {
  return (
    <div className={`fr-form-group ${className || ''}`}>
      {legend ? (
        <fieldset className="fr-fieldset">
          <legend className="fr-fieldset__legend">{legend}</legend>
          <div className="fr-fieldset__content">
            {options.map((option, index) => (
              <div className="fr-checkbox-group" key={index}>
                <input type="checkbox" id={`checkbox-${index}`} {...option.nativeInputProps} />
                <label className="fr-label" htmlFor={`checkbox-${index}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </fieldset>
      ) : (
        <div>
          {options.map((option, index) => (
            <div className="fr-checkbox-group" key={index}>
              <input type="checkbox" id={`checkbox-${index}`} {...option.nativeInputProps} />
              <label className="fr-label" htmlFor={`checkbox-${index}`}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ContactSection = ({ formData, handleChange }) => {
  return (
    <div className="fr-container">
      <h2>Informations de contact</h2>
      
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <Input
            label="Nom du contact"
            hintText="Personne responsable des questions d'accessibilité"
            nativeInputProps={{
              name: "contactName",
              value: formData.contactName || '',
              onChange: handleChange,
              required: true
            }}
            className="fr-mb-3w"
          />
        </div>
        
        <div className="fr-col-12 fr-col-md-6">
          <Input
            label="Fonction du contact"
            hintText="Fonction ou poste occupé"
            nativeInputProps={{
              name: "contactFonction",
              value: formData.contactFonction || '',
              onChange: handleChange
            }}
            className="fr-mb-3w"
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <Input
            label="Email du contact"
            hintText="Adresse email professionnelle"
            nativeInputProps={{
              name: "contactEmail",
              value: formData.contactEmail || '',
              type: "email",
              onChange: handleChange,
              required: true
            }}
            className="fr-mb-3w"
          />
        </div>
        
        <div className="fr-col-12 fr-col-md-6">
          <Input
            label="Téléphone du contact (optionnel)"
            hintText="Numéro de téléphone professionnel"
            nativeInputProps={{
              name: "contactPhone",
              value: formData.contactPhone || '',
              type: "tel",
              onChange: handleChange
            }}
            className="fr-mb-3w"
          />
        </div>

        <div className="fr-col-12">
          <div className="fr-mb-5w">
            <div className="fr-input-group">
              <label className="fr-label" htmlFor="adresseSiege">Adresse du siège (optionnel)</label>
              <span className="fr-hint-text">Adresse postale de l'organisme responsable</span>
              <textarea 
                className="fr-textarea" 
                id="adresseSiege"
                name="adresseSiege"
                value={formData.adresseSiege || ''}
                onChange={handleChange}
                rows="5"
                style={{ minHeight: '120px', width: '100%', border: '1px solid #3a3a3a' }}
              />
            </div>
          </div>
        </div>
        
        <div className="fr-col-12">
          <h3>Moyens de contact proposés aux utilisateurs</h3>
          <Checkbox
            legend="Canaux de signalement des problèmes d'accessibilité"
            options={[
              {
                label: "Formulaire de contact",
                nativeInputProps: {
                  name: "contactFormulaire",
                  checked: formData.contactFormulaire || false,
                  onChange: (e) => handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked
                    }
                  })
                }
              },
              {
                label: "Email dédié",
                nativeInputProps: {
                  name: "contactEmailDedie",
                  checked: formData.contactEmailDedie || false,
                  onChange: (e) => handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked
                    }
                  })
                }
              },
              {
                label: "Téléphone",
                nativeInputProps: {
                  name: "contactTelephone",
                  checked: formData.contactTelephone || false,
                  onChange: (e) => handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked
                    }
                  })
                }
              },
              {
                label: "Courrier postal",
                nativeInputProps: {
                  name: "contactCourrier",
                  checked: formData.contactCourrier || false,
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
      </div>

      <div className="fr-mb-5w fr-p-4w fr-mt-4w" style={{ backgroundColor: '#f5f5fe', borderLeft: '4px solid #000091', borderRadius: '4px' }}>
        <h3 className="fr-mb-2w">Certification des informations</h3>
        <div className="fr-form-group">
          <div className="fr-checkbox-group">
            <input 
              type="checkbox" 
              id="certificationInfos"
              name="certificationInfos"
              checked={formData.certificationInfos || false}
              onChange={(e) => handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked
                }
              })}
              required={true}
            />
            <label className="fr-label" htmlFor="certificationInfos">
              Je certifie que les informations fournies sont exactes et que je suis habilité(e) à effectuer cette déclaration au nom de l'organisme
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;