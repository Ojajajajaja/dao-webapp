import React from 'react';
import { 
  Home, 
  Building2, 
  Layers, 
  Wallet, 
  Users, 
  Trophy, 
  MessageSquareQuote, 
  FileText
} from 'lucide-react';
import { ui, typography } from '../styles/theme';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    {
      section: 'DAO',
      items: [
        { id: 'dashboard', label: 'Home', icon: <Home size={18} /> },
        { id: 'governance', label: 'Governance', icon: <Building2 size={18} /> },
        { id: 'pods', label: 'Pods', icon: <Layers size={18} /> },
        { id: 'treasury', label: 'Treasury', icon: <Wallet size={18} /> },
        { id: 'members', label: 'Members', icon: <Users size={18} /> }
      ]
    },
    {
      section: 'Proof of Love',
      items: [
        { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> },
        { id: 'questboard', label: 'Questboard', icon: <MessageSquareQuote size={18} /> }
      ]
    },
    {
      section: 'Docs',
      items: [
        { id: 'manifest', label: 'Manifest', icon: <FileText size={18} /> }
      ]
    }
  ];

  return (
    <div className={`w-64 text-text flex flex-col ${ui.sidebar} font-normal`}>
      {/* User info */}
      <div className="p-4">
        <div className="flex items-center">
          <div className="mr-2">
            <svg className="w-6 h-6 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <span className="text-surface-400 text-sm font-normal">USERNAME</span>
        </div>
      </div>
      
      {/* DAO Profile */}
      <div className="p-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary mb-2 overflow-hidden">
          <img src="https://i.imgur.com/PeLdfS1.png" alt="DAO Logo" className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-sm text-surface-400 font-normal">BABYWEN DAO</p>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {navItems.map((section) => (
          <React.Fragment key={section.section}>
            <div className="px-3 py-2 text-xs text-surface-500 font-normal">{section.section}</div>
            <nav>
              {section.items.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center px-5 py-3 my-1 mx-[5%] w-[90%] text-left rounded-[12px] font-normal ${activeSection === item.id ? 'bg-surface-300' : 'hover:bg-surface-200'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-normal">{item.label}</span>
                </button>
              ))}
            </nav>
          </React.Fragment>
        ))}
      </div>
      
      {/* DAO Logo */}
      <div className="p-4">
        <div className="w-32 mx-auto">
          <img 
            src="https://i.imgur.com/OZCrF4z.png" 
            alt="DAO Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;