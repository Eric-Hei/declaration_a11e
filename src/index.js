import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// DSFR est maintenant chargé via CDN
// Styles DSFR via CDN
import './index.css';
import App from './App';

// DSFR est chargé via CDN, pas besoin d'initialisation

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);