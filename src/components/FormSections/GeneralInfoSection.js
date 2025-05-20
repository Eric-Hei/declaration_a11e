import React from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Select } from '@codegouvfr/react-dsfr/Select';

const GeneralInfoSection = ({ formData, handleChange }) => {
  // Options simplifiées pour le test
  const typeOptions = [
    { label: "Sélectionnez un type d'organisme", value: "" },
    { label: "Administration de l'État", value: "admin_etat" },
    { label: "Ministère", value: "ministere" },
    { label: "Collectivité territoriale", value: "collectivite" },
    { label: "Établissement public", value: "etablissement_public" },
    { label: "Entreprise publique", value: "entreprise_publique" },
    { label: "Autre organisme", value: "autre" }
  ];

  console.log('TypeOrganisme value:', formData.typeOrganisme);

  return (
    <div className={fr.cx('fr-container')}>
      <h2>Informations générales</h2>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-12')}>
          <Input
            label="Nom de l'organisme"
            hintText="Nom complet de l'organisme responsable du site ou de l'application"
            nativeInputProps={{
              name: "organisme",
              value: formData.organisme || '',
              onChange: handleChange,
              required: true
            }}
            className={fr.cx('fr-mb-3w')}
          />
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Select
            label="Type d'organisme"
            hintText="Sélectionnez le type de votre organisme"
            nativeSelectProps={{
              name: "typeOrganisme",
              value: formData.typeOrganisme || '',
              onChange: handleChange,
              required: true
            }}
            options={typeOptions}
            className={fr.cx('fr-mb-3w')}
          />
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Input
            label="SIRET (optionnel)"
            hintText="Numéro SIRET de l'organisme"
            nativeInputProps={{
              name: "siret",
              value: formData.siret || '',
              onChange: handleChange,
              pattern: "[0-9]{14}"
            }}
            className={fr.cx('fr-mb-3w')}
          />
        </div>

        <div className={fr.cx('fr-col-12')}>
          <Input
            label="URL du site ou de l'application"
            hintText="Adresse complète incluant https://"
            nativeInputProps={{
              name: "url",
              value: formData.url || '',
              type: "url",
              onChange: handleChange,
              required: true
            }}
            className={fr.cx('fr-mb-3w')}
          />
        </div>

        <div className={fr.cx('fr-col-12')}>
          <Input
            label="Intitulé du site ou de l'application"
            hintText="Nom public du service numérique"
            nativeInputProps={{
              name: "intituleSite",
              value: formData.intituleSite || '',
              onChange: handleChange,
              required: true
            }}
            className={fr.cx('fr-mb-5w')}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSection;