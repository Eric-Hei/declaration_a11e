/**
 * Service pour le stockage des déclarations d'accessibilité en utilisant l'API backend
 */

import { DeclarationApi } from './apiService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Enregistre une nouvelle déclaration d'accessibilité
 * @param {Object} declarationData - Les données de la déclaration à sauvegarder
 * @returns {Promise} - Promise avec les données de la déclaration enregistrée
 */
export const saveDeclaration = async (declarationData) => {
  try {
    console.log('Enregistrement de la déclaration...', declarationData);
    
    // Préparer les données pour l'API
    const dataToSave = {
      ...declarationData
    };
    
    // Si pas d'ID, c'est une nouvelle déclaration
    if (!dataToSave.id) {
      dataToSave.id = uuidv4();
    }
    
    // Appeler l'API pour créer ou mettre à jour
    let response;
    
    // Vérifier si c'est une mise à jour d'une déclaration existante
    // ou une nouvelle déclaration avec un ID généré côté client
    try {
      if (declarationData.id) {
        // Essayer de récupérer la déclaration pour vérifier si elle existe
        const existingDeclaration = await DeclarationApi.getById(declarationData.id);
        
        if (existingDeclaration) {
          // Si la déclaration existe, faire une mise à jour
          response = await DeclarationApi.update(declarationData.id, dataToSave);
        } else {
          // Si la déclaration n'existe pas malgré l'ID, créer une nouvelle déclaration
          response = await DeclarationApi.create(dataToSave);
        }
      } else {
        // Pas d'ID, créer une nouvelle déclaration
        response = await DeclarationApi.create(dataToSave);
      }
    } catch (error) {
      // Si la récupération échoue (par exemple, 404), créer une nouvelle déclaration
      console.log('Erreur lors de la vérification de la déclaration, création d\'une nouvelle déclaration:', error);
      response = await DeclarationApi.create(dataToSave);
    }
    
    return {
      success: true,
      id: response.id,
      url: `/declaration/${response.id}`,
      ...response
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
    
    // Récupérer la déclaration via l'API
    const declaration = await DeclarationApi.getById(id);
    
    return declaration;
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
    
    // Récupérer toutes les déclarations via l'API
    const response = await DeclarationApi.getAll();
    
    return response.data;
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
    // Récupérer d'abord la déclaration
    const declaration = await getDeclaration(id);
    
    // Génère le contenu HTML
    const htmlContent = declaration.htmlContent || '<html><body><h1>Déclaration d\'accessibilité</h1><p>Contenu non disponible</p></body></html>';
    
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
 * @returns {Promise} - Promise indiquant le succès de la suppression
 */
export const deleteDeclaration = async (id) => {
  try {
    console.log(`Suppression de la déclaration avec l'ID: ${id}`);
    
    // Supprimer via l'API
    await DeclarationApi.remove(id);
    
    return { success: true };
  } catch (error) {
    console.error(`Erreur lors de la suppression de la déclaration ${id}:`, error);
    throw new Error('Impossible de supprimer la déclaration. Veuillez réessayer plus tard.');
  }
};

/**
 * Exporte les données des déclarations au format CSV pour les rapports
 * @param {Object} filters - Filtres à appliquer avant l'export
 * @returns {Promise<Blob>} - Fichier CSV sous forme de Blob
 */
export const exportDeclarationsCSV = async (filters = {}) => {
  try {
    // Exporter via l'API
    const blob = await DeclarationApi.exportCSV(filters);
    return blob;
  } catch (error) {
    console.error('Erreur lors de l\'export des déclarations:', error);
    throw new Error('Impossible d\'exporter les déclarations. Veuillez réessayer plus tard.');
  }
};
