import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const Members = () => {
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [podFilter, setPodFilter] = useState('All');
  const [socialFilter, setSocialFilter] = useState('All');
  const [activityFilter, setActivityFilter] = useState('All');

  // Mock member data
  const members = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', pod: 'Design', joinDate: '2023-05-15', lastActive: '2 hours ago', social: 'Twitter' },
    { id: 2, name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', pod: 'Communication', joinDate: '2023-06-22', lastActive: '1 day ago', social: 'Discord' },
    { id: 3, name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', pod: 'Trading', joinDate: '2023-04-10', lastActive: '3 days ago', social: 'Telegram' },
    { id: 4, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', pod: 'Merch', joinDate: '2023-07-05', lastActive: '5 hours ago', social: 'Discord' },
    { id: 5, name: 'David Wilson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', pod: 'Chilling', joinDate: '2023-03-18', lastActive: '1 week ago', social: 'Twitter' },
    { id: 6, name: 'Jessica Taylor', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', pod: 'Design', joinDate: '2023-08-01', lastActive: 'Just now', social: 'Telegram' },
    { id: 7, name: 'Ryan Martinez', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', pod: 'Communication', joinDate: '2023-02-14', lastActive: '3 hours ago', social: 'Discord' },
    { id: 8, name: 'Olivia Anderson', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', pod: 'Trading', joinDate: '2023-09-20', lastActive: '2 days ago', social: 'Twitter' },
    { id: 9, name: 'Daniel Thomas', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', pod: 'Cuddling', joinDate: '2023-01-30', lastActive: '4 days ago', social: 'Telegram' },
    { id: 10, name: 'Sophia Jackson', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', pod: 'Merch', joinDate: '2023-10-12', lastActive: '6 hours ago', social: 'Discord' },
  ];

  // Get the most recently joined member
  const lastJoinedMember = [...members].sort((a, b) => 
    new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
  )[0];

  return (
    <div className="p-6">
      <div className="flex items-center text-sm text-[#555555] mb-4">
        <h1 className="text-2xl font-bold mb-6">Members</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#3b4da8] rounded-lg p-4 text-white">
          <h3 className="text-sm font-medium mb-2">Total Members</h3>
          <p className="text-3xl font-bold">54</p>
        </div>
        
        <div className="bg-[#3b4da8] rounded-lg p-4 text-white">
          <h3 className="text-sm font-medium mb-2">Last Joined</h3>
          <p className="text-lg">{lastJoinedMember.name}</p>
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
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-[#333333]">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pod</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Social</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">{member.pod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(member.joinDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{member.lastActive}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{member.social}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-400 hover:text-blue-300">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;