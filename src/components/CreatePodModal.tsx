import React, { useState } from 'react';
import { X } from 'lucide-react';
import { podsService } from '../services/PodsService';

interface CreatePodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  daoId?: string;
}

const CreatePodModal: React.FC<CreatePodModalProps> = ({ isOpen, onClose, onSuccess, daoId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discordChannelId, setDiscordChannelId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!daoId) {
      setError('No DAO ID provided. Please select a DAO first.');
      return;
    }

    if (!name.trim()) {
      setError('Pod name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await podsService.createPod(daoId, {
        name: name.trim(),
        description: description.trim()
      });

      console.log('Created POD:', result);

      if (result) {
        // If discord channel ID is provided, link it to the POD
        if (discordChannelId.trim() && result.podId) {
          console.log('Linking Discord channel to POD:', result.podId, discordChannelId.trim());
          const linkResult = await podsService.linkDiscordChannelToPOD(
            daoId, 
            result.podId, 
            discordChannelId.trim()
          );
          
          if (!linkResult) {
            console.warn('Created POD successfully but failed to link Discord channel.');
          }
        }
        
        onSuccess();
        onClose();
      } else {
        setError('Failed to create POD. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error creating POD:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface-100 rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text">Create a New POD</h2>
          <button 
            onClick={onClose}
            className="text-surface-500 hover:text-text rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pod-name" className="block text-text mb-1">
              POD Name*
            </label>
            <input
              id="pod-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 text-text"
              placeholder="Enter POD name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pod-description" className="block text-text mb-1">
              Description
            </label>
            <textarea
              id="pod-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 text-text h-24"
              placeholder="Enter POD description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="discord-channel-id" className="block text-text mb-1">
              Discord Channel ID (optional)
            </label>
            <input
              id="discord-channel-id"
              type="text"
              value={discordChannelId}
              onChange={(e) => setDiscordChannelId(e.target.value)}
              className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 text-text"
              placeholder="Enter Discord channel ID"
            />
            <p className="text-surface-500 text-xs mt-1">
              If provided, this POD will be linked to the specified Discord channel.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-surface-300 text-text rounded-md hover:bg-surface-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-text rounded-md hover:bg-opacity-90 disabled:opacity-70"
            >
              {loading ? 'Creating...' : 'Create POD'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePodModal; 