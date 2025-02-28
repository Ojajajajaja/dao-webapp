import React from 'react';
import { Token } from '../../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TreasuryWidgetProps {
  tokens: Token[];
  loading?: boolean;
}

export const TreasuryWidget: React.FC<TreasuryWidgetProps> = ({ tokens, loading = false }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="ml-4">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-500">No tokens found in treasury</p>
      </div>
    );
  }

  const totalValueUSD = tokens.reduce(
    (total, token) => total + (token.balance * (token.price || 0)),
    0
  );

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600 font-medium">Total Value</p>
        <p className="text-2xl font-bold text-gray-900">${totalValueUSD.toLocaleString()}</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {tokens.map((token) => (
          <li key={token.address} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              {token.logoURI ? (
                <img src={token.logoURI} alt={token.symbol} className="h-8 w-8 rounded-full" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{token.symbol.charAt(0)}</span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{token.symbol}</p>
                <p className="text-xs text-gray-500">{token.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {token.balance.toLocaleString()} {token.symbol}
              </p>
              {token.price && (
                <p className="text-xs text-gray-500">
                  ${(token.balance * token.price).toLocaleString()}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <ArrowDownRight className="mr-2 h-4 w-4" />
          Deposit
        </button>
        <button className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Withdraw
        </button>
      </div>
    </div>
  );
};