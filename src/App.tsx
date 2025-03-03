import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import Governance from './components/Governance';
import NotificationsSidebar from './components/NotificationsSidebar';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showNotifications, setShowNotifications] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(null);

  // Handle component transitions with fade effect
  useEffect(() => {
    setFadeIn(false); // Start fade out
    
    const timer = setTimeout(() => {
      // Update the component after fade out
      switch (activeSection) {
        case 'governance':
          setCurrentComponent(<Governance />);
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
          
          {/* Right Notifications Sidebar - always visible now */}
          <NotificationsSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;