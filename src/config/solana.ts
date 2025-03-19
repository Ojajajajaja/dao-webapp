import { clusterApiUrl } from '@solana/web3.js';

/**
 * Solana Configuration
 * 
 * This file contains configuration for Solana-related functionality.
 * Update these values with the correct values for your specific DAO program.
 */

// The network to connect to (can be changed based on environment)
export const SOLANA_NETWORK = 'devnet'; // 'devnet', 'testnet', or 'mainnet-beta'

// The RPC endpoint to use for Solana connections
export const SOLANA_RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

// Your DAO program ID on Solana
// IMPORTANT: Replace this with your actual program ID!
export const DAO_PROGRAM_ID = '7XDjgfTVf6A5FSL4HAsox7FPKLNvzWL5qowaHJ7JTaXY';

// Maximum retries for transaction confirmation
export const MAX_TRANSACTION_RETRIES = 3;

// Transaction timeout in milliseconds
export const TRANSACTION_TIMEOUT = 60000; // 1 minute

// Other configuration values can be added as needed 