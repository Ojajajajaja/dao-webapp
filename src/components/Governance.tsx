import React, { useState } from 'react';
import { PieChart, Vote, Plus, X, Clock, Calendar, Wallet, UserMinus, ArrowUpRight } from 'lucide-react';

const Governance = () => {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalStep, setProposalStep] = useState(1);
  const [proposal, setProposal] = useState({
    title: '',
    summary: '',
    startTime: 'now',
    customStartDate: new Date().toISOString().split('T')[0],
    customStartTime: '12:00',
    expirationDays: 7,
    expirationHours: 0,
    expirationMinutes: 0,
    actions: []
  });

  const handleInputChange = (e) => {
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
      summary: '',
      startTime: 'now',
      customStartDate: new Date().toISOString().split('T')[0],
      customStartTime: '12:00',
      expirationDays: 7,
      expirationHours: 0,
      expirationMinutes: 0,
      actions: []
    });
  };

  const toggleAction = (actionType) => {
    // Find if this action type already exists in the actions array
    const existingActionIndex = proposal.actions.findIndex(action => action.type === actionType);
    
    if (existingActionIndex >= 0) {
      // If it exists, remove it
      const updatedActions = [...proposal.actions];
      updatedActions.splice(existingActionIndex, 1);
      setProposal({ ...proposal, actions: updatedActions });
    } else {
      // If it doesn't exist, add it with default values
      const newAction = {
        type: actionType,
        walletAddress: '',
        tokenAmount: '',
        tokenSymbol: 'SOL'
      };
      setProposal({ ...proposal, actions: [...proposal.actions, newAction] });
    }
  };

  const updateActionField = (actionType, fieldName, value) => {
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

  const getActionDescription = (action) => {
    switch (action.type) {
      case 'authorize':
        return `Authorize wallet ${action.walletAddress} to multisig`;
      case 'remove':
        return `Remove wallet ${action.walletAddress} from multisig`;
      case 'withdraw':
        return `Withdraw ${action.tokenAmount} ${action.tokenSymbol} to ${action.walletAddress}`;
      case 'smartcontract':
        return 'Execute smart contract (disabled)';
      default:
        return 'Unknown action';
    }
  };

  const isActionSelected = (actionType) => {
    return proposal.actions.some(action => action.type === actionType);
  };

  const getActionByType = (actionType) => {
    return proposal.actions.find(action => action.type === actionType);
  };

  const renderProposalForm = () => {
    switch (proposalStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={proposal.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter proposal title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                name="summary"
                value={proposal.summary}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your proposal"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!proposal.title || !proposal.summary}
                className={`px-4 py-2 rounded-md text-white ${!proposal.title || !proposal.summary ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Timing</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="startNow"
                    name="startTime"
                    value="now"
                    checked={proposal.startTime === 'now'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="startNow" className="text-sm">Start immediately</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="startCustom"
                    name="startTime"
                    value="custom"
                    checked={proposal.startTime === 'custom'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="startCustom" className="text-sm">Schedule start time</label>
                </div>
                
                {proposal.startTime === 'custom' && (
                  <div className="flex space-x-2 mt-2">
                    <input
                      type="date"
                      name="customStartDate"
                      value={proposal.customStartDate}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="time"
                      name="customStartTime"
                      value={proposal.customStartTime}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Time</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Days</label>
                  <input
                    type="number"
                    name="expirationDays"
                    value={proposal.expirationDays}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hours</label>
                  <input
                    type="number"
                    name="expirationHours"
                    value={proposal.expirationHours}
                    onChange={handleInputChange}
                    min="0"
                    max="23"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                  <input
                    type="number"
                    name="expirationMinutes"
                    value={proposal.expirationMinutes}
                    onChange={handleInputChange}
                    min="0"
                    max="59"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={proposal.startTime === 'custom' && (!proposal.customStartDate || !proposal.customStartTime)}
                className={`px-4 py-2 rounded-md text-white ${proposal.startTime === 'custom' && (!proposal.customStartDate || !proposal.customStartTime) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Actions (Optional)</h3>
            <p className="text-sm text-gray-500 mb-2">Select one or more actions for this proposal</p>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleAction('authorize')}
                className={`p-3 border rounded-md flex items-center ${isActionSelected('authorize') ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <Wallet size={18} className={`mr-2 ${isActionSelected('authorize') ? 'text-blue-500' : 'text-gray-500'}`} />
                <span>Authorize Wallet</span>
              </button>
              
              <button
                onClick={() => toggleAction('remove')}
                className={`p-3 border rounded-md flex items-center ${isActionSelected('remove') ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <UserMinus size={18} className={`mr-2 ${isActionSelected('remove') ? 'text-blue-500' : 'text-gray-500'}`} />
                <span>Remove Wallet</span>
              </button>
              
              <button
                onClick={() => toggleAction('withdraw')}
                className={`p-3 border rounded-md flex items-center ${isActionSelected('withdraw') ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <ArrowUpRight size={18} className={`mr-2 ${isActionSelected('withdraw') ? 'text-blue-500' : 'text-gray-500'}`} />
                <span>Withdraw Tokens</span>
              </button>
              
              <button
                className="p-3 border border-gray-300 rounded-md flex items-center opacity-50 cursor-not-allowed"
              >
                <div className="mr-2 text-gray-400">⚙️</div>
                <span>Smart Contract (Disabled)</span>
              </button>
            </div>
            
            {proposal.actions.length > 0 && (
              <div className="mt-4 space-y-4">
                <h4 className="text-md font-medium">Configure Actions</h4>
                
                {isActionSelected('authorize') && (
                  <div className="p-4 bg-gray-50 rounded-md border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-blue-600">Authorize Wallet</h5>
                      <button 
                        onClick={() => toggleAction('authorize')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address to Authorize</label>
                      <input
                        type="text"
                        value={getActionByType('authorize')?.walletAddress || ''}
                        onChange={(e) => updateActionField('authorize', 'walletAddress', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter wallet address"
                      />
                    </div>
                  </div>
                )}
                
                {isActionSelected('remove') && (
                  <div className="p-4 bg-gray-50 rounded-md border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-blue-600">Remove Wallet</h5>
                      <button 
                        onClick={() => toggleAction('remove')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address to Remove</label>
                      <input
                        type="text"
                        value={getActionByType('remove')?.walletAddress || ''}
                        onChange={(e) => updateActionField('remove', 'walletAddress', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter wallet address"
                      />
                    </div>
                  </div>
                )}
                
                {isActionSelected('withdraw') && (
                  <div className="p-4 bg-gray-50 rounded-md border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-blue-600">Withdraw Tokens</h5>
                      <button 
                        onClick={() => toggleAction('withdraw')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Wallet Address</label>
                        <input
                          type="text"
                          value={getActionByType('withdraw')?.walletAddress || ''}
                          onChange={(e) => updateActionField('withdraw', 'walletAddress', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter recipient wallet address"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                          <input
                            type="number"
                            value={getActionByType('withdraw')?.tokenAmount || ''}
                            onChange={(e) => updateActionField('withdraw', 'tokenAmount', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter amount"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Token</label>
                          <select
                            value={getActionByType('withdraw')?.tokenSymbol || 'SOL'}
                            onChange={(e) => updateActionField('withdraw', 'tokenSymbol', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="SOL">SOL</option>
                            <option value="USDC">USDC</option>
                            <option value="USDT">USDT</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {proposal.actions.length > 0 ? 'Review' : 'Skip & Review'}
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Review Proposal</h3>
            
            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Title</h4>
                <p className="text-gray-900">{proposal.title}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Summary</h4>
                <p className="text-gray-900">{proposal.summary}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Start Time</h4>
                <p className="text-gray-900">
                  {proposal.startTime === 'now' 
                    ? 'Immediately after creation' 
                    : `${proposal.customStartDate} at ${proposal.customStartTime}`}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Expiration</h4>
                <p className="text-gray-900">{calculateExpirationTime()}</p>
              </div>
              
              {proposal.actions.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Actions</h4>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {proposal.actions.map((action, index) => (
                      <li key={index} className="text-gray-900">{getActionDescription(action)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Governance</h1>
        <button 
          onClick={() => setShowProposalForm(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <Plus size={16} className="mr-2" />
          New Proposal
        </button>
      </div>
      
      {/* Modal for new proposal */}
      {showProposalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Create New Proposal</h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Progress indicator */}
              <div className="flex mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step === proposalStep 
                          ? 'bg-blue-600 text-white' 
                          : step < proposalStep 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div 
                        className={`flex-1 h-1 ${
                          step < proposalStep ? 'bg-blue-600' : 'bg-gray-200'
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
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Active Proposals</h2>
        </div>
        <div className="p-0">
          {[
            { id: 'PROP-1234', title: 'Increase Treasury Allocation for Marketing', status: 'Active', votes: { for: 65, against: 35 } },
            { id: 'PROP-1233', title: 'New Community Guidelines', status: 'Active', votes: { for: 82, against: 18 } },
            { id: 'PROP-1232', title: 'Reduce Quorum Requirements', status: 'Active', votes: { for: 49, against: 51 } },
          ].map((proposal) => (
            <div key={proposal.id} className="border-b p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{proposal.title}</h3>
                  <p className="text-sm text-gray-500">{proposal.id}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {proposal.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${proposal.votes.for}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{proposal.votes.for}% For</span>
                <span>{proposal.votes.against}% Against</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Voting Power Distribution</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-center justify-center">
              <PieChart className="text-gray-300" size={100} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Recent Governance Activity</h2>
          </div>
          <div className="p-0">
            {[
              { event: 'Proposal #1221 accepted', time: '12 hours ago' },
              { event: 'New voting period started', time: '1 day ago' },
              { event: 'Quorum reached on Proposal #1220', time: '2 days ago' },
              { event: 'Proposal #1219 rejected', time: '3 days ago' },
            ].map((activity, index) => (
              <div key={index} className={`p-4 ${index !== 3 ? 'border-b' : ''} hover:bg-gray-50`}>
                <div className="flex justify-between">
                  <span>{activity.event}</span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
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