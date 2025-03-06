import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import * as squadsHelper from '../utils/squadsHelper';

// Types
export interface Transaction {
  id: string;
  type: 'inflow' | 'outflow';
  amount: number;
  currency: string;
  date: Date;
  status: 'pending' | 'completed' | 'rejected';
  approvals: number;
  threshold: number;
}

export interface Account {
  id: number | string;
  name: string;
  address: string;
  balance: number;
  weight: number;
  type: string;
}

export interface Token {
  id: number | string;
  name: string;
  symbol: string;
  icon: string;
  balance: number;
  value: number;
  change24h: number;
  mintAddress?: string;
}

export interface NFT {
  id: number | string;
  name: string;
  image: string;
  collection: string;
  floorPrice?: number;
}

// Define a simple interface for transaction signers
interface TransactionSigner {
  signed: boolean;
  publicKey?: string;
  [key: string]: any;
}

interface TreasuryContextType {
  totalBalance: number;
  accounts: Account[];
  tokens: Token[];
  nfts: NFT[];
  transactions: Transaction[];
  members: number;
  threshold: number;
  isLoading: boolean;
  error: string | null;
  chartData: { name: string; value: number }[];
  refreshTreasury: () => Promise<void>;
  createTransaction: (type: 'inflow' | 'outflow', amount: number, currency: string) => Promise<void>;
  approveTransaction: (transactionId: string) => Promise<void>;
  rejectTransaction: (transactionId: string) => Promise<void>;
}

const TreasuryContext = createContext<TreasuryContextType | undefined>(undefined);

// Initial state values
const initialState = {
  totalBalance: 0,
  accounts: [],
  tokens: [],
  nfts: [],
  transactions: [],
  members: 0,
  threshold: 0,
  isLoading: false,
  error: null,
  chartData: [
    { name: '1', value: 0 },
    { name: '2', value: 0 },
    { name: '3', value: 0 },
    { name: '4', value: 0 },
    { name: '5', value: 0 },
    { name: '6', value: 0 },
    { name: '7', value: 0 },
  ],
};

// Generate daily timestamp data for the last week
const getDates = () => {
  const dates = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

interface TreasuryProviderProps {
  children: ReactNode;
  multisigAddress?: string; // Solana address of the multisig
  rpcUrl?: string; // Optional RPC URL for Solana connection
}

// Create a treasury provider component
export const TreasuryProvider: React.FC<TreasuryProviderProps> = ({ 
  children,
  multisigAddress = "", // Default empty, should be provided in production
  // The public mainnet API often returns 403 Forbidden for token operations
  // Replace with your own RPC URL provider for production or use a development endpoint
  rpcUrl = "https://mainnet.helius-rpc.com/?api-key=c0d9f77e-7883-4a86-8aa8-054bc2a83004" // Use devnet for development
}) => {
  // State for treasury data
  const [totalBalance, setTotalBalance] = useState<number>(initialState.totalBalance);
  const [accounts, setAccounts] = useState<Account[]>(initialState.accounts);
  const [tokens, setTokens] = useState<Token[]>(initialState.tokens);
  const [nfts, setNFTs] = useState<NFT[]>(initialState.nfts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialState.transactions);
  const [members, setMembers] = useState<number>(initialState.members);
  const [threshold, setThreshold] = useState<number>(initialState.threshold);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState(initialState.chartData.map((item, i) => ({ ...item, name: getDates()[i] })));
  
  // Connection to Solana network
  const [connection, setConnection] = useState<Connection | null>(null);
  // Multisig object
  const [multisig, setMultisig] = useState<any>(null);

  // Initialize connection when component mounts
  useEffect(() => {
    const initConnection = async () => {
      try {
        // Try to connect with provided RPC URL
        const conn = new Connection(rpcUrl, 'confirmed');
        
        // Test the connection with a simple request
        try {
          await conn.getVersion();
          setConnection(conn);
          console.log("Connected to Solana network successfully");
        } catch (networkErr) {
          console.error("Error connecting to primary RPC:", networkErr);
          
          // Fall back to a different RPC if the primary one fails
          console.log("Falling back to alternative RPC...");
          const fallbackRpc = "https://api.devnet.solana.com";
          const fallbackConn = new Connection(fallbackRpc, 'confirmed');
          setConnection(fallbackConn);
        }

        // Set simulated chart data for now
        const simulatedData = initialState.chartData.map((item, i) => ({
          name: getDates()[i],
          value: Math.floor(Math.random() * 100) + 50,
        }));
        setChartData(simulatedData);
      } catch (err: any) {
        console.error("Failed to initialize connection:", err);
        setError(`Failed to initialize connection: ${err.message}`);
      }
    };

    initConnection();
  }, [rpcUrl]);

  // Initialize multisig when connection and address are available
  useEffect(() => {
    const initMultisig = async () => {
      if (!connection) {
        setError("Connection not initialized");
        return;
      }
      
      if (!multisigAddress || multisigAddress.trim() === "") {
        setError("No multisig address provided. Please provide a valid Solana address for the multisig.");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the multisig
        console.log("Fetching multisig with address:", multisigAddress);
        const multisigData = await squadsHelper.getMultisig(connection, multisigAddress);
        setMultisig(multisigData);
        
        // Fetch initial data
        await refreshTreasuryData(connection, multisigData);
      } catch (err: any) {
        console.error("Failed to initialize multisig:", err);
        setError(`Failed to initialize multisig: ${err.message}`);
        setIsLoading(false);
      }
    };

    initMultisig();
  }, [connection, multisigAddress]);

  // Helper function to refresh treasury data
  const refreshTreasuryData = async (conn: Connection, msig: any) => {
    if (!conn || !msig) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Get members and threshold
      console.log("Fetching members and threshold...");
      const membersList = await squadsHelper.getMembers(msig);
      const thresholdValue = await squadsHelper.getThreshold(msig);
      setMembers(membersList.length);
      setThreshold(thresholdValue);
      
      // Get token accounts
      console.log("Fetching token accounts...");
      const tokenAccounts = await squadsHelper.getTokenAccounts(conn, msig);
      setTokens(tokenAccounts);
      
      // Calculate total balance from tokens
      const total = tokenAccounts.reduce((sum, token) => sum + token.value, 0);
      setTotalBalance(total);
      
      // Get accounts (convert member pubkeys to account objects)
      const accountObjects: Account[] = membersList.map((member, index) => ({
        id: index + 1,
        name: `Member ${index + 1}`,
        address: member.toString(),
        balance: 0, // Individual balances would require additional fetching
        weight: 1, // Assuming equal weights for now
        type: 'wallet',
      }));
      setAccounts(accountObjects);
      
      // Get NFTs
      console.log("Fetching NFTs...");
      const nftAccounts = await squadsHelper.getNFTAccounts(conn, msig);
      setNFTs(nftAccounts);
      
      // Get pending transactions
      console.log("Fetching pending transactions...");
      const pendingTxs = await squadsHelper.getPendingTransactions(msig);
      const formattedTxs: Transaction[] = pendingTxs.map((tx: any, index: number) => ({
        id: tx.pubkey ? tx.pubkey.toString() : index.toString(),
        type: 'outflow',
        amount: 0,
        currency: 'SOL',
        date: new Date(),
        status: 'pending',
        approvals: tx.signers?.filter((s: any) => s.signed).length || 0,
        threshold: thresholdValue,
      }));
      setTransactions(formattedTxs);
      
      setIsLoading(false);
    } catch (err: any) {
      console.error("Error refreshing treasury:", err);
      setError(`Error refreshing treasury: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Main refresh function called from UI
  const refreshTreasury = async (): Promise<void> => {
    if (!connection || !multisig) {
      setError('Cannot refresh: connection or multisig not initialized');
      return;
    }
    
    await refreshTreasuryData(connection, multisig);
  };

  // Create a new transaction
  const createTransaction = async (
    type: 'inflow' | 'outflow', 
    amount: number, 
    currency: string
  ): Promise<void> => {
    if (!connection || !multisig) {
      setError('Cannot create transaction: connection or multisig not initialized');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real implementation, this would create an instruction based on the type and amount
      // For now, we're just simulating the created transaction

      // In a real implementation: 
      // 1. Get the wallet/keypair to sign with
      // 2. Create an instruction based on the type (transfer tokens, etc.)
      // 3. Call squadsHelper.createTransaction
      
      // Simulate the creation by adding a new transaction to the list
      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        type,
        amount,
        currency,
        date: new Date(),
        status: 'pending',
        approvals: 1, // Creator has already approved
        threshold: threshold,
      };
      
      setTransactions(prev => [...prev, newTransaction]);
      setIsLoading(false);
    } catch (err: any) {
      setError(`Error creating transaction: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Approve a transaction
  const approveTransaction = async (transactionId: string): Promise<void> => {
    if (!connection || !multisig) {
      setError('Cannot approve transaction: connection or multisig not initialized');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real implementation:
      // 1. Get the wallet/keypair to sign with
      // 2. Find the transaction by ID
      // 3. Call squadsHelper.approveTransaction
      
      // Simulate approval by updating the transaction in the list
      setTransactions(prev => 
        prev.map(tx => {
          if (tx.id === transactionId) {
            const newApprovals = tx.approvals + 1;
            const newStatus = newApprovals >= tx.threshold ? 'completed' : 'pending';
            
            return {
              ...tx,
              approvals: newApprovals,
              status: newStatus as 'pending' | 'completed' | 'rejected',
            };
          }
          return tx;
        })
      );
      
      setIsLoading(false);
    } catch (err: any) {
      setError(`Error approving transaction: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Reject a transaction
  const rejectTransaction = async (transactionId: string): Promise<void> => {
    if (!connection || !multisig) {
      setError('Cannot reject transaction: connection or multisig not initialized');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real implementation:
      // 1. Get the wallet/keypair to sign with
      // 2. Find the transaction by ID
      // 3. Call a reject function on the SDK (or implement custom rejection logic)
      
      // Simulate rejection by updating the transaction in the list
      setTransactions(prev => 
        prev.map(tx => {
          if (tx.id === transactionId) {
            return {
              ...tx,
              status: 'rejected',
            };
          }
          return tx;
        })
      );
      
      setIsLoading(false);
    } catch (err: any) {
      setError(`Error rejecting transaction: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Create the context value
  const contextValue: TreasuryContextType = {
    totalBalance,
    accounts,
    tokens,
    nfts,
    transactions,
    members,
    threshold,
    isLoading,
    error,
    chartData,
    refreshTreasury,
    createTransaction,
    approveTransaction,
    rejectTransaction,
  };

  // Return the provider
  return (
    <TreasuryContext.Provider value={contextValue}>
      {children}
    </TreasuryContext.Provider>
  );
};

// Create a hook to use the treasury context
export const useTreasury = (): TreasuryContextType => {
  const context = useContext(TreasuryContext);
  if (context === undefined) {
    throw new Error('useTreasury must be used within a TreasuryProvider');
  }
  return context;
}; 