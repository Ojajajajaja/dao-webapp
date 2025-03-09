import React, { useState } from 'react';
import { useDaos } from '../hooks/useDaos';
import useApiAndWallet from '../hooks/useApiAndWallet';
import ApiAuthStatus from './common/ApiAuthStatus';
import CreateDaoForm from './CreateDaoForm';

interface LandingPageProps {
  onEnterDashboard: (daoId?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  const { daos, loading, error } = useDaos();
  const { apiStatus, userDisplayInfo } = useApiAndWallet();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const handleCreateDaoSuccess = (daoId: string) => {
    // Navigate to the newly created DAO after a short delay
    setTimeout(() => {
      onEnterDashboard(daoId);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1C1C1C] text-white">
      {/* Header with Wallet & API Status */}
      <header className="w-full p-2 border-b border-[#333333]">
        <div className="flex justify-center items-center">
          <ApiAuthStatus 
            apiStatus={apiStatus} 
            userDisplayInfo={userDisplayInfo}
          />
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold mb-8">Welcome to BWEN DAO</h2>
        <p className="text-xl mb-12 max-w-lg text-center">
          Join our decentralized autonomous organization and be part of the future of web3 governance.
        </p>
        
        {/* Authentication Status and Create DAO Button */}
        <div className="mb-10 flex flex-col items-center">
          {userDisplayInfo.isAuthenticated ? (
            <div className="text-center">
              <p className="text-lg text-green-500 mb-4">You are authenticated as <strong>{userDisplayInfo.displayUsername}</strong></p>
              
              {showCreateForm ? (
                <div className="mt-6 mb-10 w-full max-w-md">
                  <CreateDaoForm 
                    onSuccess={handleCreateDaoSuccess}
                    onError={() => {}} 
                  />
                  <button 
                    onClick={() => setShowCreateForm(false)}
                    className="mt-4 text-gray-400 hover:text-white text-sm"
                  >
                    Cancel and return to DAO list
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Create New DAO
                </button>
              )}
            </div>
          ) : (
            <div className="text-yellow-500 text-center">
              <p className="text-lg">Please connect your wallet to access all features</p>
            </div>
          )}
        </div>
        
        {/* Only show DAO list if not showing create form */}
        {!showCreateForm && (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Available DAOs</h2>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">
                Failed to load DAOs. Please try again later.
              </div>
            ) : daos.length === 0 ? (
              <div className="text-center text-gray-400">
                No DAOs available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {daos.map(dao => (
                  <div 
                    key={dao.id}
                    onClick={() => onEnterDashboard(dao.id)}
                    className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center mb-4">
                      {dao.logo ? (
                        <img src={dao.logo} alt={dao.name} className="w-12 h-12 rounded-full mr-4" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          {dao.name.charAt(0)}
                        </div>
                      )}
                      <h3 className="text-xl font-semibold">{dao.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-4 line-clamp-3">{dao.description}</p>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{dao.members} members</span>
                      <span>{dao.proposals} proposals</span>
                    </div>
                    <div className="mt-4">
                      {dao.treasury.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {dao.treasury.map((asset, idx) => (
                            <span key={idx} className="bg-gray-700 px-2 py-1 rounded text-sm">
                              {asset.amount.toLocaleString()} {asset.symbol}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No treasury data</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage; 