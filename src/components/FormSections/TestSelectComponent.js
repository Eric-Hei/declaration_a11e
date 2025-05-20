import React, { useState } from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Select } from '@codegouvfr/react-dsfr/Select';

const TestSelectComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');
  
  const typeOptions = [
    { label: 'Administration de l\'État', value: 'admin_etat' },
    { label: 'Collectivité territoriale', value: 'collectivite' },
    { label: 'Établissement public', value: 'etablissement_public' },
    { label: 'Entreprise publique', value: 'entreprise_publique' },
    { label: 'Autre organisme', value: 'autre' }
  ];

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className={fr.cx('fr-container')}>
      <h2>Test du composant Select</h2>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Select
            label="Type d'organisme"
            nativeSelectProps={{
              name: "typeOrganisme",
              value: selectedValue,
              onChange: handleChange,
              required: true
            }}
            options={typeOptions}
            className={fr.cx('fr-mb-3w')}
          />
        </div>
        <div className={fr.cx('fr-col-12')}>
          <p>Valeur sélectionnée: {selectedValue || 'Aucune'}</p>
        </div>
      </div>
    </div>
  );
};

export default TestSelectComponent;