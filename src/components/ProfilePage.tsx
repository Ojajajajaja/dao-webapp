import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';
import { useEffectOnce } from '../hooks/useEffectOnce';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  
  // Capture the previous path when component mounts
  useEffectOnce(() => {
    // Check if we have state from navigation
    if (location.state && location.state.from) {
      setPreviousPath(location.state.from);
    } else {
      // Fallback to session storage if available
      const storedPath = sessionStorage.getItem('previousPath');
      if (storedPath) {
        setPreviousPath(storedPath);
      }
    }
    
    // Clear the stored path
    sessionStorage.removeItem('previousPath');
  }, [location]);

  const handleGoBack = () => {
    // Check if we have a stored previous path
    if (previousPath) {
      // Navigate to stored previous path
      navigate(previousPath);
    } else if (location.key !== 'default') {
      // If user navigated normally, go back in history
      navigate(-1);
    } else {
      // Default to dashboard if no context is available
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Simple header */}
        <header className="py-4 mb-6 flex items-center justify-between">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-text hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="ml-2">Back to Dashboard</span>
          </button>
          <h1 className="text-xl font-semibold text-text">Your Profile</h1>
          <div className="w-24"></div> {/* Empty div for balanced layout */}
        </header>
        
        {/* Main content */}
        <main>
          <UserProfile />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage; 