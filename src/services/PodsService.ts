/**
 * Pods Service
 * Handles all API interactions related to pods
 */

import { 
  createConfiguration, 
  DaosApi, 
  POD, 
  PODUpdate, 
  PODMembership 
} from '../core/modules/dao-api';
import { ServerConfiguration } from '../core/modules/dao-api/servers';
import { walletAuthService } from './WalletAuthService';

// Default API endpoint - now using the proxy URL
const DEFAULT_API_ENDPOINT = '/api';

/**
 * PodsService handles pod data operations
 */
export class PodsService {
  private apiEndpoint: string;
  private daosApi: DaosApi;

  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiEndpoint = apiEndpoint;
    
    // Create configuration for the API with custom base URL
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Initialize API client (pods are managed through the DaosApi)
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
   * Get all pods for a DAO
   */
  async getPods(daoId: string): Promise<POD[]> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return [];

      // Call the API with proper authentication
      const response = await apiClient.getAllPODsForDAO(daoId);
      return response || [];
    } catch (error) {
      console.error(`Error getting pods for DAO ${daoId}:`, error);
      return [];
    }
  }

  /**
   * Get a pod by its ID
   */
  async getPodById(daoId: string, podId: string): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const response = await apiClient.getPODById(daoId, podId);
      return response || null;
    } catch (error) {
      console.error(`Error getting pod with ID ${podId} from DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Create a new pod
   */
  async createPod(daoId: string, podData: {
    name: string;
    description?: string;
  }): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const pod = new POD();
      pod.name = podData.name;
      pod.description = podData.description || '';
      // Other required properties are handled by the server

      const response = await apiClient.createPOD(daoId, pod);
      return response || null;
    } catch (error) {
      console.error(`Error creating pod in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Update a pod
   */
  async updatePod(daoId: string, podId: string, podData: {
    name?: string;
    description?: string;
  }): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const podUpdate = new PODUpdate();
      if (podData.name !== undefined) podUpdate.name = podData.name;
      if (podData.description !== undefined) podUpdate.description = podData.description;
      // Other required properties are handled by the server

      const response = await apiClient.updatePOD(daoId, podId, podUpdate);
      return response || null;
    } catch (error) {
      console.error(`Error updating pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Get pod members
   */
  async getPodMembers(daoId: string, podId: string) {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return [];

      const response = await apiClient.getAllMembersOfPOD(daoId, podId);
      return response || [];
    } catch (error) {
      console.error(`Error getting members of pod ${podId} in DAO ${daoId}:`, error);
      return [];
    }
  }

  /**
   * Add a member to a pod
   */
  async addMemberToPod(daoId: string, podId: string): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const response = await apiClient.addMemberToPOD(daoId, podId);
      return response || null;
    } catch (error) {
      console.error(`Error adding member to pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Remove a member from a pod
   */
  async removeMemberFromPod(daoId: string, podId: string, userId: string): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const membership = new PODMembership();
      membership.userId = userId;
    
      const response = await apiClient.removeMemberFromPOD(daoId, podId, membership);
      return response || null;
    } catch (error) {
      console.error(`Error removing member from pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Delete a pod
   */
  async deletePod(daoId: string, podId: string): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const response = await apiClient.deletePOD(daoId, podId);
      return response || null;
    } catch (error) {
      console.error(`Error deleting pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }
}

// Create a singleton instance
export const podsService = new PodsService();

// Export default for convenience
export default podsService; 
