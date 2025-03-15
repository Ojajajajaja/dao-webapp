import { Search, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationIcon from './common/NotificationIcon';
import { ui } from '../styles/theme';
import ApiAuthStatus from './common/ApiAuthStatus';
import useApiAndWallet from '../hooks/useApiAndWallet';

interface HeaderProps {
  activeSection: string;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  setActiveSection: (section: string) => void;
  daoId?: string;
}

const Header = ({ 
  activeSection, 
  showNotifications, 
  setShowNotifications,
  setActiveSection
}: HeaderProps) => {
  const navigate = useNavigate();
  const { apiStatus, userDisplayInfo } = useApiAndWallet();
  
  const getSectionDisplayName = () => {
    switch (activeSection) {
      case 'governance':
        return 'Governance';
      case 'pods':
        return 'Pods';
      case 'members':
        return 'Members';
      case 'profile':
        return 'My Profile';
      default:
        return 'Home';
    }
  };

  // Example notifications with proper type
  const mockNotifications = [
    {
      id: '1',
      title: 'Nouvelle proposition',
      message: 'Une nouvelle proposition a été créée dans la DAO',
      timestamp: 'Il y a 5 minutes',
      read: false,
      type: 'vote' as const
    },
    {
      id: '2',
      title: 'Vote terminé',
      message: 'Le vote sur la proposition #123 est terminé',
      timestamp: 'Il y a 1 heure',
      read: true,
      type: 'vote' as const
    },
  ];

  // Handler for navigating to the profile page
  const handleProfileClick = () => {
    console.log('Profile button clicked, navigating to /profile');
    navigate('/profile');
  };

  return (
    <header className={ui.header}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-surface-500 select-none ml-2">DAO</span>
          <span className="mx-2 text-surface-500">/</span>
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
        
        <div className="flex items-center gap-4">
          <NotificationIcon
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notifications={mockNotifications}
          />
          <ApiAuthStatus 
            apiStatus={apiStatus} 
            userDisplayInfo={userDisplayInfo}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;