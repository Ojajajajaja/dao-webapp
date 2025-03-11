import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Layers, Users, Vote, MessageSquareQuote, Wallet } from 'lucide-react';

interface NotificationIconProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    type: 'pod' | 'member' | 'vote' | 'treasury' | 'quest';
  }>;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'pod':
      return <Layers size={16} />;
    case 'member':
      return <Users size={16} />;
    case 'vote':
      return <Vote size={16} />;
    case 'treasury':
      return <Wallet size={16} />;
    case 'quest':
      return <MessageSquareQuote size={16} />;
    default:
      return <Bell size={16} />;
  }
};

const NotificationIcon: React.FC<NotificationIconProps> = ({
  showNotifications,
  setShowNotifications,
  notifications = []
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowNotifications]);

  const handleDismiss = (id: string) => {
    // TODO: Implémenter la logique pour marquer comme lu
    console.log('Dismiss notification:', id);
  };

  const handleViewDetails = (id: string) => {
    // TODO: Implémenter la logique pour voir les détails
    console.log('View details for notification:', id);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-full hover:bg-surface-200 transition-colors duration-200"
      >
        <Bell size={20} className="text-text" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-[450px] bg-surface-menu border border-surface-300 rounded-lg shadow-lg z-50">
          <div className="p-5 border-b border-surface-300 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">Notifications</h3>
              <p className="text-sm text-text mt-1">
                {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} notification{unreadCount > 1 ? 's' : ''}
              </p>
            </div>
            <button 
              onClick={() => setShowNotifications(false)}
              className="p-2 hover:bg-surface-200 rounded-full transition-colors duration-200"
            >
              <X size={20} className="text-text" />
            </button>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-surface-300">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-5 hover:bg-surface-200 transition-colors duration-200 ${
                      !notification.read ? 'bg-surface-100' : ''
                    }`}
                  >
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-medium text-primary">{notification.title}</h4>
                          <span className="text-xs text-surface-500 whitespace-nowrap ml-2">
                            {notification.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-text mt-1 mb-3">{notification.message}</p>
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => handleViewDetails(notification.id)}
                            className="text-xs text-primary hover:opacity-80 transition-opacity"
                          >
                            Voir les détails
                          </button>
                          <button 
                            onClick={() => handleDismiss(notification.id)}
                            className="text-xs text-surface-500 hover:text-surface-400 transition-colors"
                          >
                            Ignorer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-surface-500">
                <Bell size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Aucune notification</p>
              </div>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="p-4 border-t border-surface-300">
              <button className="w-full py-3 px-4 bg-surface-200 hover:bg-surface-300 text-primary rounded-lg transition-colors duration-200 text-sm font-medium">
                Marquer tout comme lu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon; 