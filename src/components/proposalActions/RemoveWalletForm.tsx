import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { ActionFormProps, ProposalAction, RemoveWalletData } from './ActionTypes';
import { mockMembers } from '../../utils/mockData';

export const RemoveWalletForm: React.FC<ActionFormProps> = ({ action, onSave }) => {
  // State for selected wallets (from existing members)
  const [selectedWallets, setSelectedWallets] = useState<string[]>(
    action?.data?.wallets || []
  );
  
  // State for manually entered wallets (for addresses not in the list)
  const [manualWallets, setManualWallets] = useState<string[]>(
    action?.data?.wallets?.length ? [] : ['']
  );

  // Initialize selected wallets from action data if editing
  useEffect(() => {
    if (action?.data?.wallets) {
      const existingAddresses = mockMembers.map(m => m.address);
      const existingSelected = action.data.wallets.filter(w => existingAddresses.includes(w));
      const manuallyEntered = action.data.wallets.filter(w => !existingAddresses.includes(w));
      
      setSelectedWallets(existingSelected);
      setManualWallets(manuallyEntered.length ? manuallyEntered : ['']);
    }
  }, [action]);

  const toggleWalletSelection = (address: string) => {
    if (selectedWallets.includes(address)) {
      setSelectedWallets(selectedWallets.filter(w => w !== address));
    } else {
      setSelectedWallets([...selectedWallets, address]);
    }
  };

  const addManualWallet = () => {
    setManualWallets([...manualWallets, '']);
  };

  const updateManualWallet = (index: number, value: string) => {
    const updatedWallets = [...manualWallets];
    updatedWallets[index] = value;
    setManualWallets(updatedWallets);
  };

  const removeManualWallet = (index: number) => {
    if (manualWallets.length > 1) {
      const updatedWallets = [...manualWallets];
      updatedWallets.splice(index, 1);
      setManualWallets(updatedWallets);
    } else {
      // If it's the last one, just clear it
      setManualWallets(['']);
    }
  };

  const handleSave = () => {
    // Combine selected wallets and non-empty manual wallets
    const filteredManualWallets = manualWallets.filter(wallet => wallet.trim() !== '');
    const allWallets = [...selectedWallets, ...filteredManualWallets];
    
    if (allWallets.length === 0) {
      alert('Please select or add at least one wallet address to remove');
      return;
    }

    const actionData: RemoveWalletData = {
      wallets: allWallets
    };

    const updatedAction: ProposalAction = {
      id: action?.id || Date.now().toString(),
      type: 'removeWallet',
      data: actionData
    };

    onSave(updatedAction);
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Remove Wallets</h3>
      <p className="text-sm text-gray-500 mb-4">
        Remove wallet addresses from participating in DAO governance.
      </p>

      {/* Existing DAO members section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Select from existing members</h4>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {mockMembers.map((member) => (
              <li key={member.address} className="px-4 py-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`member-${member.address}`}
                    checked={selectedWallets.includes(member.address)}
                    onChange={() => toggleWalletSelection(member.address)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`member-${member.address}`} className="ml-3 flex items-center cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">
                        {member.address.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-mono">
                        {formatAddress(member.address)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {member.votingPower.toLocaleString()} votes
                      </p>
                    </div>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Manual wallet entry section */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Or enter wallet addresses manually</h4>
        <div className="space-y-3">
          {manualWallets.map((wallet, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={wallet}
                onChange={(e) => updateManualWallet(index, e.target.value)}
                placeholder="Solana wallet address"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeManualWallet(index)}
                className="text-gray-400 hover:text-gray-500"
                disabled={manualWallets.length === 1 && manualWallets[0] === ''}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={addManualWallet}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add another wallet
          </button>
        </div>
      </div>

      {/* Summary section */}
      {(selectedWallets.length > 0 || manualWallets.some(w => w.trim() !== '')) && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Wallets to remove</h4>
          <ul className="space-y-1">
            {selectedWallets.map((address) => (
              <li key={address} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="font-mono">{formatAddress(address)}</span>
              </li>
            ))}
            {manualWallets.map((address, index) => (
              address.trim() !== '' && (
                <li key={`manual-${index}`} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="font-mono">{formatAddress(address)}</span>
                </li>
              )
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={handleSave}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export const RemoveWalletSummary: React.FC<{ action: ProposalAction }> = ({ action }) => {
  const { wallets } = action.data as RemoveWalletData;
  
  return (
    <div className="text-sm text-gray-600">
      <p>Remove {wallets.length} wallet{wallets.length !== 1 ? 's' : ''}:</p>
      <ul className="mt-1 list-disc list-inside">
        {wallets.map((wallet, index) => (
          <li key={index} className="font-mono">
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </li>
        ))}
      </ul>
    </div>
  );
};