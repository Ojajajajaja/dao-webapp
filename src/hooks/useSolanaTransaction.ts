import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey } from '@solana/web3.js';
import { signAndSendTransaction } from '../utils/solanaTransactions';

interface TransactionState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  signature: string | null;
}

/**
 * Hook for working with Solana transactions in React components
 * @returns Functions and state for handling Solana transactions
 */
export const useSolanaTransaction = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    signature: null,
  });

  /**
   * Resets the transaction state
   */
  const resetState = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      signature: null,
    });
  };

  /**
   * Sends a transaction with the connected wallet
   * @param transaction The transaction to send
   * @returns Transaction signature if successful
   */
  const sendTransaction = async (transaction: Transaction): Promise<string | null> => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: new Error('Wallet not connected or does not support signing'),
        signature: null,
      });
      return null;
    }

    setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      signature: null,
    });

    try {
      const signature = await signAndSendTransaction(wallet, connection, transaction);
      
      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        signature,
      });
      
      return signature;
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: typedError,
        signature: null,
      });
      return null;
    }
  };

  return {
    sendTransaction,
    resetState,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
    signature: state.signature,
    wallet,
    connected: !!wallet.publicKey,
    publicKey: wallet.publicKey,
  };
}; 