/**
 * Service pour les interactions avec l'API du téléservice
 */

import axios from 'axios'; // Pour les appels API réels

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.declarations-accessibilite.gouv.fr';
const API_VERSION = 'v1';

const API_ENDPOINTS = {
  declarations: `${API_BASE_URL}/${API_VERSION}/declarations`,
  users: `${API_BASE_URL}/${API_VERSION}/users`,
  auth: `${API_BASE_URL}/${API_VERSION}/auth`,
  stats: `${API_BASE_URL}/${API_VERSION}/stats`
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
   * Récup\u00e8re toutes les déclarations avec pagination et filtres
   * @param {Object} params - Param\u00e8tres de filtrage et pagination
   * @returns {Promise<Object>} - Données paginrées
   */
  getAll: async (params = {}) => {
    try {
      // Simulation: dans un environnement de production, nous utiliserions l'API réelle
      // const response = await api.get(API_ENDPOINTS.declarations, { params });
      // return response.data;
      
      // Simulation de la réponse pour la démonstration
      console.log('Appel API GET /declarations avec param\u00e8tres:', params);
      
      // Réponse simulée
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = Array(20).fill(null).map((_, index) => ({
        id: `decl-${index + 1}`,
        organisme: `Organisme ${index + 1}`,
        url: `https://example${index + 1}.gouv.fr`,
        intituleSite: `Site ${index + 1}`,
        niveauConformite: ['conforme', 'partiel', 'non_conforme'][Math.floor(Math.random() * 3)],
        dateCreation: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      }));
      
      return {
        data: mockData.slice(0, params.limit || 10),
        pagination: {
          totalItems: mockData.length,
          totalPages: Math.ceil(mockData.length / (params.limit || 10)),
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
   * Récup\u00e8re une déclaration par son ID
   * @param {String} id - Identifiant de la déclaration
   * @returns {Promise<Object>} - Données de la déclaration
   */
  getById: async (id) => {
    try {
      // Version API réelle
      // const response = await api.get(`${API_ENDPOINTS.declarations}/${id}`);
      // return response.data;
      
      // Simulation
      console.log(`Appel API GET /declarations/${id}`);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        id,
        organisme: 'DINUM',
        url: 'https://numerique.gouv.fr',
        intituleSite: 'Site de la DINUM',
        niveauConformite: 'partiel',
        dateAudit: '2023-02-15',
        resultatAudit: 'Audit réalisé par une entité externe. 12 non-conformités détectées.',
        planAction: 'Plan de mise en conformité sur 6 mois',
        contact: {
          nom: 'Jean Dupont',
          email: 'jean.dupont@example.gouv.fr'
        },
        htmlContent: '<html><body><h1>Déclaration d\'accessibilité</h1><p>Contenu de la déclaration</p></body></html>',
        dateCreation: '2023-04-10T14:30:00Z',
        status: 'published'
      };
    } catch (error) {
      console.error(`Erreur API getById declaration ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Crée une nouvelle déclaration
   * @param {Object} data - Données de la déclaration \u00e0 créer
   * @returns {Promise<Object>} - Déclaration créée
   */
  create: async (data) => {
    try {
      // Version API réelle
      // const response = await api.post(API_ENDPOINTS.declarations, data);
      // return response.data;
      
      // Simulation
      console.log('Appel API POST /declarations avec données:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        id: `decl-${Date.now()}`,
        ...data,
        dateCreation: new Date().toISOString(),
        status: 'draft'
      };
    } catch (error) {
      console.error('Erreur API create declaration:', error);
      throw error;
    }
  },
  
  /**
   * Met \u00e0 jour une déclaration existante
   * @param {String} id - Identifiant de la déclaration
   * @param {Object} data - Données \u00e0 mettre \u00e0 jour
   * @returns {Promise<Object>} - Déclaration mise \u00e0 jour
   */
  update: async (id, data) => {
    try {
      // Version API réelle
      // const response = await api.put(`${API_ENDPOINTS.declarations}/${id}`, data);
      // return response.data;
      
      // Simulation
      console.log(`Appel API PUT /declarations/${id} avec données:`, data);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return {
        id,
        ...data,
        dateModification: new Date().toISOString()
      };
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
  delete: async (id) => {
    try {
      // Version API réelle
      // const response = await api.delete(`${API_ENDPOINTS.declarations}/${id}`);
      // return response.data;
      
      // Simulation
      console.log(`Appel API DELETE /declarations/${id}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, message: 'Déclaration supprimée avec succ\u00e8s.' };
    } catch (error) {
      console.error(`Erreur API delete declaration ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Publie une déclaration (change son statut \u00e0 'published')
   * @param {String} id - Identifiant de la déclaration
   * @returns {Promise<Object>} - Déclaration publiée
   */
  publish: async (id) => {
    try {
      // Version API réelle
      // const response = await api.patch(`${API_ENDPOINTS.declarations}/${id}/publish`);
      // return response.data;
      
      // Simulation
      console.log(`Appel API PATCH /declarations/${id}/publish`);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        id,
        status: 'published',
        datePublication: new Date().toISOString(),
        message: 'Déclaration publiée avec succ\u00e8s.'
      };
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
      // Version API réelle
      // const response = await api.get(`${API_ENDPOINTS.declarations}/export/csv`, {
      //   params: filters,
      //   responseType: 'blob'
      // });
      // return response.data;
      
      // Simulation
      console.log('Appel API GET /declarations/export/csv avec filtres:', filters);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Création d'un CSV de démonstration
      const headers = 'ID,Organisme,URL,Niveau,Date Création\n';
      const rows = [
        'decl-1,DINUM,https://numerique.gouv.fr,partiel,2023-03-15\n',
        'decl-2,Minist\u00e8re de l\'Intérieur,https://interieur.gouv.fr,conforme,2023-02-10\n',
        'decl-3,P\u00f4le Emploi,https://pole-emploi.fr,non_conforme,2023-01-20\n'
      ];
      
      const csvContent = headers + rows.join('');
      return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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
      // Version API réelle
      // const response = await api.post(`${API_ENDPOINTS.auth}/login`, credentials);
      // return response.data;
      
      // Simulation
      console.log('Appel API POST /auth/login avec identifiants:', credentials);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulation de connexion réussie pour des identifiants spécifiques
      if (credentials.email === 'admin@example.gouv.fr' && credentials.password === 'password123') {
        return {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9',
          user: {
            id: 'usr-1',
            email: 'admin@example.gouv.fr',
            name: 'Admin',
            role: 'admin',
            organisme: 'DINUM'
          }
        };
      }
      
      throw new Error('Identifiants invalides');
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
      // Version API réelle
      // const response = await api.post(`${API_ENDPOINTS.auth}/logout`);
      // return response.data;
      
      // Simulation
      console.log('Appel API POST /auth/logout');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Suppression du token en local
      localStorage.removeItem('auth_token');
      
      return { success: true, message: 'Déconnexion réussie.' };
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
   * Récup\u00e8re les statistiques globales des déclarations
   * @returns {Promise<Object>} - Statistiques des déclarations
   */
  getGlobalStats: async () => {
    try {
      // Version API réelle
      // const response = await api.get(`${API_ENDPOINTS.stats}/global`);
      // return response.data;
      
      // Simulation
      console.log('Appel API GET /stats/global');
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return {
        totalDeclarations: 1245,
        byConformity: {
          conforme: 312,
          partiel: 756,
          non_conforme: 177
        },
        byOrganismeType: {
          admin_etat: 523,
          collectivite: 412,
          etablissement_public: 187,
          entreprise_publique: 78,
          autre: 45
        },
        monthlyGrowth: [
          { month: '2023-01', count: 85 },
          { month: '2023-02', count: 92 },
          { month: '2023-03', count: 108 },
          { month: '2023-04', count: 121 },
          { month: '2023-05', count: 143 }
        ]
      };
    } catch (error) {
      console.error('Erreur API getGlobalStats:', error);
      throw error;
    }
  }
};

// Export par défaut de l'instance axios configurée
export default api;