/**
 * User Service
 * Handles all API interactions related to users
 */

import { 
  createConfiguration, 
  UsersApi, 
  InputUpdateUser, 
  UserResponse, 
  UserExistResponse 
} from '../core/modules/dao-api';
import { ServerConfiguration } from '../core/modules/dao-api/servers';
import { walletAuthService } from './WalletAuthService';

// Default API endpoint - now using the proxy URL
const DEFAULT_API_ENDPOINT = '/api';

/**
 * UserService handles user data operations
 */
export class UserService {
  private apiEndpoint: string;
  private usersApi: UsersApi;

  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiEndpoint = apiEndpoint;
    
    // Create configuration for the API with custom base URL
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Initialize API client
    this.usersApi = new UsersApi(configuration);
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
    this.usersApi = new UsersApi(configuration);
  }

  /**
   * Get a user by ID
   */
  async getUserById(userId: number): Promise<UserResponse | null> {
    try {
      const response = await this.usersApi.getUser(userId);
      return response || null;
    } catch (error) {
      console.error(`Error getting user with ID ${userId}:`, error);
      return null;
    }
  }

  /**
   * Get a user by wallet address
   */
  async getUserByWalletAddress(walletAddress: string): Promise<UserExistResponse | null> {
    try {
      const response = await this.usersApi.getUserWithWalletAddress(walletAddress);
      return response || null;
    } catch (error) {
      console.error(`Error getting user with wallet address ${walletAddress}:`, error);
      return null;
    }
  }

  /**
   * Update a user's profile
   */
  async updateUser(userId: number, userData: {
    username?: string;
    email?: string;
    discordUsername?: string;
  }): Promise<UserResponse | null> {
    try {
      // Create the update input object
      const updateInput = new InputUpdateUser();
      
      // Only set properties that are provided
      if (userData.username !== undefined) updateInput.username = userData.username;
      if (userData.email !== undefined) updateInput.email = userData.email;
      if (userData.discordUsername !== undefined) updateInput.discordUsername = userData.discordUsername;
      
      const response = await this.usersApi.updateUser(userId, updateInput);
      return response || null;
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      return null;
    }
  }

  /**
   * Get the currently authenticated user
   * Note: This requires the user to be authenticated first
   */
  async getCurrentUser(): Promise<UserExistResponse | null> {
    const token = walletAuthService.getAccessToken();
    if (!token) {
      console.error('No authentication token found. User is not logged in.');
      return null;
    }

    try {
      // In a real implementation, you would use a specific endpoint to get the current user
      // For now, we'll assume the wallet address can be used to get the user details
      const walletAddress = localStorage.getItem('walletAddress');
      if (!walletAddress) {
        console.error('No wallet address found for the current user.');
        return null;
      }
      
      return await this.getUserByWalletAddress(walletAddress);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

// Create a singleton instance
export const userService = new UserService();

// Export default for convenience
export default userService; 