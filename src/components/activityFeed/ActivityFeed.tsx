import React from 'react';
import { Transfer } from '../../types';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ActivityFeedProps {
  transfers: Transfer[];
  loading?: boolean;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ transfers, loading = false }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start space-x-4 py-4 border-b border-gray-200">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (transfers.length === 0) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {transfers.map((transfer, transferIdx) => (
          <li key={transfer.id}>
            <div className="relative pb-8">
              {transferIdx !== transfers.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transfer.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {transfer.type === 'deposit' ? (
                      <ArrowDownRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {transfer.type === 'deposit' ? 'Deposit' : 'Withdrawal'} of{' '}
                        {transfer.amount.toLocaleString()} {transfer.token.symbol}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {format(transfer.date, 'MMM d, yyyy')} at {format(transfer.date, 'h:mm a')}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>
                      {transfer.type === 'deposit' ? 'From: ' : 'To: '}
                      <span className="font-medium">
                        {transfer.type === 'deposit'
                          ? `${transfer.from.slice(0, 6)}...${transfer.from.slice(-4)}`
                          : `${transfer.to.slice(0, 6)}...${transfer.to.slice(-4)}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};