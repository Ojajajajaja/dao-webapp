import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import Governance from './components/Governance';
import Pods from './components/Pods';
import Members from './components/Members';
import NotificationsSidebar from './components/NotificationsSidebar';
import LandingPage from './components/LandingPage';

// Dashboard component that handles DAO-specific routing
const Dashboard = () => {
  const { daoId } = useParams();
  const [activeSection, setActiveSection] = useState('home');
  const [showNotifications, setShowNotifications] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);

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
  useEffect(() => {
    console.log('Current DAO ID:', daoId);
    // Here you could fetch specific DAO data based on the ID
  }, [daoId]);

  return (
    <div className="flex h-screen bg-[#1C1C1C]">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeSection={activeSection} 
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          daoId={daoId}
        />
        
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-[#1C1C1C]">
            <div 
              className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            >
              {currentComponent}
            </div>
          </main>
          
          {/* Right Notifications Sidebar */}
          <NotificationsSidebar />
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