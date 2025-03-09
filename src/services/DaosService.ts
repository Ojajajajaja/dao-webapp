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
      const response = await this.daosApi.daosGet();
      return response || [];
    } catch (error) {
      console.error('Error getting all DAOs:', error);
      return [];
    }
  }

  /**
   * Get a DAO by name
   */
  async getDaoByName(daoName: string): Promise<DAO | null> {
    try {
      const response = await this.daosApi.daosDaoNameGet(daoName);
      return response || null;
    } catch (error) {
      console.error(`Error getting DAO with name ${daoName}:`, error);
      return null;
    }
  }

  /**
   * Get members of a DAO
   */
  async getDaoMembers(daoName: string) {
    try {
      const dao = await this.getDaoByName(daoName);
      return dao?.members || [];
    } catch (error) {
      console.error(`Error getting members of DAO ${daoName}:`, error);
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
      // Check if user is authenticated
      const token = walletAuthService.getAccessToken();
      if (!token) {
        console.error('No authentication token found. User must be logged in to create a DAO.');
        return null;
      }

      const daoInput = new DAO();
      daoInput.name = daoData.name;
      daoInput.description = daoData.description || '';
      daoInput.ownerId = daoData.userId;
      daoInput.userWhoMadeRequest = daoData.userId;

      const response = await this.daosApi.daosPost(daoInput);
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
      // Check if user is authenticated
      const token = walletAuthService.getAccessToken();
      if (!token) {
        console.error('No authentication token found. User must be logged in to update a DAO.');
        return null;
      }

      const daoUpdate = new DAOUpdate();
      if (daoData.description !== undefined) daoUpdate.description = daoData.description;
      if (daoData.name !== undefined) daoUpdate.name = daoData.name;
      if (daoData.isActive !== undefined) daoUpdate.isActive = daoData.isActive;
      daoUpdate.userWhoMadeRequest = "0"; // This would need to be set to the current user ID

      const response = await this.daosApi.daosDaoIdPut(daoId, daoUpdate);
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
      // Check if user is authenticated
      const token = walletAuthService.getAccessToken();
      if (!token) {
        console.error('No authentication token found. User must be logged in to add members to a DAO.');
        return null;
      }

      const membership = new DAOMembership();
      membership.userId = userId;
      // Note: userWhoMadeRequest is handled by the server

      const response = await this.daosApi.daosDaoIdMembersPost(daoId, membership);
      return response || null;
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
      // Check if user is authenticated
      const token = walletAuthService.getAccessToken();
      if (!token) {
        console.error('No authentication token found. User must be logged in to remove members from a DAO.');
        return null;
      }

      const membership = new DAOMembership();
      membership.userId = userId;
      // Note: userWhoMadeRequest is handled by the server

      const response = await this.daosApi.daosDaoIdMembersDelete(daoId, membership);
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