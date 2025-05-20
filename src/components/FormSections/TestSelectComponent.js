import React, { useState } from 'react';
// Composant Select simplifié
const Select = ({ label, hint, nativeSelectProps, options }) => (
  <div className="fr-select-group">
    {label && <label className="fr-label" htmlFor={nativeSelectProps?.id}>{label}</label>}
    {hint && <span className="fr-hint-text">{hint}</span>}
    <select className="fr-select" {...nativeSelectProps}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

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
    <div className="fr-container">
      <h2>Test du composant Select</h2>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <Select
            label="Type d'organisme"
            nativeSelectProps={{
              name: "typeOrganisme",
              value: selectedValue,
              onChange: handleChange,
              required: true
            }}
            options={typeOptions}
            className="fr-mb-3w"
          />
        </div>
        <div className="fr-col-12">
          <p>Valeur sélectionnée: {selectedValue || 'Aucune'}</p>
        </div>
      </div>
    </div>
  );
};

export default TestSelectComponent;