import React, { useState } from 'react';
import { X, Check, AlertTriangle, ThumbsUp, ThumbsDown, Users, Calendar, Clock, Minus, Wallet, UserMinus, ArrowUpRight } from 'lucide-react';
import { proposalService } from '../services/ProposalService';
import { useEffectOnce } from '../hooks/useEffectOnce';

interface ProposalAction {
  type: string;
  description: string;
  walletAddress?: string;
  amount?: string;
  token?: string;
}

interface ProposalVote {
  for: number;
  against: number;
  abstain?: number;
}

interface ProposalDetails {
  id: string;
  name: string;
  description: string;
  status: string;
  creator: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  votes: ProposalVote;
  actions: ProposalAction[];
  quorum: number;
  minApproval: number;
  daoId?: string;
}

interface PopupProposalProps {
  proposal: ProposalDetails;
  onClose: () => void;
  onVoteSubmitted?: () => void;
}

const PopupProposal: React.FC<PopupProposalProps> = ({ proposal, onClose, onVoteSubmitted }) => {
  const [voteOption, setVoteOption] = useState<'for' | 'against' | 'abstain' | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localProposal, setLocalProposal] = useState<ProposalDetails>(proposal);

  // Update local state when the parent provides a new proposal
  useEffectOnce(() => {
    setLocalProposal(proposal);
  }, [proposal]);

  const handleVote = async () => {
    if (!voteOption) return;
    if (!localProposal.daoId) {
      setError('Missing DAO ID. Cannot submit vote.');
      return;
    }
    
    setIsVoting(true);
    setError(null);
    
    try {
      // Submit the vote using the proposal service
      const success = await proposalService.voteOnProposal(
        localProposal.daoId,
        localProposal.id,
        voteOption
      );
      
      if (success) {
        setHasVoted(true);
        // Call the parent's callback to refresh the proposal data
        if (onVoteSubmitted) {
          onVoteSubmitted();
        }
      } else {
        setError('Failed to submit vote. Please try again.');
      }
    } catch (err) {
      console.error('Error voting on proposal:', err);
      setError('An error occurred while voting. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-900 text-success';
      case 'pending':
        return 'bg-yellow-900 text-warning';
      case 'passed':
        return 'bg-blue-900 text-primary';
      case 'rejected':
        return 'bg-red-900 text-error';
      default:
        return 'bg-gray-900 text-text opacity-80';
    }
  };

  const calculateProgress = () => {
    const total = (localProposal.votes.for || 0) + (localProposal.votes.against || 0) + (localProposal.votes.abstain || 0);
    const forPercentage = total > 0 ? (localProposal.votes.for / total) * 100 : 0;
    const againstPercentage = total > 0 ? (localProposal.votes.against / total) * 100 : 0;
    
    return {
      for: forPercentage,
      against: againstPercentage,
      quorumMet: total >= localProposal.quorum,
      approvalMet: forPercentage >= localProposal.minApproval
    };
  };

  const progress = calculateProgress();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-menu rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-text">{localProposal.name}</h2>
            <span className={`ml-3 px-2 py-1 rounded-full text-xs ${getStatusColor(localProposal.status)}`}>
              {localProposal.status}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-surface-500 hover:text-text"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-surface-200 p-3 rounded-md">
              <div className="flex items-center text-surface-500 mb-1">
                <Calendar size={14} className="mr-1" />
                <span className="text-xs">Start Date</span>
              </div>
              <p className="text-text">{localProposal.startTime}</p>
            </div>
            
            <div className="bg-surface-200 p-3 rounded-md">
              <div className="flex items-center text-surface-500 mb-1">
                <Clock size={14} className="mr-1" />
                <span className="text-xs">End Date</span>
              </div>
              <p className="text-text">{localProposal.endTime}</p>
            </div>
            
            <div className="bg-surface-200 p-3 rounded-md">
              <div className="flex items-center text-surface-500 mb-1">
                <Users size={14} className="mr-1" />
                <span className="text-xs">Created By</span>
              </div>
              <p className="text-text">{localProposal.creator}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text mb-2">Description</h3>
            <div className="bg-surface-200 p-4 rounded-md">
              <p className="text-text opacity-80 whitespace-pre-line">{localProposal.description}</p>
            </div>
          </div>
          
          {localProposal.actions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-text mb-2">Actions</h3>
              <div className="bg-surface-200 p-4 rounded-md">
                <ul className="space-y-3">
                  {localProposal.actions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="text-text">{action.description}</p>
                        {action.walletAddress && (
                          <p className="text-surface-500 text-sm font-mono mt-1">
                            {action.walletAddress}
                          </p>
                        )}
                        {action.amount && action.token && (
                          <p className="text-surface-500 text-sm mt-1">
                            Amount: {action.amount} {action.token}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text mb-2">Current Votes</h3>
            <div className="bg-surface-200 p-4 rounded-md">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-surface-500">Quorum: {localProposal.quorum} votes required</span>
                <span className={progress.quorumMet ? "text-success" : "text-warning"}>
                  {progress.quorumMet ? "Quorum met" : "Quorum not met"}
                </span>
              </div>
              
              <div className="flex justify-between text-sm mb-3">
                <span className="text-surface-500">Approval: {localProposal.minApproval}% required</span>
                <span className={progress.approvalMet ? "text-success" : "text-warning"}>
                  {progress.approvalMet ? "Approval threshold met" : "Approval threshold not met"}
                </span>
              </div>
              
              <div className="w-full h-6 bg-surface-300 rounded-md overflow-hidden flex mb-2">
                <div 
                  className="bg-primary h-full" 
                  style={{ width: `${progress.for}%` }}
                ></div>
                <div 
                  className="bg-error h-full" 
                  style={{ width: `${progress.against}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="text-primary font-medium">{localProposal.votes.for} votes</div>
                  <div className="text-surface-500">For ({progress.for.toFixed(1)}%)</div>
                </div>
                <div>
                  <div className="text-error font-medium">{localProposal.votes.against} votes</div>
                  <div className="text-surface-500">Against ({progress.against.toFixed(1)}%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-600">
          {hasVoted ? (
            <div className="bg-blue-900 text-primary p-3 rounded-md flex items-center">
              <Check size={18} className="mr-2" />
              Your vote has been recorded. Thank you for participating!
            </div>
          ) : localProposal.status.toLowerCase() !== 'active' ? (
            <div className="bg-surface-200 p-3 rounded-md text-surface-500 flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              Voting is not available for this proposal.
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium text-text mb-3">Cast Your Vote</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button 
                  className={`p-3 rounded-md flex flex-col items-center justify-center ${
                    voteOption === 'for' 
                      ? 'bg-primary text-text' 
                      : 'bg-surface-200 text-text opacity-80 hover:bg-surface-300'
                  }`}
                  onClick={() => setVoteOption('for')}
                >
                  <ThumbsUp size={24} className="mb-1" />
                  <span>For</span>
                </button>
                
                <button 
                  className={`p-3 rounded-md flex flex-col items-center justify-center ${
                    voteOption === 'against' 
                      ? 'bg-error text-text' 
                      : 'bg-surface-200 text-text opacity-80 hover:bg-surface-300'
                  }`}
                  onClick={() => setVoteOption('against')}
                >
                  <ThumbsDown size={24} className="mb-1" />
                  <span>Against</span>
                </button>
              </div>
              
              {error && (
                <div className="bg-red-900 text-error p-2 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <button
                className={`w-full p-3 rounded-md font-medium ${
                  voteOption
                    ? 'bg-primary text-text hover:opacity-90'
                    : 'bg-surface-200 text-surface-500 cursor-not-allowed'
                }`}
                onClick={handleVote}
                disabled={!voteOption || isVoting}
              >
                {isVoting ? 'Submitting vote...' : 'Submit Vote'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupProposal; 