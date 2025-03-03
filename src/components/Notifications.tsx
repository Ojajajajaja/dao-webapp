import React from 'react';
import { Layers, Users, Vote, Bell, MessageSquareQuote, Wallet } from 'lucide-react';

const Notifications = () => {
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
    },
    {
      id: 4,
      title: 'Treasury update',
      time: '1 day ago',
      icon: <Wallet size={16} />,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
      description: 'The treasury has received a new deposit of 5 ETH from the community fund.'
    },
    {
      id: 5,
      title: 'New quest available',
      time: '2 days ago',
      icon: <MessageSquareQuote size={16} />,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-500',
      description: 'A new community quest "Improve Documentation" is now available with a reward of 500 tokens.'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="text-sm text-blue-500 hover:text-blue-700">Mark all as read</button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent Notifications</h2>
          <div className="flex items-center">
            <Bell size={18} className="text-gray-500 mr-2" />
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className={`w-10 h-10 ${notification.iconBg} rounded-full flex items-center justify-center ${notification.iconColor}`}>
                    {notification.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium">{notification.title}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-xs text-blue-500 hover:text-blue-700">View Details</button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t text-center">
          <button className="text-sm text-blue-500 hover:text-blue-700">View All Notifications</button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Push notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Governance alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Activity Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>This week</span>
              <span className="font-medium">12 notifications</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Previous: 8</span>
              <span>+50% increase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;