import React from 'react';
import { Link } from 'react-router-dom';

const HelpPage = () => {
  return (
    <div className="fr-container fr-mt-4w fr-mb-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10">
          <h1>Aide à l'utilisation</h1>
          
          <div className="fr-callout fr-callout--blue-cumulus fr-mb-4w">
            <p className="fr-callout__text">
              Cette page vous guide dans l'utilisation du téléservice de dépôt des déclarations d'accessibilité.
              Pour toute question supplémentaire, n'hésitez pas à <Link to="/contact" className="fr-link">nous contacter</Link>.
            </p>
          </div>
          
          <nav className="fr-summary" role="navigation" aria-labelledby="fr-summary-title">
            <div className="fr-summary__title" id="fr-summary-title">Sommaire</div>
            <ol className="fr-summary__list">
              <li>
                <a className="fr-summary__link" href="#section-1">À quoi sert ce service ?</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-2">Comment créer une déclaration d'accessibilité ?</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-3">Comment modifier une déclaration existante ?</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-4">Comment télécharger une déclaration ?</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-5">Foire aux questions</a>
              </li>
            </ol>
          </nav>
          
          <section id="section-1" className="fr-mt-5w">
            <h2>À quoi sert ce service ?</h2>
            <p>
              Ce téléservice vous permet de créer, gérer et publier les déclarations d'accessibilité de vos sites web et applications mobiles, 
              conformément aux obligations légales en matière d'accessibilité numérique.
            </p>
            <p>
              Les déclarations d'accessibilité sont obligatoires pour tous les services publics numériques et doivent être mises à jour régulièrement.
              Ce service vous aide à :
            </p>
            <ul className="fr-list">
              <li>Créer des déclarations conformes au format réglementaire</li>
              <li>Gérer l'ensemble de vos déclarations en un seul endroit</li>
              <li>Télécharger vos déclarations au format PDF pour les publier sur vos sites</li>
              <li>Suivre l'évolution de vos plans d'action pour l'accessibilité</li>
            </ul>
            <p>
              Pour en savoir plus sur vos obligations légales, consultez la page <Link to="/obligations" className="fr-link">Obligations légales</Link>.
            </p>
          </section>
          
          <section id="section-2" className="fr-mt-5w">
            <h2>Comment créer une déclaration d'accessibilité ?</h2>
            <p>
              La création d'une déclaration se fait en 4 étapes simples :
            </p>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Étape 1 : Informations générales</h3>
                  <p className="fr-card__desc">
                    Renseignez les informations de base sur votre organisme et le site ou l'application concerné :
                  </p>
                  <ul className="fr-list">
                    <li>Nom de l'organisme</li>
                    <li>Type d'organisme</li>
                    <li>SIRET (optionnel)</li>
                    <li>URL du site ou de l'application</li>
                    <li>Intitulé du site ou de l'application</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Étape 2 : Niveau de conformité</h3>
                  <p className="fr-card__desc">
                    Indiquez le niveau de conformité de votre site ou application suite à un audit d'accessibilité :
                  </p>
                  <ul className="fr-list">
                    <li>Conforme, partiellement conforme ou non conforme</li>
                    <li>Date de l'audit</li>
                    <li>Résultats détaillés de l'audit</li>
                    <li>Dérogations éventuelles et leurs motifs</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Étape 3 : Plan d'action</h3>
                  <p className="fr-card__desc">
                    Décrivez les mesures prévues pour améliorer l'accessibilité :
                  </p>
                  <ul className="fr-list">
                    <li>Mesures correctives prévues</li>
                    <li>Date prévue de mise en conformité</li>
                    <li>Budget alloué (optionnel)</li>
                    <li>Moyens engagés pour l'accessibilité</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Étape 4 : Informations de contact</h3>
                  <p className="fr-card__desc">
                    Précisez les coordonnées pour permettre aux utilisateurs de signaler des problèmes d'accessibilité :
                  </p>
                  <ul className="fr-list">
                    <li>Adresse du siège</li>
                    <li>Canaux de contact disponibles (formulaire, email, téléphone, courrier)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="fr-callout fr-mt-4w">
              <p className="fr-callout__text">
                Une fois toutes les informations renseignées, cliquez sur "Enregistrer la déclaration" pour finaliser la création.
              </p>
            </div>
          </section>
          
          <section id="section-3" className="fr-mt-5w">
            <h2>Comment modifier une déclaration existante ?</h2>
            <p>
              Pour modifier une déclaration existante :
            </p>
            <ol className="fr-list">
              <li>Accédez à la liste des déclarations sur la page d'accueil</li>
              <li>Cliquez sur le nom de la déclaration que vous souhaitez modifier ou sur le bouton "Voir" dans la colonne Actions</li>
              <li>Sur la page de détail de la déclaration, cliquez sur le bouton "Modifier la déclaration"</li>
              <li>Effectuez vos modifications dans le formulaire</li>
              <li>Cliquez sur "Enregistrer les modifications" pour valider les changements</li>
            </ol>
            <p>
              Toutes les modifications sont enregistrées dans la base de données et seront visibles immédiatement.
            </p>
          </section>
          
          <section id="section-4" className="fr-mt-5w">
            <h2>Comment télécharger une déclaration ?</h2>
            <p>
              Pour télécharger une déclaration au format PDF :
            </p>
            <ol className="fr-list">
              <li>Accédez à la liste des déclarations sur la page d'accueil</li>
              <li>Cliquez sur le nom de la déclaration que vous souhaitez télécharger ou sur le bouton "Voir" dans la colonne Actions</li>
              <li>Sur la page de détail de la déclaration, cliquez sur le bouton "Télécharger en PDF"</li>
            </ol>
            <p>
              Le PDF généré contient toutes les informations de votre déclaration dans un format prêt à être publié sur votre site web.
              Il inclut l'en-tête officiel et est conforme aux exigences réglementaires.
            </p>
          </section>
          
          <section id="section-5" className="fr-mt-5w">
            <h2>Foire aux questions</h2>
            
            <div className="fr-accordions-group">
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-1">
                    Qui doit publier une déclaration d'accessibilité ?
                  </button>
                </h3>
                <div className="fr-collapse" id="accordion-1">
                  <p>
                    Tous les organismes publics (administrations de l'État, collectivités territoriales, établissements publics) 
                    et les organismes privés chargés d'une mission de service public doivent publier une déclaration d'accessibilité 
                    pour chacun de leurs sites web et applications mobiles.
                  </p>
                </div>
              </section>
              
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-2">
                    À quelle fréquence faut-il mettre à jour sa déclaration ?
                  </button>
                </h3>
                <div className="fr-collapse" id="accordion-2">
                  <p>
                    La déclaration d'accessibilité doit être mise à jour :
                  </p>
                  <ul className="fr-list">
                    <li>Au minimum une fois par an</li>
                    <li>Après chaque audit d'accessibilité</li>
                    <li>Après des modifications substantielles du site ou de l'application</li>
                    <li>Lorsque le plan d'action évolue</li>
                  </ul>
                </div>
              </section>
              
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-3">
                    Comment réaliser un audit d'accessibilité ?
                  </button>
                </h3>
                <div className="fr-collapse" id="accordion-3">
                  <p>
                    L'audit d'accessibilité doit être réalisé selon le Référentiel Général d'Amélioration de l'Accessibilité (RGAA).
                    Vous pouvez :
                  </p>
                  <ul className="fr-list">
                    <li>Faire appel à un prestataire spécialisé</li>
                    <li>Former vos équipes internes pour réaliser l'audit</li>
                    <li>Utiliser des outils automatisés en complément d'une vérification manuelle</li>
                  </ul>
                  <p>
                    Pour plus d'informations, consultez le site de la <a href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/" target="_blank" rel="noopener noreferrer" className="fr-link">DINUM</a>.
                  </p>
                </div>
              </section>
              
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-4">
                    Où doit être publiée la déclaration d'accessibilité ?
                  </button>
                </h3>
                <div className="fr-collapse" id="accordion-4">
                  <p>
                    La déclaration d'accessibilité doit être :
                  </p>
                  <ul className="fr-list">
                    <li>Facilement accessible depuis toutes les pages du site (généralement dans le pied de page)</li>
                    <li>Disponible dans un format accessible (HTML et/ou PDF accessible)</li>
                    <li>Pour les applications mobiles, accessible depuis la page de description de l'application sur les stores ou dans l'application elle-même</li>
                  </ul>
                </div>
              </section>
              
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-5">
                    Comment gérer les dérogations ?
                  </button>
                </h3>
                <div className="fr-collapse" id="accordion-5">
                  <p>
                    Les dérogations doivent rester exceptionnelles et être dûment justifiées. Deux types de dérogations sont possibles :
                  </p>
                  <ul className="fr-list">
                    <li><strong>Charge disproportionnée</strong> : lorsque la mise en accessibilité représente une charge financière ou organisationnelle excessive</li>
                    <li><strong>Contenu exempté</strong> : certains contenus sont exemptés par la réglementation (archives, contenus tiers non maîtrisés, etc.)</li>
                  </ul>
                  <p>
                    Dans tous les cas, vous devez détailler précisément le motif de la dérogation dans votre déclaration.
                  </p>
                </div>
              </section>
            </div>
          </section>
          
          <div className="fr-mt-5w fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-text--center">
              <p className="fr-text--lg">Vous avez d'autres questions ?</p>
              <Link to="/contact" className="fr-btn fr-btn--lg">Contactez-nous</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
