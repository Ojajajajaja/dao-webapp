import React, { useState, useEffect } from 'react';
import { daosService } from '../services/DaosService';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/UserService';

interface CreateDaoFormProps {
  onSuccess?: (daoId: string) => void;
  onError?: (error: Error) => void;
}

const CreateDaoForm: React.FC<CreateDaoFormProps> = ({ onSuccess, onError }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  
  const { userInfo } = useAuth();
  
  // Fetch current user ID on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await userService.getMe();
        if (userData && userData.id) {
          setUserId(userData.id);
          console.log('Current user ID:', userData.id);
        } else {
          console.error('Could not get user ID from user data');
        }
      } catch (err) {
        console.error('Error fetching user ID:', err);
      }
    };
    
    fetchCurrentUser();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('DAO name is required');
      return;
    }
    
    if (!userId) {
      setError('User ID could not be determined. Please try again or contact support.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Use the new method that takes a user ID
      const result = await daosService.createDao({
        name,
        description,
        userId,
      });
      
      if (result) {
        setSuccess(`DAO "${name}" created successfully!`);
        setName('');
        setDescription('');
        if (onSuccess) onSuccess(result.daoId?.toString() || '');
      } else {
        throw new Error('Failed to create DAO. Please try again.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) onError(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New DAO</h2>
      
      {success && (
        <div className="bg-green-600 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            DAO Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-md bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a unique name for your DAO"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-md bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the purpose of your DAO"
            rows={4}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-2">
          <p className="text-sm text-gray-400">
            Creating as: <span className="text-white">{userInfo?.username || userInfo?.walletAddress || 'Unknown User'}</span>
            {userId ? <span className="ml-2 text-xs text-gray-500">(ID: {userId})</span> : null}
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !userId}
          className={`w-full py-3 rounded-lg text-white font-medium ${
            isSubmitting || !userId
              ? 'bg-blue-700 cursor-not-allowed opacity-70'
              : 'bg-blue-600 hover:bg-blue-700 transition-colors'
          }`}
        >
          {isSubmitting ? 'Creating...' : !userId ? 'Loading User Info...' : 'Create DAO'}
        </button>
      </form>
    </div>
  );
};

export default CreateDaoForm; 