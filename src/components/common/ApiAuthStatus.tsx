import React from 'react';
import { Wifi, WifiOff, Loader2, PenLine, AlertCircle, UserCircle } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UserDisplayInfo } from '../../hooks/useApiAndWallet';
import { useNavigate } from 'react-router-dom';

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
  } = userDisplayInfo;

  const navigate = useNavigate();

  // Handle navigation to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Left side (title and auth status) - only show if requested */}
      <div className="flex items-center">
        {isAuthenticated && (
            <button 
            onClick={handleProfileClick}
            className="flex items-center gap-2 bg-[var(--landing-page-color)] text-white py-1 px-3 rounded-full hover:opacity-90 transition-colors"
          >
            <UserCircle size={18} />
            <span>My Profile</span>
          </button>
        )}
        {isLoading && !challengeMessage && (
          <span className="ml-2 text-xs bg-warning text-text px-2 py-0.5 rounded-full flex items-center">
            <Loader2 size={12} className="animate-spin mr-1" />
            Authenticating
          </span>
        )}
        {challengeMessage && (
          <span className="ml-2 text-xs bg-primary text-text px-2 py-0.5 rounded-full flex items-center">
            <PenLine size={12} className="mr-1" />
            Signature Required
          </span>
        )}
        {authError && (
          <span className="ml-2 text-xs bg-error text-text px-2 py-0.5 rounded-full flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Authentication Error
          </span>
        )}
      </div>
      
      {/* Right side (status indicators and wallet) */}
      <div className="flex items-center space-x-4">
        {/* API Status Indicator */}
        <div className="relative">
          <div className="flex items-center bg-surface-200 rounded-full px-3 py-1">
            {apiStatus === 'checking' ? (
              <div className="flex items-center">
                <div className="animate-pulse h-2 w-2 rounded-full bg-warning mr-2"></div>
                <span className="text-xs text-surface-500">Checking API...</span>
              </div>
            ) : apiStatus === 'online' ? (
              <div className="flex items-center">
                <Wifi size={14} className="text-success mr-2" />
                <span className="text-xs text-success">API Online</span>
              </div>
            ) : (
              <div className="flex items-center">
                <WifiOff size={14} className="text-error mr-2" />
                <span className="text-xs text-error">API Offline</span>
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