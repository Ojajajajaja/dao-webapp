import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Check, Calendar } from 'lucide-react';
import type { User } from '../core/modules/dao-api';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useParams } from 'react-router-dom';
import { daosService } from '../services/DaosService';

interface MemberData {
  id: string | number | undefined;
  name: string;
  username: string;
  wallet: string;
  avatar: string;
  pods: string[];
  discordId: string;
  twitter: string;
  telegram: string;
  lastLogin: string;
  lastInteraction: string;
}

const Members = () => {
  const { daoId } = useParams<{ daoId: string }>();
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [podFilter, setPodFilter] = useState<string[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [daoMembers, setDaoMembers] = useState<MemberData[]>([]);
  
  // Date range filters
  const [activitySince, setActivitySince] = useState<string>('');
  const [activityUntil, setActivityUntil] = useState<string>('');
  const [loginSince, setLoginSince] = useState<string>('');
  const [loginUntil, setLoginUntil] = useState<string>('');
  
  // Fetch DAO members using the DaosService
  useEffectOnce(() => {
    const fetchDaoMembers = async () => {
      try {
        setLoading(true);
        
        // Use the daosService to fetch the DAO by ID
        const daoData = await daosService.getDaoById(daoId || '');
        
        if (daoData && daoData.members) {
          // Transform the basic user data into the format expected by the component
          const membersData = await Promise.all(daoData.members.map(async (member: User) => {
            // You might need to fetch additional user details if needed
            return {
              id: member.userId,
              name: member.username || 'Unknown',
              username: member.username || 'Unknown',
              wallet: member.walletAddress || '0x0000000000000000000000000000000000000000',
              avatar: `https://avatars.dicebear.com/api/identicon/${member.userId}.svg`,
              pods: [], // This would need to be populated from another API call if needed
              discordId: member.discordUsername || '',
              twitter: member.twitterUsername || '',
              telegram: member.telegramUsername || '',
              lastLogin: member.lastLogin || new Date().toISOString(), // Default to current date
              lastInteraction: member.lastInteraction || new Date().toISOString() // Default to current date
            };
          }));
          
          setDaoMembers(membersData);
        } else {
          setDaoMembers([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching DAO members:', err);
        setError('Failed to fetch DAO members. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDaoMembers();
  }, [daoId]);

  // Get unique pod values for filter
  const uniquePods = [...new Set(daoMembers.flatMap(member => member.pods))].sort();

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...daoMembers];
    
    // Apply pod filter
    if (podFilter.length > 0) {
      result = result.filter(member => 
        member.pods.some(pod => podFilter.includes(pod))
      );
    }
    
    // Apply activity date range filters
    if (activitySince || activityUntil) {
      result = result.filter(member => {
        const activityDate = new Date(member.lastInteraction);
        
        if (activitySince && activityUntil) {
          return activityDate >= new Date(activitySince) && activityDate <= new Date(activityUntil);
        } else if (activitySince) {
          return activityDate >= new Date(activitySince);
        } else if (activityUntil) {
          return activityDate <= new Date(activityUntil);
        }
        
        return true;
      });
    }
    
    // Apply login date range filters
    if (loginSince || loginUntil) {
      result = result.filter(member => {
        const loginDate = new Date(member.lastLogin);
        
        if (loginSince && loginUntil) {
          return loginDate >= new Date(loginSince) && loginDate <= new Date(loginUntil);
        } else if (loginSince) {
          return loginDate >= new Date(loginSince);
        } else if (loginUntil) {
          return loginDate <= new Date(loginUntil);
        }
        
        return true;
      });
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'A-Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Recent':
        result.sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime());
        break;
      case 'Oldest':
        result.sort((a, b) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime());
        break;
    }
    
    setFilteredMembers(result);
  }, [daoMembers, sortOrder, podFilter, activitySince, activityUntil, loginSince, loginUntil]);

  // Reset all activity filters
  const resetActivityFilters = () => {
    setActivitySince('');
    setActivityUntil('');
    setLoginSince('');
    setLoginUntil('');
  };

  // Toggle pod in filter
  const togglePodFilter = (pod: string) => {
    setPodFilter(podFilter.includes(pod) 
      ? podFilter.filter(p => p !== pod) 
      : [...podFilter, pod]
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format time ago for display
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Truncate wallet address for display
  const truncateWallet = (wallet: string) => {
    return wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4);
  };

  // Check if any activity filter is active
  const isActivityFilterActive = activitySince || activityUntil || loginSince || loginUntil;

  // Get the most recently joined member
  const lastJoinedMember = daoMembers.length > 0 
    ? [...daoMembers].sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime())[0]
    : null;

  return (
    <div className="p-6">
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-[#3b4da8] rounded-lg p-4 text-white">
              <h3 className="text-sm font-medium mb-2">Total Members</h3>
              <p className="text-3xl font-bold">{daoMembers.length}</p>
            </div>
            
            {lastJoinedMember && (
              <div className="bg-[#3b4da8] rounded-lg p-4 text-white">
                <h3 className="text-sm font-medium mb-2">Last Joined</h3>
                <p className="text-lg">{lastJoinedMember.name}</p>
                <p className="text-sm">{getTimeAgo(lastJoinedMember.lastLogin)}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center space-x-1 ${sortOrder !== 'A-Z' ? 'bg-white text-[#252525]' : 'bg-[#252525] text-white'} px-3 py-2 rounded-md text-sm`}
                  onClick={() => toggleDropdown('sort')}
                >
                  <span>Sort</span>
                  <ChevronDown size={16} />
                </button>
                
                {activeDropdown === 'sort' && (
                  <div className="absolute z-10 mt-1 w-36 bg-[#333333] rounded-md shadow-lg">
                    <ul className="py-1">
                      {['A-Z', 'Z-A', 'Recent', 'Oldest First'].map((option) => (
                        <li 
                          key={option}
                          className={`px-3 py-2 text-sm ${sortOrder === option.replace(' First', '') ? 'bg-white text-[#252525]' : 'text-white hover:bg-[#444444]'} cursor-pointer`}
                          onClick={() => {
                            setSortOrder(option.replace(' First', ''));
                            setActiveDropdown(null);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Pods Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center space-x-1 ${podFilter.length > 0 ? 'bg-white text-[#252525]' : 'bg-[#252525] text-white'} px-3 py-2 rounded-md text-sm`}
                  onClick={() => toggleDropdown('pods')}
                >
                  <span>Pods</span>
                  <ChevronDown size={16} />
                </button>
                
                {activeDropdown === 'pods' && (
                  <div className="absolute z-10 mt-1 w-48 bg-[#333333] rounded-md shadow-lg">
                    <ul className="py-1 max-h-60 overflow-y-auto">
                      {uniquePods.map((pod) => (
                        <li 
                          key={pod}
                          className="px-3 py-2 text-sm text-white hover:bg-[#444444] cursor-pointer flex items-center justify-between"
                          onClick={() => togglePodFilter(pod)}
                        >
                          <span className={podFilter.includes(pod) ? "font-bold" : ""}>
                            {pod}
                          </span>
                          {podFilter.includes(pod) && <Check size={18} strokeWidth={2.5} className="text-white" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Activity Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center space-x-1 ${isActivityFilterActive ? 'bg-white text-[#252525]' : 'bg-[#252525] text-white'} px-3 py-2 rounded-md text-sm`}
                  onClick={() => toggleDropdown('activity')}
                >
                  <span>Activity</span>
                  <ChevronDown size={16} />
                </button>
                
                {activeDropdown === 'activity' && (
                  <div className="absolute z-10 mt-1 w-80 bg-[#333333] rounded-md shadow-lg p-4">
                    <div className="mb-4">
                      <h3 className="text-white text-sm font-medium mb-2 flex items-center">
                        <Calendar size={16} className="mr-2 text-white" />
                        Last Activity
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Since</label>
                          <input 
                            type="date" 
                            className="w-full bg-[#252525] text-white text-sm rounded-md px-3 py-2"
                            value={activitySince}
                            onChange={(e) => setActivitySince(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Until</label>
                          <input 
                            type="date" 
                            className="w-full bg-[#252525] text-white text-sm rounded-md px-3 py-2"
                            value={activityUntil}
                            onChange={(e) => setActivityUntil(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-white text-sm font-medium mb-2 flex items-center">
                        <Calendar size={16} className="mr-2 text-white" />
                        Last Login
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Since</label>
                          <input 
                            type="date" 
                            className="w-full bg-[#252525] text-white text-sm rounded-md px-3 py-2"
                            value={loginSince}
                            onChange={(e) => setLoginSince(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Until</label>
                          <input 
                            type="date" 
                            className="w-full bg-[#252525] text-white text-sm rounded-md px-3 py-2"
                            value={loginUntil}
                            onChange={(e) => setLoginUntil(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        className="text-xs text-gray-400 hover:text-white"
                        onClick={resetActivityFilters}
                      >
                        Reset
                      </button>
                      <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-[#252525] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#333333]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Wallet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pods</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Discord ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Twitter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Telegram</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Interaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333333]">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-[#2A2A2A]">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{member.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="font-mono">{truncateWallet(member.wallet)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{member.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex flex-wrap gap-1">
                            {member.pods.map((pod: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-[#3b4da8] rounded-full text-xs">
                                {pod}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{member.discordId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a href={`https://twitter.com/${member.twitter.replace('@', '')}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-blue-400 hover:text-blue-300 flex items-center">
                            {member.twitter}
                            <ExternalLink size={12} className="ml-1" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{member.telegram}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span title={formatDate(member.lastLogin)}>
                            {getTimeAgo(member.lastLogin)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span title={formatDate(member.lastInteraction)}>
                            {getTimeAgo(member.lastInteraction)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center text-gray-400">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Members;