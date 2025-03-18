import React, { useState, useEffect, useRef } from 'react';
import { 
  CircleDollarSign,
  Vote,
  Users,
  Activity,
  Loader,
  RefreshCw
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { treasuryService } from '../services/TreasuryService';
import { daosService } from '../services/DaosService';
import { userService } from '../services/UserService';
import { Treasury, Token, User } from '../core/modules/dao-api';
import { Pie, Bubble } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartData,
  TooltipItem,
  ChartOptions,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
} from 'chart.js';
import { useEffectOnce } from '../hooks/useEffectOnce';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  PointElement,
  LinearScale,
  CategoryScale,
  Title
);

// Define the refresh interval in milliseconds (30 minute)
const REFRESH_INTERVAL = 1800000;

const Dashboard = () => {
  const { daoId } = useParams<{ daoId: string }>();
  const [treasury, setTreasury] = useState<Treasury | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [memberLocations, setMemberLocations] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [proposalsLoading, setProposalsLoading] = useState<boolean>(true);
  const [membersLoading, setMembersLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch treasury data
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
      
      // Use mock data instead of API calls for now
      setTimeout(() => {
        // Mock treasury data
        const mockTreasury = {
          totalValue: 10500000,
          dailyChange: 250000,
          weeklyChange: 780000,
          monthlyChange: 2100000
        };
        setTreasury(mockTreasury as Treasury);
        
        // Mock tokens data
        const mockTokens = [
          { tokenId: '1', name: 'Solana', symbol: 'SOL', amount: 12500.45, contract: '0x123...' },
          { tokenId: '2', name: 'Ethereum', symbol: 'ETH', amount: 487.32, contract: '0x456...' },
          { tokenId: '3', name: 'USD Coin', symbol: 'USDC', amount: 350000, contract: '0x789...' },
          { tokenId: '4', name: 'Bitcoin', symbol: 'BTC', amount: 10.75, contract: '0xabc...' },
          { tokenId: '5', name: 'Avalanche', symbol: 'AVAX', amount: 2800.12, contract: '0xdef...' },
          { tokenId: '6', name: 'Cardano', symbol: 'ADA', amount: 45000, contract: '0xghi...' },
          { tokenId: '7', name: 'Polkadot', symbol: 'DOT', amount: 8500, contract: '0xjkl...' },
        ];
        
        // Sort by amount and take top 5
        const sortedTokens = [...mockTokens].sort((a, b) => b.amount - a.amount).slice(0, 5);
        setTokens(sortedTokens as Token[]);
        
        setLastUpdated(new Date());
        setRefreshing(false);
        setLoading(false);
        setError(null);
      }, 800); // Simulate network delay

      /* Original API code - commented out for now
      // Fetch treasury data
      const treasuryData = await treasuryService.getTreasury(daoId);
      setTreasury(treasuryData);
      
      // Fetch tokens for the pie chart
      const tokensData = await treasuryService.getTokens(daoId);
      // Sort by amount and take top 5
      const sortedTokens = [...tokensData].sort((a, b) => (b.amount || 0) - (a.amount || 0)).slice(0, 5);
      setTokens(sortedTokens);
      
      setLastUpdated(new Date());
      setRefreshing(false);
      setLoading(false);
      setError(null);
      */
    } catch (err) {
      console.error('Error fetching treasury data:', err);
      setError('Failed to load treasury data. Please try again.');
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Function to fetch proposals data
  const fetchProposalsData = async () => {
    if (!daoId) return;
    
    try {
      setProposalsLoading(true);
      
      // This is a placeholder as we don't have the actual API call in the codebase
      // In a real implementation, you would call the appropriate API
      // Example: const proposalsData = await proposalService.getActiveProposals(daoId);
      
      // For now, using mock data
      const mockProposals = [
        { id: '1', title: 'Increase treasury allocation for development', votesFor: 123, votesAgainst: 45, closingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
        { id: '2', title: 'Add support for new token', votesFor: 87, votesAgainst: 32, closingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
        { id: '3', title: 'Community event planning', votesFor: 145, votesAgainst: 12, closingDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
        { id: '4', title: 'Update governance structure', votesFor: 76, votesAgainst: 54, closingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
        { id: '5', title: 'Partnership with external project', votesFor: 112, votesAgainst: 23, closingDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
      ];
      
      // Sort by closing date (soonest first)
      const sortedProposals = mockProposals.sort((a, b) => a.closingDate.getTime() - b.closingDate.getTime());
      setProposals(sortedProposals);
      setProposalsLoading(false);
    } catch (err) {
      console.error('Error fetching proposals data:', err);
      setProposalsLoading(false);
    }
  };

  // Function to fetch member data
  const fetchMemberData = async () => {
    if (!daoId) return;
    
    try {
      setMembersLoading(true);
      
      // Get members of the DAO
      const membersData = await daosService.getDaoMembers(daoId);
      setMembers(membersData);
      
      // Mock location data (in a real app, you'd get this from user profiles)
      // Count members by country/region
      const locationCounts: {[key: string]: number} = {
        'North America': 450,
        'Europe': 380,
        'Asia': 320,
        'South America': 120,
        'Africa': 52,
        'Oceania': 20
      };
      
      setMemberLocations(locationCounts);
      setMembersLoading(false);
    } catch (err) {
      console.error('Error fetching member data:', err);
      setMembersLoading(false);
    }
  };

  // Function to update token percentages
  const updateTokenPercentages = async () => {
    if (!daoId) return;
    
    try {
      setRefreshing(true);
      
      // Use mock data instead of API call
      setTimeout(() => {
        // Mock tokens data with updated percentages
        const mockTokens = [
          { tokenId: '1', name: 'Solana', symbol: 'SOL', amount: 13200.88, contract: '0x123...' },
          { tokenId: '2', name: 'Ethereum', symbol: 'ETH', amount: 492.15, contract: '0x456...' },
          { tokenId: '3', name: 'USD Coin', symbol: 'USDC', amount: 345000, contract: '0x789...' },
          { tokenId: '4', name: 'Bitcoin', symbol: 'BTC', amount: 11.02, contract: '0xabc...' },
          { tokenId: '5', name: 'Avalanche', symbol: 'AVAX', amount: 2950.75, contract: '0xdef...' },
          { tokenId: '6', name: 'Cardano', symbol: 'ADA', amount: 44500, contract: '0xghi...' },
          { tokenId: '7', name: 'Polkadot', symbol: 'DOT', amount: 8750, contract: '0xjkl...' },
        ];
        
        // Sort by amount and take top 5
        const sortedTokens = [...mockTokens].sort((a, b) => b.amount - a.amount).slice(0, 5);
        setTokens(sortedTokens as Token[]);
        
        // Update treasury total value
        setTreasury(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            totalValue: 10750000,
            dailyChange: 270000
          };
        });
        
        setRefreshing(false);
        setLastUpdated(new Date());
      }, 1000); // Simulate network delay
      
      /* Original API code - commented out for now
      // Update the token percentages
      await treasuryService.updateDAOTokenPercentages(daoId);
      
      // Refresh the data to show updated percentages
      await fetchTreasuryData(false);
      
      setRefreshing(false);
      setLastUpdated(new Date());
      */
    } catch (err) {
      console.error('Error updating token percentages:', err);
      setRefreshing(false);
    }
  };

  // Set up initial data load
  useEffectOnce(() => {
    fetchTreasuryData();
    fetchProposalsData();
    fetchMemberData();
    
    // Set up the automatic refresh timer
    timerRef.current = setInterval(updateTokenPercentages, REFRESH_INTERVAL);
    
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [daoId]);

  // Prepare data for the pie chart
  const tokenChartData: ChartData<'pie'> = {
    labels: tokens.map(token => token.name),
    datasets: [
      {
        data: tokens.map(token => token.amount || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the bubble chart
  const memberBubbleData: ChartData<'bubble'> = {
    datasets: [
      {
        label: 'Member Locations',
        data: Object.entries(memberLocations).map(([region, count], index) => ({
          x: index,
          y: 1,
          r: Math.sqrt(count) * 3, // Scale the radius based on member count
        })),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  // Chart options for pie chart
  const chartOptions: ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'pie'>) {
            const label = context.label || '';
            const value = context.raw as number || 0;
            const total = (context.dataset.data as number[]).reduce((acc, data) => acc + data, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Chart options for bubble chart
  const bubbleChartOptions: ChartOptions<'bubble'> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return Object.keys(memberLocations)[value as number];
          },
          color: '#fff'
        },
        grid: {
          display: false
        }
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bubble'>) {
            const region = Object.keys(memberLocations)[context.dataIndex];
            const count = memberLocations[region];
            return `${region}: ${count} members`;
          }
        }
      }
    }
  };

  // Format currency value
  const formatCurrency = (value: any): string => {
    if (value === null || value === undefined) return '$0';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number(value));
  };

  // Calculate percentage change
  const calculatePercentageChange = (current: any, previous: any): string => {
    if (!current || !previous || previous === 0) return '0%';
    
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
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

  // Format date for proposals
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Treasury Balance</h3>
            <CircleDollarSign className="text-text" size={20} />
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-16">
              <Loader className="animate-spin text-text" size={24} />
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold">{formatCurrency(treasury?.totalValue)}</p>
              <p className="text-text text-sm">
                {calculatePercentageChange(treasury?.totalValue, treasury?.totalValue - treasury?.dailyChange)} from yesterday
              </p>
              {tokens.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Top 5 Tokens:</p>
                  <ul className="text-sm">
                    {tokens.map((token, index) => (
                      <li key={token.tokenId || index} className="flex justify-between mb-1">
                        <span>{token.name}</span>
                        <span>{token.amount?.toFixed(4) || 0} {token.symbol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Active Proposals</h3>
            <Vote className="text-text" size={20} />
          </div>
          {proposalsLoading ? (
            <div className="flex items-center justify-center h-16">
              <Loader className="animate-spin text-text" size={24} />
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold">{proposals.length}</p>
              <p className="text-text text-sm">{proposals.filter(p => p.closingDate.getTime() - Date.now() < 48 * 60 * 60 * 1000).length} closing soon</p>
              {proposals.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Recent Proposals:</p>
                  <ul className="text-sm">
                    {proposals.map((proposal) => (
                      <li key={proposal.id} className="mb-2 pb-2 border-b border-gray-700 last:border-0">
                        <div className="flex justify-between">
                          <span className="font-medium">{proposal.title}</span>
                          <span className="text-xs">Closes in {formatDate(proposal.closingDate)}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-green-400">For: {proposal.votesFor}</span>
                          <span className="text-red-400">Against: {proposal.votesAgainst}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Member Count</h3>
            <Users className="text-text" size={20} />
          </div>
          {membersLoading ? (
            <div className="flex items-center justify-center h-16">
              <Loader className="animate-spin text-text" size={24} />
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold">{members.length || 1342}</p>
              <p className="text-text text-sm">+12 this week</p>
              <div className="h-48 mt-4">
                {Object.keys(memberLocations).length > 0 && (
                  <Bubble 
                    data={memberBubbleData}
                    options={bubbleChartOptions}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-300 text-text rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Activity Overview</h3>
          <div className="h-64 flex items-center justify-center">
            <Activity className="text-text" size={100} />
          </div>
        </div>
        
        <div className="bg-surface-300 text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Token Distribution</h3>
            <div className="flex items-center">
              {refreshing && (
                <RefreshCw className="animate-spin text-text mr-2" size={16} />
              )}
              <button 
                onClick={updateTokenPercentages}
                disabled={refreshing || loading}
                //disabled={true}
                className="bg-primary text-text py-1 px-3 rounded-md text-sm flex items-center hover:bg-opacity-90 disabled:opacity-50"
              >
                <RefreshCw size={14} className="mr-1" />
                Refresh
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader className="animate-spin text-text" size={24} />
            </div>
          ) : tokens.length > 0 ? (
            <>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full h-full max-w-md">
                  <Pie data={tokenChartData} options={chartOptions} />
                </div>
              </div>
              <div className="text-center text-xs text-text-secondary mt-4">
                Last updated: {formatLastUpdated()}
                <span className="text-xs text-text-secondary ml-2">(Updates automatically every 30 minutes)</span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center text-text">
              <p>No tokens found for this DAO</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;