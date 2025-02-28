import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ActionFormProps, ProposalAction, AuthorizeWalletData } from './ActionTypes';

export const AuthorizeWalletForm: React.FC<ActionFormProps> = ({ action, onSave }) => {
  const [wallets, setWallets] = useState<string[]>(
    action?.data?.wallets || ['']
  );

  const addWallet = () => {
    setWallets([...wallets, '']);
  };

  const updateWallet = (index: number, value: string) => {
    const updatedWallets = [...wallets];
    updatedWallets[index] = value;
    setWallets(updatedWallets);
  };

  const removeWallet = (index: number) => {
    if (wallets.length > 1) {
      const updatedWallets = [...wallets];
      updatedWallets.splice(index, 1);
      setWallets(updatedWallets);
    }
  };

  const handleSave = () => {
    // Filter out empty wallet addresses
    const filteredWallets = wallets.filter(wallet => wallet.trim() !== '');
    
    if (filteredWallets.length === 0) {
      alert('Please add at least one wallet address');
      return;
    }

    const actionData: AuthorizeWalletData = {
      wallets: filteredWallets
    };

    const updatedAction: ProposalAction = {
      id: action?.id || Date.now().toString(),
      type: 'authorizeWallet',
      data: actionData
    };

    onSave(updatedAction);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Authorize Wallets</h3>
      <p className="text-sm text-gray-500 mb-4">
        Add new wallet addresses that will be authorized to participate in DAO governance.
      </p>

      <div className="space-y-3">
        {wallets.map((wallet, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={wallet}
              onChange={(e) => updateWallet(index, e.target.value)}
              placeholder="Solana wallet address"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeWallet(index)}
              className="text-gray-400 hover:text-gray-500"
              disabled={wallets.length === 1}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={addWallet}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add another wallet
        </button>
      </div>

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

export const AuthorizeWalletSummary: React.FC<{ action: ProposalAction }> = ({ action }) => {
  const { wallets } = action.data as AuthorizeWalletData;
  
  return (
    <div className="text-sm text-gray-600">
      <p>Authorize {wallets.length} new wallet{wallets.length !== 1 ? 's' : ''}:</p>
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