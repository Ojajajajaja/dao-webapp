import React from 'react';
import { useDao } from '../context/DaoContext';
import { mockProposals, mockMembers, mockTokens, mockTransfers } from '../utils/mockData';
import { ProposalList } from '../components/proposalList/ProposalList';
import { MembersList } from '../components/membersList/MembersList';
import { TreasuryWidget } from '../components/treasuryWidget/TreasuryWidget';
import { ActivityFeed } from '../components/activityFeed/ActivityFeed';
import { Link } from 'react-router-dom';
import { Plus, Users, Vote, Wallet, Activity } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

export const Dashboard: React.FC = () => {
  const { currentDao } = useDao();
  const { connected } = useWallet();

  if (!currentDao) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            No DAO Selected
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Please select a DAO from the explore page to view its dashboard.
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

  // In a real implementation, these would be fetched based on the currentDao
  const activeProposals = mockProposals.filter(p => p.status === 'active');
  const recentProposals = mockProposals.slice(0, 3);
  const topMembers = mockMembers.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:ml-64">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {currentDao.name} Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">{currentDao.description}</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/governance/new-proposal"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            New Proposal
          </Link>
        </div>
      </div>

      {!connected && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Wallet className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Connect your Solana wallet to interact with this DAO.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Members</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{currentDao.members}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/community"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View all members
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Vote className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Proposals</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{currentDao.proposals}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link
                  to="/governance"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View all proposals
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Active Proposals */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Active Proposals</h3>
              <Link
                to="/governance"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="px-5 py-5 bg-gray-50">
            <ProposalList proposals={activeProposals} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Treasury */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-blue-600" />
                Treasury
              </h3>
              <Link
                to="/finance"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View details
              </Link>
            </div>
          </div>
          <div className="px-5 py-5">
            <TreasuryWidget tokens={mockTokens} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-600" />
                Recent Activity
              </h3>
              <Link
                to="/finance/transfers"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="px-5 py-5">
            <ActivityFeed transfers={mockTransfers} />
          </div>
        </div>

        {/* Top Members */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Top Members
              </h3>
              <Link
                to="/community"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="px-5 py-5">
            <MembersList members={topMembers} />
          </div>
        </div>
      </div>
    </div>
  );
};