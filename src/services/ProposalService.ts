/**
 * Proposal Service
 * Handles all API interactions related to Proposals
 */

import { createConfiguration, DaosApi, InputCreateProposal, ProposalsApi, Proposal as ApiProposal } from '../core/modules/dao-api';
import { ServerConfiguration } from '../core/modules/dao-api/servers';
import { walletAuthService } from './WalletAuthService';

// Default API endpoint - using the proxy URL
const DEFAULT_API_ENDPOINT = '/api';

// Export the SDK's Proposal type for use throughout the app
export type Proposal = ApiProposal;

interface VoteResult {
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
}

/**
 * ProposalService handles proposal data operations
 */
export class ProposalService {
  private apiEndpoint: string;
  private proposalsApi: ProposalsApi;
  private daosApi: DaosApi;

  constructor(apiEndpoint: string = DEFAULT_API_ENDPOINT) {
    this.apiEndpoint = apiEndpoint;
    
    // Create configuration for the API with custom base URL
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Initialize API clients
    this.proposalsApi = new ProposalsApi(configuration);
    this.daosApi = new DaosApi(configuration);
  }

  /**
   * Create an authenticated API client with the current token
   * @private
   */
  private createAuthenticatedApiClient(): { proposalsApi: ProposalsApi, daosApi: DaosApi } | null {
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

    // Return new API client instances with the token
    return {
      proposalsApi: new ProposalsApi(configuration),
      daosApi: new DaosApi(configuration)
    };
  }

  /**
   * Set the API endpoint and reinitialize API clients
   */
  setApiEndpoint(endpoint: string): void {
    this.apiEndpoint = endpoint;
    
    // Create new configuration with updated endpoint
    const serverConfig = new ServerConfiguration(this.apiEndpoint, {});
    const configuration = createConfiguration({
      baseServer: serverConfig
    });
    
    // Reinitialize API clients
    this.proposalsApi = new ProposalsApi(configuration);
    this.daosApi = new DaosApi(configuration);
  }

  /**
   * Get all proposals for a DAO
   */
  async getAllProposals(daoId: string): Promise<ApiProposal[]> {
    try {
      console.log(`Getting proposals for DAO ${daoId}`);
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return [];

      // Use the SDK to get all proposals for the DAO
      const response = await apiClient.proposalsApi.getProposalsByDAO(daoId);
      console.log("API response:", response);
      
      return response || [];
    } catch (error) {
      console.error(`Error getting proposals for DAO ${daoId}:`, error);
      return [];
    }
  }

  /**
   * Get a proposal by ID
   */
  async getProposalById(daoId: string, proposalId: string): Promise<ApiProposal | null> {
    try {
      console.log(`Getting proposal with ID ${proposalId} for DAO ${daoId}`);
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      // Use the SDK to get a proposal by ID
      const response = await apiClient.proposalsApi.getDAOProposalById(daoId, proposalId);
      console.log("API response for proposal:", response);
      
      return response || null;
    } catch (error) {
      console.error(`Error getting proposal ${proposalId} for DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Create a new proposal
   */
  async createProposal(daoId: string, proposalData: {
    title: string;
    description: string;
    startDate?: Date;
    endDate: Date;
    actions?: any[];
  }): Promise<ApiProposal | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      // Convert actions to the format expected by the API if needed
      const apiActions = proposalData.actions || [];

      // Create the request object for the API
      const proposalRequest: InputCreateProposal = {
        name: proposalData.title,
        description: proposalData.description,
        startTime: proposalData.startDate || new Date(),
        endTime: proposalData.endDate,
        daoId: daoId,
        actions: apiActions
      };

      console.log("Creating proposal with data:", proposalRequest);

      // Use the SDK to create a proposal
      const response = await apiClient.proposalsApi.createProposalForDAO(daoId, proposalRequest);
      console.log("API response for create proposal:", response);
      
      return response?.proposal || null;
    } catch (error) {
      console.error(`Error creating proposal for DAO ${daoId}:`, error);
      return null;
    }
  }

  /**
   * Vote on a proposal
   */
  async voteOnProposal(daoId: string, proposalId: string, vote: 'for' | 'against' | 'abstain'): Promise<boolean> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return false;

      // Map our vote values to what the API expects
      const voteRequestVoteEnum = {
        'for': 'FOR',
        'against': 'AGAINST',
        'abstain': 'ABSTAIN'
      }[vote];

      // Create vote request object with the correct enum value
      const voteRequest = { vote: voteRequestVoteEnum };
      console.log(`Voting on proposal ${proposalId} with vote ${vote} (${voteRequestVoteEnum})`);

      // Use the API client to vote on the proposal 
      await apiClient.proposalsApi.voteOnDAOProposal(daoId, proposalId, voteRequest as any);
      return true;
    } catch (error) {
      console.error(`Error voting on proposal ${proposalId} for DAO ${daoId}:`, error);
      return false;
    }
  }

  /**
   * Get votes for a proposal
   */
  async getProposalVotes(daoId: string, proposalId: string): Promise<VoteResult | null> {
    try {
      const apiClient = this.createAuthenticatedApiClient();
      if (!apiClient) return null;

      console.log(`Getting votes for proposal ${proposalId} in DAO ${daoId}`);
      
      // Use the SDK to get votes
      const proposal = await this.getProposalById(daoId, proposalId);
      
      if (proposal) {
        // Extract vote information directly from the proposal
        return {
          forVotes: proposal.forVotesCount || 0,
          againstVotes: proposal.againstVotesCount || 0,
          abstainVotes: 0 // API doesn't support abstain votes
        };
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting votes for proposal ${proposalId} in DAO ${daoId}:`, error);
      return null;
    }
  }
}

// Create a singleton instance
export const proposalService = new ProposalService();

// Export default for convenience
export default proposalService; 