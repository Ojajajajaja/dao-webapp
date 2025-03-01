import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CreatePodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePod: (podData: {
    name: string;
    description: string;
    icon: string;
    color: string;
  }) => void;
}

export const CreatePodModal: React.FC<CreatePodModalProps> = ({
  isOpen,
  onClose,
  onCreatePod,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Users');
  const [color, setColor] = useState('blue');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a POD name');
      return;
    }
    
    if (!description.trim()) {
      alert('Please enter a POD description');
      return;
    }
    
    onCreatePod({
      name,
      description,
      icon,
      color,
    });
    
    // Reset form
    setName('');
    setDescription('');
    setIcon('Users');
    setColor('blue');
  };

  const iconOptions = [
    { value: 'Code', label: 'Code' },
    { value: 'Megaphone', label: 'Marketing' },
    { value: 'Wallet', label: 'Finance' },
    { value: 'FileText', label: 'Content' },
    { value: 'Vote', label: 'Governance' },
    { value: 'Users', label: 'Community' },
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
  ];

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create a new POD</h3>
              <button
                type="button"
                onClick={onClose}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="pod-name" className="block text-sm font-medium text-gray-700">
                    POD Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="pod-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Development, Marketing, Content"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="pod-description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="pod-description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe the purpose and responsibilities of this POD"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Icon
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-3">
                    {iconOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => setIcon(option.value)}
                        className={`cursor-pointer flex items-center justify-center p-3 border rounded-md ${
                          icon === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span className="text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color
                  </label>
                  <div className="mt-1 flex flex-wrap gap-3">
                    {colorOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => setColor(option.value)}
                        className={`cursor-pointer h-8 w-8 rounded-full ${option.class} ${
                          color === option.value
                            ? 'ring-2 ring-offset-2 ring-blue-500'
                            : ''
                        }`}
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create POD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};