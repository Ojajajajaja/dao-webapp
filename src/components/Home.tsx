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
import { Treasury, Token } from '../core/modules/dao-api';
import { Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartData,
  TooltipItem,
  ChartOptions
} from 'chart.js';
import { useEffectOnce } from '../hooks/useEffectOnce';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the refresh interval in milliseconds (30 minute)
const REFRESH_INTERVAL = 1800000;

const Dashboard = () => {
  const { daoId } = useParams<{ daoId: string }>();
  const [treasury, setTreasury] = useState<Treasury | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      
      // Fetch treasury data
      const treasuryData = await treasuryService.getTreasury(daoId);
      setTreasury(treasuryData);
      
      // Fetch tokens for the pie chart
      const tokensData = await treasuryService.getTokens(daoId);
      setTokens(tokensData);
      
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

  // Function to update token percentages
  const updateTokenPercentages = async () => {
    if (!daoId) return;
    
    try {
      setRefreshing(true);
      
      // Update the token percentages
      await treasuryService.updateDAOTokenPercentages(daoId);
      
      // Refresh the data to show updated percentages
      await fetchTreasuryData(false);
      
      setRefreshing(false);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error updating token percentages:', err);
      setRefreshing(false);
    }
  };

  // Set up initial data load
  useEffectOnce(() => {
    fetchTreasuryData();
    
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

  // Chart options
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
            </>
          )}
        </div>
        
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Active Proposals</h3>
            <Vote className="text-text" size={20} />
          </div>
          <p className="text-2xl font-bold">7</p>
          <p className="text-text text-sm">3 closing soon</p>
        </div>
        
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Member Count</h3>
            <Users className="text-text" size={20} />
          </div>
          <p className="text-2xl font-bold">1,342</p>
          <p className="text-text text-sm">+12 this week</p>
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