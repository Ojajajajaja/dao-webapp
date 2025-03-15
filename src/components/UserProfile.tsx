import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/UserService';
import { socialConnectionService } from '../services/SocialConnectionService';

const UserProfile: React.FC = () => {
  const { userInfo, refreshUserInfo, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Form state
  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    memberName: '',
    discordUsername: '',
    twitterUsername: '',
    telegramUsername: ''
  });

  // Load user data when component mounts
  useEffect(() => {
    if (userInfo) {
      setFormData({
        userId: userInfo.userId || '',
        username: userInfo.username || '',
        email: userInfo.email || '',
        memberName: userInfo.memberName || '',
        discordUsername: userInfo.discordUsername || '',
        twitterUsername: userInfo.twitterUsername || '',
        telegramUsername: userInfo.telegramUsername || ''
      });
    }
  }, [userInfo]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !userInfo) {
      setMessage({ text: 'You must be logged in to update your profile', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const userId = userInfo.userId;
      if (!userId) {
        throw new Error('User ID not found');
      }

      // Update user profile using the UserService
      const result = await userService.updateUser(userId, {
        username: formData.username,
        email: formData.email,
        memberName: formData.memberName,
        discordUsername: formData.discordUsername,
        twitterUsername: formData.twitterUsername,
        telegramUsername: formData.telegramUsername
      });

      if (result) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        // Refresh user info to get the updated data
        await refreshUserInfo();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: 'Error updating profile. Please try again later.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Connect social accounts using the service
  const connectDiscord = () => {
    try {
      socialConnectionService.connectDiscord();
    } catch (error: any) {
      setMessage({ text: error.message || 'Error connecting Discord', type: 'error' });
    }
  };

  const connectTwitter = () => {
    try {
      socialConnectionService.connectTwitter();
    } catch (error: any) {
      setMessage({ text: error.message || 'Error connecting Twitter', type: 'error' });
    }
  };

  const connectTelegram = () => {
    try {
      socialConnectionService.connectTelegram();
    } catch (error: any) {
      setMessage({ text: error.message || 'Error connecting Telegram', type: 'error' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8 w-full max-w-4xl mx-auto">
        <div className="bg-surface-200 p-6 rounded-lg text-center">
          <p className="text-lg text-text">Please connect your wallet to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-4xl mx-auto">
      <div className="bg-surface-100 p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-text mb-6">Your Profile</h1>
        
        {message.text && (
          <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-surface-300 rounded-md bg-surface-50 text-text"
                placeholder="Username"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-surface-300 rounded-md bg-surface-50 text-text"
                placeholder="Email address"
              />
            </div>

            {/* Member Name */}
            <div>
              <label htmlFor="memberName" className="block text-sm font-medium text-text mb-1">
                Member Name
              </label>
              <input
                type="text"
                id="memberName"
                name="memberName"
                value={formData.memberName}
                onChange={handleInputChange}
                className="w-full p-2 border border-surface-300 rounded-md bg-surface-50 text-text"
                placeholder="Display name"
              />
            </div>

            {/* Wallet Address (readonly) */}
            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-text mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                value={userInfo?.walletAddress || ''}
                readOnly
                className="w-full p-2 border border-surface-300 rounded-md bg-surface-50 text-text opacity-70"
              />
            </div>
          </div>

          {/* Social Connections */}
          <div className="mt-8">
            <h2 className="text-xl font-medium text-text mb-4">Social Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Discord */}
              <div className="p-4 border border-surface-300 rounded-md bg-surface-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Discord</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
                    <path d="M18 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M6.5 19.5h11v-11h-11v11Z"></path>
                    <path d="M8 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M18 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M13 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M13 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M8 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                    <path d="M18 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
                  </svg>
                </div>
                {userInfo?.discordUsername ? (
                  <p className="text-sm text-text">{userInfo.discordUsername}</p>
                ) : (
                  <p className="text-sm text-surface-500 mb-2">Not connected</p>
                )}
                <button
                  type="button"
                  onClick={connectDiscord}
                  className="mt-2 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  {userInfo?.discordUsername ? 'Reconnect' : 'Connect'} Discord
                </button>
              </div>

              {/* Twitter */}
              <div className="p-4 border border-surface-300 rounded-md bg-surface-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M22 4c-1 .5-2.16.75-3.37.9A5.76 5.76 0 0 0 22 1.5a12 12 0 0 1-3.64 1.4A5.6 5.6 0 0 0 14 1a5.6 5.6 0 0 0-5.6 5.6v.4a16 16 0 0 1-10.2-8.2A5.6 5.6 0 0 0 6 9a5.52 5.52 0 0 1-2.56-.7V9a5.6 5.6 0 0 0 4.48 5.52 5.54 5.54 0 0 1-2.48.1 5.6 5.6 0 0 0 5.24 3.88A11.3 11.3 0 0 1 2 21a16 16 0 0 0 19-19c1-.72 2-1.6 2.6-2.63"></path>
                  </svg>
                </div>
                {userInfo?.twitterUsername ? (
                  <p className="text-sm text-text">{userInfo.twitterUsername}</p>
                ) : (
                  <p className="text-sm text-surface-500 mb-2">Not connected</p>
                )}
                <button
                  type="button"
                  onClick={connectTwitter}
                  className="mt-2 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  {userInfo?.twitterUsername ? 'Reconnect' : 'Connect'} Twitter
                </button>
              </div>

              {/* Telegram */}
              <div className="p-4 border border-surface-300 rounded-md bg-surface-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Telegram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="m22 2-7 20-4-9-9-4Z"></path>
                    <path d="M22 2 11 13"></path>
                  </svg>
                </div>
                {userInfo?.telegramUsername ? (
                  <p className="text-sm text-text">{userInfo.telegramUsername}</p>
                ) : (
                  <p className="text-sm text-surface-500 mb-2">Not connected</p>
                )}
                <button
                  type="button"
                  onClick={connectTelegram}
                  className="mt-2 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {userInfo?.telegramUsername ? 'Reconnect' : 'Connect'} Telegram
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto py-2 px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              {isLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 