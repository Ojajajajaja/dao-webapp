/**
 * Social Connection Service
 * Handles all API interactions related to connecting social media accounts
 */

import { 
  createConfiguration, 
  DiscordOauthApi, 
  TwitterOauthApi, 
  TelegramAuthApi
} from '../core/modules/dao-api';
import { ServerConfiguration } from '../core/modules/dao-api/servers';
import { walletAuthService } from './WalletAuthService';

// Default API endpoint - using the proxy URL
const DEFAULT_API_ENDPOINT = '/api';

/**
 * SocialConnectionService handles operations related to social media connections
 */
export class SocialConnectionService {
  private apiEndpoint: string;

  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiEndpoint = apiEndpoint;
  }

  /**
   * Create an authenticated API client with the current token
   * @private
   */
  private createClient<T>(api: new (config: any) => T): T | null {
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
            if (token) {
              context.setHeaderParam('Authorization', `Bearer ${token}`);
            }
          }
        }
      }
    });

    // Return a new API client instance with the token
    return new api(configuration);
  }

  /**
   * Connect Discord account
   */
  connectDiscord(): void {
    try {
      this.createClient(DiscordOauthApi);
      window.location.href = '/api/auth/discord/connect';
    } catch (error) {
      console.error('Error connecting Discord:', error);
      throw new Error('Error connecting Discord. Please try again later.');
    }
  }

  /**
   * Connect Twitter account
   */
  connectTwitter(): void {
    try {
      this.createClient(TwitterOauthApi);
      window.location.href = '/api/auth/twitter/connect';
    } catch (error) {
      console.error('Error connecting Twitter:', error);
      throw new Error('Error connecting Twitter. Please try again later.');
    }
  }

  /**
   * Connect Telegram account
   */
  connectTelegram(): void {
    try {
      // Telegram uses a different approach - it's widget based
      window.location.href = '/api/auth/telegram/widget';
    } catch (error) {
      console.error('Error connecting Telegram:', error);
      throw new Error('Error connecting Telegram. Please try again later.');
    }
  }
}

// Create a singleton instance
export const socialConnectionService = new SocialConnectionService();

// Export default for convenience
export default socialConnectionService; 