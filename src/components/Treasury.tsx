import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  BarChart3, 
  Clock, 
  Copy, 
  ExternalLink, 
  RefreshCw,
  ChevronDown,
  Plus,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { format } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Mock data for demonstration
const balanceHistory = [
  { date: '2023-10-01', balance: 1.2 },
  { date: '2023-10-02', balance: 1.5 },
  { date: '2023-10-03', balance: 1.3 },
  { date: '2023-10-04', balance: 1.7 },
  { date: '2023-10-05', balance: 1.9 },
  { date: '2023-10-06', balance: 2.1 },
  { date: '2023-10-07', balance: 2.0 },
  { date: '2023-10-08', balance: 2.3 },
  { date: '2023-10-09', balance: 2.5 },
  { date: '2023-10-10', balance: 2.4 },
  { date: '2023-10-11', balance: 2.6 },
  { date: '2023-10-12', balance: 2.8 },
  { date: '2023-10-13', balance: 3.0 },
  { date: '2023-10-14', balance: 3.2 },
];

const accounts = [
  {
    id: 1,
    name: 'Main Treasury',
    address: 'EWHL97pKCJS4KbQaHTwQZzCJJZJpTVVk2hUxucovb2Bh',
    balance: 2.45,
    tokens: [
      { symbol: 'SOL', amount: 2.45, value: 245.00, icon: '◎' },
      { symbol: 'USDC', amount: 150.00, value: 150.00, icon: '$' },
      { symbol: 'BONK', amount: 1500000, value: 75.00, icon: 'B' }
    ],
    weight: 100
  },
  {
    id: 2,
    name: 'Marketing Fund',
    address: '5xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB',
    balance: 0.75,
    tokens: [
      { symbol: 'SOL', amount: 0.75, value: 75.00, icon: '◎' },
      { symbol: 'USDC', amount: 50.00, value: 50.00, icon: '$' }
    ],
    weight: 30
  },
  {
    id: 3,
    name: 'Development Fund',
    address: '3Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA',
    balance: 1.2,
    tokens: [
      { symbol: 'SOL', amount: 1.2, value: 120.00, icon: '◎' },
      { symbol: 'USDC', amount: 100.00, value: 100.00, icon: '$' }
    ],
    weight: 50
  }
];

const activeTransactions = [
  {
    id: 'tx1',
    title: 'Send 0.5 SOL to Marketing',
    description: 'Transfer funds to marketing wallet for Q2 campaign',
    status: 'pending',
    approvals: 2,
    requiredApprovals: 3,
    created: '2023-10-12T10:30:00Z',
    expires: '2023-10-19T10:30:00Z',
    from: 'Main Treasury',
    to: 'Marketing Fund',
    amount: 0.5,
    token: 'SOL'
  },
  {
    id: 'tx2',
    title: 'Withdraw 100 USDC',
    description: 'Withdraw USDC for exchange listing fee',
    status: 'pending',
    approvals: 1,
    requiredApprovals: 3,
    created: '2023-10-11T14:45:00Z',
    expires: '2023-10-18T14:45:00Z',
    from: 'Main Treasury',
    to: 'External Wallet',
    amount: 100,
    token: 'USDC'
  }
];

const transactionHistory = [
  {
    id: 'hist1',
    title: 'Received 1.5 SOL',
    description: 'Deposit from community fundraising',
    status: 'completed',
    timestamp: '2023-10-10T09:15:00Z',
    type: 'inflow',
    amount: 1.5,
    token: 'SOL'
  },
  {
    id: 'hist2',
    title: 'Sent 0.3 SOL to Development',
    description: 'Monthly allocation for development team',
    status: 'completed',
    timestamp: '2023-10-08T11:30:00Z',
    type: 'outflow',
    amount: 0.3,
    token: 'SOL'
  },
  {
    id: 'hist3',
    title: 'Received 200 USDC',
    description: 'Token sale proceeds',
    status: 'completed',
    timestamp: '2023-10-05T16:45:00Z',
    type: 'inflow',
    amount: 200,
    token: 'USDC'
  },
  {
    id: 'hist4',
    title: 'Sent 50 USDC to Marketing',
    description: 'Social media campaign funding',
    status: 'completed',
    timestamp: '2023-10-03T13:20:00Z',
    type: 'outflow',
    amount: 50,
    token: 'USDC'
  }
];

const Treasury = () => {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState('accounts');
  const [timeRange, setTimeRange] = useState('1M');
  const [isLoading, setIsLoading] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    description: '',
    from: '',
    to: '',
    amount: '',
    token: 'SOL'
  });

  // Calculate total balance from all accounts
  useEffect(() => {
    const total = accounts.reduce((sum, account) => {
      return sum + account.tokens.reduce((tokenSum, token) => tokenSum + token.value, 0);
    }, 0);
    setTotalBalance(total);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    // Could add a toast notification here
  };

  const formatAddress = (address) => {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  const handleNewTransactionSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with Squads SDK to create a new transaction
    console.log('Creating new transaction:', newTransaction);
    setShowNewTransactionModal(false);
    // Reset form
    setNewTransaction({
      title: '',
      description: '',
      from: '',
      to: '',
      amount: '',
      token: 'SOL'
    });
  };

  const renderBalanceChart = () => {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={balanceHistory}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b4da8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b4da8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#888888', fontSize: 10 }}
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
            axisLine={{ stroke: '#333333' }}
            tickLine={{ stroke: '#333333' }}
          />
          <YAxis 
            tick={{ fill: '#888888', fontSize: 10 }}
            axisLine={{ stroke: '#333333' }}
            tickLine={{ stroke: '#333333' }}
            tickFormatter={(value) => `$${value}k`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#252525', borderColor: '#555555', color: 'white' }}
            labelStyle={{ color: 'white' }}
            formatter={(value) => [`$${value}k`, 'Balance']}
            labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#3b4da8" 
            fillOpacity={1} 
            fill="url(#colorBalance)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Treasury</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handleRefresh}
            className="flex items-center bg-[#252525] text-white px-3 py-2 rounded-md text-sm"
          >
            <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={() => setShowNewTransactionModal(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <Plus size={16} className="mr-2" />
            New Transaction
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-[#252525] rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#1C1C1C] rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Total Balance</div>
            <div className="text-3xl font-bold text-white">${totalBalance.toFixed(2)}</div>
            <div className="text-sm text-green-400 mt-1">+2.5% from last month</div>
          </div>
          
          <div className="bg-[#1C1C1C] rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Members</div>
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-gray-400 mt-1">Threshold: 2/3</div>
          </div>
          
          <div className="bg-[#1C1C1C] rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Active Transactions</div>
            <div className="text-3xl font-bold text-white">{activeTransactions.length}</div>
            <div className="text-sm text-yellow-400 mt-1">Pending approvals: 2</div>
          </div>
        </div>
        
        <div className="bg-[#1C1C1C] rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-400">Balance History</div>
            <div className="flex space-x-2">
              {['1W', '1M', '3M', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2 py-1 text-xs rounded-md ${
                    timeRange === range 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#333333] text-gray-300 hover:bg-[#444444]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          {renderBalanceChart()}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-[#333333] flex">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'accounts'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Accounts
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'transactions'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('nfts')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'nfts'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            NFTs
          </button>
        </div>
      </div>

      {/* Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="bg-[#252525] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-[#333333]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-[#2A2A2A]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{account.name}</div>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <span className="font-mono">{formatAddress(account.address)}</span>
                          <button 
                            onClick={() => handleCopyAddress(account.address)}
                            className="ml-2 text-gray-500 hover:text-gray-300"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {account.tokens.map((token, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <span className="w-6 h-6 flex items-center justify-center bg-[#333333] rounded-full mr-2">
                              {token.icon}
                            </span>
                            <span>{token.amount} {token.symbol}</span>
                            <span className="text-gray-400 ml-2">(${token.value.toFixed(2)})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-32 bg-[#333333] rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${account.weight}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm">{account.weight}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-400 hover:text-blue-300">Send</button>
                        <button className="text-sm text-blue-400 hover:text-blue-300">Deposit</button>
                        <button className="text-sm text-blue-400 hover:text-blue-300">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div>
          {/* Active Transactions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Active Transactions</h3>
            <div className="bg-[#252525] rounded-lg overflow-hidden">
              {activeTransactions.length > 0 ? (
                <div className="divide-y divide-[#333333]">
                  {activeTransactions.map((tx) => (
                    <div key={tx.id} className="p-4 hover:bg-[#2A2A2A]">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">{tx.title}</h4>
                          <p className="text-sm text-gray-400">{tx.description}</p>
                        </div>
                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {tx.approvals}/{tx.requiredApprovals} Approvals
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-300 mb-2">
                        <span>{tx.from}</span>
                        <ArrowRight size={14} className="mx-2" />
                        <span>{tx.to}</span>
                        <span className="ml-2 font-medium">{tx.amount} {tx.token}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock size={12} className="mr-1" />
                          <span>Expires {format(new Date(tx.expires), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm flex items-center">
                            <Check size={14} className="mr-1" />
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm flex items-center">
                            <X size={14} className="mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400">
                  No active transactions
                </div>
              )}
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Transaction History</h3>
            <div className="bg-[#252525] rounded-lg overflow-hidden">
              <div className="divide-y divide-[#333333]">
                {transactionHistory.map((tx) => (
                  <div key={tx.id} className="p-4 hover:bg-[#2A2A2A]">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          tx.type === 'inflow' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {tx.type === 'inflow' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{tx.title}</h4>
                          <p className="text-sm text-gray-400">{tx.description}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        tx.type === 'inflow' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'inflow' ? '+' : '-'}{tx.amount} {tx.token}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">
                        {format(new Date(tx.timestamp), 'MMM d, yyyy HH:mm')}
                      </div>
                      <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                        View Transaction
                        <ExternalLink size={12} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NFTs Tab */}
      {activeTab === 'nfts' && (
        <div className="bg-[#252525] rounded-lg p-6 text-center">
          <div className="text-gray-400 mb-4">No NFTs found in treasury</div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
            Add NFT to Treasury
          </button>
        </div>
      )}

      {/* New Transaction Modal */}
      {showNewTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#252525] rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b border-[#333333]">
              <h2 className="text-xl font-semibold text-white">Create New Transaction</h2>
              <button 
                onClick={() => setShowNewTransactionModal(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleNewTransactionSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={newTransaction.title}
                    onChange={(e) => setNewTransaction({...newTransaction, title: e.target.value})}
                    className="w-full p-2 border border-[#333333] rounded-md bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Transaction title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    rows={3}
                    className="w-full p-2 border border-[#333333] rounded-md bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Transaction description"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">From</label>
                  <select
                    value={newTransaction.from}
                    onChange={(e) => setNewTransaction({...newTransaction, from: e.target.value})}
                    className="w-full p-2 border border-[#333333] rounded-md bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.name}>{account.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">To</label>
                  <input
                    type="text"
                    value={newTransaction.to}
                    onChange={(e) => setNewTransaction({...newTransaction, to: e.target.value})}
                    className="w-full p-2 border border-[#333333] rounded-md bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Recipient address or name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
                    <input
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      className="w-full p-2 border border-[#333333] rounded-md bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Token</label>
                    <select
                      value={newTransaction.token}
                      onChange={(e) => setNewTransaction({...newTransaction, token: e.target.value})}
                      className="w-full p-2 border border-[#333333] rounded-md bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="SOL">SOL</option>
                      <option value="USDC">USDC</option>
                      <option value="BONK">BONK</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTransactionModal(false)}
                  className="px-4 py-2 border border-[#333333] text-gray-300 rounded-md hover:bg-[#333333]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treasury;