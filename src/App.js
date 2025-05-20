import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { fr } from '@codegouvfr/react-dsfr';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { Footer } from '@codegouvfr/react-dsfr/Footer';

// Pages
import HomePage from './pages/HomePage';
import DeclarationForm from './pages/DeclarationForm';
import ViewDeclaration from './pages/ViewDeclaration';

function App() {
  return (
    <div className={fr.cx('fr-container')}>
      <Header
        brandTop={<>RÉPUBLIQUE<br />FRANÇAISE</>}
        homeLinkProps={{
          href: '/',
          title: 'Accueil - Déclarations d\'accessibilité'
        }}
        serviceTitle="Déclarations d'accessibilité"
        serviceTagline="Téléservice de dépôt des déclarations d'accessibilité"
        quickAccessItems={[
          { text: 'Aide', linkProps: { href: '/aide' } },
          { text: 'Contact', linkProps: { href: '/contact' } }
        ]}
      />
      
      <div className={fr.cx('fr-container--fluid', 'fr-my-8w')}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/declaration/new" element={<DeclarationForm />} />
          <Route path="/declaration/:id" element={<ViewDeclaration />} />
        </Routes>
      </div>
      
      <Footer
        brandTop={<>RÉPUBLIQUE<br />FRANÇAISE</>}
        accessibility="fully compliant"
        contentDescription="Téléservice pour gérer les déclarations d'accessibilité des services publics numériques"
        bottomItems={[
          {
            text: "Mentions légales",
            linkProps: { href: "/mentions-legales" }
          },
          {
            text: "Politique de confidentialité",
            linkProps: { href: "/confidentialite" }
          },
          {
            text: "Accessibilité : totalement conforme",
            linkProps: { href: "/accessibilite" }
          }
        ]}
      />
    </div>
  );
}

export default App;