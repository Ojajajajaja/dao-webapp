import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDao } from '../../context/DaoContext';
import { 
  LayoutDashboard, 
  Vote, 
  Wallet, 
  Users, 
  Settings,
  ChevronRight,
  Layers
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentDao } = useDao();

  // If no DAO is selected or we're on the explore page, don't show the sidebar
  if (!currentDao || location.pathname === '/') {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Governance', href: '/governance', icon: Vote },
    { name: 'Finance', href: '/finance', icon: Wallet },
    { name: 'PODs', href: '/pods', icon: Layers },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 pt-16">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              {currentDao.logo ? (
                <img src={currentDao.logo} alt={currentDao.name} className="h-6 w-6 rounded-full" />
              ) : (
                <span className="text-blue-600 font-bold">{currentDao.name.charAt(0)}</span>
              )}
            </div>
            <h2 className="ml-2 text-lg font-medium text-gray-900">{currentDao.name}</h2>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 flex-shrink-0 h-5 w-5
                      ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                    aria-hidden="true"
                  />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 text-blue-600" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};