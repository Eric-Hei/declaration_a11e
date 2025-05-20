/**
 * Service pour les interactions avec l'API du téléservice
 */

import axios from 'axios'; // Pour les appels API réels

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
const API_VERSION = '';

const API_ENDPOINTS = {
  declarations: `${API_BASE_URL}${API_VERSION}/api/declarations`,
  users: `${API_BASE_URL}${API_VERSION}/api/users`,
  auth: `${API_BASE_URL}${API_VERSION}/api/auth`,
  stats: `${API_BASE_URL}${API_VERSION}/api/stats`
};

// Création de l'instance axios avec configuration par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion des erreurs 401 (non authentifié)
    if (error.response && error.response.status === 401) {
      // Redirection vers la page de connexion
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Service API pour les déclarations d'accessibilité
 */
export const DeclarationApi = {
  /**
   * Récupère toutes les déclarations avec pagination et filtres
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Object>} - Données paginées
   */
  getAll: async (params = {}) => {
    try {
      console.log('Appel API GET /declarations avec paramètres:', params);
      const response = await api.get(API_ENDPOINTS.declarations, { params });
      
      // Formater la réponse pour correspondre à l'interface attendue
      return {
        data: response.data,
        pagination: {
          totalItems: response.data.length,
          totalPages: Math.ceil(response.data.length / (params.limit || 10)),
          currentPage: params.page || 1,
          limit: params.limit || 10
        }
      };
    } catch (error) {
      console.error('Erreur API getAll declarations:', error);
      throw error;
    }
  },
  
  /**
   * Récupère une déclaration par son ID
   * @param {String} id - Identifiant de la déclaration
   * @returns {Promise<Object>} - Données de la déclaration
   */
  getById: async (id) => {
    try {
      console.log(`Appel API GET /declarations/${id}`);
      const response = await api.get(`${API_ENDPOINTS.declarations}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur API getById declaration ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Crée une nouvelle déclaration
   * @param {Object} data - Données de la déclaration à créer
   * @returns {Promise<Object>} - Déclaration créée
   */
  create: async (data) => {
    try {
      console.log('Appel API POST /declarations avec données:', data);
      const response = await api.post(API_ENDPOINTS.declarations, data);
      return response.data;
    } catch (error) {
      console.error('Erreur API create declaration:', error);
      throw error;
    }
  },
  
  /**
   * Met à jour une déclaration existante
   * @param {String} id - Identifiant de la déclaration
   * @param {Object} data - Données à mettre à jour
   * @returns {Promise<Object>} - Déclaration mise à jour
   */
  update: async (id, data) => {
    try {
      console.log(`Appel API PUT /declarations/${id} avec données:`, data);
      const response = await api.put(`${API_ENDPOINTS.declarations}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erreur API update declaration ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Supprime une déclaration
   * @param {String} id - Identifiant de la déclaration
   * @returns {Promise<Object>} - Confirmation de suppression
   */
  remove: async (id) => {
    try {
      console.log(`Appel API DELETE /declarations/${id}`);
      const response = await api.delete(`${API_ENDPOINTS.declarations}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur API delete declaration ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Publie une déclaration (change son statut à 'published')
   * @param {String} id - Identifiant de la déclaration
   * @returns {Promise<Object>} - Déclaration publiée
   */
  publish: async (id) => {
    try {
      console.log(`Appel API PUT /declarations/${id}/publish`);
      const response = await api.put(`${API_ENDPOINTS.declarations}/${id}`, {
        status: 'published'
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur API publish declaration ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Exporte les données des déclarations au format CSV
   * @param {Object} filters - Filtres pour l'export
   * @returns {Promise<Blob>} - Fichier CSV
   */
  exportCSV: async (filters = {}) => {
    try {
      console.log('Appel API GET /declarations/export/csv avec filtres:', filters);
      const response = await api.get(`${API_ENDPOINTS.declarations}/export/csv`, {
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erreur API exportCSV declarations:', error);
      throw error;
    }
  }
};

/**
 * Service API pour l'authentification
 */
export const AuthApi = {
  /**
   * Authentifie un utilisateur
   * @param {Object} credentials - Identifiants de connexion
   * @returns {Promise<Object>} - Token d'authentification et informations utilisateur
   */
  login: async (credentials) => {
    try {
      console.log('Appel API POST /auth/login avec identifiants:', credentials);
      const response = await api.post(`${API_ENDPOINTS.auth}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Erreur API login:', error);
      throw error;
    }
  },
  
  /**
   * Déconnecte l'utilisateur actuel
   * @returns {Promise<Object>} - Confirmation de déconnexion
   */
  logout: async () => {
    try {
      console.log('Appel API POST /auth/logout');
      const response = await api.post(`${API_ENDPOINTS.auth}/logout`);
      
      // Suppression du token en local
      localStorage.removeItem('auth_token');
      
      return response.data;
    } catch (error) {
      console.error('Erreur API logout:', error);
      throw error;
    }
  }
};

/**
 * Service API pour les statistiques
 */
export const StatsApi = {
  /**
   * Récupère les statistiques globales des déclarations
   * @returns {Promise<Object>} - Statistiques des déclarations
   */
  getGlobalStats: async () => {
    try {
      console.log('Appel API GET /stats/global');
      const response = await api.get(`${API_ENDPOINTS.stats}/global`);
      return response.data;
    } catch (error) {
      console.error('Erreur API getGlobalStats:', error);
      throw error;
    }
  }
};

// Export par défaut de l'instance axios configurée
export default api;
