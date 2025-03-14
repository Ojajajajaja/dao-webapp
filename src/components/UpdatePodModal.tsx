import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { podsService } from '../services/PodsService';
import { POD } from '../core/modules/dao-api/models/POD';

interface UpdatePodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  daoId?: string;
  pod: POD | null;
}

const UpdatePodModal: React.FC<UpdatePodModalProps> = ({ isOpen, onClose, onSuccess, daoId, pod }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discordChannelId, setDiscordChannelId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form fields when pod changes
  useEffect(() => {
    if (pod) {
      setName(pod.name || '');
      setDescription(pod.description || '');
      // Note: We don't have Discord channel ID in the pod object, 
      // this would need to be fetched separately if needed
      setDiscordChannelId('');
    }
  }, [pod]);

  if (!isOpen || !pod) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!daoId) {
      setError('No DAO ID provided. Please select a DAO first.');
      return;
    }

    if (!pod.podId) {
      setError('Invalid POD. Missing POD ID.');
      return;
    }

    if (!name.trim()) {
      setError('Pod name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await podsService.updatePod(daoId, pod.podId, {
        name: name.trim(),
        description: description.trim()
      });

      if (result) {
        // If a new discord channel ID is provided, link it to the POD
        if (discordChannelId.trim()) {
          const linkResult = await podsService.linkDiscordChannelToPOD(
            daoId, 
            pod.podId, 
            discordChannelId.trim()
          );
          
          if (!linkResult) {
            console.warn('Updated POD successfully but failed to link Discord channel.');
          }
        }
        
        onSuccess();
        onClose();
      } else {
        setError('Failed to update POD. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error updating POD:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface-100 rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text">Update POD</h2>
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
              New Discord Channel ID (optional)
            </label>
            <input
              id="discord-channel-id"
              type="text"
              value={discordChannelId}
              onChange={(e) => setDiscordChannelId(e.target.value)}
              className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 text-text"
              placeholder="Enter new Discord channel ID"
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
              {loading ? 'Updating...' : 'Update POD'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePodModal; 