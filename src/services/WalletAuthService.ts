/**
 * Wallet Authentication Service
 * Uses the DAO-API SDK to authenticate users with wallet addresses
 */

import { createConfiguration, AuthApi, UsersApi, InputCreateUser, UserExistResponse, LoginResponse } from '../core/modules/dao-api';
import { ServerConfiguration } from '../core/modules/dao-api/servers';

// Default API endpoint - now using the proxy URL
const DEFAULT_API_ENDPOINT = '/api';

/**
 * WalletAuthService handles authentication using wallet addresses
 */
export class WalletAuthService {
  private apiEndpoint: string;
  private authApi: AuthApi;
  private usersApi: UsersApi;
  private accessToken: string | null = null;

  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiEndpoint = apiEndpoint;
    
    // Create configuration for the API with custom base URL
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Initialize API clients
    this.authApi = new AuthApi(configuration);
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
    
    // Reinitialize API clients
    this.authApi = new AuthApi(configuration);
    this.usersApi = new UsersApi(configuration);
  }

  /**
   * Check if a user with the given wallet address exists
   */
  async checkUserExists(walletAddress: string): Promise<boolean> {
    try {
      const response = await this.usersApi.getUserWithWalletAddress(walletAddress);
      return response.exists || false;
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  }

  /**
   * Create a new user with the wallet address and additional user info
   */
  async createUser(walletAddress: string, userInfo?: {
    username?: string;
    email?: string;
    discordUsername?: string;
  }): Promise<boolean> {
    try {
      const userInput = new InputCreateUser();
      userInput.walletAddress = walletAddress;
      
      // Generate a username based on the wallet address if not provided
      if (userInfo?.username) {
        userInput.username = userInfo.username;
      } else {
        const shortenedWallet = walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4);
        userInput.username = `user_${shortenedWallet}`;
      }
      
      // Add optional user information if provided
      if (userInfo?.email) {
        userInput.email = userInfo.email;
      }
      
      if (userInfo?.discordUsername) {
        userInput.discordUsername = userInfo.discordUsername;
      }

      userInput.password = "password";

      console.log('Creating user with input:', userInput);
      
      await this.usersApi.createUser(userInput);
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }

  /**
   * Login with wallet address
   */
  async login(walletAddress: string): Promise<string | null> {
    try {
      const loginParams = {
        email: walletAddress,
        password: walletAddress
      };
      
      const response = await this.authApi.login(loginParams);
      const token = response.token;
      
      if (token) {
        this.setAccessToken(token);
      }
      
      return token || null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  /**
   * Set the access token after login
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('daoAccessToken', token);
  }

  /**
   * Get the stored access token
   */
  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('daoAccessToken');
    }
    return this.accessToken;
  }

  /**
   * Clear the access token (logout)
   */
  clearAccessToken(): void {
    this.accessToken = null;
    localStorage.removeItem('daoAccessToken');
  }

  /**
   * Main authentication flow with wallet address
   * 1. Check if user exists
   * 2. If yes, login
   * 3. If no, collect user info and create user
   * 
   * Note: This method doesn't handle the form display. It expects
   * the user info to be passed when a new user is being created.
   */
  async authenticateWithWallet(
    walletAddress: string, 
    userInfo?: {
      username?: string;
      email?: string;
      discordUsername?: string;
    }
  ): Promise<{ success: boolean; newUser: boolean }> {
    try {
      console.log(`Authenticating with wallet address: ${walletAddress}`);
      
      // Step 1: Check if user exists
      const userExists = await this.checkUserExists(walletAddress);
      
      // Step 2: If user doesn't exist, create user
      if (!userExists) {
        console.log('User does not exist, creating new user...');
        
        // If user info is not provided, return that we need to collect it
        if (!userInfo) {
          return { success: false, newUser: true };
        }
        
        const userCreated = await this.createUser(walletAddress, userInfo);
        if (!userCreated) {
          console.error('Failed to create user');
          return { success: false, newUser: true };
        }
      }
      
      // Step 3: Login with wallet address
      console.log('Logging in with wallet address...');
      const token = await this.login(walletAddress);
      
      if (token) {
        console.log('Successfully authenticated with wallet');
        return { success: true, newUser: !userExists };
      } else {
        console.error('Failed to login with wallet');
        return { success: false, newUser: !userExists };
      }
    } catch (error) {
      console.error('Authentication flow error:', error);
      return { success: false, newUser: false };
    }
  }
}

// Create a singleton instance
export const walletAuthService = new WalletAuthService();

// Export default for convenience
export default walletAuthService; 