import React, { useState } from 'react';
import { ActionFormProps, ProposalAction, WithdrawAssetsData } from './ActionTypes';
import { mockTokens } from '../../utils/mockData';

export const WithdrawAssetsForm: React.FC<ActionFormProps> = ({ action, onSave }) => {
  const [token, setToken] = useState<string>(action?.data?.token || '');
  const [amount, setAmount] = useState<string>(action?.data?.amount?.toString() || '');
  const [recipient, setRecipient] = useState<string>(action?.data?.recipient || '');

  const handleSave = () => {
    if (!token) {
      alert('Please select a token');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!recipient) {
      alert('Please enter a recipient address');
      return;
    }

    const actionData: WithdrawAssetsData = {
      token,
      amount: parseFloat(amount),
      recipient
    };

    const updatedAction: ProposalAction = {
      id: action?.id || Date.now().toString(),
      type: 'withdrawAssets',
      data: actionData
    };

    onSave(updatedAction);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Withdraw Assets</h3>
      <p className="text-sm text-gray-500 mb-4">
        Transfer tokens from the DAO treasury to a specified wallet address.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            Token
          </label>
          <select
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Select a token</option>
            {mockTokens.map((t) => (
              <option key={t.address} value={t.address}>
                {t.symbol} - {t.balance.toLocaleString()} available
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              min="0"
              step="0.000001"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
            Recipient Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Solana wallet address"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
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

export const WithdrawAssetsSummary: React.FC<{ action: ProposalAction }> = ({ action }) => {
  const { token, amount, recipient } = action.data as WithdrawAssetsData;
  
  // Find the token details
  const tokenDetails = mockTokens.find(t => t.address === token);
  
  return (
    <div className="text-sm text-gray-600">
      <p>Withdraw {amount.toLocaleString()} {tokenDetails?.symbol || 'tokens'} to:</p>
      <p className="mt-1 font-mono">
        {recipient.slice(0, 6)}...{recipient.slice(-4)}
      </p>
    </div>
  );
};