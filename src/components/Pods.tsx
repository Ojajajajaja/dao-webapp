import { useState } from 'react';
import { Plus, Users, MessageSquare, Calendar, ExternalLink, Layers, ArrowUpRight, X, Check, PlusCircle, RefreshCw, Edit, LogIn, LogOut } from 'lucide-react';
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
  const [userIsMember, setUserIsMember] = useState<boolean>(false);
  const [membershipLoading, setMembershipLoading] = useState<boolean>(false);
  
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
        
        // Check membership for the initially selected pod
        if (publicKey && podsData[0].podId) {
          checkPodMembership(podsData[0].podId);
        }
      } else if (podsData.length > 0 && selectedPod) {
        // Find the current pod in the updated list
        const updatedPod = podsData.find(pod => pod.podId === selectedPod.podId);
        if (updatedPod) {
          setSelectedPod(updatedPod);
          
          // Re-check membership with fresh data
          if (publicKey && updatedPod.podId) {
            checkPodMembership(updatedPod.podId);
          }
        }
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

  // Check if the current user is a member of the selected pod
  const checkPodMembership = async (podId: string) => {
    if (!daoId || !podId || !publicKey) return;
    
    try {
      setMembershipLoading(true);
      // Call the DAO-API SDK to check membership
      const members = await podsService.getPodMembers(daoId, podId);
      console.log('POD members:', members);
      console.log('Current user publicKey:', publicKey.toString());
      
      // Check all possible formats of the public key
      const publicKeyStr = publicKey.toString();
      const isMember = members.some((member: any) => {
        // Check if userId matches exactly
        if (member.userId === publicKeyStr) return true;
        
        // Check if userId is the user's wallet address
        if (member.walletAddress && member.walletAddress === publicKeyStr) return true;
        
        // Check if userId is base58 encoded public key
        if (member.userId && publicKeyStr.includes(member.userId)) return true;
        if (member.userId && member.userId.includes(publicKeyStr)) return true;
        
        return false;
      });
      
      console.log('User is member:', isMember);
      setUserIsMember(isMember);
      setMembershipLoading(false);
    } catch (err) {
      console.error('Error checking pod membership:', err);
      setUserIsMember(false);
      setMembershipLoading(false);
    }
  };
  
  // Join a pod
  const handleJoinPod = async () => {
    if (!daoId || !selectedPod?.podId || !publicKey) {
      console.error("Missing required data for joining pod");
      return;
    }
    
    try {
      setMembershipLoading(true);
      // Call the DAO-API SDK to join the pod
      const result = await podsService.addMemberToPod(daoId, selectedPod.podId);
      if (result) {
        console.log('Successfully joined pod:', selectedPod.name);
        setUserIsMember(true);
        // Refresh pod data to get updated membership info
        fetchPods();
      } else {
        console.error('Failed to join pod');
        // Re-check membership to be sure
        checkPodMembership(selectedPod.podId);
      }
      setMembershipLoading(false);
    } catch (err) {
      console.error('Error joining pod:', err);
      setMembershipLoading(false);
      // Re-check membership to be sure
      checkPodMembership(selectedPod.podId);
    }
  };
  
  // Leave a pod
  const handleLeavePod = async () => {
    if (!daoId || !selectedPod?.podId || !publicKey) {
      console.error("Missing required data for leaving pod");
      return;
    }
    
    try {
      setMembershipLoading(true);
      
      // Get the current user's ID from the members list
      const members = await podsService.getPodMembers(daoId, selectedPod.podId);
      const publicKeyStr = publicKey.toString();
      const currentMember = members.find((member: any) => {
        // Check different possible formats
        if (member.userId === publicKeyStr) return true;
        if (member.walletAddress && member.walletAddress === publicKeyStr) return true;
        if (member.userId && publicKeyStr.includes(member.userId)) return true;
        if (member.userId && member.userId.includes(publicKeyStr)) return true;
        return false;
      });
      
      if (!currentMember || !currentMember.userId) {
        console.error("Could not find current user's ID in the POD members list");
        setMembershipLoading(false);
        return;
      }
      
      console.log("Found user ID for removal:", currentMember.userId);
      
      // Call the DAO-API SDK to leave the pod with the correct user ID
      const result = await podsService.removeMemberFromPod(daoId, selectedPod.podId, currentMember.userId);
      if (result) {
        console.log('Successfully left pod:', selectedPod.name);
        setUserIsMember(false);
        // Refresh pod data to get updated membership info
        fetchPods();
      } else {
        console.error('Failed to leave pod');
        // Re-check membership to be sure
        checkPodMembership(selectedPod.podId);
      }
      setMembershipLoading(false);
    } catch (err) {
      console.error('Error leaving pod:', err);
      setMembershipLoading(false);
      // Re-check membership to be sure
      checkPodMembership(selectedPod.podId);
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
      
      // Check if the user is a member of this pod
      if (publicKey) {
        checkPodMembership(selectedPod.podId);
      }
    } else {
      setFeedMessages([]);
      setFilteredProposals([]);
    }
  }, [selectedPod, daoId, publicKey]);

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
          {selectedPod && connected && (
            <>
              {membershipLoading ? (
                <button className="bg-surface-200 text-text px-4 py-2 rounded-full text-sm flex items-center opacity-70 cursor-not-allowed">
                  <RefreshCw size={16} className="mr-1 animate-spin" />
                  Loading...
                </button>
              ) : userIsMember ? (
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm flex items-center hover:bg-red-600"
                  onClick={handleLeavePod}
                >
                  <LogOut size={16} className="mr-1" />
                  Leave this POD
                </button>
              ) : (
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center hover:bg-green-600"
                  onClick={handleJoinPod}
                >
                  <LogIn size={16} className="mr-1" />
                  Join this POD
                </button>
              )}
            </>
          )}
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
                onClick={() => {
                  setSelectedPod(pod);
                  // Check membership immediately when selecting a pod
                  if (publicKey && pod.podId) {
                    checkPodMembership(pod.podId);
                  }
                }}
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
                
                <button 
                  className={`w-full mt-4 ${userIsMember 
                    ? 'bg-primary text-text' 
                    : 'bg-gray-400 text-gray-100 cursor-not-allowed'} 
                    px-4 py-2 rounded-md text-sm`}
                  onClick={() => userIsMember ? setIsCreateProposalModalOpen(true) : null}
                  disabled={!userIsMember}
                  title={!userIsMember ? "Join this POD to create proposals" : "Create a new proposal"}
                >
                  Create Proposal
                </button>
                {!userIsMember && connected && (
                  <p className="text-xs text-center mt-2 text-red-500">
                    You must join this POD to create proposals
                  </p>
                )}
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
          canVote={userIsMember}
        />
      )}
    </div>
  );
};

export default Pods;