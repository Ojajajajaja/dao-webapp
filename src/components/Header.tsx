import React from 'react';
import { Search } from 'lucide-react';
import useApiAndWallet from '../hooks/useApiAndWallet';
import ApiAuthStatus from './common/ApiAuthStatus';

interface HeaderProps {
  activeSection: string;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  daoId?: string; // Make daoId optional
}

const Header = ({ activeSection, showNotifications, setShowNotifications, daoId }: HeaderProps) => {
  const { apiStatus, userDisplayInfo } = useApiAndWallet();

  // Log the current DAO ID whenever it changes
  React.useEffect(() => {
    if (daoId) {
      console.log(`Current DAO ID in header: ${daoId}`);
    }
  }, [daoId]);

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
    <header className="shadow-sm z-20 border-b-[1px] border-[#555555]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-[#555555] select-none">DAO</span>
          <span className="mx-2 text-[#555555]">/</span>
          <span className="text-white select-none min-w-[100px]">{getSectionDisplayName()}</span>
        </div>
        
        <div className="flex-1 flex justify-center mx-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#555555] rounded-full py-2 pl-10 pr-4 text-sm w-full focus:outline-none text-white"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        {/* Only show the wallet and API status indicators */}
        <ApiAuthStatus 
          apiStatus={apiStatus} 
          userDisplayInfo={userDisplayInfo}
          showTitle={false}
        />
      </div>
    </header>
  );
};

export default Header;