import React from 'react';
import { format, addDays, addHours, addMinutes } from 'date-fns';
import { Info, Check, Clock, Calendar, Users, FileText, Link as LinkIcon } from 'lucide-react';
import { ProposalAction } from '../proposalActions/ActionTypes';
import { ActionSummary } from '../proposalActions/ActionSummary';

interface Resource {
  id: string;
  name: string;
  url: string;
}

interface ReviewFormProps {
  title: string;
  summary: string;
  body: string;
  resources: Resource[];
  authorAddress: string;
  startNow: boolean;
  startDate: Date | null;
  durationDays: number;
  durationHours: number;
  durationMinutes: number;
  actions: ProposalAction[];
  confirmValues: boolean;
  setConfirmValues: (confirm: boolean) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  title,
  summary,
  body,
  resources,
  authorAddress,
  startNow,
  startDate,
  durationDays,
  durationHours,
  durationMinutes,
  actions,
  confirmValues,
  setConfirmValues
}) => {
  // Calculate start and end dates
  const now = new Date();
  const actualStartDate = startNow ? now : startDate || now;
  
  const endDate = new Date(actualStartDate);
  endDate.setDate(endDate.getDate() + durationDays);
  endDate.setHours(endDate.getHours() + durationHours);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Review your proposal</h3>
        <p className="mt-1 text-sm text-gray-500">
          Please review all the information below before submitting your proposal.
        </p>
        
        <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2">
                <span className="text-xs font-medium">1</span>
              </span>
              Proposal Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Basic information about your proposal.
            </p>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Author</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                  <div className="bg-blue-100 rounded-full p-1 mr-2">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>{formatAddress(authorAddress)}</span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{title}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Summary</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{summary}</dd>
              </div>
              {body && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Body</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="prose prose-sm max-w-none">
                      {body}
                    </div>
                  </dd>
                </div>
              )}
              {resources.length > 0 && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Resources</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {resources.map((resource) => (
                        <li key={resource.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <LinkIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{resource.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-500">
                              {resource.url}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        
        <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2">
                <span className="text-xs font-medium">2</span>
              </span>
              Voting Period
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              When the proposal will be active and expire.
            </p>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  Start Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {startNow ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Immediately after publishing
                    </span>
                  ) : (
                    format(startDate || now, "MMM d, yyyy 'at' h:mm a")
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Duration
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {durationDays > 0 && `${durationDays} day${durationDays !== 1 ? 's' : ''}`}
                  {durationHours > 0 && `${durationDays > 0 ? ', ' : ''}${durationHours} hour${durationHours !== 1 ? 's' : ''}`}
                  {durationMinutes > 0 && `${durationDays > 0 || durationHours > 0 ? ', ' : ''}${durationMinutes} minute${durationMinutes !== 1 ? 's' : ''}`}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  End Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {format(endDate, "MMM d, yyyy 'at' h:mm a")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {actions.length > 0 && (
          <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2">
                  <span className="text-xs font-medium">3</span>
                </span>
                Actions
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Actions that will execute if the proposal passes.
              </p>
            </div>
            
            <div className="border-t border-gray-200">
              <div className="px-4 py-5">
                {actions.map((action, index) => (
                  <div key={action.id} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                    <h4 className="text-sm font-medium text-gray-900">Action {index + 1}</h4>
                    <div className="mt-2 bg-gray-50 p-3 rounded-md">
                      <ActionSummary action={action} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex items-center">
          <input
            id="confirm-values"
            name="confirm-values"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={confirmValues}
            onChange={(e) => setConfirmValues(e.target.checked)}
          />
          <label htmlFor="confirm-values" className="ml-2 block text-sm text-gray-900">
            I confirm that all the information above is correct
          </label>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Important information</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  After submitting your proposal, it will be published according to the start time you selected.
                  Members of the DAO will be able to vote on it until the expiration time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};