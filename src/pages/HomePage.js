import React from 'react';
import { fr } from '@codegouvfr/react-dsfr';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Tile } from '@codegouvfr/react-dsfr/Tile';

function HomePage() {
  return (
    <div>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-mb-5w')}>
        <div className={fr.cx('fr-col-12')}>
          <h1>Déclaration d'accessibilité</h1>
          <p className={fr.cx('fr-text--lead')}>
            Bienvenue sur le téléservice de dépôt des déclarations d'accessibilité numérique
            pour les organismes publics soumis au RGAA.
          </p>
          <Button
            linkProps={{
              href: '/declaration/new'
            }}
            size="large"
          >
            Créer une nouvelle déclaration
          </Button>
        </div>
      </div>

      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-md-4')}>
          <Tile
            title="Comment \u00e7a marche ?"
            linkProps={{
              href: '/aide'
            }}
            desc="Découvrez comment créer et gérer vos déclarations d'accessibilité"
          />
        </div>
        <div className={fr.cx('fr-col-md-4')}>
          <Tile
            title="Le RGAA"
            linkProps={{
              href: 'https://accessibilite.numerique.gouv.fr/',
              target: '_blank'
            }}
            desc="Consultez le Référentiel Général d'Amélioration de l'Accessibilité"
          />
        </div>
        <div className={fr.cx('fr-col-md-4')}>
          <Tile
            title="Obligations légales"
            linkProps={{
              href: '/obligations'
            }}
            desc="Informations sur le décret n°2019-768 du 24 juillet 2019"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;