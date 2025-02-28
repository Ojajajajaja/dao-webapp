import React from 'react';
import { Link } from 'react-router-dom';
import { Proposal } from '../../types';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface ProposalListProps {
  proposals: Proposal[];
  loading?: boolean;
}

export const ProposalList: React.FC<ProposalListProps> = ({ proposals, loading = false }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg mb-4 p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No proposals found</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'executed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'defeated':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'executed':
        return 'Executed';
      case 'defeated':
        return 'Defeated';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Link
          key={proposal.id}
          to={`/proposal/${proposal.id}`}
          className="block bg-white shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{proposal.title}</h3>
              <div className="flex items-center">
                {getStatusIcon(proposal.status)}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  {getStatusText(proposal.status)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{proposal.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  Created by {proposal.creator.slice(0, 4)}...{proposal.creator.slice(-4)}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {proposal.status === 'active' ? (
                  <span>Ends {format(proposal.endDate, 'MMM d, yyyy')}</span>
                ) : (
                  <span>{format(proposal.endDate, 'MMM d, yyyy')}</span>
                )}
              </div>
            </div>
            {proposal.status === 'active' && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (proposal.votes.yes /
                          (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Yes: {proposal.votes.yes.toLocaleString()}</span>
                  <span>No: {proposal.votes.no.toLocaleString()}</span>
                  <span>Abstain: {proposal.votes.abstain.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};