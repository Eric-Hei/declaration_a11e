import React from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox';

const ContactSection = ({ formData, handleChange }) => {
  return (
    <div className={fr.cx('fr-container')}>
      <h2>Informations de contact</h2>
      
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Input
            label="Nom du contact"
            hintText="Personne responsable des questions d'accessibilité"
            nativeInputProps={{
              name: "contactName",
              value: formData.contactName || '',
              onChange: handleChange,
              required: true
            }}
            className={fr.cx('fr-mb-3w')}
          />
        </div>
        
        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Input
            label="Fonction du contact"
            hintText="Fonction ou poste occupé"
            nativeInputProps={{
              name: "contactFonction",
              value: formData.contactFonction || '',
              onChange: handleChange
            }}
            className={fr.cx('fr-mb-3w')}
          />
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
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
            className={fr.cx('fr-mb-3w')}
          />
        </div>
        
        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Input
            label="Tuléphone du contact (optionnel)"
            hintText="Numéro de tuléphone professionnel"
            nativeInputProps={{
              name: "contactPhone",
              value: formData.contactPhone || '',
              type: "tel",
              onChange: handleChange
            }}
            className={fr.cx('fr-mb-3w')}
          />
        </div>

        <div className={fr.cx('fr-col-12')}>
          <Input
            label="Adresse du si\u00e8ge (optionnel)"
            hintText="Adresse postale de l'organisme responsable"
            textArea
            nativeTextAreaProps={{
              name: "adresseSiege",
              value: formData.adresseSiege || '',
              onChange: handleChange,
              rows: 3
            }}
            className={fr.cx('fr-mb-5w')}
          />
        </div>
        
        <div className={fr.cx('fr-col-12')}>
          <h3>Moyens de contact proposiés aux utilisateurs</h3>
          <Checkbox
            legend="Canaux de signalement des probl\u00e8mes d'accessibilité"
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
            className={fr.cx('fr-mb-5w')}
          />
        </div>
      </div>

      <div className={fr.cx('fr-mb-5w')}>
        <Checkbox
          options={[
            {
              label: "Je certifie que les informations fournies sont exactes et que je suis habilité(e) \u00e0 effectuer cette déclaration au nom de l'organisme",
              nativeInputProps: {
                name: "certificationInfos",
                checked: formData.certificationInfos || false,
                onChange: (e) => handleChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked
                  }
                }),
                required: true
              }
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ContactSection;