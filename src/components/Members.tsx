import React, { useState } from 'react';
import { ChevronDown, Filter, ExternalLink } from 'lucide-react';

const Members = () => {
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [podFilter, setPodFilter] = useState('All');
  const [socialFilter, setSocialFilter] = useState('All');
  const [activityFilter, setActivityFilter] = useState('All');

  // Mock member data with expanded attributes
  const members = [
    { 
      id: 1, 
      name: 'Alex Johnson', 
      wallet: '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB', 
      username: 'alexj', 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
      pods: ['Design', 'Marketing'], 
      discordId: 'alexj#1234', 
      twitter: '@alexjohnson', 
      telegram: '@alex_j', 
      lastLogin: '2023-10-15T14:30:00Z', 
      lastInteraction: '2023-10-15T16:45:00Z' 
    },
    { 
      id: 2, 
      name: 'Sarah Williams', 
      wallet: '6Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA', 
      username: 'sarahw', 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
      pods: ['Communication'], 
      discordId: 'sarahw#5678', 
      twitter: '@sarahwilliams', 
      telegram: '@sarah_w', 
      lastLogin: '2023-10-14T09:15:00Z', 
      lastInteraction: '2023-10-14T11:20:00Z' 
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      wallet: '2xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1', 
      username: 'mikeb', 
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg', 
      pods: ['Trading'], 
      discordId: 'mikeb#9012', 
      twitter: '@michaelbrown', 
      telegram: '@mike_b', 
      lastLogin: '2023-10-13T18:45:00Z', 
      lastInteraction: '2023-10-13T20:30:00Z' 
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      wallet: '9xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1', 
      username: 'emilyd', 
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg', 
      pods: ['Merch'], 
      discordId: 'emilyd#3456', 
      twitter: '@emilydavis', 
      telegram: '@emily_d', 
      lastLogin: '2023-10-12T11:30:00Z', 
      lastInteraction: '2023-10-12T14:15:00Z' 
    },
    { 
      id: 5, 
      name: 'David Wilson', 
      wallet: '7Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA', 
      username: 'davidw', 
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg', 
      pods: ['Chilling'], 
      discordId: 'davidw#7890', 
      twitter: '@davidwilson', 
      telegram: '@david_w', 
      lastLogin: '2023-10-11T15:20:00Z', 
      lastInteraction: '2023-10-11T17:45:00Z' 
    },
    { 
      id: 6, 
      name: 'Jessica Taylor', 
      wallet: '5xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB', 
      username: 'jessicat', 
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg', 
      pods: ['Design'], 
      discordId: 'jessicat#2345', 
      twitter: '@jessicataylor', 
      telegram: '@jessica_t', 
      lastLogin: '2023-10-10T08:45:00Z', 
      lastInteraction: '2023-10-10T10:30:00Z' 
    },
    { 
      id: 7, 
      name: 'Ryan Martinez', 
      wallet: '4xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1', 
      username: 'ryanm', 
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg', 
      pods: ['Communication'], 
      discordId: 'ryanm#6789', 
      twitter: '@ryanmartinez', 
      telegram: '@ryan_m', 
      lastLogin: '2023-10-09T13:15:00Z', 
      lastInteraction: '2023-10-09T15:45:00Z' 
    },
    { 
      id: 8, 
      name: 'Olivia Anderson', 
      wallet: '3Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA', 
      username: 'oliviaa', 
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg', 
      pods: ['Trading'], 
      discordId: 'oliviaa#0123', 
      twitter: '@oliviaanderson', 
      telegram: '@olivia_a', 
      lastLogin: '2023-10-08T16:30:00Z', 
      lastInteraction: '2023-10-08T18:15:00Z' 
    },
    { 
      id: 9, 
      name: 'Daniel Thomas', 
      wallet: '1xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB', 
      username: 'danielt', 
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg', 
      pods: ['Cuddling'], 
      discordId: 'danielt#4567', 
      twitter: '@danielthomas', 
      telegram: '@daniel_t', 
      lastLogin: '2023-10-07T10:45:00Z', 
      lastInteraction: '2023-10-07T12:30:00Z' 
    },
    { 
      id: 10, 
      name: 'Sophia Jackson', 
      wallet: '0Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA', 
      username: 'sophiaj', 
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg', 
      pods: ['Merch'], 
      discordId: 'sophiaj#8901', 
      twitter: '@sophiajackson', 
      telegram: '@sophia_j', 
      lastLogin: '2023-10-06T14:15:00Z', 
      lastInteraction: '2023-10-06T16:45:00Z' 
    },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format time ago for display
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
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
  const truncateWallet = (wallet) => {
    return wallet.substring(0, 6) + '...' + wallet.substring(wallet.length - 4);
  };

  // Get the most recently joined member
  const lastJoinedMember = [...members].sort((a, b) => 
    new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
  )[0];

  return (
    <div className="p-6">
      <div className="flex items-center text-sm text-[#555555] mb-4">
        <h1 className="text-2xl font-bold mb-6">Members</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#3b4da8] rounded-lg p-4 text-white">
          <h3 className="text-sm font-medium mb-2">Total Members</h3>
          <p className="text-3xl font-bold">{members.length}</p>
        </div>
        
        <div className="bg-[#3b4da8] rounded-lg p-4 text-white">
          <h3 className="text-sm font-medium mb-2">Last Joined</h3>
          <p className="text-lg">{lastJoinedMember.name}</p>
          <p className="text-sm">{getTimeAgo(lastJoinedMember.lastLogin)}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="relative">
            <button className="flex items-center space-x-1 bg-[#252525] text-white px-3 py-2 rounded-md text-sm">
              <span>Sort: {sortOrder}</span>
              <ChevronDown size={16} />
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center space-x-1 bg-[#252525] text-white px-3 py-2 rounded-md text-sm">
              <span>Pod</span>
              <ChevronDown size={16} />
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center space-x-1 bg-[#252525] text-white px-3 py-2 rounded-md text-sm">
              <span>Socials</span>
              <ChevronDown size={16} />
            </button>
          </div>
          
          <div className="relative">
            <button className="flex items-center space-x-1 bg-[#252525] text-white px-3 py-2 rounded-md text-sm">
              <span>Activity</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
          Apply Filter
        </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {members.map((member) => (
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
                      {member.pods.map((pod, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-400 hover:text-blue-300">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;