import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import Governance from './components/Governance';
import Pods from './components/Pods';
import Members from './components/Members';
import ProfilePage from './components/ProfilePage';
import LandingPage from './components/LandingPage';
import { useEffectOnce } from './hooks/useEffectOnce';

// Dashboard component that handles DAO-specific routing
const Dashboard = () => {
  const { daoId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);

  // Handle section changes
  const handleSectionChange = (section: string) => {
    // If navigating to profile, go to standalone profile page
    if (section === 'profile') {
      // Store the current path for context-aware navigation
      const currentPath = window.location.pathname;
      sessionStorage.setItem('previousPath', currentPath);
      
      // Navigate to profile with state containing the source path
      navigate('/profile', { state: { from: currentPath } });
      return;
    }
    
    setActiveSection(section);
  };

  // Effect to initialize the correct component based on the active section
  useEffect(() => {
    setFadeIn(false); // Start fade out
    
    const timer = setTimeout(() => {
      // Update the component after fade out
      switch (activeSection) {
        case 'governance':
          setCurrentComponent(<Governance />);
          break;
        case 'pods':
          setCurrentComponent(<Pods />);
          break;
        case 'members':
          setCurrentComponent(<Members />);
          break;
        case 'home':
          setCurrentComponent(<Home />);
          break;
        default:
          setCurrentComponent(<Home />);
      }
      
      setFadeIn(true); // Start fade in
    }, 300); // Duration of fade out
    
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Log the current DAO ID whenever it changes
  useEffectOnce(() => {
    console.log('Current DAO ID:', daoId);
    // Here you could fetch specific DAO data based on the ID
  }, [daoId]);

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeSection={activeSection} 
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          setActiveSection={handleSectionChange}
          daoId={daoId}
        />
        
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div 
            className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
          >
            {currentComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

// The main App component with routing
function App() {
  const navigate = useNavigate();

  // Function to handle navigation to a specific DAO
  const handleEnterDashboard = (daoId?: string) => {
    if (daoId) {
      navigate(`/daos/${daoId}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onEnterDashboard={handleEnterDashboard} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/daos/:daoId" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Wrapper component for routing
const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;