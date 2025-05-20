import React from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Select } from '@codegouvfr/react-dsfr/Select';

const GeneralInfoSection = ({ formData, handleChange }) => {
  const typeOptions = [
    { label: 'Administration de l\'u00c9tat', value: 'admin_etat' },
    { label: 'Ministu00e8re', value: 'ministere' },
    { label: 'Pru00e9fecture', value: 'prefecture' },
    { label: 'Direction du00e9partementale', value: 'direction_departementale' },
    { label: 'Direction ru00e9gionale', value: 'direction_regionale' },
    { label: 'Collectivitu00e9 territoriale', value: 'collectivite' },
    { label: 'Commune', value: 'commune' },
    { label: 'Du00e9partement', value: 'departement' },
    { label: 'Ru00e9gion', value: 'region' },
    { label: 'u00c9tablissement public', value: 'etablissement_public' },
    { label: 'u00c9tablissement public de santu00e9', value: 'etablissement_sante' },
    { label: 'u00c9tablissement scolaire ou universitaire', value: 'etablissement_scolaire' },
    { label: 'EPIC - u00c9tablissement Public u00e0 caractu00e8re Industriel et Commercial', value: 'epic' },
    { label: 'EPA - u00c9tablissement Public u00e0 caractu00e8re Administratif', value: 'epa' },
    { label: 'EPCI - u00c9tablissement Public de Coopu00e9ration Intercommunale', value: 'epci' },
    { label: 'Entreprise publique', value: 'entreprise_publique' },
    { label: 'Organisme de su00e9curitu00e9 sociale', value: 'securite_sociale' },
    { label: 'Association en charge de mission de service public', value: 'association_service_public' },
    { label: 'Autre organisme', value: 'autre' }
  ];

  console.log('GeneralInfoSection - formData:', formData);

  return (
    <div className={fr.cx('fr-container')}>
      <h2>Informations gu00e9nu00e9rales</h2>
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
            hintText="Su00e9lectionnez le type d'organisme"
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
            hintText="Numu00e9ro SIRET de l'organisme"
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
            hintText="Adresse complu00e8te incluant https://"
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
            label="Intitulu00e9 du site ou de l'application"
            hintText="Nom public du service numu00e9rique"
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