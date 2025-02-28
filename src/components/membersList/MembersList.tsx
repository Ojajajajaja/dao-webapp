import React from 'react';
import { Member } from '../../types';

interface MembersListProps {
  members: Member[];
  loading?: boolean;
}

export const MembersList: React.FC<MembersListProps> = ({ members, loading = false }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="ml-4 h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-500">No members found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {members.map((member) => (
          <li key={member.address} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {member.address.slice(0, 2)}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {member.address.slice(0, 6)}...{member.address.slice(-4)}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {member.votingPower.toLocaleString()} votes
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};