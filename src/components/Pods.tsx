import React, { useState, useEffect } from 'react';
import { Plus, Users, MessageSquare, Calendar, ExternalLink, Layers, ArrowUpRight, X, Check, PlusCircle, RefreshCw } from 'lucide-react';
import CreatePodModal from './CreatePodModal';
import { useParams } from 'react-router-dom';
import { podsService } from '../services/PodsService';
import { POD } from '../core/modules/dao-api/models/POD';
import { useEffectOnce } from '../hooks/useEffectOnce';

// Définition du type pour les messages du feed
interface FeedMessage {
  id: number;
  discord_user_id: string;
  discord_username: string;
  date: string;
  hour: string;
  message: string;
  pod: string;
}

// Simulation de la base de données feeds.db
const feedsData: FeedMessage[] = [
  {
    id: 1,
    discord_user_id: '123456789',
    discord_username: 'alex_j',
    date: '2023-10-15',
    hour: '14:30',
    message: 'Hey everyone! Just finished the new logo design for our project.',
    pod: 'Design'
  },
  {
    id: 2,
    discord_user_id: '987654321',
    discord_username: 'sarahw',
    date: '2023-10-14',
    hour: '09:15',
    message: 'We need to schedule a meeting to discuss the upcoming community event.',
    pod: 'Communication'
  },
  {
    id: 3,
    discord_user_id: '456789123',
    discord_username: 'mikeb',
    date: '2023-10-13',
    hour: '18:45',
    message: 'Market is looking good today. We might want to consider increasing our position.',
    pod: 'Trading'
  },
  {
    id: 4,
    discord_user_id: '789123456',
    discord_username: 'emilyd',
    date: '2023-10-12',
    hour: '11:30',
    message: 'New merch samples arrived! They look amazing.',
    pod: 'Merch'
  },
  {
    id: 5,
    discord_user_id: '321654987',
    discord_username: 'davidw',
    date: '2023-10-11',
    hour: '15:20',
    message: 'Just vibing and enjoying the community. Anyone want to join a casual voice chat?',
    pod: 'Chilling'
  },
  {
    id: 6,
    discord_user_id: '654987321',
    discord_username: 'jessicat',
    date: '2023-10-10',
    hour: '08:45',
    message: 'Working on a new banner design. Would love some feedback!',
    pod: 'Design'
  },
  {
    id: 7,
    discord_user_id: '123789456',
    discord_username: 'ryanm',
    date: '2023-10-09',
    hour: '13:15',
    message: 'Reminder: We have a community call tomorrow at 3PM UTC.',
    pod: 'Communication'
  },
  {
    id: 8,
    discord_user_id: '789456123',
    discord_username: 'oliviaa',
    date: '2023-10-08',
    hour: '16:30',
    message: 'Just spotted a great entry point for BTC. Check the charts!',
    pod: 'Trading'
  }
];

// Simulation des propositions de pods
interface PodProposal {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  votes: number;
  pod: string;
}

const podProposals: PodProposal[] = [
  {
    id: 1,
    title: 'Weekly Design Workshops',
    description: 'Proposal to host weekly design workshops to improve our collective skills.',
    author: 'alex_j',
    date: '2023-10-14',
    votes: 12,
    pod: 'Design'
  },
  {
    id: 2,
    title: 'Community Newsletter',
    description: 'Start a monthly newsletter to keep everyone informed about our progress.',
    author: 'sarahw',
    date: '2023-10-13',
    votes: 8,
    pod: 'Communication'
  },
  {
    id: 3,
    title: 'Trading Signal Bot',
    description: 'Develop a bot that shares trading signals with the community.',
    author: 'mikeb',
    date: '2023-10-12',
    votes: 15,
    pod: 'Trading'
  },
  {
    id: 4,
    title: 'Limited Edition Hoodies',
    description: 'Create a limited run of premium hoodies for our most active members.',
    author: 'emilyd',
    date: '2023-10-11',
    votes: 20,
    pod: 'Merch'
  },
  {
    id: 5,
    title: 'Movie Night Fridays',
    description: 'Host a weekly movie night where we can all chill and watch something together.',
    author: 'davidw',
    date: '2023-10-10',
    votes: 18,
    pod: 'Chilling'
  }
];

const Pods = () => {
  const { daoId } = useParams<{ daoId: string }>();
  const [selectedPod, setSelectedPod] = useState<string>('');
  const [pods, setPods] = useState<POD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredFeed, setFilteredFeed] = useState<FeedMessage[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<PodProposal[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch pods when component loads or daoId changes
  useEffectOnce(() => {
    fetchPods();
  }, [daoId]);

  // Fetch pods from the API
  const fetchPods = async () => {
    if (!daoId) {
      setError('No DAO ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const podsData = await podsService.getPods(daoId);
      setPods(podsData);
      
      // Set the first pod as selected if there are pods and no selection yet
      if (podsData.length > 0 && !selectedPod) {
        setSelectedPod(podsData[0].name);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pods:', err);
      setError('Failed to load pods. Please try again.');
      setLoading(false);
    }
  };

  // Filter feed and proposals when selected pod changes
  useEffect(() => {
    if (selectedPod) {
      setFilteredFeed(feedsData.filter(message => message.pod === selectedPod));
      setFilteredProposals(podProposals.filter(proposal => proposal.pod === selectedPod));
    } else {
      setFilteredFeed([]);
      setFilteredProposals([]);
    }
  }, [selectedPod]);

  // Format date for display
  const formatDate = (date: string, hour: string) => {
    const dateObj = new Date(`${date}T${hour}`);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${hour}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${hour}`;
    } else {
      return `${date} at ${hour}`;
    }
  };

  // Refresh pods data after creating a new pod
  const handlePodCreated = () => {
    fetchPods();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-text mr-4">Pods</h1>
          {loading ? (
            <RefreshCw className="animate-spin text-primary" size={20} />
          ) : (
            <button 
              onClick={fetchPods} 
              className="text-primary hover:text-opacity-80"
              title="Refresh pods"
            >
              <RefreshCw size={20} />
            </button>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="bg-primary text-text px-4 py-2 rounded-full text-sm flex items-center"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusCircle size={16} className="mr-1" />
            Create POD
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-text">Loading pods...</p>
        </div>
      ) : pods.length === 0 ? (
        <div className="bg-surface-200 p-6 rounded-lg text-center">
          <p className="text-text mb-4">No pods found for this DAO.</p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary text-text px-4 py-2 rounded-md text-sm inline-flex items-center"
          >
            <PlusCircle size={16} className="mr-1" />
            Create your first POD
          </button>
        </div>
      ) : (
        <>
          <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
            {pods.map((pod) => (
              <button 
                key={pod.podId}
                className={`px-4 py-2 rounded-full text-sm ${
                  pod.name === selectedPod 
                    ? 'bg-primary text-text' 
                    : 'bg-surface-200 text-text hover:bg-surface-300'
                }`}
                onClick={() => setSelectedPod(pod.name)}
              >
                {pod.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-surface-200 rounded-lg p-4">
                <h2 className="text-text text-lg mb-4 flex items-center">
                  <MessageSquare className="mr-2" size={20} />
                  {selectedPod} Feed
                </h2>
                
                {filteredFeed.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFeed.map((message) => (
                      <div key={message.id} className="bg-surface-200 p-3 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-text font-bold mr-2">
                              {message.discord_username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-text font-medium">{message.discord_username}</div>
                              <div className="text-surface-500 text-xs">{formatDate(message.date, message.hour)}</div>
                            </div>
                          </div>
                          <a 
                            href={`https://discord.com/users/${message.discord_user_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary text-xs flex items-center"
                          >
                            Discord <ExternalLink size={12} className="ml-1" />
                          </a>
                        </div>
                        <p className="text-text text-sm">{message.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-[#555555]">
                    <p>No messages in this pod yet. Be the first to post!</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="bg-surface-200 rounded-lg p-4">
                <h2 className="text-text text-lg mb-4 flex items-center">
                  <Calendar className="mr-2" size={20} />
                  {selectedPod} Proposals
                </h2>
                
                {filteredProposals.length > 0 ? (
                  <div className="space-y-4">
                    {filteredProposals.map((proposal) => (
                      <div key={proposal.id} className="bg-surface-200 p-3 rounded-md">
                        <h3 className="text-text font-medium mb-1">{proposal.title}</h3>
                        <p className="text-text opacity-80 text-sm mb-2">{proposal.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-surface-500">By {proposal.author} on {proposal.date}</span>
                          <div className="flex items-center">
                            <span className="text-primary mr-1">{proposal.votes}</span>
                            <span className="text-surface-500">votes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-[#555555]">
                    <p>No proposals in this pod yet. Create one!</p>
                  </div>
                )}
                
                <button className="w-full mt-4 bg-primary text-text px-4 py-2 rounded-md text-sm">
                  Create Proposal
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <CreatePodModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handlePodCreated}
        daoId={daoId}
      />
    </div>
  );
};

export default Pods;