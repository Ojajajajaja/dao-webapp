import React from 'react';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const Header = ({ activeSection, showNotifications, setShowNotifications }: HeaderProps) => {
  const getSectionDisplayName = () => {
    switch (activeSection) {
      case 'governance':
        return 'Governance';
      default:
        return 'Home';
    }
  };

  return (
    <header className="shadow-sm z-10 border-b-[1px] border-[#555555]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-[#555555] select-none">DAO</span>
          <span className="mx-2 text-[#555555]">/</span>
          <span className="text-white select-none">{getSectionDisplayName()}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#555555] rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none text-white"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;