import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { walletAuthService } from '../services/WalletAuthService';
import UserRegistrationForm from '../components/UserRegistrationForm';

interface AuthContextType {
  isAuthenticated: boolean;
  authenticateWithWallet: (walletAddress: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
  isLoading: boolean;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  authenticateWithWallet: async () => false,
  logout: () => {},
  token: null,
  isLoading: false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
  apiEndpoint?: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  apiEndpoint = '/api' 
}) => {
  const { connected, publicKey, disconnect } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
  const [pendingWalletAddress, setPendingWalletAddress] = useState<string | null>(null);

  // Initialize walletAuthService with the API endpoint
  useEffect(() => {
    walletAuthService.setApiEndpoint(apiEndpoint);
    
    // Check if we have a token stored
    const storedToken = walletAuthService.getAccessToken();
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, [apiEndpoint]);

  // Handle wallet connection/disconnection
  useEffect(() => {
    const handleWalletConnection = async () => {
      if (connected && publicKey) {
        const walletAddress = publicKey.toString();
        
        // Store wallet address in localStorage for future reference
        localStorage.setItem('walletAddress', walletAddress);
        
        // Only authenticate if not already authenticated
        if (!isAuthenticated && !showRegistrationForm) {
          try {
            setIsLoading(true);
            
            const result = await walletAuthService.authenticateWithWallet(walletAddress);
            
            if (result.success) {
              // Successfully authenticated
              setIsAuthenticated(true);
              const newToken = walletAuthService.getAccessToken();
              setToken(newToken);
              console.log('Successfully authenticated with DAO API');
            } else if (result.newUser) {
              // User doesn't exist, show registration form
              setPendingWalletAddress(walletAddress);
              setShowRegistrationForm(true);
            }
          } catch (error) {
            console.error('Authentication error:', error);
            setIsAuthenticated(false);
            setToken(null);
          } finally {
            setIsLoading(false);
          }
        }
      } else {
        // Clear the stored wallet address when disconnected
        localStorage.removeItem('walletAddress');
      }
    };

    handleWalletConnection();
  }, [connected, publicKey, isAuthenticated, showRegistrationForm]);

  const handleRegistrationSubmit = async (userInfo: {
    username: string;
    email: string;
    discordUsername: string;
  }) => {
    if (pendingWalletAddress) {
      try {
        setIsLoading(true);
        
        const result = await walletAuthService.authenticateWithWallet(
          pendingWalletAddress,
          userInfo
        );
        
        if (result.success) {
          setIsAuthenticated(true);
          const newToken = walletAuthService.getAccessToken();
          setToken(newToken);
          setShowRegistrationForm(false);
          setPendingWalletAddress(null);
          console.log('Successfully registered and authenticated user');
        } else {
          console.error('Failed to register user');
          // Optionally handle the failure case - show error message, etc.
        }
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegistrationCancel = () => {
    setShowRegistrationForm(false);
    setPendingWalletAddress(null);
    
    // Disconnect wallet since user canceled registration
    if (disconnect) {
      disconnect();
    }
  };

  const authenticateWithWallet = async (walletAddress: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const result = await walletAuthService.authenticateWithWallet(walletAddress);
      
      if (result.success) {
        setIsAuthenticated(true);
        const newToken = walletAuthService.getAccessToken();
        setToken(newToken);
        return true;
      } else if (result.newUser) {
        // User doesn't exist, show registration form
        setPendingWalletAddress(walletAddress);
        setShowRegistrationForm(true);
        return false;
      } else {
        setIsAuthenticated(false);
        setToken(null);
        return false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setIsAuthenticated(false);
      setToken(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    walletAuthService.clearAccessToken();
    setIsAuthenticated(false);
    setToken(null);
    console.log('Logged out from DAO API');
    
    // Disconnect wallet on logout
    if (disconnect) {
      disconnect();
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated,
        authenticateWithWallet,
        logout,
        token,
        isLoading,
      }}
    >
      {children}
      
      {/* Show registration form when needed */}
      {showRegistrationForm && pendingWalletAddress && (
        <UserRegistrationForm
          walletAddress={pendingWalletAddress}
          onSubmit={handleRegistrationSubmit}
          onCancel={handleRegistrationCancel}
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 