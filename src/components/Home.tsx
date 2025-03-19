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
import { Pie } from 'react-chartjs-2';
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

// Network Node Types
const NODE_TYPES = {
  REGION: 'region',
  MEMBER: 'member'
};

// Define regions with colors matching the image
const REGION_COLORS = {
  'North America': 'rgba(54, 162, 235, 0.7)',
  'Europe': 'rgba(255, 99, 132, 0.7)',
  'Asia': 'rgba(255, 206, 86, 0.7)',
  'South America': 'rgba(75, 192, 192, 0.7)',
  'Africa': 'rgba(153, 102, 255, 0.7)',
  'Oceania': 'rgba(255, 159, 64, 0.7)'
};

// Network visualization component
const NetworkVisualization = ({ memberLocations }: { memberLocations: {[key: string]: number} }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const dotsRef = useRef<{[region: string]: {x: number, y: number, size: number}[]}>({});
  const renderRef = useRef<() => void>(() => {});
  
  // Generate static dot positions on mount only
  useEffect(() => {
    if (!Object.keys(memberLocations).length) return;
    
    // Only generate dots if we haven't generated them yet
    if (Object.keys(dotsRef.current).length === 0) {
      const dotPositions: {[region: string]: {x: number, y: number, size: number}[]} = {};
      
      Object.keys(memberLocations).forEach(region => {
        const dotCount = Math.min(Math.floor(memberLocations[region] / 30), 12);
        const dots: {x: number, y: number, size: number}[] = [];
        
        // Generate fixed positions for dots (using deterministic approach for consistency)
        for (let i = 0; i < dotCount; i++) {
          // Use a deterministic approach for positioning
          const angle = (2 * Math.PI * i) / dotCount;
          // Distance varies but is deterministic
          const distance = 0.6 * (0.7 + 0.3 * ((i * 7919) % 3)); // Using prime number 7919 for good distribution
          const dotSize = 1.5 + ((i * 104729) % 10) / 10; // Another prime number for variety
          
          dots.push({ 
            x: Math.cos(angle) * distance, 
            y: Math.sin(angle) * distance, 
            size: dotSize 
          });
        }
        
        dotPositions[region] = dots;
      });
      
      dotsRef.current = dotPositions;
    }
  }, [memberLocations]);
  
  // Setup and render visualization
  useEffect(() => {
    if (!canvasRef.current || !Object.keys(memberLocations).length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Calculate total members for sizing
    const totalMembers = Object.values(memberLocations).reduce((sum, count) => sum + count, 0);
    
    // Main DAO bubble parameters
    const daoCenter = { x: width / 2, y: height / 2 };
    const daoRadius = Math.min(width, height) * 0.4; // Main bubble takes 80% of the smaller dimension
    
    // Calculate positions for region bubbles inside the main bubble
    // Using a stable layout pattern
    const regionPositions: {[key: string]: {x: number, y: number, radius: number}} = {};
    const regions = Object.keys(memberLocations);
    
    // Place regions using a fixed angle arrangement
    regions.forEach((region, i) => {
      const count = memberLocations[region];
      const percentage = count / totalMembers;
      
      // Scale radius based on member count with a minimum size
      const radius = Math.max(daoRadius * Math.sqrt(percentage) * 0.5, daoRadius * 0.15);
      
      // Position nodes at equal angles in a circle
      const angle = (2 * Math.PI * i) / regions.length;
      const distance = daoRadius * 0.5; // Fixed distance from center
      
      const x = daoCenter.x + Math.cos(angle) * distance;
      const y = daoCenter.y + Math.sin(angle) * distance;
      
      regionPositions[region] = { x, y, radius };
    });
    
    // Render once (no animation loop to avoid flashing)
    const render = () => {
      // Apply zoom and pan transformations
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      
      // Set dark blue background
      ctx.fillStyle = 'rgb(13, 15, 30)';
      ctx.fillRect(0, 0, width, height);
      
      // Apply zoom and offset
      ctx.translate(offset.x, offset.y);
      ctx.scale(zoom, zoom);
      ctx.translate(width / 2, height / 2);
      ctx.translate(-width / 2, -height / 2);
      
      // Draw main DAO bubble with glow
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        daoCenter.x, daoCenter.y, 0,
        daoCenter.x, daoCenter.y, daoRadius
      );
      gradient.addColorStop(0, 'rgba(66, 95, 235, 0)');
      gradient.addColorStop(0.8, 'rgba(66, 95, 235, 0.2)');
      gradient.addColorStop(1, 'rgba(66, 95, 235, 0.4)');
      
      ctx.fillStyle = gradient;
      ctx.arc(daoCenter.x, daoCenter.y, daoRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw subtle outline for main bubble
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw region bubbles
      regions.forEach(region => {
        const { x, y, radius } = regionPositions[region];
        const color = REGION_COLORS[region as keyof typeof REGION_COLORS];
        
        // Draw bubble with glow
        const regionGradient = ctx.createRadialGradient(
          x, y, radius * 0.2,
          x, y, radius
        );
        
        // Extract base color and create glow
        const baseColor = color.replace('0.7', '0.8');
        const edgeColor = color.replace('0.7', '0.1');
        
        regionGradient.addColorStop(0, baseColor);
        regionGradient.addColorStop(0.7, color);
        regionGradient.addColorStop(1, edgeColor);
        
        ctx.fillStyle = regionGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle stroke to define bubble edges
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        // Draw region label
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(region, x, y);
        
        // Draw static dots (no animation/flashing) using pre-calculated positions
        if (dotsRef.current[region]) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          dotsRef.current[region].forEach(dot => {
            ctx.beginPath();
            ctx.arc(
              x + dot.x * radius, 
              y + dot.y * radius, 
              dot.size, 
              0, 
              Math.PI * 2
            );
            ctx.fill();
          });
        }
      });
      
      // Restore the canvas context
      ctx.restore();
      
      // Draw zoom controls
      drawZoomControls(ctx, width, height);
    };
    
    // Store render function in ref for access from other hooks
    renderRef.current = render;
    
    // Draw zoom controls - clearly visible and labeled
    const drawZoomControls = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const buttonSize = 30;
      const margin = 20;
      const buttonY = height - margin - buttonSize;
      
      // Zoom in button
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(width - margin - buttonSize/2, buttonY, buttonSize/2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', width - margin - buttonSize/2, buttonY);
      
      // Zoom out button
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(width - margin - buttonSize/2 - buttonSize - 10, buttonY, buttonSize/2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.fillText('-', width - margin - buttonSize/2 - buttonSize - 10, buttonY);
      
      // Reset button
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(width - margin - buttonSize/2 - 2*buttonSize - 20, buttonY, buttonSize/2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.fillText('R', width - margin - buttonSize/2 - 2*buttonSize - 20, buttonY);
      
      // Add small text label about zooming
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText('Zoom & Pan Available', width - margin, buttonY - buttonSize - 5);
    };
    
    // Initial render
    render();
    
    // Add event listeners for mouse wheel to handle zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.max(0.5, Math.min(3, zoom + delta));
      setZoom(newZoom);
      
      // Re-render with new zoom
      requestAnimationFrame(render);
    };
    
    // Add event listeners for mouse down to handle panning
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };
    
    // Add event listeners for mouse move to handle panning
    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;
        
        setOffset({
          x: offset.x + dx,
          y: offset.y + dy
        });
        
        setPanStart({ x: e.clientX, y: e.clientY });
        
        // Re-render with new offset
        requestAnimationFrame(render);
      }
    };
    
    // Add event listeners for mouse up to handle panning
    const handleMouseUp = () => {
      setIsPanning(false);
    };
    
    // Add event listener for mouse click to handle zoom buttons
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const buttonSize = 30;
      const margin = 20;
      const buttonY = height - margin - buttonSize;
      
      // Check if zoom in button was clicked
      const distZoomIn = Math.sqrt(
        Math.pow(x - (width - margin - buttonSize/2), 2) + 
        Math.pow(y - buttonY, 2)
      );
      
      if (distZoomIn < buttonSize/2) {
        const newZoom = Math.min(3, zoom + 0.2);
        setZoom(newZoom);
        requestAnimationFrame(render);
        return;
      }
      
      // Check if zoom out button was clicked
      const distZoomOut = Math.sqrt(
        Math.pow(x - (width - margin - buttonSize/2 - buttonSize - 10), 2) + 
        Math.pow(y - buttonY, 2)
      );
      
      if (distZoomOut < buttonSize/2) {
        const newZoom = Math.max(0.5, zoom - 0.2);
        setZoom(newZoom);
        requestAnimationFrame(render);
        return;
      }
      
      // Check if reset button was clicked
      const distReset = Math.sqrt(
        Math.pow(x - (width - margin - buttonSize/2 - 2*buttonSize - 20), 2) + 
        Math.pow(y - buttonY, 2)
      );
      
      if (distReset < buttonSize/2) {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
        requestAnimationFrame(render);
        return;
      }
    };
    
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
    };
  }, [memberLocations, zoom, offset, isPanning, panStart]);
  
  // Resize canvas on mount
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const resize = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        
        // Re-render after resize
        const ctx = canvas.getContext('2d');
        if (ctx && Object.keys(memberLocations).length > 0) {
          // Force a re-render by triggering the effect
          setZoom(zoom => zoom);
        }
      }
    };
    
    // Initial resize
    resize();
    
    // Resize on window resize
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [memberLocations]);
  
  // Force initial render
  useEffect(() => {
    // Use setTimeout to ensure the canvas has fully mounted and sized properly
    const timer = setTimeout(() => {
      if (canvasRef.current && renderRef.current && Object.keys(memberLocations).length > 0) {
        // Call the current render function
        renderRef.current();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [memberLocations]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-move"
      title="DAO Member Distribution (Scroll to zoom, drag to pan)"
    />
  );
};

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
        
        <div className="bg-primary text-text rounded-lg shadow p-4 relative overflow-hidden border border-indigo-500/30">
          {/* Add decorative background effects */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg flex items-center bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
                <Users className="text-indigo-400 mr-2" size={20} />
                Member Distribution
              </h3>
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 rounded-full bg-indigo-500/20 text-xs">
                  {members.length || 1342} Members
                </div>
                <div className="px-2 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                  +12 this week
                </div>
              </div>
            </div>
          </div>
          
          {membersLoading ? (
            <div className="flex items-center justify-center h-16">
              <Loader className="animate-spin text-text" size={24} />
            </div>
          ) : (
            <>
              <div className="h-[400px] relative rounded-lg overflow-hidden border border-indigo-500/20 bg-[#0d0f1e]">
                {Object.keys(memberLocations).length > 0 && (
                  <NetworkVisualization memberLocations={memberLocations} />
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