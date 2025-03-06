import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from 'axios';
import Squads from '@sqds/sdk';

/**
 * This file provides utility functions to interact with Squads multisig
 * 
 * Reference: https://docs.squads.so/squads-v4-sdk
 */

// Transaction status enum
export enum TransactionStatus {
  Active = 'active',
  Executed = 'executed',
  Cancelled = 'cancelled'
}

// Interface to standardize multisig object structure
export interface MultisigAccount {
  publicKey: PublicKey;
  connection: Connection;
  account: any; // The actual multisig account data
  squads?: any; // Squads SDK instance
}

/**
 * Create a Squads SDK instance
 */
export const createSquadsSDK = (connection: Connection, wallet: any) => {
  return Squads.devnet(wallet, { 
    commitmentOrConfig: 'confirmed' 
  });
};

/**
 * Fetch a multisig account by its address
 */
export const getMultisig = async (
  connection: Connection,
  multisigAddress: string,
  wallet?: any
): Promise<MultisigAccount> => {
  try {
    // Validate the multisig address
    if (!multisigAddress || multisigAddress.trim() === "") {
      throw new Error("Multisig address is empty or undefined");
    }

    // Check if the address is a valid base58 string
    let pubkey: PublicKey;
    try {
      pubkey = new PublicKey(multisigAddress);
    } catch (err) {
      throw new Error(`Invalid multisig address format: ${multisigAddress}. Must be a valid Solana address in base58 format.`);
    }
    
    console.log("Fetching multisig account:", multisigAddress);

    // If wallet is provided, we can use the Squads SDK
    if (wallet) {
      const squads = createSquadsSDK(connection, wallet);
      const multisigAccount = await squads.getMultisig(pubkey);
      
      return {
        publicKey: pubkey,
        connection,
        account: multisigAccount,
        squads
      };
    } else {
      // Without wallet, use a more direct approach
      // This is fallback for when we don't have a wallet
      try {
        // Note: Here we're not using the SDK directly since we don't have a wallet
        // We would typically fetch the account data directly from the connection
        const accountInfo = await connection.getAccountInfo(pubkey);
        
        if (!accountInfo) {
          throw new Error(`Multisig account not found at address: ${multisigAddress}`);
        }
        
        // For now, return a simplified structure
        return {
          publicKey: pubkey,
          connection,
          account: {
            // These are placeholders, in a real implementation 
            // we would deserialize the account data
            threshold: 2,
            members: [],
            transactionIndex: 0
          }
        };
      } catch (err) {
        console.error("Failed to fetch multisig account:", err);
        throw new Error(`Multisig account not found at address: ${multisigAddress}`);
      }
    }
  } catch (error) {
    console.error('Error fetching multisig:', error);
    throw error;
  }
};

/**
 * Get all members of a multisig
 */
export const getMembers = async (multisig: MultisigAccount): Promise<PublicKey[]> => {
  try {
    console.log("Getting members for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // If we have the Squads SDK instance, use it
      const multisigAccount = await multisig.squads.getMultisig(multisig.publicKey);
      return multisigAccount.keys.filter((key: any) => !key.equals(PublicKey.default));
    } else if (multisig.account) {
      // If we have the account data directly
      if (multisig.account.keys) {
        return multisig.account.keys.filter((key: any) => !key.equals(PublicKey.default));
      } else if (multisig.account.members) {
        // Handle different member structure based on SDK version
        return multisig.account.members
          .filter((member: any) => {
            if (member.publicKey) {
              return !member.publicKey.equals(PublicKey.default);
            } else if (member.equals) {
              return !member.equals(PublicKey.default);
            }
            return true;
          })
          .map((member: any) => {
            return member.publicKey ? member.publicKey : member;
          });
      }
    }
    
    // If we couldn't get members, return empty array
    return [];
  } catch (error) {
    console.error('Error fetching members:', error);
    
    // Fallback to mock data if there's an error
    return [
      new PublicKey('11111111111111111111111111111111'),
      new PublicKey('BPFLoader1111111111111111111111111111111111'),
      new PublicKey('Vote111111111111111111111111111111111111111')
    ];
  }
};

/**
 * Get the threshold of a multisig
 */
export const getThreshold = async (multisig: MultisigAccount): Promise<number> => {
  try {
    console.log("Getting threshold for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // If we have the Squads SDK instance, use it
      const multisigAccount = await multisig.squads.getMultisig(multisig.publicKey);
      return multisigAccount.threshold;
    } else if (multisig.account) {
      // If we have the account data, extract threshold directly
      return multisig.account.threshold;
    }
    
    // If we couldn't get the threshold, return default
    return 2;
  } catch (error) {
    console.error('Error fetching threshold:', error);
    // Fallback to mock threshold if there's an error
    return 2;
  }
};

/**
 * Create a transaction in the multisig
 */
export const createTransaction = async (
  multisig: MultisigAccount,
  creator: PublicKey,
  instructions: any[]
) => {
  try {
    console.log("Creating transaction for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // First create a transaction
      const txBuilder = await multisig.squads.getTransactionBuilder(multisig.publicKey, 0);
      
      // Add instructions to the transaction
      // Note: This approach is simplified and would need to be adapted based on actual instruction types
      const [txInstructions, txPDA] = await txBuilder.executeInstructions();
      
      return {
        transactionIndex: txPDA,
        status: 'pending'
      };
    }
    
    // Fallback to mock data
    return {
      transactionIndex: 1,
      status: 'pending'
    };
  } catch (error) {
    console.error('Error creating transaction:', error);
    
    // Return mock transaction data as fallback
    return {
      transactionIndex: 1,
      status: 'pending'
    };
  }
};

/**
 * Get pending transactions for a multisig
 */
export const getPendingTransactions = async (multisig: MultisigAccount): Promise<any[]> => {
  try {
    console.log("Getting pending transactions for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // With Squads SDK we could get transactions and filter by status
      // Depending on what the SDK provides
      // This is a placeholder implementation
      
      // Return mock pending transactions for now
      return [
        {
          index: 0,
          pubkey: new PublicKey('11111111111111111111111111111111'),
          status: TransactionStatus.Active,
          signers: [
            { signed: true, publicKey: new PublicKey('11111111111111111111111111111111') },
            { signed: false, publicKey: new PublicKey('BPFLoader1111111111111111111111111111111111') }
          ]
        }
      ];
    }
    
    // Return mock pending transactions
    return [
      {
        index: 0,
        pubkey: new PublicKey('11111111111111111111111111111111'),
        status: TransactionStatus.Active,
        signers: [
          { signed: true, publicKey: new PublicKey('11111111111111111111111111111111') },
          { signed: false, publicKey: new PublicKey('BPFLoader1111111111111111111111111111111111') }
        ]
      }
    ];
  } catch (error) {
    console.error('Error fetching pending transactions:', error);
    return [];
  }
};

/**
 * Approve a transaction in the multisig
 */
export const approveTransaction = async (
  multisig: MultisigAccount,
  transactionIndex: number,
  approver: PublicKey
) => {
  try {
    console.log("Approving transaction", transactionIndex, "for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // If we have the Squads SDK instance
      // Get the transaction PDA
      const txPDA = new PublicKey(transactionIndex.toString());
      
      // Approve the transaction
      await multisig.squads.approveTransaction(txPDA);
      
      return {
        status: 'approved',
        signature: 'sdk-approval-signature'
      };
    }
    
    // Fallback to mock approval
    return {
      status: 'approved',
      signature: 'mocked-approval-signature'
    };
  } catch (error) {
    console.error('Error approving transaction:', error);
    throw error;
  }
};

/**
 * Execute a transaction in the multisig
 */
export const executeTransaction = async (
  multisig: MultisigAccount,
  transactionIndex: number,
  feePayer: PublicKey
) => {
  try {
    console.log("Executing transaction", transactionIndex, "for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // If we have the Squads SDK instance
      // Get the transaction PDA
      const txPDA = new PublicKey(transactionIndex.toString());
      
      // Execute the transaction
      await multisig.squads.executeTransaction(txPDA, feePayer);
      
      return {
        status: 'executed',
        signature: 'sdk-execution-signature'
      };
    }
    
    // Fallback to mock execution
    return {
      status: 'executed',
      signature: 'mocked-execution-signature'
    };
  } catch (error) {
    console.error('Error executing transaction:', error);
    throw error;
  }
};

/**
 * Fetch token accounts associated with a multisig
 */
export const getTokenAccounts = async (connection: Connection, multisig: MultisigAccount) => {
  try {
    console.log("Getting token accounts for multisig:", multisig.publicKey.toString());
    
    // Return mock token accounts data for development
    return [
      {
        id: 1,
        name: 'Solana',
        symbol: 'SOL',
        icon: 'SOL',
        balance: 2.5,
        value: 250,
        change24h: 3.2,
        mintAddress: 'So11111111111111111111111111111111111111112',
      },
      {
        id: 2,
        name: 'USD Coin',
        symbol: 'USDC',
        icon: 'USDC',
        balance: 125.75,
        value: 125.75,
        change24h: 0.1,
        mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      },
      {
        id: 3,
        name: 'Bonk',
        symbol: 'BONK',
        icon: 'BONK',
        balance: 1000000,
        value: 25,
        change24h: -1.5,
        mintAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      }
    ];
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    throw error;
  }
};

/**
 * Fetch NFTs owned by a multisig
 */
export const getNFTAccounts = async (connection: Connection, multisig: MultisigAccount) => {
  try {
    console.log("Getting NFT accounts for multisig:", multisig.publicKey.toString());
    
    // Return mock NFT data for development
    return [
      {
        id: 1,
        name: 'Solana Monkey #1234',
        image: 'https://arweave.net/qebxwJz0dl7JcEGcnkrRLb6eidgHD2R-fGZ0lb-Cfdo',
        collection: 'SMB',
        floorPrice: 12.5
      },
      {
        id: 2,
        name: 'DeGod #4567',
        image: 'https://metadata.degods.com/g/4565.png',
        collection: 'DeGods',
        floorPrice: 34.2
      }
    ];
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
};

// For future implementation - interface for token info
interface TokenInfo {
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
}

// For future implementation - interface for NFT info
interface NFTInfo {
  id?: string;
  name?: string;
  image?: string;
  collection?: string;
  floorPrice?: number;
}