import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDao } from '../context/DaoContext';
import { mockPods } from '../utils/mockData';
import { PodCard } from '../components/podCard/podCard';
import { CreatePodModal } from '../components/createPodModal/CreatePodModal';
import { Plus, Users, Layers } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Pod } from '../types';

export const Pods: React.FC = () => {
  const { currentDao } = useDao();
  const { connected, publicKey } = useWallet();
  const [pods, setPods] = useState<Pod[]>(mockPods);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentDao) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            No DAO Selected
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Please select a DAO from the explore page to view its PODs.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Explore DAOs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter pods based on search query
  const filteredPods = pods.filter(pod => 
    pod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pod.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if the user is a member of a pod
  const isMemberOfPod = (pod: Pod): boolean => {
    if (!connected || !publicKey) return false;
    return pod.membersList.includes(publicKey.toString());
  };

  // Handle joining a pod
  const handleJoinPod = (podId: string) => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet to join a POD');
      return;
    }

    // In a real implementation, this would call a contract to join the pod
    // For now, we'll just update the local state
    setPods(pods.map(pod => {
      if (pod.id === podId) {
        return {
          ...pod,
          members: pod.members + 1,
          membersList: [...pod.membersList, publicKey.toString()]
        };
      }
      return pod;
    }));
  };

  // Handle creating a new pod
  const handleCreatePod = (podData: {
    name: string;
    description: string;
    icon: string;
    color: string;
  }) => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet to create a POD');
      return;
    }

    // In a real implementation, this would call a contract to create the pod
    // For now, we'll just update the local state
    const newPod: Pod = {
      id: `pod-${Date.now()}`,
      name: podData.name,
      description: podData.description,
      icon: podData.icon,
      color: podData.color,
      members: 1, // Creator is the first member
      membersList: [publicKey.toString()],
      createdAt: new Date()
    };

    setPods([...pods, newPod]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:ml-64">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate flex items-center">
            <Layers className="mr-3 h-8 w-8 text-blue-600" />
            PODs
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Teams within your DAO that focus on specific areas and responsibilities
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            Create POD
          </button>
        </div>
      </div>

      {!connected && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Users className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Connect your Solana wallet to join or create PODs.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="max-w-lg w-full">
          <label htmlFor="search" className="sr-only">
            Search PODs
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search PODs"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredPods.length === 0 ? (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <Layers className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No PODs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new POD for your team.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="mr-2 -ml-1 h-4 w-4" />
              Create POD
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPods.map((pod) => (
            <PodCard 
              key={pod.id} 
              pod={pod} 
              onJoin={handleJoinPod}
              isMember={isMemberOfPod(pod)}
            />
          ))}
        </div>
      )}

      <CreatePodModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePod={handleCreatePod}
      />
    </div>
  );
};