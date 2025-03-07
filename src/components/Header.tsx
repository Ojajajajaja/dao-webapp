import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Wallet, Wifi, WifiOff, Settings, Loader2, PenLine, AlertCircle, User } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { walletAuthService } from '../services/WalletAuthService';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeSection: string;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const Header = ({ activeSection, showNotifications, setShowNotifications }: HeaderProps) => {
  const { connected, publicKey } = useWallet();
  const { isAuthenticated, isLoading, challengeMessage, authError, userInfo, refreshUserInfo } = useAuth();
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [disableCors, setDisableCors] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('/api');
  
  // Add a ref to track if user info has been fetched
  const hasRefreshedUserInfo = useRef(false);

  useEffect(() => {
    if (connected && publicKey) {
      const walletAddress = publicKey.toString();
      console.log('Connected wallet address:', walletAddress);
      
      // API endpoint is now handled by the AuthContext
      walletAuthService.setApiEndpoint(apiEndpoint);
    }
  }, [connected, publicKey, apiEndpoint]);

  useEffectOnce(() => {
    const checkApiStatus = async () => {
      try {
        let url = apiEndpoint;
        
        const response = await fetch(url, {
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
    };

    // Check immediately on component mount
    checkApiStatus();
    
    // Set up interval to check periodically
    const intervalId = setInterval(checkApiStatus, 60000); // Check every minute
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiEndpoint, disableCors]);

  const getSectionDisplayName = () => {
    switch (activeSection) {
      case 'governance':
        return 'Governance';
      case 'pods':
        return 'Pods';
      case 'members':
        return 'Members';
      default:
        return 'Home';
    }
  };

  // Helper function to get display username
  const getDisplayUsername = () => {
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

  // Refresh user info only once when authenticated
  useEffect(() => {
    if (connected && publicKey && isAuthenticated && !hasRefreshedUserInfo.current) {
      console.log('Refreshing user info (once per session)');
      hasRefreshedUserInfo.current = true;
      
      // This will trigger a refresh of user info from the API
      refreshUserInfo().catch(error => {
        console.error('Error refreshing user info:', error);
      });
    }
    
    // Reset the flag when disconnected
    if (!connected || !isAuthenticated) {
      hasRefreshedUserInfo.current = false;
    }
  }, [connected, publicKey, isAuthenticated]);

  return (
    <header className="shadow-sm z-20 border-b-[1px] border-[#555555]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-[#555555] select-none">DAO</span>
          <span className="mx-2 text-[#555555]">/</span>
          <span className="text-white select-none min-w-[100px]">{getSectionDisplayName()}</span>
          {isAuthenticated && (
            <span className="ml-2 text-xs bg-green-700 text-white px-2 py-0.5 rounded-full flex items-center">
              <User size={10} className="mr-1" />
              Authenticated as {getDisplayUsername()}
            </span>
          )}
          {isLoading && !challengeMessage && (
            <span className="ml-2 text-xs bg-yellow-700 text-white px-2 py-0.5 rounded-full flex items-center">
              <Loader2 size={12} className="animate-spin mr-1" />
              Authenticating
            </span>
          )}
          {challengeMessage && (
            <span className="ml-2 text-xs bg-blue-700 text-white px-2 py-0.5 rounded-full flex items-center">
              <PenLine size={12} className="mr-1" />
              Signature Required
            </span>
          )}
          {authError && (
            <span className="ml-2 text-xs bg-red-700 text-white px-2 py-0.5 rounded-full flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Authentication Error
            </span>
          )}
        </div>
        
        <div className="flex-1 flex justify-center mx-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#555555] rounded-full py-2 pl-10 pr-4 text-sm w-full focus:outline-none text-white"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* API Status Indicator */}
          <div className="relative">
            <div className="flex items-center bg-[#252525] rounded-full px-3 py-1">
              {apiStatus === 'checking' ? (
                <div className="flex items-center">
                  <div className="animate-pulse h-2 w-2 rounded-full bg-yellow-400 mr-2"></div>
                  <span className="text-xs text-gray-300">Checking API...</span>
                </div>
              ) : apiStatus === 'online' ? (
                <div className="flex items-center">
                  <Wifi size={14} className="text-green-400 mr-2" />
                  <span className="text-xs text-green-400">API Online</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <WifiOff size={14} className="text-red-400 mr-2" />
                  <span className="text-xs text-red-400">API Offline</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Wallet Connect Button */}
          <div className="wallet-adapter-dropdown">
            <WalletMultiButton className="wallet-adapter-button-custom" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;