import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDeclarations } from '../services/dbStorageService';

const Button = ({ children, linkProps, size }) => {
  // Si linkProps contient href, utiliser un <a> sinon utiliser Link
  if (linkProps && linkProps.href) {
    return (
      <a 
        {...linkProps}
        className={`fr-btn ${size === 'large' ? 'fr-btn--lg' : ''}`}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link 
      {...linkProps}
      className={`fr-btn ${size === 'large' ? 'fr-btn--lg' : ''}`}
    >
      {children}
    </Link>
  );
};

const Tile = ({ title, desc, linkProps, className }) => (
  <div className={`fr-tile ${className || ''}`}>
    <div className="fr-tile__body">
      <div className="fr-tile__content">
        <h3 className="fr-tile__title">
          {linkProps ? (
            <a href={linkProps.href} target={linkProps.target}>{title}</a>
          ) : (
            title
          )}
        </h3>
        <p className="fr-tile__desc">{desc}</p>
      </div>
    </div>
  </div>
);

function HomePage() {
  const [declarations, setDeclarations] = useState([]);
  const [filteredDeclarations, setFilteredDeclarations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [typeOrganisme, setTypeOrganisme] = useState('');
  const [niveauConformite, setNiveauConformite] = useState('');
  
  // Options pour les filtres
  const typesOrganismes = [
    { value: '', label: 'Tous les types d\'organismes' },
    { value: 'admin_etat', label: 'Administration de l\'État' },
    { value: 'ministere', label: 'Ministère' },
    { value: 'collectivite', label: 'Collectivité territoriale' },
    { value: 'etablissement_public', label: 'Établissement public' },
    { value: 'entreprise_publique', label: 'Entreprise publique' },
    { value: 'autre', label: 'Autre organisme' }
  ];
  
  const niveauxConformite = [
    { value: '', label: 'Tous les niveaux de conformité' },
    { value: 'conforme', label: 'Conforme' },
    { value: 'partiel', label: 'Partiellement conforme' },
    { value: 'non_conforme', label: 'Non conforme' }
  ];
  
  useEffect(() => {
    const fetchDeclarations = async () => {
      try {
        setLoading(true);
        const data = await getDeclarations();
        setDeclarations(data);
        setFilteredDeclarations(data);
        
        // Récupérer les filtres sauvegardés s'ils existent
        const savedFilters = sessionStorage.getItem('declarationFilters');
        if (savedFilters) {
          const parsedFilters = JSON.parse(savedFilters);
          
          // Appliquer les filtres sauvegardés
          if (parsedFilters.searchTerm) setSearchTerm(parsedFilters.searchTerm);
          if (parsedFilters.typeOrganisme) setTypeOrganisme(parsedFilters.typeOrganisme);
          if (parsedFilters.niveauConformite) setNiveauConformite(parsedFilters.niveauConformite);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des déclarations:', err);
        setError('Impossible de charger les déclarations. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeclarations();
  }, []);
  
  // Filtrer les déclarations lorsque les filtres changent
  useEffect(() => {
    if (!declarations.length) return;
    
    // Sauvegarder les filtres actuels dans sessionStorage
    sessionStorage.setItem('declarationFilters', JSON.stringify({
      searchTerm,
      typeOrganisme,
      niveauConformite
    }));
    
    let results = [...declarations];
    
    // Filtre par recherche (sur organisme et intitulé du site)
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(decl => 
        (decl.organisme && decl.organisme.toLowerCase().includes(search)) ||
        (decl.intituleSite && decl.intituleSite.toLowerCase().includes(search)) ||
        (decl.url && decl.url.toLowerCase().includes(search))
      );
    }
    
    // Filtre par type d'organisme
    if (typeOrganisme) {
      results = results.filter(decl => decl.typeOrganisme === typeOrganisme);
    }
    
    // Filtre par niveau de conformité
    if (niveauConformite) {
      results = results.filter(decl => decl.niveauConformite === niveauConformite);
    }
    
    setFilteredDeclarations(results);
    setCurrentPage(1); // Réinitialiser à la première page après filtrage
  }, [declarations, searchTerm, typeOrganisme, niveauConformite]);
  
  // Calculer les déclarations à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeclarations.slice(indexOfFirstItem, indexOfLastItem);
  
  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setTypeOrganisme('');
    setNiveauConformite('');
  };

  return (
    <div className="fr-container fr-mt-4w">
      <section className="fr-mb-5w">
        <div className="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-8">
            <h1>Déclarations d'accessibilité</h1>
            <p className="fr-text--lead">
              Créez et gérez vos déclarations d'accessibilité conformément à la réglementation en vigueur.
            </p>
          </div>
          <div className="fr-col-12 fr-col-md-4 fr-text-right">
            <Button 
              linkProps={{
                to: '/declaration/new'
              }}
              size="large"
            >
              Créer une déclaration
            </Button>
          </div>
        </div>
      </section>

      {/* Liste des déclarations */}
      <section className="fr-card fr-card--grey fr-p-3w fr-mb-4w">
        <div className="fr-card__header">
          <h2 className="fr-card__title">Liste des déclarations</h2>
        </div>
        <div className="fr-card__content">
          {/* Filtres */}
          <fieldset className="fr-fieldset fr-mb-3w fr-p-2w fr-fieldset--light">
            <legend className="fr-fieldset__legend">Filtrer les déclarations</legend>
            <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-search-bar">
                  <label className="fr-label" htmlFor="search-declaration">Rechercher une déclaration</label>
                  <input
                    className="fr-input"
                    placeholder="Nom de l'organisme, URL, titre..."
                    type="search"
                    id="search-declaration"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="fr-col-12 fr-col-md-3">
                <label className="fr-label" htmlFor="type-organisme">Type d'organisme</label>
                <select
                  className="fr-select"
                  id="type-organisme"
                  value={typeOrganisme}
                  onChange={(e) => setTypeOrganisme(e.target.value)}
                >
                  {typesOrganismes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="fr-col-12 fr-col-md-3">
                <label className="fr-label" htmlFor="niveau-conformite">Niveau de conformité</label>
                <select
                  className="fr-select"
                  id="niveau-conformite"
                  value={niveauConformite}
                  onChange={(e) => setNiveauConformite(e.target.value)}
                >
                  {niveauxConformite.map(niveau => (
                    <option key={niveau.value} value={niveau.value}>{niveau.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="fr-grid-row fr-grid-row--right">
              <div className="fr-col-auto">
                <button 
                  className="fr-btn fr-btn--secondary fr-btn--sm" 
                  onClick={resetFilters}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </fieldset>
          
          {/* Résultats de recherche */}
          <div className="fr-mt-3w">
            {loading ? (
              <div className="fr-callout fr-callout--blue-cumulus">
                <p className="fr-callout__text">Chargement des déclarations...</p>
              </div>
            ) : error ? (
              <div className="fr-callout fr-callout--red-marianne">
                <p className="fr-callout__title">Erreur</p>
                <p className="fr-callout__text">{error}</p>
              </div>
            ) : filteredDeclarations.length === 0 ? (
              <div className="fr-callout fr-callout--brown-cafe-creme">
                <p className="fr-callout__text">
                  {declarations.length === 0 
                    ? "Aucune déclaration n'a été créée. Commencez par créer votre première déclaration."
                    : "Aucune déclaration ne correspond aux critères de recherche."}
                </p>
              </div>
            ) : (
              <>
                <p className="fr-text--sm fr-mb-2w">
                  <strong>{filteredDeclarations.length}</strong> déclaration(s) trouvée(s)
                  {(searchTerm || typeOrganisme || niveauConformite) && (
                    <> avec les filtres appliqués</>
                  )}
                </p>
                <div className="fr-table fr-table--bordered fr-table--layout-fixed fr-table--no-caption" style={{ width: '100%' }}>
                  <table className="fr-table--responsive-md" style={{ width: '100%' }}>
                    <caption className="fr-sr-only">Liste des déclarations d'accessibilité</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '20%' }}>Organisme</th>
                        <th scope="col" style={{ width: '20%' }}>Site web</th>
                        <th scope="col" style={{ width: '15%' }}>Type</th>
                        <th scope="col" style={{ width: '15%' }}>Conformité</th>
                        <th scope="col" style={{ width: '15%' }}>Date</th>
                        <th scope="col" style={{ width: '15%' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((declaration) => (
                        <tr key={declaration.id}>
                          <td data-label="Organisme">
                            <p className="fr-text--bold fr-mb-0">{declaration.organisme}</p>
                          </td>
                          <td data-label="Site web">
                            <a href={declaration.url} target="_blank" rel="noopener noreferrer" className="fr-link">
                              {declaration.intituleSite || declaration.url}
                            </a>
                          </td>
                          <td data-label="Type">
                            <span className="fr-badge fr-badge--sm fr-badge--blue-ecume">
                              {declaration.typeOrganisme === 'admin_etat' ? 'État' :
                               declaration.typeOrganisme === 'ministere' ? 'Ministère' :
                               declaration.typeOrganisme === 'collectivite' ? 'Collectivité' :
                               declaration.typeOrganisme === 'etablissement_public' ? 'Établissement' :
                               declaration.typeOrganisme === 'entreprise_publique' ? 'Entreprise' :
                               declaration.typeOrganisme === 'autre' ? 'Autre' : 'Non spécifié'}
                            </span>
                          </td>
                          <td data-label="Conformité">
                            <span className={`fr-badge fr-badge--sm fr-badge--${
                              declaration.niveauConformite === 'conforme' ? 'success' :
                              declaration.niveauConformite === 'partiel' ? 'warning' : 'error'
                            }`}>
                              {declaration.niveauConformite === 'conforme' ? 'Conforme' :
                               declaration.niveauConformite === 'partiel' ? 'Partiellement' : 'Non conforme'}
                            </span>
                          </td>
                          <td data-label="Date">
                            <p className="fr-text--xs fr-mb-0">
                              {new Date(declaration.dateCreation).toLocaleDateString('fr-FR')}
                            </p>
                          </td>
                          <td data-label="Actions">
                            <div className="fr-btns-group fr-btns-group--sm fr-btns-group--inline">
                              <Link 
                                to={`/declaration/${declaration.id}`} 
                                className="fr-btn fr-btn--secondary fr-btn--sm fr-icon-eye-line fr-btn--icon-left"
                                title={`Consulter la déclaration de ${declaration.organisme}`}
                              >
                                Voir
                              </Link>
                              <Link 
                                to={`/declaration/${declaration.id}/edit`} 
                                className="fr-btn fr-btn--tertiary fr-btn--sm fr-icon-edit-line fr-btn--icon-left"
                                title={`Modifier la déclaration de ${declaration.organisme}`}
                              >
                                Modifier
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {filteredDeclarations.length > itemsPerPage && (
                  <nav className="fr-pagination fr-mt-3w" aria-label="Pagination">
                    <ul className="fr-pagination__list">
                      <li>
                        <button 
                          className="fr-pagination__link fr-pagination__link--first" 
                          onClick={() => paginate(1)}
                          disabled={currentPage === 1}
                        >
                          Première page
                        </button>
                      </li>
                      <li>
                        <button 
                          className="fr-pagination__link fr-pagination__link--prev" 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Page précédente
                        </button>
                      </li>
                      {Array.from({ length: Math.ceil(filteredDeclarations.length / itemsPerPage) }, (_, i) => (
                        <li key={i + 1}>
                          <button 
                            className={`fr-pagination__link ${currentPage === i + 1 ? 'fr-pagination__link--active' : ''}`}
                            onClick={() => paginate(i + 1)}
                            aria-current={currentPage === i + 1 ? 'page' : undefined}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button 
                          className="fr-pagination__link fr-pagination__link--next" 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === Math.ceil(filteredDeclarations.length / itemsPerPage)}
                        >
                          Page suivante
                        </button>
                      </li>
                      <li>
                        <button 
                          className="fr-pagination__link fr-pagination__link--last" 
                          onClick={() => paginate(Math.ceil(filteredDeclarations.length / itemsPerPage))}
                          disabled={currentPage === Math.ceil(filteredDeclarations.length / itemsPerPage)}
                        >
                          Dernière page
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Ressources utiles */}
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-4w">
        <div className="fr-col-12">
          <h2>Ressources utiles</h2>
        </div>
        <div className="fr-col-12 fr-col-md-4">
          <Tile
            title="Comment ça marche ?"
            linkProps={{
              href: '/aide'
            }}
            desc="Découvrez comment créer et gérer vos déclarations d'accessibilité"
          />
        </div>
        <div className="fr-col-12 fr-col-md-4">
          <Tile
            title="Le RGAA"
            linkProps={{
              href: 'https://accessibilite.numerique.gouv.fr/',
              target: '_blank'
            }}
            desc="Consultez le Référentiel Général d'Amélioration de l'Accessibilité"
          />
        </div>
        <div className="fr-col-12 fr-col-md-4">
          <Tile
            title="Obligations légales"
            linkProps={{
              href: '/obligations'
            }}
            desc="Informations sur le décret n°2019-768 du 24 juillet 2019"
          />
        </div>
      </div>
      
      {/* Besoin d'aide */}
      <section className="fr-callout fr-mb-4w">
        <h2 className="fr-callout__title">Besoin d'aide ?</h2>
        <p className="fr-callout__text">
          Si vous avez des questions concernant la création ou la mise à jour de votre déclaration d'accessibilité, consultez notre <a href="/faq" className="fr-link">FAQ</a> ou <a href="/contact" className="fr-link">contactez-nous</a>.
        </p>
        <p className="fr-callout__text">
          <strong>Rappel</strong> : La déclaration d'accessibilité est obligatoire pour tous les services publics numériques et doit être mise à jour chaque année.
        </p>
      </section>
    </div>
  );
}

export default HomePage;
