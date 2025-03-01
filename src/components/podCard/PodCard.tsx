import React from 'react';
import { Pod } from '../../types';
import { format } from 'date-fns';
import { 
  Code, 
  Megaphone, 
  Wallet, 
  FileText, 
  Vote, 
  Users, 
  ExternalLink 
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

interface PodCardProps {
  pod: Pod;
  onJoin: (podId: string) => void;
  isMember: boolean;
}

export const PodCard: React.FC<PodCardProps> = ({ pod, onJoin, isMember }) => {
  const { connected } = useWallet();

  const getIcon = () => {
    switch (pod.icon) {
      case 'Code':
        return <Code className="h-5 w-5" />;
      case 'Megaphone':
        return <Megaphone className="h-5 w-5" />;
      case 'Wallet':
        return <Wallet className="h-5 w-5" />;
      case 'FileText':
        return <FileText className="h-5 w-5" />;
      case 'Vote':
        return <Vote className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getColorClass = () => {
    switch (pod.color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${getColorClass()}`}>
            {getIcon()}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{pod.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{pod.description}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Members</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{pod.members}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Created</p>
            <p className="mt-1 text-sm text-gray-900">{format(pod.createdAt, 'MMM d, yyyy')}</p>
          </div>
        </div>
        {pod.budget && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Budget</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {pod.budget.amount.toLocaleString()} {pod.budget.symbol}
            </p>
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-5 py-3">
        {isMember ? (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">You are a member</span>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
            >
              View POD
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        ) : (
          <button
            onClick={() => onJoin(pod.id)}
            disabled={!connected}
            className={`w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
              connected
                ? 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                : 'text-gray-500 bg-gray-200 cursor-not-allowed'
            }`}
          >
            {connected ? 'Join POD' : 'Connect wallet to join'}
          </button>
        )}
      </div>
    </div>
  );
};