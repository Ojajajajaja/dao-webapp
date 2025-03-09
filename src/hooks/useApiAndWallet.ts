import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAuth } from '../context/AuthContext';
import { walletAuthService } from '../services/WalletAuthService';
import { useEffectOnce } from './useEffectOnce';

export interface UserDisplayInfo {
  isAuthenticated: boolean;
  isLoading: boolean;
  challengeMessage: string | null;
  authError: string | null;
  displayUsername: string;
}

export interface ApiStatusInfo {
  status: 'online' | 'offline' | 'checking';
  checkTime: Date | null;
}

/**
 * Custom hook to handle API status checking and wallet authentication
 * @param apiEndpoint The API endpoint to check (defaults to '/api')
 * @param checkInterval Interval in ms to check API status (defaults to 60000ms)
 * @returns Object containing API status and user authentication information
 */
export const useApiAndWallet = (
  apiEndpoint: string = '/api',
  checkInterval: number = 60000
) => {
  const { connected, publicKey } = useWallet();
  const { isAuthenticated, isLoading, challengeMessage, authError, userInfo, refreshUserInfo } = useAuth();
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [disableCors, setDisableCors] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);

  // Handle wallet connection
  useEffect(() => {
    if (connected && publicKey) {
      const walletAddress = publicKey.toString();
      console.log('Connected wallet address:', walletAddress);
      
      // Set API endpoint for the wallet auth service
      walletAuthService.setApiEndpoint(apiEndpoint);
    }
  }, [connected, publicKey, apiEndpoint]);

  // Check API status
  useEffectOnce(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            ...(disableCors && { 'X-Requested-With': 'XMLHttpRequest' })
          },
          // Set a timeout to avoid long waiting times
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch (error) {
        console.error('API check failed:', error);
        setApiStatus('offline');
      }
      
      setLastCheckTime(new Date());
    };

    // Check immediately on component mount
    checkApiStatus();
    
    // Set up interval to check periodically
    const intervalId = setInterval(checkApiStatus, checkInterval);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiEndpoint, disableCors, checkInterval]);

  // Helper function to get display username
  const getDisplayUsername = (): string => {
    // If user info is not loaded yet
    if (!userInfo) {
      return 'User';
    }
    
    // Use username if available
    if (userInfo.username) {
      return userInfo.username;
    }
    
    // Fall back to member name if available
    if (userInfo.memberName) {
      return userInfo.memberName;
    }
    
    // Finally fall back to shortened wallet address
    if (userInfo.walletAddress) {
      const addr = userInfo.walletAddress;
      return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
    }
    
    // Last resort
    return 'User';
  };

  return {
    // API related info
    apiStatus,
    setApiStatus,
    disableCors,
    setDisableCors,
    apiEndpoint,
    apiInfo: {
      status: apiStatus,
      checkTime: lastCheckTime,
    },
    
    // Wallet and auth related info
    connected,
    publicKey,
    isAuthenticated,
    isLoading,
    challengeMessage,
    authError,
    userInfo,
    refreshUserInfo,
    getDisplayUsername,
    userDisplayInfo: {
      isAuthenticated,
      isLoading,
      challengeMessage,
      authError,
      displayUsername: getDisplayUsername(),
    },
  };
};

export default useApiAndWallet; 