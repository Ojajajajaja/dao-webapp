import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CircleDollarSign, 
  ArrowDownUp, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Loader 
} from 'lucide-react';
import { treasuryService } from '../services/TreasuryService';
import { Treasury as TreasuryType, Token, Transfer } from '../core/modules/dao-api';
import { useEffectOnce } from '../hooks/useEffectOnce';

// Define refresh interval (5 minutes)
const REFRESH_INTERVAL = 300000;

const Treasury = () => {
  const { daoId } = useParams<{ daoId: string }>();
  const [treasury, setTreasury] = useState<TreasuryType | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to fetch all treasury data
  const fetchTreasuryData = async (showRefreshIndicator = true) => {
    if (!daoId) {
      setError('No DAO ID provided');
      setLoading(false);
      return;
    }

    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Fetch treasury data
      const treasuryData = await treasuryService.getTreasury(daoId);
      setTreasury(treasuryData);
      
      // Fetch tokens
      const tokensData = await treasuryService.getTokens(daoId);
      setTokens(tokensData);
      
      // Fetch transfers
      const transfersData = await treasuryService.getTransfers(daoId);
      setTransfers(transfersData);
      
      setLastUpdated(new Date());
      setRefreshing(false);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching treasury data:', err);
      setError('Failed to load treasury data. Please try again.');
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Function to refresh data manually
  const handleRefresh = () => {
    fetchTreasuryData(true);
  };

  // Set up initial data load and refresh interval
  useEffectOnce(() => {
    fetchTreasuryData();
    
    // Set up automatic refresh
    const refreshInterval = setInterval(() => {
      fetchTreasuryData(false);
    }, REFRESH_INTERVAL);
    
    // Cleanup on unmount
    return () => clearInterval(refreshInterval);
  }, [daoId]);

  // Format currency value with appropriate symbols and decimals
  const formatCurrency = (value: any): string => {
    if (value === null || value === undefined) return '$0';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(Number(value));
  };

  // Format the last updated time
  const formatLastUpdated = (): string => {
    if (!lastUpdated) return 'Never';
    
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(lastUpdated);
  };

  // Format token amounts with appropriate precision
  const formatTokenAmount = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) return '0';
    
    if (amount < 0.01) {
      return amount.toFixed(6);
    } else if (amount < 1) {
      return amount.toFixed(4);
    } else if (amount < 1000) {
      return amount.toFixed(2);
    } else {
      return new Intl.NumberFormat('en-US').format(Number(amount.toFixed(2)));
    }
  };

  // Format percentage values
  const formatPercentage = (percent: number | undefined): string => {
    if (percent === undefined || percent === null) return '0%';
    return `${percent.toFixed(2)}%`;
  };

  // Format date for transactions
  const formatDate = (date: Date | undefined): string => {
    if (!date) return 'Unknown';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(date));
  };

  // Shorten wallet addresses for display
  const shortenAddress = (address: string): string => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="p-6">
      {/* Error message display */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {/* Treasury overview header with refresh button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-text">Treasury</h1>
        <div className="flex items-center text-sm text-surface-500">
          <span className="mr-2">Last updated: {formatLastUpdated()}</span>
          <button 
            onClick={handleRefresh} 
            className="flex items-center text-primary hover:text-primary-dark transition-colors ml-4"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader className="animate-spin h-5 w-5 mr-1" />
            ) : (
              <RefreshCw className="h-5 w-5 mr-1" />
            )}
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
      
      {/* Treasury total value card */}
      <div className="bg-surface-300 rounded-xl p-6 shadow-md mb-8">
        <div className="flex items-center mb-4">
          <CircleDollarSign className="text-primary mr-2" size={24} />
          <h2 className="text-xl font-semibold text-text">Total Balance</h2>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <Loader className="animate-spin text-primary" size={24} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="text-4xl font-bold text-text mb-2 md:mb-0">
              {formatCurrency(treasury?.totalValue)}
            </div>
            {treasury?.dailyChange !== undefined && treasury?.dailyChange !== null && (
              <div className={`flex items-center md:ml-4 ${treasury.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {treasury.dailyChange >= 0 ? (
                  <ArrowUp className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDown className="h-5 w-5 mr-1" />
                )}
                <span>{formatCurrency(Math.abs(treasury.dailyChange))}</span>
                <span className="ml-1">
                  ({treasury.dailyChangePercentage !== undefined && treasury.dailyChangePercentage !== null 
                    ? `${treasury.dailyChangePercentage >= 0 ? '+' : ''}${treasury.dailyChangePercentage.toFixed(2)}%` 
                    : '0%'})
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Tokens section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text mb-4">Assets</h2>
        
        {loading ? (
          <div className="flex items-center justify-center h-40 bg-surface-300 rounded-xl">
            <Loader className="animate-spin text-primary" size={24} />
          </div>
        ) : tokens.length === 0 ? (
          <div className="bg-surface-300 rounded-xl p-6 text-center text-surface-500">
            No tokens found in this treasury.
          </div>
        ) : (
          <div className="bg-surface-300 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead className="bg-surface-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                      Token
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text uppercase tracking-wider">
                      Balance
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text uppercase tracking-wider">
                      % of Treasury
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {tokens.map((token) => (
                    <tr key={token.tokenId} className="hover:bg-surface-200 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-text text-xs mr-3">
                            {token.symbol?.substring(0, 2)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-text">{token.name}</div>
                            <div className="text-xs text-surface-500">{token.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text">
                        {formatTokenAmount(token.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text">
                        {token.price !== undefined ? formatCurrency(token.price) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text">
                        {formatCurrency(token.value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text">
                        {formatPercentage(token.percentage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Transactions section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text mb-4">Recent Transactions</h2>
        
        {loading ? (
          <div className="flex items-center justify-center h-40 bg-surface-300 rounded-xl">
            <Loader className="animate-spin text-primary" size={24} />
          </div>
        ) : transfers.length === 0 ? (
          <div className="bg-surface-300 rounded-xl p-6 text-center text-surface-500">
            No transactions found for this treasury.
          </div>
        ) : (
          <div className="bg-surface-300 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200">
                <thead className="bg-surface-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                      Token
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                      From
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                      To
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200">
                  {transfers.map((transfer) => (
                    <tr key={transfer.transferId} className="hover:bg-surface-200 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                        {formatDate(transfer.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-text text-xs mr-2">
                            {transfer.token?.symbol?.substring(0, 2) || 'UN'}
                          </div>
                          <span className="text-sm text-text">{transfer.token?.symbol || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                        {shortenAddress(transfer.fromAddress)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text">
                        {shortenAddress(transfer.toAddress)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text">
                        {formatTokenAmount(transfer.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Treasury; 