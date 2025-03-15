import React, { useState, useEffect } from 'react';
import { Plus, Users, MessageSquare, Calendar, ExternalLink, Layers, ArrowUpRight, X, Check, PlusCircle, RefreshCw, Edit } from 'lucide-react';
import CreatePodModal from './CreatePodModal';
import UpdatePodModal from './UpdatePodModal';
import { useParams } from 'react-router-dom';
import { podsService } from '../services/PodsService';
import { POD } from '../core/modules/dao-api/models/POD';
import { DiscordMessage } from '../core/modules/dao-api/models/DiscordMessage';
import { useEffectOnce } from '../hooks/useEffectOnce';

// Simulation of the base de données propositions de pods
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
  const [selectedPod, setSelectedPod] = useState<POD | null>(null);
  const [pods, setPods] = useState<POD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [feedMessages, setFeedMessages] = useState<DiscordMessage[]>([]);
  const [feedLoading, setFeedLoading] = useState<boolean>(false);
  const [filteredProposals, setFilteredProposals] = useState<PodProposal[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
        setSelectedPod(podsData[0]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pods:', err);
      setError('Failed to load pods. Please try again.');
      setLoading(false);
    }
  };

  // Fetch feed messages when selected pod changes
  useEffectOnce(() => {
    if (selectedPod && selectedPod.podId && daoId) {
      fetchFeedMessages(daoId, selectedPod.podId);
      
      // Filter proposals for the selected pod
      if (selectedPod.name) {
        setFilteredProposals(podProposals.filter(proposal => proposal.pod === selectedPod.name));
      } else {
        setFilteredProposals([]);
      }
    } else {
      setFeedMessages([]);
      setFilteredProposals([]);
    }
  }, [selectedPod, daoId]);

  // Fetch feed messages from the API
  const fetchFeedMessages = async (daoId: string, podId: string) => {
    try {
      setFeedLoading(true);
      const messages = await podsService.getPodFeed(daoId, podId);
      setFeedMessages(messages);
      setFeedLoading(false);
    } catch (err) {
      console.error('Error fetching feed messages:', err);
      setFeedMessages([]);
      setFeedLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    if (diffDays === 0) {
      return `Today at ${timeStr}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${timeStr}`;
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year} at ${timeStr}`;
    }
  };

  // Refresh pods data after creating or updating a pod
  const handlePodUpdated = () => {
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
          {selectedPod && (
            <button 
              className="bg-surface-200 text-text px-4 py-2 rounded-full text-sm flex items-center"
              onClick={() => setIsUpdateModalOpen(true)}
            >
              <Edit size={16} className="mr-1" />
              Update POD
            </button>
          )}
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
                  selectedPod && pod.podId === selectedPod.podId 
                    ? 'bg-primary text-text' 
                    : 'bg-surface-200 text-text hover:bg-surface-300'
                }`}
                onClick={() => setSelectedPod(pod)}
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
                  {selectedPod?.name} Feed
                </h2>
                
                {feedLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <RefreshCw className="animate-spin text-primary" size={24} />
                  </div>
                ) : feedMessages.length > 0 ? (
                  <div className="space-y-4">
                    {feedMessages.map((message) => (
                      <div key={message.messageId} className="bg-surface-200 p-3 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-text font-bold mr-2">
                              {message.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-text font-medium">{message.username}</div>
                              <div className="text-surface-500 text-xs">{formatDate(message.createdAt)}</div>
                            </div>
                          </div>
                          <a 
                            href={`https://discord.com/users/${message.userId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary text-xs flex items-center"
                          >
                            Discord <ExternalLink size={12} className="ml-1" />
                          </a>
                        </div>
                        <p className="text-text text-sm">{message.text}</p>
                        {message.hasMedia && message.mediaUrls && (
                          <div className="mt-2">
                            {Array.isArray(message.mediaUrls) ? (
                              message.mediaUrls.map((url: string, index: number) => (
                                <a 
                                  key={index} 
                                  href={url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-xs inline-block mr-2"
                                >
                                  Attachment {index + 1}
                                </a>
                              ))
                            ) : (
                              <a 
                                href={message.mediaUrls} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-xs"
                              >
                                Attachment
                              </a>
                            )}
                          </div>
                        )}
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
                  {selectedPod?.name} Proposals
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
        onSuccess={handlePodUpdated}
        daoId={daoId}
      />

      <UpdatePodModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSuccess={handlePodUpdated}
        daoId={daoId}
        pod={selectedPod}
      />
    </div>
  );
};

export default Pods;