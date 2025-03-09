import React from 'react';
import { Wifi, WifiOff, Loader2, PenLine, AlertCircle, User } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UserDisplayInfo } from '../../hooks/useApiAndWallet';

interface ApiAuthStatusProps {
  apiStatus: 'online' | 'offline' | 'checking';
  userDisplayInfo: UserDisplayInfo;
}

const ApiAuthStatus: React.FC<ApiAuthStatusProps> = ({ 
  apiStatus, 
  userDisplayInfo,
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    challengeMessage, 
    authError, 
    displayUsername 
  } = userDisplayInfo;

  return (
    <div className="flex items-center space-x-4">
      {/* Left side (title and auth status) - only show if requested */}
      <div className="flex items-center">
        {isAuthenticated && (
          <span className="ml-2 text-xs bg-green-700 text-white px-2 py-0.5 rounded-full flex items-center">
            <User size={10} className="mr-1" />
            Authenticated as {displayUsername}
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
      
      {/* Right side (status indicators and wallet) */}
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
  );
};

export default ApiAuthStatus; 