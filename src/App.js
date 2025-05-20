import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { initSampleData } from './services/sampleData';
import HomePage from './pages/HomePage';
import DeclarationForm from './pages/DeclarationForm';
import ViewDeclaration from './pages/ViewDeclaration';
import HelpPage from './pages/HelpPage';
import ObligationsPage from './pages/ObligationsPage';

const Header = () => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <p className="fr-logo">RÉPUBLIQUE<br />FRANÇAISE</p>
              </div>
            </div>
            <div className="fr-header__service">
              <a href="/" title="Accueil - Déclarations d'accessibilité">
                <p className="fr-header__service-title">Déclarations d'accessibilité</p>
              </a>
              <p className="fr-header__service-tagline">Téléservice de dépôt des déclarations d'accessibilité</p>
            </div>
          </div>
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <ul className="fr-btns-group">
                <li>
                  <a className="fr-btn fr-btn--tertiary" href="/aide">Aide</a>
                </li>
                <li>
                  <a className="fr-btn fr-btn--tertiary" href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-header__menu fr-modal" id="modal-491" aria-labelledby="button-492">
      <div className="fr-container">
        <button className="fr-btn--close fr-btn" aria-controls="modal-491" title="Fermer">
          Fermer
        </button>
        <div className="fr-header__menu-links"></div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="fr-footer" role="contentinfo">
    <div className="fr-container">
      <div className="fr-footer__body">
        <div className="fr-footer__brand fr-enlarge-link">
          <p className="fr-logo">RÉPUBLIQUE<br />FRANÇAISE</p>
        </div>
        <div className="fr-footer__content">
          <p className="fr-footer__content-desc">Téléservice pour gérer les déclarations d'accessibilité des services publics numériques</p>
        </div>
      </div>
      <div className="fr-footer__bottom">
        <ul className="fr-footer__bottom-list">
          <li className="fr-footer__bottom-item">
            <a className="fr-footer__bottom-link" href="/mentions-legales">Mentions légales</a>
          </li>
          <li className="fr-footer__bottom-item">
            <a className="fr-footer__bottom-link" href="/confidentialite">Politique de confidentialité</a>
          </li>
          <li className="fr-footer__bottom-item">
            <a className="fr-footer__bottom-link" href="/accessibilite">Accessibilité : totalement conforme</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

// Composants de l'application

function App() {
  // Initialiser les données d'exemple au démarrage de l'application
  useEffect(() => {
    initSampleData();
  }, []);

  return (
    <div className="fr-container">
      <Header />
      
      <div className="fr-container--fluid fr-my-8w">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/declaration/new" element={<DeclarationForm />} />
          <Route path="/declaration/:id" element={<ViewDeclaration />} />
          <Route path="/declaration/:id/edit" element={<DeclarationForm />} />
          <Route path="/aide" element={<HelpPage />} />
          <Route path="/obligations" element={<ObligationsPage />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;