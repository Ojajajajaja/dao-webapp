import React, { useState, useEffect } from 'react';
import { Plus, Users, MessageSquare, Calendar, ExternalLink, Layers, ArrowUpRight, X, Check, PlusCircle, RefreshCw, Edit } from 'lucide-react';
import CreatePodModal from './CreatePodModal';
import UpdatePodModal from './UpdatePodModal';
import CreateProposalModal from './CreateProposalModal';
import PopupProposal from './PopupProposal';
import { useParams } from 'react-router-dom';
import { podsService } from '../services/PodsService';
import { proposalService } from '../services/ProposalService';
import { POD } from '../core/modules/dao-api/models/POD';
import { DiscordMessage } from '../core/modules/dao-api/models/DiscordMessage';
import { Proposal } from '../core/modules/dao-api/models/Proposal';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useSolanaTransaction } from '../hooks/useSolanaTransaction';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { SOLANA_RPC_ENDPOINT } from '../config/solana';

const Pods = () => {
  const { daoId } = useParams<{ daoId: string }>();
  const [selectedPod, setSelectedPod] = useState<POD | null>(null);
  const [pods, setPods] = useState<POD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [feedMessages, setFeedMessages] = useState<DiscordMessage[]>([]);
  const [feedLoading, setFeedLoading] = useState<boolean>(false);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateProposalModalOpen, setIsCreateProposalModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  
  // Get Solana wallet and transaction utilities
  const wallet = useWallet();
  const { 
    sendTransaction, 
    isLoading: isTransactionLoading, 
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
    signature: transactionSignature,
    publicKey,
    connected
  } = useSolanaTransaction();
  
  // Initialize Solana connection
  useEffectOnce(() => {
    // Initialize the Solana connection with our configured endpoint
    proposalService.initializeSolanaConnection(SOLANA_RPC_ENDPOINT);
  });

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

  // Helper function to fetch proposals for a pod
  const fetchProposalsForPod = async (podId: string, podName: string) => {
    if (!daoId || !podId) return;
    
    try {
      // Get proposals for this POD from the API
      const proposals = await proposalService.getProposalsByPOD(daoId, podId);
      setFilteredProposals(proposals);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      setFilteredProposals([]);
    }
  };

  // Fetch feed messages when selected pod changes
  useEffectOnce(() => {
    if (selectedPod && selectedPod.podId && daoId) {
      fetchFeedMessages(daoId, selectedPod.podId);
      
      // Fetch proposals for the selected pod
      if (selectedPod.name) {
        fetchProposalsForPod(selectedPod.podId, selectedPod.name);
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

  // Handler for successful proposal creation
  const handleProposalCreated = () => {
    console.log('Proposal created successfully');
    
    // Refresh proposals list for the selected pod
    if (selectedPod && selectedPod.podId && selectedPod.name) {
      fetchProposalsForPod(selectedPod.podId, selectedPod.name);
    }
  };

  // Handler for proposal voting
  const handleProposalVoted = async () => {
    // After a successful vote, refresh the proposals list
    if (selectedPod && selectedPod.podId && selectedPod.name) {
      fetchProposalsForPod(selectedPod.podId, selectedPod.name);
      
      // Also update the selected proposal with fresh data if one is selected
      if (selectedProposal && selectedProposal.proposalId && daoId) {
        try {
          const updatedProposal = await proposalService.getPodProposalById(
            daoId, 
            selectedPod.podId, 
            selectedProposal.proposalId
          );
          if (updatedProposal) {
            setSelectedProposal(updatedProposal);
          }
        } catch (err) {
          console.error('Error refreshing proposal data after vote:', err);
        }
      }
    }
  };

  // Handler for successful proposal creation with blockchain transaction
  const handleCreateProposalWithTransaction = async (
    title: string,
    description: string,
    endDate: Date
  ) => {
    if (!daoId || !selectedPod?.podId || !publicKey || !wallet) {
      console.error("Missing required data for proposal creation");
      return null;
    }
    
    try {
      console.log(`Creating proposal transaction for DAO: ${daoId}, POD: ${selectedPod.podId}`);
      
      // Create the transaction
      const result = await proposalService.createProposalTransaction(
        daoId,
        publicKey,
        {
          title: title,
          description: description,
          startDate: new Date(), // Start immediately
          endDate: endDate,
          actions: []
        }
      );
      
      if (!result) {
        throw new Error('Failed to create proposal transaction');
      }
      
      // Extract transaction
      const { transaction } = result;
      
      // Send the transaction using Solana wallet adapter
      const connection = new Connection(SOLANA_RPC_ENDPOINT);
      const signature = await wallet.sendTransaction(transaction, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');
      
      console.log('Transaction confirmed:', signature);
      
      // Create proposal via API
      const newProposal = await proposalService.createProposalForPOD(
        daoId,
        selectedPod.podId,
        {
          title,
          description,
          endDate
        }
      );
      
      // Refresh proposal list
      if (selectedPod && selectedPod.podId && selectedPod.name) {
        fetchProposalsForPod(selectedPod.podId, selectedPod.name);
      }
      
      return newProposal;
    } catch (err) {
      console.error('Error creating proposal transaction:', err);
      throw err;
    }
  };

  // Handler for voting on a proposal with blockchain transaction
  const handleVoteWithTransaction = async (proposalId: string, vote: 'for' | 'against') => {
    if (!daoId || !selectedPod?.podId || !publicKey || !wallet) {
      console.error("Missing required data for voting");
      return false;
    }
    
    try {
      console.log(`Creating vote transaction for proposal: ${proposalId}, vote: ${vote}`);
      
      // Create the vote transaction
      const result = await proposalService.createVoteTransaction(
        daoId,
        proposalId,
        publicKey,
        vote
      );
      
      if (!result) {
        throw new Error('Failed to create vote transaction');
      }
      
      // Extract transaction
      const { transaction } = result;
      
      // Send the transaction using Solana wallet adapter
      const connection = new Connection(SOLANA_RPC_ENDPOINT);
      const signature = await wallet.sendTransaction(transaction, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');
      
      console.log('Vote transaction confirmed:', signature);
      
      // Submit vote to API
      await proposalService.voteOnPODProposal(
        daoId,
        selectedPod.podId,
        proposalId,
        vote
      );
      
      return true;
    } catch (err) {
      console.error('Error voting on proposal:', err);
      throw err;
    }
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
                      <div 
                        key={proposal.proposalId} 
                        className="bg-surface-200 p-3 rounded-md cursor-pointer hover:bg-surface-300"
                        onClick={() => setSelectedProposal(proposal)}
                      >
                        <h3 className="text-text font-medium mb-1">{proposal.name}</h3>
                        <p className="text-text opacity-80 text-sm mb-2">{proposal.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-surface-500">
                            By {proposal.createdBy || 'Unknown'} on {
                              proposal.startTime instanceof Date 
                              ? proposal.startTime.toLocaleString() 
                              : new Date(proposal.startTime).toLocaleString()
                            }
                          </span>
                          <div className="flex items-center">
                            <span className="text-primary mr-1">{proposal.forVotesCount || 0}</span>
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
                
                <button className="w-full mt-4 bg-primary text-text px-4 py-2 rounded-md text-sm" onClick={() => setIsCreateProposalModalOpen(true)}>
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

      <CreateProposalModal
        isOpen={isCreateProposalModalOpen}
        onClose={() => setIsCreateProposalModalOpen(false)}
        onSuccess={handleProposalCreated}
        daoId={daoId}
        podId={selectedPod?.podId}
        podName={selectedPod?.name}
        createWithTransaction={handleCreateProposalWithTransaction}
        wallet={wallet}
      />

      {selectedProposal && daoId && selectedPod && (
        <PopupProposal 
          proposal={{
            id: selectedProposal.proposalId || '',
            name: selectedProposal.name || '',
            description: selectedProposal.description || '',
            status: selectedProposal.isActive ? 'active' : (selectedProposal.hasPassed ? 'passed' : 'rejected'),
            creator: selectedProposal.createdBy || 'Unknown',
            createdAt: new Date(selectedProposal.startTime).toLocaleString(),
            startTime: new Date(selectedProposal.startTime).toLocaleString(),
            endTime: new Date(selectedProposal.endTime).toLocaleString(),
            votes: {
              for: selectedProposal.forVotesCount || 0,
              against: selectedProposal.againstVotesCount || 0
            },
            actions: [],
            quorum: 1, // Default value
            minApproval: 50, // Default percentage
            daoId: daoId || ''
          }}
          onClose={() => setSelectedProposal(null)}
          onVoteSubmitted={handleProposalVoted}
          onVote={handleVoteWithTransaction}
          wallet={wallet}
        />
      )}
    </div>
  );
};

export default Pods;