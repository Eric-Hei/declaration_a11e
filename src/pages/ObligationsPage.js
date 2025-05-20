import React from 'react';
import { Link } from 'react-router-dom';

const ObligationsPage = () => {
  return (
    <div className="fr-container fr-mt-4w fr-mb-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-10">
          <h1>Obligations légales en matière d'accessibilité numérique</h1>
          
          <div className="fr-callout fr-callout--blue-cumulus fr-mb-4w">
            <p className="fr-callout__text">
              Cette page présente les obligations légales en matière d'accessibilité numérique pour les organismes publics et les organismes privés chargés d'une mission de service public.
            </p>
          </div>
          
          <nav className="fr-summary" role="navigation" aria-labelledby="fr-summary-title">
            <div className="fr-summary__title" id="fr-summary-title">Sommaire</div>
            <ol className="fr-summary__list">
              <li>
                <a className="fr-summary__link" href="#section-1">Cadre légal</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-2">Organismes concernés</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-3">Obligations de conformité</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-4">Déclaration d'accessibilité</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-5">Sanctions et contrôles</a>
              </li>
              <li>
                <a className="fr-summary__link" href="#section-6">Ressources et références</a>
              </li>
            </ol>
          </nav>
          
          <section id="section-1" className="fr-mt-5w">
            <h2>Cadre légal</h2>
            <p>
              L'accessibilité numérique est encadrée par plusieurs textes législatifs et réglementaires :
            </p>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Loi n° 2005-102 du 11 février 2005</h3>
                  <p className="fr-card__desc">
                    Pour l'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées.
                    Cette loi pose le principe de l'accessibilité numérique des services de communication publique en ligne.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Article 47 de la loi n° 2005-102 (modifié par la loi n° 2018-771 du 5 septembre 2018)</h3>
                  <p className="fr-card__desc">
                    Oblige les services publics numériques à être accessibles aux personnes handicapées, 
                    conformément aux normes internationales.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Décret n° 2019-768 du 24 juillet 2019</h3>
                  <p className="fr-card__desc">
                    Relatif à l'accessibilité des services de communication au public en ligne aux personnes handicapées.
                    Ce décret précise les obligations des organismes concernés et les modalités de contrôle et de sanctions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Référentiel Général d'Amélioration de l'Accessibilité (RGAA)</h3>
                  <p className="fr-card__desc">
                    Référentiel technique qui définit les critères à respecter pour rendre un site ou une application accessible.
                    La version actuelle (RGAA 4.1) a été publiée par arrêté du 20 septembre 2019, mis à jour en 2021.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="fr-card fr-card--horizontal fr-card--grey fr-mt-3w">
              <div className="fr-card__body">
                <div className="fr-card__content">
                  <h3 className="fr-card__title">Directive européenne 2016/2102</h3>
                  <p className="fr-card__desc">
                    Relative à l'accessibilité des sites internet et des applications mobiles des organismes du secteur public.
                    Cette directive a été transposée en droit français par la loi n° 2018-771 et le décret n° 2019-768.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section id="section-2" className="fr-mt-5w">
            <h2>Organismes concernés</h2>
            <p>
              Les obligations d'accessibilité numérique s'appliquent à :
            </p>
            <ul className="fr-list">
              <li>
                <strong>Les personnes morales de droit public</strong> :
                <ul>
                  <li>Les services de l'État (ministères, préfectures, etc.)</li>
                  <li>Les collectivités territoriales (régions, départements, communes, etc.)</li>
                  <li>Les établissements publics</li>
                </ul>
              </li>
              <li>
                <strong>Les personnes morales de droit privé délégataires d'une mission de service public</strong> :
                <ul>
                  <li>Les entreprises publiques</li>
                  <li>Les organismes privés chargés d'une mission de service public</li>
                </ul>
              </li>
              <li>
                <strong>Les entreprises dont le chiffre d'affaires annuel excède 250 millions d'euros</strong> (depuis la loi du 7 décembre 2020)
              </li>
            </ul>
            
            <div className="fr-callout fr-callout--yellow-tournesol fr-mt-3w">
              <h3 className="fr-callout__title">Exemptions</h3>
              <p>
                Certains contenus peuvent être exemptés des obligations d'accessibilité :
              </p>
              <ul className="fr-list">
                <li>Les fichiers bureautiques publiés avant le 23 septembre 2018</li>
                <li>Les contenus audio et vidéo préenregistrés publiés avant le 23 septembre 2020</li>
                <li>Les contenus audio et vidéo diffusés en direct</li>
                <li>Les cartes et services de cartographie en ligne (uniquement pour les données essentielles à la navigation)</li>
                <li>Les contenus de tiers qui ne sont ni financés, ni développés, ni sous le contrôle de l'organisme concerné</li>
                <li>Les reproductions de pièces de collections patrimoniales</li>
              </ul>
            </div>
          </section>
          
          <section id="section-3" className="fr-mt-5w">
            <h2>Obligations de conformité</h2>
            <p>
              Les organismes concernés doivent rendre leurs services numériques accessibles en respectant les normes d'accessibilité.
            </p>
            
            <h3 className="fr-mt-4w">Normes à respecter</h3>
            <p>
              En France, la norme de référence est le <strong>Référentiel Général d'Amélioration de l'Accessibilité (RGAA)</strong>, 
              qui est la déclinaison française des normes internationales WCAG (Web Content Accessibility Guidelines).
            </p>
            <p>
              Le RGAA est organisé en 13 thématiques et comprend 106 critères de contrôle. 
              Il est régulièrement mis à jour pour suivre l'évolution des technologies et des normes internationales.
            </p>
            
            <h3 className="fr-mt-4w">Niveaux de conformité</h3>
            <p>
              Trois niveaux de conformité sont définis :
            </p>
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12 fr-col-md-4">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title">Conforme</h4>
                      <p className="fr-card__desc">
                        Tous les critères du RGAA sont respectés.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-md-4">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title">Partiellement conforme</h4>
                      <p className="fr-card__desc">
                        La majorité des critères du RGAA sont respectés, mais certains ne le sont pas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-md-4">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title">Non conforme</h4>
                      <p className="fr-card__desc">
                        De nombreux critères du RGAA ne sont pas respectés.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="fr-mt-4w">Échéances légales</h3>
            <p>
              Les délais de mise en conformité varient selon le type de service numérique :
            </p>
            <ul className="fr-list">
              <li><strong>Sites web publiés après le 23 septembre 2018</strong> : conformité immédiate</li>
              <li><strong>Sites web publiés avant le 23 septembre 2018</strong> : conformité depuis le 23 septembre 2020</li>
              <li><strong>Applications mobiles</strong> : conformité depuis le 23 juin 2021</li>
              <li><strong>Intranets et extranets</strong> : conformité lors d'une refonte substantielle ou création nouvelle</li>
            </ul>
          </section>
          
          <section id="section-4" className="fr-mt-5w">
            <h2>Déclaration d'accessibilité</h2>
            <p>
              Chaque organisme concerné doit publier une déclaration d'accessibilité pour chacun de ses services numériques (site web, application mobile).
            </p>
            
            <h3 className="fr-mt-4w">Contenu obligatoire de la déclaration</h3>
            <p>
              La déclaration d'accessibilité doit contenir :
            </p>
            <ul className="fr-list">
              <li>L'état de conformité du service (conforme, partiellement conforme, non conforme)</li>
              <li>La date de la dernière évaluation</li>
              <li>La méthode d'évaluation utilisée (audit externe, auto-évaluation, etc.)</li>
              <li>Les résultats détaillés de l'évaluation (facultatif mais recommandé)</li>
              <li>Les contenus non accessibles et les raisons de cette non-accessibilité</li>
              <li>Les dérogations pour charge disproportionnée (avec justification)</li>
              <li>Les contenus exemptés par la loi</li>
              <li>Le plan d'action pour remédier aux non-conformités</li>
              <li>Les coordonnées du contact accessibilité</li>
              <li>La procédure de signalement des non-conformités</li>
              <li>La possibilité de saisir le Défenseur des droits</li>
            </ul>
            
            <div className="fr-callout fr-mt-3w">
              <h3 className="fr-callout__title">Notre service vous aide à créer votre déclaration</h3>
              <p className="fr-callout__text">
                Ce téléservice vous guide pas à pas dans la création de votre déclaration d'accessibilité, 
                en vous assurant de respecter toutes les exigences légales.
              </p>
              <div className="fr-mt-2w">
                <Link to="/declaration/new" className="fr-btn">Créer une déclaration</Link>
              </div>
            </div>
            
            <h3 className="fr-mt-4w">Publication de la déclaration</h3>
            <p>
              La déclaration d'accessibilité doit être :
            </p>
            <ul className="fr-list">
              <li>Facilement accessible depuis toutes les pages du site (généralement dans le pied de page)</li>
              <li>Disponible dans un format accessible (HTML et/ou PDF accessible)</li>
              <li>Pour les applications mobiles, accessible depuis la page de description de l'application sur les stores ou dans l'application elle-même</li>
              <li>Mise à jour régulièrement (au minimum une fois par an)</li>
            </ul>
          </section>
          
          <section id="section-5" className="fr-mt-5w">
            <h2>Sanctions et contrôles</h2>
            <p>
              Le respect des obligations d'accessibilité fait l'objet de contrôles et de sanctions en cas de non-conformité.
            </p>
            
            <h3 className="fr-mt-4w">Contrôles</h3>
            <p>
              Les contrôles sont effectués par :
            </p>
            <ul className="fr-list">
              <li>La Direction interministérielle du numérique (DINUM) pour les services de l'État</li>
              <li>Les autorités compétentes désignées par décret pour les autres organismes</li>
            </ul>
            <p>
              Les contrôles peuvent être initiés :
            </p>
            <ul className="fr-list">
              <li>Suite à un signalement d'un usager</li>
              <li>Dans le cadre d'un plan de contrôle annuel</li>
              <li>À la demande du Défenseur des droits</li>
            </ul>
            
            <h3 className="fr-mt-4w">Sanctions</h3>
            <p>
              En cas de non-conformité, les sanctions peuvent inclure :
            </p>
            <ul className="fr-list">
              <li>La publication du nom de l'organisme défaillant sur une liste publique</li>
              <li>Une mise en demeure de se mettre en conformité dans un délai fixé</li>
              <li>Des amendes administratives (jusqu'à 25 000 € par service numérique)</li>
              <li>Pour les entreprises dont le chiffre d'affaires excède 250 millions d'euros, l'amende peut atteindre 2% du chiffre d'affaires</li>
            </ul>
            
            <div className="fr-callout fr-callout--red-marianne fr-mt-3w">
              <h3 className="fr-callout__title">Important</h3>
              <p className="fr-callout__text">
                L'absence de déclaration d'accessibilité est considérée comme un manquement aux obligations légales, 
                même si le service numérique est partiellement ou totalement accessible.
              </p>
            </div>
          </section>
          
          <section id="section-6" className="fr-mt-5w">
            <h2>Ressources et références</h2>
            <p>
              Pour vous aider dans votre démarche de mise en accessibilité, voici quelques ressources utiles :
            </p>
            
            <div className="fr-grid-row fr-grid-row--gutters fr-mt-3w">
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title">
                        <a href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/" target="_blank" rel="noopener noreferrer" className="fr-card__link">
                          RGAA - Référentiel Général d'Amélioration de l'Accessibilité
                        </a>
                      </h3>
                      <p className="fr-card__desc">
                        Le référentiel technique officiel pour l'accessibilité numérique en France.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title">
                        <a href="https://design.numerique.gouv.fr/accessibilite/" target="_blank" rel="noopener noreferrer" className="fr-card__link">
                          Guide d'accessibilité du Système de Design de l'État
                        </a>
                      </h3>
                      <p className="fr-card__desc">
                        Recommandations et bonnes pratiques pour concevoir des services numériques accessibles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title">
                        <a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038811937/" target="_blank" rel="noopener noreferrer" className="fr-card__link">
                          Décret n° 2019-768 du 24 juillet 2019
                        </a>
                      </h3>
                      <p className="fr-card__desc">
                        Texte réglementaire détaillant les obligations d'accessibilité numérique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title">
                        <a href="https://www.defenseurdesdroits.fr/fr/guides/guide-numerique" target="_blank" rel="noopener noreferrer" className="fr-card__link">
                          Défenseur des droits
                        </a>
                      </h3>
                      <p className="fr-card__desc">
                        Informations sur les recours possibles en cas de discrimination liée à l'inaccessibilité numérique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title">
                        <a href="https://accessibilite.numerique.gouv.fr/" target="_blank" rel="noopener noreferrer" className="fr-card__link">
                          Observatoire de l'accessibilité numérique
                        </a>
                      </h3>
                      <p className="fr-card__desc">
                        Suivi de l'accessibilité des sites publics et ressources pour progresser.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fr-col-12 fr-col-md-6">
                <div className="fr-card fr-card--grey">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h3 className="fr-card__title">
                        <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="fr-card__link">
                          Web Content Accessibility Guidelines (WCAG)
                        </a>
                      </h3>
                      <p className="fr-card__desc">
                        Normes internationales sur lesquelles se base le RGAA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="fr-mt-5w fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-text--center">
              <p className="fr-text--lg">Prêt à créer votre déclaration d'accessibilité ?</p>
              <Link to="/declaration/new" className="fr-btn fr-btn--lg">Commencer une déclaration</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObligationsPage;
