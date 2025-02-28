import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedDaos } from '../hooks/useDaos';
import { DaoCard } from '../components/daoCard/DaoCard';
import { Globe, Plus } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Explore: React.FC = () => {
  const { featuredDaos, loading, error } = useFeaturedDaos();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Governed on Aragon
            </h1>
            <WalletMultiButton className="!bg-white hover:!bg-gray-100 text-blue-600 font-medium py-2 px-4 rounded-md" />
          </div>
          <p className="max-w-2xl text-xl text-blue-100">
            Explore the organizations using our modular governance stack to secure their
            onchain assets, protocols, and communities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured DAOs</h2>
            <Link
              to="/create-dao"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create a DAO
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white shadow rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading DAOs
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDaos.map((dao) => (
                <DaoCard key={dao.id} dao={dao} />
              ))}
            </div>
          )}

          <div className="mt-12">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Globe className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Aragon on Solana
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      This is a Solana-compatible version of the Aragon DAO webapp. Create and manage DAOs on the Solana blockchain with the same powerful features you love from Aragon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};