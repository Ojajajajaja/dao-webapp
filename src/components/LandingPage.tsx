import React, { useState } from 'react';
import useApiAndWallet from '../hooks/useApiAndWallet';
import CreateDaoForm from './CreateDaoForm';
import { typography } from '../styles/theme';
import ApiAuthStatus from './common/ApiAuthStatus';

interface LandingPageProps {
  onEnterDashboard: (daoId?: string) => void;
}

// Fake DAO data for the landing page
const FAKE_DAOS = [
  {
    id: 'dao-1',
    name: 'BabyWen DAO',
    description: 'BabyWen DAO wants to develop a new influencer governed and prompted by the community',
    avatar: '👶',
    badges: ['featured', 'active', 'solana']
  },
  {
    id: 'dao-2',
    name: 'Solana Builders',
    description: 'A community of developers building the future of Solana ecosystem with innovative projects',
    avatar: '🛠️',
    badges: ['active', 'solana', 'dev']
  },
  {
    id: 'dao-3',
    name: 'NFT Collectors',
    description: 'Curating the best digital art collections and supporting emerging artists in the NFT space',
    avatar: '🖼️',
    badges: ['featured', 'nft']
  },
  {
    id: 'dao-4',
    name: 'DeFi Alliance',
    description: 'Working together to build decentralized financial products that are accessible to everyone',
    avatar: '💰',
    badges: ['active', 'defi']
  },
  {
    id: 'dao-5',
    name: 'Governance Lab',
    description: 'Experimenting with new models of decentralized governance and collective decision making',
    avatar: '🏛️',
    badges: ['new', 'governance']
  },
  {
    id: 'dao-6',
    name: 'Web3 Education',
    description: 'Making blockchain education accessible and understandable for the next generation of users',
    avatar: '📚',
    badges: ['new', 'education']
  },
  {
    id: 'dao-7',
    name: 'Climate Action',
    description: 'Using blockchain technology to fund and coordinate climate change mitigation projects globally',
    avatar: '🌱',
    badges: ['new', 'impact']
  },
  {
    id: 'dao-8',
    name: 'Creator Economy',
    description: 'Supporting content creators with new monetization models and direct community funding',
    avatar: '🎨',
    badges: ['new', 'creator']
  },
];

// Badge colors mapping
const getBadgeColor = (badge: string) => {
  // All badges now use the landing page color for text and border
  return 'text-[var(--landing-page-color)] border border-[var(--landing-page-color)]';
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  const { apiStatus, userDisplayInfo } = useApiAndWallet();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('featured'); // 'featured', 'active', 'new'
  
  const handleCreateDaoSuccess = (daoId: string) => {
    // Navigate to the newly created DAO after a short delay
    setTimeout(() => {
      onEnterDashboard(daoId);
    }, 1500);
  };

  // Filter DAOs based on active filter
  const getFilteredDaos = () => {
    // Always return 8 DAOs but in different order based on filter
    if (activeFilter === 'featured') {
      // For featured, prioritize the first 4 DAOs
      return [...FAKE_DAOS.slice(0, 4), ...FAKE_DAOS.slice(4, 8)];
    } else if (activeFilter === 'active') {
      // For active, show even-indexed DAOs first, then odd-indexed
      const active = FAKE_DAOS.filter((_, index) => index % 2 === 0);
      const inactive = FAKE_DAOS.filter((_, index) => index % 2 !== 0);
      return [...active, ...inactive];
    } else if (activeFilter === 'new') {
      // For new, show the last 4 DAOs first, then the first 4
      return [...FAKE_DAOS.slice(4, 8), ...FAKE_DAOS.slice(0, 4)];
    }
    return FAKE_DAOS;
  };
  
  const filteredDaos = getFilteredDaos();
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-text flex flex-col">
      {/* Blur background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-full h-full opacity-[0.05] blur-[371px]"
          style={{
            background: `linear-gradient(45deg, rgba(255,255,255,0.06), var(--landing-page-color)20)`,
            transform: 'rotate(-30deg) scale(1.5) translateY(-20%)'
          }}
        />
      </div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat" 
        style={{
          backgroundImage: 'url("/noise-texture.png")'
        }}
      />
      
      {/* Header with Wallet & API Status */}
      <header className="w-full p-2 z-10 flex justify-end">
        <div className="flex items-center">
          <ApiAuthStatus 
            apiStatus={apiStatus} 
            userDisplayInfo={userDisplayInfo}
          />
        </div>
      </header>
      
      {/* Top banner with logo and title */}
      <div className="w-full flex flex-col items-center justify-center py-16 z-10">
        <div className="w-full max-w-[400px] h-[180px] mb-10">
          <img 
            src="https://i.imgur.com/OZCrF4z.png" 
            alt="DAO Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 leading-tight">
          All in one tool for<br />
          <span className="text-[var(--landing-page-color)]">DAO Management</span>
        </h1>
      </div>
      
      {/* Main content with DAO cards */}
      <div className="flex-1 px-4 md:px-8 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto">
          {/* DAO Cards Grid */}
          <div className="mb-8 flex justify-center space-x-4">
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'featured' 
                ? 'bg-[var(--landing-page-color)] text-white' 
                : 'bg-surface-200 text-white hover:bg-surface-300'}`}
              onClick={() => setActiveFilter('featured')}
            >
              Featured
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'active' 
                ? 'bg-[var(--landing-page-color)] text-white' 
                : 'bg-surface-200 text-white hover:bg-surface-300'}`}
              onClick={() => setActiveFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'new' 
                ? 'bg-[var(--landing-page-color)] text-white' 
                : 'bg-surface-200 text-white hover:bg-surface-300'}`}
              onClick={() => setActiveFilter('new')}
            >
              New
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredDaos.map((dao, index) => (
              <div key={dao.id} className="group cursor-pointer" onClick={() => onEnterDashboard(dao.id)}>
                <div className="bg-surface-200 backdrop-blur-lg bg-opacity-5 border border-white/15 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-opacity-10 hover:border-[var(--landing-page-color)]">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${index + 10}`} 
                        alt={dao.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[var(--landing-page-color)] transition-colors duration-300">{dao.name}</h3>
                  </div>
                  <p className="text-white mb-4">{dao.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {dao.badges.map((badge) => (
                        <span 
                          key={badge} 
                          className={`text-xs px-2 py-0.5 rounded-full bg-transparent ${getBadgeColor(badge)}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <svg 
                      className="w-6 h-6 text-white group-hover:text-[var(--landing-page-color)] transition-all duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Function Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-surface-200 backdrop-blur-lg bg-opacity-5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Create</h3>
              <p className="text-white">Create your own DAO with customizable governance rules and token economics</p>
            </div>
            <div className="bg-surface-200 backdrop-blur-lg bg-opacity-5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Manage</h3>
              <p className="text-white">Easily manage members, proposals, and treasury with intuitive tools</p>
            </div>
            <div className="bg-surface-200 backdrop-blur-lg bg-opacity-5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Grow</h3>
              <p className="text-white">Scale your community with built-in analytics and engagement features</p>
            </div>
          </div>
          
          {/* Create DAO Form */}
          {showCreateForm && (
            <div className="max-w-md mx-auto mb-16 bg-surface-200 backdrop-blur-lg bg-opacity-5 border border-white/10 rounded-2xl p-6">
              <h2 className={typography.h2 + " mb-6"}>Create New DAO</h2>
              <CreateDaoForm 
                onSuccess={handleCreateDaoSuccess}
                onError={() => {}} 
              />
              <button 
                onClick={() => setShowCreateForm(false)}
                className="mt-4 text-surface-500 hover:text-text text-sm"
              >
                Cancel and return to DAO list
              </button>
            </div>
          )}
          
          {/* Create DAO Button */}
          {!showCreateForm && userDisplayInfo.isAuthenticated && (
            <div className="flex justify-center mb-16">
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-[var(--landing-page-color)] hover:opacity-90 text-white font-bold py-3 px-8 rounded-md transition-colors"
              >
                Create New DAO
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-10 border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img 
              src="https://i.imgur.com/OZCrF4z.png" 
              alt="DAO Logo" 
              className="h-16 object-contain"
            />
          </div>
          <div className="flex space-x-8 mb-6 md:mb-0">
            <a href="#" className="text-white hover:text-[var(--landing-page-color)] transition-colors">Home</a>
            <a href="#" className="text-white hover:text-[var(--landing-page-color)] transition-colors">Learn</a>
            <a href="#" className="text-white hover:text-[var(--landing-page-color)] transition-colors">Explore</a>
            <a href="#" className="text-white hover:text-[var(--landing-page-color)] transition-colors">Help</a>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-white hover:text-[var(--landing-page-color)] transition-colors">Terms of Service</a>
            <a href="#" className="text-white hover:text-[var(--landing-page-color)] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 