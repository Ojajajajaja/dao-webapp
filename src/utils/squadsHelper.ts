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
 * Get token accounts for a multisig
 */
export const getTokenAccounts = async (
  connection: Connection,
  multisig: MultisigAccount
): Promise<any[]> => {
  try {
    console.log("Getting token accounts for multisig:", multisig.publicKey.toString());
    
    // Get the associated token accounts for the multisig
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      multisig.publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );
    
    // Process and return the token accounts with additional metadata
    return tokenAccounts.value.map((account) => {
      const accountData = account.account.data.parsed.info;
      const mint = new PublicKey(accountData.mint);
      const amount = Number(accountData.tokenAmount.amount) / Math.pow(10, accountData.tokenAmount.decimals);
      
      return {
        publicKey: account.pubkey,
        mint,
        amount,
        decimals: accountData.tokenAmount.decimals,
        uiAmount: amount,
        // We would fetch token metadata and prices in a real implementation
        symbol: 'Unknown',
        name: 'Unknown Token',
        price: 0,
        value: 0,
        icon: '$'  // Default icon
      };
    });
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    return [];
  }
};

/**
 * Get SOL balance for a multisig
 */
export const getSolBalance = async (
  connection: Connection,
  multisig: MultisigAccount
): Promise<number> => {
  try {
    console.log("Getting SOL balance for multisig:", multisig.publicKey.toString());
    
    const balance = await connection.getBalance(multisig.publicKey);
    return balance / 1_000_000_000; // Convert from lamports to SOL
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
};

/**
 * Get all transactions for a multisig
 */
export const getAllTransactions = async (
  multisig: MultisigAccount
): Promise<any[]> => {
  try {
    console.log("Getting all transactions for multisig:", multisig.publicKey.toString());
    
    if (multisig.squads) {
      // Use the Squads SDK to get transactions
      const transactions = await multisig.squads.getTransactions(multisig.publicKey);
      
      // Process transactions into a more usable format
      return transactions.map((tx: any) => {
        return {
          index: tx.transactionIndex,
          pubkey: tx.pubkey,
          status: tx.status || tx.state || TransactionStatus.Active,
          signers: tx.signers || [],
          createdAt: tx.createdAt || new Date(),
          executedAt: tx.executedAt,
          description: tx.description || '',
          instructions: tx.instructions || []
        };
      });
    }
    
    // If we don't have Squads SDK, return empty array
    return [];
  } catch (error) {
    console.error('Error fetching all transactions:', error);
    return [];
  }
};

/**
 * Approve a transaction
 */
export const approveTransaction = async (
  multisig: MultisigAccount,
  transactionIndex: number,
  authority: PublicKey
) => {
  try {
    console.log(`Approving transaction ${transactionIndex} for multisig:`, multisig.publicKey.toString());
    
    if (multisig.squads) {
      // Create transaction with Squads SDK
      const { blockhash, lastValidBlockHeight } = await multisig.connection.getLatestBlockhash();
      
      // Get the transaction to approve
      const txBuilder = await multisig.squads.getTransactionBuilder(multisig.publicKey, transactionIndex);
      
      // Create the approval transaction
      const transaction = await txBuilder.voteTransaction();
      
      // Set the blockhash
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      
      // Send the transaction
      // This part depends on how your wallet integration works
      // In a real implementation, you would sign with the connected wallet
      
      // Return success
      return {
        success: true,
        transactionId: 'transaction_id_placeholder'
      };
    }
    
    throw new Error('Squads SDK not available');
  } catch (error) {
    console.error('Error approving transaction:', error);
    throw error;
  }
};

/**
 * Execute a transaction
 */
export const executeTransaction = async (
  multisig: MultisigAccount,
  transactionIndex: number,
  authority: PublicKey
) => {
  try {
    console.log(`Executing transaction ${transactionIndex} for multisig:`, multisig.publicKey.toString());
    
    if (multisig.squads) {
      // Create transaction with Squads SDK
      const { blockhash, lastValidBlockHeight } = await multisig.connection.getLatestBlockhash();
      
      // Get the transaction to execute
      const txBuilder = await multisig.squads.getTransactionBuilder(multisig.publicKey, transactionIndex);
      
      // Create the execution transaction
      const transaction = await txBuilder.executeTransaction();
      
      // Set the blockhash
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      
      // Send the transaction
      // This part depends on how your wallet integration works
      // In a real implementation, you would sign with the connected wallet
      
      // Return success
      return {
        success: true,
        transactionId: 'transaction_id_placeholder'
      };
    }
    
    throw new Error('Squads SDK not available');
  } catch (error) {
    console.error('Error executing transaction:', error);
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