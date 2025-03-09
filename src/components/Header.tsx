import React from 'react';
import { Search } from 'lucide-react';
import useApiAndWallet from '../hooks/useApiAndWallet';
import ApiAuthStatus from './common/ApiAuthStatus';
import { ui } from '../styles/theme';

interface HeaderProps {
  activeSection: string;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  daoId?: string; // Make daoId optional
}

const Header = ({ activeSection, showNotifications, setShowNotifications }: HeaderProps) => {
  const { apiStatus, userDisplayInfo } = useApiAndWallet();

  const getSectionDisplayName = () => {
    switch (activeSection) {
      case 'governance':
        return 'Governance';
      case 'pods':
        return 'Pods';
      case 'members':
        return 'Members';
      default:
        return 'Home';
    }
  };

  return (
    <header className={ui.header}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-surface-400 select-none">DAO</span>
          <span className="mx-2 text-surface-400">/</span>
          <span className="text-text select-none min-w-[100px]">{getSectionDisplayName()}</span>
        </div>
        
        <div className="flex-1 flex justify-center mx-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-surface-300 rounded-full py-2 pl-10 pr-4 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary text-text"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-surface-500" />
          </div>
        </div>
        
        {/* Only show the wallet and API status indicators */}
        <ApiAuthStatus 
          apiStatus={apiStatus} 
          userDisplayInfo={userDisplayInfo}
        />
      </div>
    </header>
  );
};

export default Header;