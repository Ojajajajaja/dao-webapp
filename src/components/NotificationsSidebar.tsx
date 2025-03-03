import React from 'react';
import { Layers, Users, Vote, Bell, MessageSquareQuote, Wallet, X } from 'lucide-react';

const NotificationsSidebar = () => {
  const notifications = [
    {
      id: 1,
      title: 'New marketing pod proposal',
      time: 'Just now',
      icon: <Layers size={16} />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      description: 'A new proposal has been submitted to create a marketing pod with a budget of $50,000.'
    },
    {
      id: 2,
      title: 'New member',
      time: '25 minutes ago',
      icon: <Users size={16} />,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      description: 'John Doe has joined the DAO. They have been assigned to the development pod.'
    },
    {
      id: 3,
      title: 'Proposal #1221 accepted',
      time: '12 hours ago',
      icon: <Vote size={16} />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      description: 'The community has accepted proposal #1221 for increasing the treasury allocation for marketing.'
    }
  ];

  return (
    <div className="w-80 bg-[#252525] border-l border-[#555555] overflow-y-auto z-10">
      <div className="p-4 border-b border-[#555555] flex justify-between items-center sticky top-0 bg-[#252525] z-10">
        <div className="flex items-center">
          <Bell size={18} className="text-white mr-2" />
          <h3 className="font-medium text-white">Notifications</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        </div>
      </div>
      
      <div className="divide-y divide-[#333333]">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 hover:bg-[#2A2A2A] transition-colors">
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className={`w-10 h-10 ${notification.iconBg} rounded-full flex items-center justify-center ${notification.iconColor}`}>
                  {notification.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-white">{notification.title}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-300">{notification.description}</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-xs text-blue-400 hover:text-blue-300">View Details</button>
                  <button className="text-xs text-gray-400 hover:text-gray-300">Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSidebar;