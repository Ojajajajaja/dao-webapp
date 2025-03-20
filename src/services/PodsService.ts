/**
 * Pods Service
 * Handles all API interactions related to pods
 */

import { 
  createConfiguration, 
  DaosApi, 
  POD, 
  PODUpdate, 
  PODMembership,
  LinkDiscordChannel,
  DiscordMessage
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
    daoId?: string;
  }): Promise<POD | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const pod = new POD();
      pod.name = podData.name;
      pod.description = podData.description || '';
      pod.daoId = daoId;

      const response = await apiClient.createPOD(daoId, pod);
      return response.pod || null;
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
  async addMemberToPod(daoId: string, podId: string): Promise<string | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const response = await apiClient.addMemberToPOD(daoId, podId);
      return response.action || null;
    } catch (error) {
      console.error(`Error adding member to pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Remove a member from a pod
   */
  async removeMemberFromPod(daoId: string, podId: string, userId: string): Promise<string | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const membership = new PODMembership();
      membership.userId = userId;
    
      const response = await apiClient.removeMemberFromPOD(daoId, podId, membership);
      return response.action || null;
    } catch (error) {
      console.error(`Error removing member from pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Delete a pod
   */
  async deletePod(daoId: string, podId: string): Promise<string | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      const response = await apiClient.deletePOD(daoId, podId);
      return response.action || null;
    } catch (error) {
      console.error(`Error deleting pod ${podId} in DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Link a Discord channel to a POD
   */
  async linkDiscordChannelToPOD(daoId: string, podId: string, channelId: string): Promise<boolean> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return false;

      const linkDiscordChannel = new LinkDiscordChannel();
      linkDiscordChannel.channelId = channelId;
      linkDiscordChannel.podId = podId;

      const response = await apiClient.linkDiscordChannelToPOD(daoId, podId, linkDiscordChannel);
      return !!response;
    } catch (error) {
      console.error(`Error linking Discord channel ${channelId} to pod ${podId} in DAO ${daoId}:`, error);
      return false;
    }
  }

  /**
   * Check if a user is a member of a POD
   */
  async checkUserPodMembership(daoId: string, podId: string, userId: string): Promise<boolean> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return false;

      // Get all members of the POD
      const members = await this.getPodMembers(daoId, podId);
      
      // Check if the user is in the members list
      return members.some((member: any) => member.userId === userId);
    } catch (error) {
      console.error(`Error checking membership for user ${userId} in pod ${podId}:`, error);
      return false;
    }
  }

  /**
   * Join a POD (add current user as a member)
   */
  async joinPod(daoId: string, podId: string, userId: string): Promise<boolean> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return false;

      // Add the current user to the POD
      await this.addMemberToPod(daoId, podId);
      return true;
    } catch (error) {
      console.error(`Error joining pod ${podId} in DAO ${daoId}:`, error);
      return false;
    }
  }

  /**
   * Leave a POD (remove current user from members)
   */
  async leavePod(daoId: string, podId: string, userId: string): Promise<boolean> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return false;

      // Remove the user from the POD
      await this.removeMemberFromPod(daoId, podId, userId);
      return true;
    } catch (error) {
      console.error(`Error leaving pod ${podId} in DAO ${daoId}:`, error);
      return false;
    }
  }

  /**
   * Get the feed of messages for a POD
   */
  async getPodFeed(daoId: string, podId: string): Promise<DiscordMessage[]> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return [];

      const response = await apiClient.getPODFeed(daoId, podId);
      return response?.messages || [];
    } catch (error) {
      console.error(`Error getting feed for pod ${podId} in DAO ${daoId}:`, error);
      return [];
    }
  }
}

// Create a singleton instance
export const podsService = new PodsService();

// Export default for convenience
export default podsService; 
