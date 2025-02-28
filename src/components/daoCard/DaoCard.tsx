import React from 'react';
import { Link } from 'react-router-dom';
import { DAO } from '../../types';
import { useDao } from '../../context/DaoContext';
import { ExternalLink } from 'lucide-react';

interface DaoCardProps {
  dao: DAO;
}

export const DaoCard: React.FC<DaoCardProps> = ({ dao }) => {
  const { setCurrentDao } = useDao();

  const handleSelectDao = () => {
    setCurrentDao(dao);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {dao.logo ? (
              <img className="h-12 w-12 rounded-full" src={dao.logo} alt={dao.name} />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">{dao.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{dao.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{dao.description}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Members</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{dao.members}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Proposals</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{dao.proposals}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">Treasury</p>
          <div className="mt-1 space-y-1">
            {dao.treasury.map((asset, index) => (
              <p key={index} className="text-sm text-gray-900">
                {asset.amount.toLocaleString()} {asset.symbol}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <Link
          to="/dashboard"
          onClick={handleSelectDao}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
        >
          View DAO
          <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};