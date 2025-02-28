import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDao } from '../context/DaoContext';
import { mockProposals } from '../utils/mockData';
import { ProposalList } from '../components/proposalList/ProposalList';
import { Plus, CheckCircle } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

type ProposalStatus = 'all' | 'pending' | 'active' | 'succeeded' | 'executed' | 'defeated';

export const Governance: React.FC = () => {
  const { currentDao } = useDao();
  const { connected, publicKey } = useWallet();
  const [activeFilter, setActiveFilter] = useState<ProposalStatus>('all');

  if (!currentDao) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            No DAO Selected
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Please select a DAO from the explore page to view its governance.
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

  // Filter proposals based on the active filter
  const filteredProposals = mockProposals.filter(proposal => {
    if (activeFilter === 'all') return true;
    return proposal.status === activeFilter;
  });

  // Check if the user has voted on a proposal
  const hasVoted = (proposalId: string): boolean => {
    // In a real implementation, this would check if the user has voted
    // For now, we'll just return true for the first proposal
    return proposalId === 'prop-1' && connected;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:ml-64">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Proposals
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/governance/new-proposal"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            New proposal
          </Link>
        </div>
      </div>

      {!connected && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Connect your Solana wallet to vote on proposals.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveFilter('all')}
              className={`${
                activeFilter === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`${
                activeFilter === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`${
                activeFilter === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('succeeded')}
              className={`${
                activeFilter === 'succeeded'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Succeeded
            </button>
            <button
              onClick={() => setActiveFilter('executed')}
              className={`${
                activeFilter === 'executed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Executed
            </button>
            <button
              onClick={() => setActiveFilter('defeated')}
              className={`${
                activeFilter === 'defeated'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Defeated
            </button>
          </nav>
        </div>

        <div className="p-6">
          {filteredProposals.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No proposals found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new proposal.
              </p>
              <div className="mt-6">
                <Link
                  to="/governance/new-proposal"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 -ml-1 h-4 w-4" />
                  New proposal
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProposals.map((proposal) => (
                <div key={proposal.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          proposal.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                          proposal.status === 'executed' ? 'bg-green-100 text-green-800' :
                          proposal.status === 'defeated' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </span>
                        {hasVoted(proposal.id) && (
                          <span className="inline-flex items-center text-xs text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Voted
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {proposal.status === 'active' ? (
                          <span>
                            {Math.ceil((proposal.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                          </span>
                        ) : (
                          <span>Ended on {proposal.endDate.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{proposal.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{proposal.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Created by {proposal.creator.slice(0, 6)}...{proposal.creator.slice(-4)}</span>
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
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        {proposal.status === 'active' && connected && !hasVoted(proposal.id) && (
                          <>
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                              Vote Yes
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
                              Vote No
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                              Abstain
                            </button>
                          </>
                        )}
                      </div>
                      <Link
                        to={`/proposal/${proposal.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};