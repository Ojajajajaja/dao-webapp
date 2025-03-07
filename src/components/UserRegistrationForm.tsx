import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface UserRegistrationFormProps {
  walletAddress: string;
  onSubmit: (userInfo: {
    username: string;
    email: string;
    discordUsername: string;
  }) => void;
  onCancel: () => void;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  walletAddress,
  onSubmit,
  onCancel
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: {
      username?: string;
      email?: string;
    } = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        username,
        email,
        discordUsername
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#252525] rounded-lg shadow-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-white mb-4">Complete Your Profile</h2>
        
        <p className="text-gray-400 mb-4">
          Please provide some information to complete your registration with wallet address:
          <span className="block mt-1 text-sm font-mono bg-[#1a1a1a] p-2 rounded overflow-hidden text-ellipsis">
            {walletAddress}
          </span>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              className={`w-full px-3 py-2 bg-[#333333] border ${errors.username ? 'border-red-500' : 'border-[#444444]'} rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-white`}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 bg-[#333333] border ${errors.email ? 'border-red-500' : 'border-[#444444]'} rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-white`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="discord">
              Discord Username (optional)
            </label>
            <input
              id="discord"
              type="text"
              className="w-full px-3 py-2 bg-[#333333] border border-[#444444] rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              value={discordUsername}
              onChange={e => setDiscordUsername(e.target.value)}
              placeholder="Your Discord username"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-[#333333] text-gray-300 hover:bg-[#444444] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm; 