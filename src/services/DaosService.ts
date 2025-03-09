/**
 * DAOs Service
 * Handles all API interactions related to DAOs
 */

import { createConfiguration, DaosApi, DAO, DAOUpdate, DAOMembership } from '../core/modules/dao-api';
import { ServerConfiguration } from '../core/modules/dao-api/servers';
import { walletAuthService } from './WalletAuthService';

// Default API endpoint - now using the proxy URL
const DEFAULT_API_ENDPOINT = '/api';

/**
 * DaosService handles DAO data operations
 */
export class DaosService {
  private apiEndpoint: string;
  private daosApi: DaosApi;

  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiEndpoint = apiEndpoint;
    
    // Create configuration for the API with custom base URL
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Initialize API client
    this.daosApi = new DaosApi(configuration);
  }

  /**
   * Create an authenticated API client with the current token
   * @private
   */
  private createAuthenticatedApiClient(): DaosApi | null {
    const token = walletAuthService.getAccessToken();
    if (!token) {
      console.error('No authentication token available');
      return null;
    }

    // Create a custom configuration with the current token
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig,
      authMethods: {
        default: {
          getName: () => 'Bearer',
          applySecurityAuthentication: (context: any) => {
            context.setHeaderParam('Authorization', `Bearer ${token}`);
          }
        }
      }
    });

    // Return a new API client instance with the token
    return new DaosApi(configuration);
  }

  /**
   * Set the API endpoint and reinitialize API client
   */
  setApiEndpoint(endpoint: string): void {
    this.apiEndpoint = endpoint;
    
    // Create new configuration with updated endpoint
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Reinitialize API client
    this.daosApi = new DaosApi(configuration);
  }

  /**
   * Get all DAOs
   */
  async getAllDaos(): Promise<DAO[]> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return [];

      const response = await apiClient.getAllDAOs();
      return response || [];
    } catch (error) {
      console.error('Error getting all DAOs:', error);
      return [];
    }
  }

  /**
   * Get a DAO by ID
   */
  async getDaoById(daoId: string): Promise<DAO | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const response = await apiClient.getDAOById(daoId);
      return response || null;
    } catch (error) {
      console.error(`Error getting DAO with ID ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Get members of a DAO
   */
  async getDaoMembers(daoId: string) {
    try {
      const dao = await this.getDaoById(daoId);
      return dao?.members || [];
    } catch (error) {
      console.error(`Error getting members of DAO ${daoId}:`, error);
      return [];
    }
  }

  /**
   * Create a new DAO
   */
  async createDao(daoData: {
    name: string;
    description?: string;
    userId: string;
  }): Promise<DAO | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const daoInput = new DAO();
      daoInput.name = daoData.name;
      daoInput.description = daoData.description || '';
      daoInput.ownerId = daoData.userId;

      const response = await apiClient.createDAO(daoInput);
      console.log(response);
      return response || null;
    } catch (error) {
      console.error('Error creating DAO:', error);
      return null;
    }
  }

  /**
   * Update a DAO by ID
   */
  async updateDao(daoId: string, daoData: {
    description?: string;
    name?: string;
    isActive?: boolean;
  }): Promise<DAO | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const daoUpdate = new DAOUpdate();
      if (daoData.description !== undefined) daoUpdate.description = daoData.description;
      if (daoData.name !== undefined) daoUpdate.name = daoData.name;
      if (daoData.isActive !== undefined) daoUpdate.isActive = daoData.isActive;

      const response = await apiClient.updateDAO(daoId, daoUpdate);
      return response || null;
    } catch (error) {
      console.error(`Error updating DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Add a member to a DAO
   */
  async addMemberToDao(daoId: string, userId: string): Promise<DAO | null> {
    try {
      const token = walletAuthService.getAccessToken();
      if (!token) {
        console.error('No authentication token available');
        return null;
      }

      const membership = new DAOMembership();
      membership.userId = userId;

      // Use fetch instead of the API client to avoid type issues
      const response = await fetch(`${this.apiEndpoint}/daos/${daoId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(membership)
      });

      if (!response.ok) {
        throw new Error(`Failed to add member: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data || null;
    } catch (error) {
      console.error(`Error adding member to DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Remove a member from a DAO
   */
  async removeMemberFromDao(daoId: string, userId: string): Promise<DAO | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const membership = new DAOMembership();
      membership.userId = userId;
      // Note: userWhoMadeRequest is handled by the server

      const response = await apiClient.removeMemberFromDAO(daoId, membership);
      return response || null;
    } catch (error) {
      console.error(`Error removing member from DAO ${daoId}:`, error);
      return null;
    }
  }
}

// Create a singleton instance
export const daosService = new DaosService();

// Export default for convenience
export default daosService; 