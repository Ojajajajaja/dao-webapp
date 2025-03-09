import React, { useState } from 'react';
import { PieChart, Vote, Plus, X, Clock, Calendar, Wallet, UserMinus, ArrowUpRight, Check } from 'lucide-react';
import PopupProposal from './PopupProposal';
import { ui, states, typography, containers } from '../styles/theme';

interface Action {
  type: string;
  walletAddress?: string;
  tokenAmount?: string;
  tokenSymbol?: string;
}

interface ProposalForm {
  title: string;
  description: string;
  startTime: string;
  customStartDate: string;
  customStartTime: string;
  expirationDays: string;
  expirationHours: string;
  expirationMinutes: string;
  actions: Action[];
}

interface ProposalDetails {
  id: string;
  title: string;
  description: string;
  status: string;
  creator: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  actions: {
    type: string;
    description: string;
    walletAddress?: string;
    amount?: string;
    token?: string;
  }[];
  quorum: number;
  minApproval: number;
}

const Governance = () => {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalStep, setProposalStep] = useState(1);
  const [proposal, setProposal] = useState<ProposalForm>({
    title: '',
    description: '',
    startTime: 'now',
    customStartDate: '',
    customStartTime: '',
    expirationDays: '3',
    expirationHours: '0',
    expirationMinutes: '0',
    actions: []
  });
  const [selectedProposal, setSelectedProposal] = useState<ProposalDetails | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProposal({ ...proposal, [name]: value });
  };

  const nextStep = () => {
    setProposalStep(proposalStep + 1);
  };

  const prevStep = () => {
    setProposalStep(proposalStep - 1);
  };

  const resetForm = () => {
    setProposalStep(1);
    setShowProposalForm(false);
    setProposal({
      title: '',
      description: '',
      startTime: 'now',
      customStartDate: '',
      customStartTime: '',
      expirationDays: '3',
      expirationHours: '0',
      expirationMinutes: '0',
      actions: []
    });
  };

  const toggleAction = (actionType: string) => {
    // Find if this action type already exists in the actions array
    const existingActionIndex = proposal.actions.findIndex(action => action.type === actionType);
    
    if (existingActionIndex >= 0) {
      // If it exists, remove it
      const updatedActions = [...proposal.actions];
      updatedActions.splice(existingActionIndex, 1);
      setProposal({ ...proposal, actions: updatedActions });
    } else {
      // If it doesn't exist, add it
      const newAction: Action = {
        type: actionType,
        walletAddress: '',
        tokenAmount: '',
        tokenSymbol: 'SOL'
      };
      setProposal({ ...proposal, actions: [...proposal.actions, newAction] });
    }
  };

  const updateActionField = (actionType: string, fieldName: string, value: string) => {
    const updatedActions = proposal.actions.map(action => {
      if (action.type === actionType) {
        return { ...action, [fieldName]: value };
      }
      return action;
    });
    
    setProposal({ ...proposal, actions: updatedActions });
  };

  const calculateExpirationTime = () => {
    const days = parseInt(proposal.expirationDays) || 0;
    const hours = parseInt(proposal.expirationHours) || 0;
    const minutes = parseInt(proposal.expirationMinutes) || 0;
    
    let totalTime = '';
    if (days > 0) totalTime += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) totalTime += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) totalTime += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    
    return totalTime.trim() || 'No expiration set';
  };

  const getActionDescription = (action: Action) => {
    switch (action.type) {
      case 'authorize':
        return `Authorize wallet ${action.walletAddress} to multisig`;
      case 'remove':
        return `Remove wallet ${action.walletAddress} from multisig`;
      case 'withdraw':
        return `Withdraw ${action.tokenAmount} ${action.tokenSymbol} to ${action.walletAddress}`;
      default:
        return 'Unknown action';
    }
  };

  const isActionSelected = (actionType: string) => {
    return proposal.actions.some(action => action.type === actionType);
  };

  const getActionByType = (actionType: string) => {
    return proposal.actions.find(action => action.type === actionType);
  };

  const renderProposalForm = () => {
    switch (proposalStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-text opacity-80 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={proposal.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter proposal title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text opacity-80 mb-1">Description</label>
              <textarea
                name="description"
                value={proposal.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe your proposal"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-md text-text bg-primary hover:bg-primary"
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text">Timing</h3>
            
            <div>
              <label className="block text-sm font-medium text-text opacity-80 mb-1">Start Time</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="startNow"
                    name="startTime"
                    value="now"
                    checked={proposal.startTime === 'now'}
                    onChange={handleInputChange}
                    className="mr-2 text-primary focus:ring-primary bg-surface-200 border-gray-600"
                  />
                  <label htmlFor="startNow" className="text-text">Start immediately</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="startCustom"
                    name="startTime"
                    value="custom"
                    checked={proposal.startTime === 'custom'}
                    onChange={handleInputChange}
                    className="mr-2 text-primary focus:ring-primary bg-surface-200 border-gray-600"
                  />
                  <label htmlFor="startCustom" className="text-text">Schedule for later</label>
                </div>
                
                {proposal.startTime === 'custom' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block text-xs text-surface-500 mb-1">Date</label>
                      <input
                        type="date"
                        name="customStartDate"
                        value={proposal.customStartDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-surface-500 mb-1">Time</label>
                      <input
                        type="time"
                        name="customStartTime"
                        value={proposal.customStartTime}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text opacity-80 mb-1">Expiration Time</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-surface-500 mb-1">Days</label>
                  <input
                    type="number"
                    name="expirationDays"
                    value={proposal.expirationDays}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-surface-500 mb-1">Hours</label>
                  <input
                    type="number"
                    name="expirationHours"
                    value={proposal.expirationHours}
                    onChange={handleInputChange}
                    min="0"
                    max="23"
                    className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-surface-500 mb-1">Minutes</label>
                  <input
                    type="number"
                    name="expirationMinutes"
                    value={proposal.expirationMinutes}
                    onChange={handleInputChange}
                    min="0"
                    max="59"
                    className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <p className="text-sm text-surface-500 mt-2">
                Proposal will expire after: {calculateExpirationTime()}
              </p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md text-text bg-surface-300 hover:bg-[#444444]"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={proposal.startTime === 'custom' && (!proposal.customStartDate || !proposal.customStartTime)}
                className={`px-4 py-2 rounded-md text-text ${proposal.startTime === 'custom' && (!proposal.customStartDate || !proposal.customStartTime) ? 'bg-surface-300 cursor-not-allowed' : 'bg-primary hover:bg-primary'}`}
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text">Actions (Optional)</h3>
            <p className="text-sm text-surface-500 mb-2">Select one or more actions for this proposal</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => toggleAction('authorize')}
                className={`p-2 rounded-md text-sm ${isActionSelected('authorize') ? 'bg-primary text-text' : 'bg-surface-300 text-text hover:bg-[#444444]'}`}
              >
                Authorize Wallet
              </button>
              <button
                onClick={() => toggleAction('remove')}
                className={`p-2 rounded-md text-sm ${isActionSelected('remove') ? 'bg-primary text-text' : 'bg-surface-300 text-text hover:bg-[#444444]'}`}
              >
                Remove Wallet
              </button>
              <button
                onClick={() => toggleAction('withdraw')}
                className={`p-2 rounded-md text-sm ${isActionSelected('withdraw') ? 'bg-primary text-text' : 'bg-surface-300 text-text hover:bg-[#444444]'}`}
              >
                Withdraw Tokens
              </button>
            </div>
            
            <div className="space-y-4">
              {proposal.actions.length > 0 ? (
                <>
                  {isActionSelected('authorize') && (
                    <div className="p-4 bg-surface-200 rounded-md border border-gray-600">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-primary">Authorize Wallet</h5>
                        <button 
                          onClick={() => toggleAction('authorize')}
                          className="text-surface-500 hover:text-gray-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text opacity-80 mb-1">Wallet Address to Authorize</label>
                        <input
                          type="text"
                          value={getActionByType('authorize')?.walletAddress || ''}
                          onChange={(e) => updateActionField('authorize', 'walletAddress', e.target.value)}
                          className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter wallet address"
                        />
                      </div>
                    </div>
                  )}
                  
                  {isActionSelected('remove') && (
                    <div className="p-4 bg-surface-200 rounded-md border border-gray-600">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-primary">Remove Wallet</h5>
                        <button 
                          onClick={() => toggleAction('remove')}
                          className="text-surface-500 hover:text-gray-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text opacity-80 mb-1">Wallet Address to Remove</label>
                        <input
                          type="text"
                          value={getActionByType('remove')?.walletAddress || ''}
                          onChange={(e) => updateActionField('remove', 'walletAddress', e.target.value)}
                          className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter wallet address"
                        />
                      </div>
                    </div>
                  )}
                  
                  {isActionSelected('withdraw') && (
                    <div className="p-4 bg-surface-200 rounded-md border border-gray-600">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-primary">Withdraw Tokens</h5>
                        <button 
                          onClick={() => toggleAction('withdraw')}
                          className="text-surface-500 hover:text-gray-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-text opacity-80 mb-1">Recipient Wallet</label>
                          <input
                            type="text"
                            value={getActionByType('withdraw')?.walletAddress || ''}
                            onChange={(e) => updateActionField('withdraw', 'walletAddress', e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter recipient wallet address"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-text opacity-80 mb-1">Amount</label>
                            <input
                              type="number"
                              value={getActionByType('withdraw')?.tokenAmount || ''}
                              onChange={(e) => updateActionField('withdraw', 'tokenAmount', e.target.value)}
                              className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="Enter amount"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-text opacity-80 mb-1">Token</label>
                            <select
                              value={getActionByType('withdraw')?.tokenSymbol || 'SOL'}
                              onChange={(e) => updateActionField('withdraw', 'tokenSymbol', e.target.value)}
                              className="w-full p-2 border border-gray-600 rounded-md bg-surface-200 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="SOL">SOL</option>
                              <option value="USDC">USDC</option>
                              <option value="USDT">USDT</option>
                              <option value="BTC">BTC</option>
                              <option value="ETH">ETH</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-surface-200 rounded-md text-center text-surface-500">
                  No actions selected. You can continue without actions or select one above.
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md text-text bg-surface-300 hover:bg-[#444444]"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-md text-text bg-primary hover:bg-primary"
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text">Review & Submit</h3>
            
            <div className="bg-surface-200 p-4 rounded-md">
              <h4 className="font-medium text-text mb-2">{proposal.title}</h4>
              <p className="text-text opacity-80 text-sm mb-4">{proposal.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Start Time:</span>
                  <span className="text-text">
                    {proposal.startTime === 'now' 
                      ? 'Immediately after creation' 
                      : `${proposal.customStartDate} at ${proposal.customStartTime}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Expiration:</span>
                  <span className="text-text">{calculateExpirationTime()}</span>
                </div>
              </div>
              
              {proposal.actions.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-text opacity-80 mb-2">Actions:</h5>
                  <ul className="space-y-1">
                    {proposal.actions.map((action, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check size={16} className="text-primary mr-2 mt-0.5" />
                        <span className="text-text">{getActionDescription(action)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md text-text bg-surface-300 hover:bg-[#444444]"
              >
                Back
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded-md text-text bg-primary hover:bg-primary"
              >
                Create Proposal
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const proposalDetails: ProposalDetails[] = [
    {
      id: 'PROP-1234',
      title: 'Increase Treasury Allocation for Marketing',
      description: 'This proposal aims to increase the treasury allocation for marketing efforts from 10% to 15% of the total treasury. The additional funds will be used to expand our presence on social media platforms and sponsor relevant events in the crypto space.\n\nRationale:\n- Increased competition requires more marketing efforts\n- Recent community survey showed strong support for more marketing\n- Previous marketing campaigns have shown positive ROI',
      status: 'Active',
      creator: 'dao.member.eth',
      createdAt: '2023-10-15',
      startDate: '2023-10-16',
      endDate: '2023-10-23',
      votes: {
        for: 650,
        against: 350,
        abstain: 120
      },
      actions: [
        {
          type: 'withdraw',
          description: 'Withdraw 50,000 USDC from treasury to marketing multisig',
          walletAddress: '0x1234...5678',
          amount: '50,000',
          token: 'USDC'
        }
      ],
      quorum: 1000,
      minApproval: 60
    },
    {
      id: 'PROP-1233',
      title: 'New Community Guidelines',
      description: 'This proposal introduces updated community guidelines for all official communication channels. The new guidelines focus on promoting respectful discourse, preventing spam, and establishing clear moderation procedures.\n\nKey changes:\n- More specific rules about promotional content\n- Clearer escalation path for rule violations\n- New roles for community moderators',
      status: 'Active',
      creator: 'community.lead.eth',
      createdAt: '2023-10-14',
      startDate: '2023-10-15',
      endDate: '2023-10-22',
      votes: {
        for: 820,
        against: 180,
        abstain: 50
      },
      actions: [
        {
          type: 'document',
          description: 'Ratify new community guidelines document (IPFS: QmX...)',
        }
      ],
      quorum: 800,
      minApproval: 50
    },
    {
      id: 'PROP-1232',
      title: 'Reduce Quorum Requirements',
      description: 'This proposal suggests reducing the quorum requirements for standard proposals from 20% to 15% of total voting power. The change aims to address the challenge of reaching quorum for routine proposals, while maintaining a high enough threshold to ensure proper governance.\n\nThe proposal does NOT change the quorum requirements for critical proposals (such as treasury changes above 100k USDC or protocol parameter changes).',
      status: 'Active',
      creator: 'governance.eth',
      createdAt: '2023-10-13',
      startDate: '2023-10-14',
      endDate: '2023-10-28',
      votes: {
        for: 490,
        against: 510,
        abstain: 200
      },
      actions: [
        {
          type: 'parameter',
          description: 'Update governance parameter: STANDARD_PROPOSAL_QUORUM from 20% to 15%',
        }
      ],
      quorum: 1200,
      minApproval: 66
    }
  ];
  
  const openProposalDetails = (proposalId: string) => {
    const proposal = proposalDetails.find(p => p.id === proposalId);
    if (proposal) {
      setSelectedProposal(proposal);
    }
  };
  
  const closeProposalDetails = () => {
    setSelectedProposal(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowProposalForm(true)}
          className="flex items-center bg-primary hover:bg-primary text-text px-4 py-2 rounded-md"
        >
          <Plus size={16} className="mr-2" />
          New Proposal
        </button>
      </div>
      
      {showProposalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-surface-200 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-600">
              <h2 className="text-xl font-semibold text-text">Create New Proposal</h2>
              <button 
                onClick={resetForm}
                className="text-surface-500 hover:text-text"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step === proposalStep 
                          ? 'bg-primary text-text' 
                          : step < proposalStep 
                            ? 'bg-blue-900 text-primary' 
                            : 'bg-surface-300 text-surface-500'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div 
                        className={`flex-1 h-1 ${
                          step < proposalStep ? 'bg-primary' : 'bg-surface-300'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              
              {renderProposalForm()}
            </div>
          </div>
        </div>
      )}
      
      {selectedProposal && (
        <PopupProposal 
          proposal={selectedProposal} 
          onClose={closeProposalDetails} 
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-primary rounded-lg p-4 text-text">
          <h3 className="text-sm font-medium mb-2">Active Proposals</h3>
          <p className="text-3xl font-bold">3</p>
        </div>
        
        <div className="bg-primary rounded-lg p-4 text-text">
          <h3 className="text-sm font-medium mb-2">Voting Power</h3>
          <p className="text-3xl font-bold">1,250 SOL</p>
        </div>
      </div>
      
      <div className="bg-surface-200 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-[#333333]">
          <h2 className="text-lg font-medium text-text">Active Proposals</h2>
        </div>
        <div>
          {[
            { id: 'PROP-1234', title: 'Increase Treasury Allocation for Marketing', status: 'Active', votes: { for: 65, against: 35 } },
            { id: 'PROP-1233', title: 'New Community Guidelines', status: 'Active', votes: { for: 82, against: 18 } },
            { id: 'PROP-1232', title: 'Reduce Quorum Requirements', status: 'Active', votes: { for: 49, against: 51 } },
          ].map((proposal, index) => (
            <div 
              key={proposal.id} 
              className={`p-4 ${index !== 2 ? 'border-b border-[#333333]' : ''} hover:bg-surface-200 cursor-pointer`}
              onClick={() => openProposalDetails(proposal.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium text-text">{proposal.title}</h3>
                  <p className="text-sm text-surface-500">{proposal.id}</p>
                </div>
                <span className="px-2 py-1 bg-green-900 text-success rounded-full text-xs">
                  {proposal.status}
                </span>
              </div>
              <div className="w-full bg-surface-300 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${proposal.votes.for}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-primary">{proposal.votes.for}% For</span>
                <span className="text-surface-500">{proposal.votes.against}% Against</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#333333]">
            <h2 className="text-lg font-medium text-text">Voting Power Distribution</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-center justify-center">
              <PieChart className="text-text opacity-80" size={100} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#333333]">
            <h2 className="text-lg font-medium text-text">Recent Governance Activity</h2>
          </div>
          <div>
            {[
              { event: 'Proposal #1221 accepted', time: '12 hours ago' },
              { event: 'New voting period started', time: '1 day ago' },
              { event: 'Quorum reached on Proposal #1220', time: '2 days ago' },
              { event: 'Proposal #1219 rejected', time: '3 days ago' },
            ].map((activity, index) => (
              <div key={index} className={`p-4 ${index !== 3 ? 'border-b border-[#333333]' : ''} hover:bg-surface-200`}>
                <div className="flex justify-between">
                  <span className="text-text">{activity.event}</span>
                  <span className="text-sm text-surface-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;