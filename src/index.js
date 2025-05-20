import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import { MuiDsfrThemeProvider } from '@codegouvfr/react-dsfr/mui';
import '@codegouvfr/react-dsfr/dsfr/dsfr.css';
import '@codegouvfr/react-dsfr/dsfr/utility/utility.css';
import App from './App';

// Initialisation du DSFR
startReactDsfr({ defaultColorScheme: 'light' });

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiDsfrThemeProvider>
        <App />
      </MuiDsfrThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);