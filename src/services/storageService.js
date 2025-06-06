/**
 * Service pour le stockage des déclarations d'accessibilité en utilisant localStorage
 */

// Clé pour le stockage des déclarations dans localStorage
const STORAGE_KEY = 'declarations_accessibilite';

/**
 * Initialise le stockage local avec des données vides si nécessaire
 */
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  }
};

/**
 * Récupère toutes les déclarations du stockage local
 * @returns {Object} - Objet contenant toutes les déclarations
 */
const getAllDeclarations = () => {
  initStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

/**
 * Enregistre une nouvelle déclaration d'accessibilité
 * @param {Object} declarationData - Les données de la déclaration à sauvegarder
 * @returns {Promise} - Promise avec les données de la déclaration enregistrée
 */
export const saveDeclaration = async (declarationData) => {
  try {
    console.log('Enregistrement de la déclaration...', declarationData);
    
    // Simule un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Récupérer toutes les déclarations existantes
    const declarations = getAllDeclarations();
    
    // Ajouter ou mettre à jour la déclaration
    declarations[declarationData.id] = {
      ...declarationData,
      dateModification: new Date().toISOString()
    };
    
    // Sauvegarder dans localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(declarations));
    
    // Retourner les données de la déclaration
    return {
      success: true,
      id: declarationData.id,
      url: `/declaration/${declarationData.id}`,
      ...declarations[declarationData.id]
    };
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la déclaration:', error);
    throw new Error('Impossible d\'enregistrer la déclaration. Veuillez réessayer plus tard.');
  }
};

/**
 * Récupère une déclaration par son ID
 * @param {String} id - L'identifiant de la déclaration
 * @returns {Promise} - Promise avec les données de la déclaration
 */
export const getDeclaration = async (id) => {
  try {
    console.log(`Récupération de la déclaration avec l'ID: ${id}`);
    
    // Simule un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Récupérer toutes les déclarations
    const declarations = getAllDeclarations();
    
    // Vérifier si la déclaration existe
    if (declarations[id]) {
      return declarations[id];
    }
    
    // Si la déclaration n'existe pas, retourner null
    return null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la déclaration ${id}:`, error);
    throw new Error('Impossible de récupérer la déclaration. Veuillez réessayer plus tard.');
  }
};

/**
 * Récupère la liste des déclarations
 * @returns {Promise} - Promise avec la liste des déclarations
 */
export const getDeclarations = async () => {
  try {
    console.log('Récupération de la liste des déclarations');
    
    // Simule un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Récupérer toutes les déclarations
    const declarations = getAllDeclarations();
    
    // Convertir l'objet en tableau
    return Object.values(declarations);
  } catch (error) {
    console.error('Erreur lors de la récupération des déclarations:', error);
    throw new Error('Impossible de récupérer les déclarations. Veuillez réessayer plus tard.');
  }
};

/**
 * Génère et télécharge le fichier HTML de la déclaration
 * @param {String} id - L'identifiant de la déclaration
 * @returns {Promise} - Promise indiquant le succès du téléchargement
 */
export const downloadDeclarationHTML = async (id) => {
  try {
    // Dans un environnement réel, nous récupérerions d'abord la déclaration
    const declaration = await getDeclaration(id);
    
    // Gén\u00e8re le contenu HTML
    const htmlContent = declaration.htmlContent;
    
    // Crée un objet Blob avec le contenu HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Crée une URL pour le Blob
    const url = window.URL.createObjectURL(blob);
    
    // Crée un élément a pour déclencher le téléchargement
    const a = document.createElement('a');
    a.href = url;
    a.download = `declaration-accessibilite-${declaration.organisme.toLowerCase().replace(/\s+/g, '-')}.html`;
    
    // Simule un clic pour démarrer le téléchargement
    document.body.appendChild(a);
    a.click();
    
    // Nettoie
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return { success: true };
  } catch (error) {
    console.error(`Erreur lors du téléchargement de la déclaration ${id}:`, error);
    throw new Error('Impossible de télécharger la déclaration. Veuillez réessayer plus tard.');
  }
};

/**
 * Supprime une déclaration de la base de données
 * @param {String} id - L'identifiant de la déclaration
 * @returns {Promise} - Promise indiquant le succ\u00e8s de la suppression
 */
export const deleteDeclaration = async (id) => {
  try {
    console.log(`Suppression de la déclaration avec l'ID: ${id}`);
    
    // Simule un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  } catch (error) {
    console.error(`Erreur lors de la suppression de la déclaration ${id}:`, error);
    throw new Error('Impossible de supprimer la déclaration. Veuillez réessayer plus tard.');
  }
};

/**
 * Exporte les données des déclarations au format CSV pour les rapports
 * @param {Object} filters - Filtres \u00e0 appliquer avant l'export
 * @returns {Promise<Blob>} - Fichier CSV sous forme de Blob
 */
export const exportDeclarationsCSV = async (filters = {}) => {
  try {
    // Récup\u00e8re toutes les déclarations correspondant aux filtres
    const { declarations } = await getDeclarations({
      ...filters,
      limit: 1000, // Augmente la limite pour l'export
      page: 1
    });
    
    // Prépare les en-t\u00eates CSV
    const headers = [
      'ID', 'Organisme', 'Type', 'URL', 'Intitulé', 
      'Niveau de conformité', 'Date d\'audit', 'Date de création', 'Statut'
    ];
    
    // Convertit les données en format CSV
    const rows = declarations.map(decl => [
      decl.id,
      decl.organisme,
      decl.typeOrganisme || '',
      decl.url,
      decl.intituleSite,
      decl.niveauConformite,
      decl.dateAudit || '',
      new Date(decl.dateCreation).toLocaleDateString('fr-FR'),
      decl.status
    ]);
    
    // Gén\u00e8re le contenu CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => 
        // Gestion des virgules dans les cellules
        typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
      ).join(','))
    ].join('\n');
    
    // Crée un Blob avec les données CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    return blob;
  } catch (error) {
    console.error('Erreur lors de l\'export des déclarations:', error);
    throw new Error('Impossible d\'exporter les déclarations. Veuillez réessayer plus tard.');
  }
};