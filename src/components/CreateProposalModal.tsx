import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { proposalService } from '../services/ProposalService';

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  daoId?: string;
  podId?: string;
  podName?: string;
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  daoId, 
  podId, 
  podName 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when the modal is opened or closed
  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      resetForm();
    }
  }, [isOpen]);

  // Helper function to reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEndDate('');
    setError(null);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!daoId) {
      setError('No DAO ID provided. Please select a DAO first.');
      return;
    }

    if (!podId) {
      setError('No POD ID provided. Please select a POD first.');
      return;
    }

    if (!title.trim()) {
      setError('Proposal title is required');
      return;
    }

    if (!description.trim()) {
      setError('Proposal description is required');
      return;
    }

    if (!endDate) {
      setError('End date is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create the proposal using the proposal service
      const result = await proposalService.createProposalForPOD(
        daoId,
        podId,
        {
          title: title.trim(),
          description: description.trim(),
          endDate: new Date(endDate)
        }
      );
      
      if (result) {
        console.log('Proposal created successfully:', result);
        resetForm();
        onSuccess();
        onClose();
      } else {
        setError('Failed to create proposal. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error creating proposal:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate minimum date for the end date picker (tomorrow)
  const minDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-menu rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-text">Create a Proposal for {podName}</h2>
          <button 
            onClick={onClose}
            className="text-surface-500 hover:text-text"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
          <div className="overflow-y-auto flex-grow p-4">
            <div className="mb-4">
              <label htmlFor="proposal-title" className="block text-text mb-1">
                Title*
              </label>
              <input
                id="proposal-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 text-text"
                placeholder="Enter proposal title"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="proposal-description" className="block text-text mb-1">
                Description*
              </label>
              <textarea
                id="proposal-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 text-text h-32"
                placeholder="Enter proposal description"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="proposal-end-date" className="block text-text mb-1">
                End Date*
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-surface-500" />
                  </div>
                  <input
                    id="proposal-end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={minDate()}
                    className="w-full bg-surface-200 border border-surface-300 rounded-md p-2 pl-8 text-text"
                    required
                  />
                </div>
              </div>
              <p className="text-surface-500 text-xs mt-1">
                The proposal will start immediately upon creation and end on this date.
              </p>
            </div>

            {error && (
              <div className="bg-red-900 text-error p-2 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-600">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-surface-200 text-text opacity-80 hover:bg-surface-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary text-text rounded-md hover:opacity-90 disabled:opacity-70"
              >
                {loading ? 'Creating...' : 'Create Proposal'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProposalModal; 