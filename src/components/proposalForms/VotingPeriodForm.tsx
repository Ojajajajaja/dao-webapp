import React from 'react';
import { Info } from 'lucide-react';

interface VotingPeriodFormProps {
  startNow: boolean;
  setStartNow: (startNow: boolean) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  durationDays: number;
  setDurationDays: (days: number) => void;
  durationHours: number;
  setDurationHours: (hours: number) => void;
  durationMinutes: number;
  setDurationMinutes: (minutes: number) => void;
}

export const VotingPeriodForm: React.FC<VotingPeriodFormProps> = ({
  startNow,
  setStartNow,
  startDate,
  setStartDate,
  durationDays,
  setDurationDays,
  durationHours,
  setDurationHours,
  durationMinutes,
  setDurationMinutes
}) => {
  // Handle start time option change
  const handleStartTimeChange = (newStartNow: boolean) => {
    setStartNow(newStartNow);
    if (newStartNow) {
      setStartDate(null);
    } else if (!startDate) {
      // Set default start date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setStartDate(tomorrow);
    }
  };

  // Increase/decrease duration
  const adjustDuration = (type: 'days' | 'hours' | 'minutes', increment: boolean) => {
    if (type === 'days') {
      if (increment) {
        setDurationDays(durationDays + 1);
      } else if (durationDays > 0) {
        setDurationDays(durationDays - 1);
      }
    } else if (type === 'hours') {
      if (increment) {
        if (durationHours < 23) {
          setDurationHours(durationHours + 1);
        } else {
          setDurationHours(0);
          setDurationDays(durationDays + 1);
        }
      } else if (durationHours > 0) {
        setDurationHours(durationHours - 1);
      }
    } else if (type === 'minutes') {
      if (increment) {
        if (durationMinutes < 59) {
          setDurationMinutes(durationMinutes + 1);
        } else {
          setDurationMinutes(0);
          if (durationHours < 23) {
            setDurationHours(durationHours + 1);
          } else {
            setDurationHours(0);
            setDurationDays(durationDays + 1);
          }
        }
      } else if (durationMinutes > 0) {
        setDurationMinutes(durationMinutes - 1);
      }
    }
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="space-y-6">
        {/* Start time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start time
          </label>
          <p className="text-sm text-gray-500">
            Define when a proposal should be active to receive approvals. If now is selected, the proposal is immediately active after publishing.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div 
              className={`flex items-center justify-between px-4 py-3 border rounded-md cursor-pointer ${
                startNow ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handleStartTimeChange(true)}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium">Now</span>
              </div>
              <div className={`h-4 w-4 rounded-full border ${
                startNow ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
                {startNow && <div className="h-2 w-2 mx-auto mt-1 rounded-full bg-white"></div>}
              </div>
            </div>
            <div 
              className={`flex items-center justify-between px-4 py-3 border rounded-md cursor-pointer ${
                !startNow ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handleStartTimeChange(false)}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium">Specific date & time</span>
              </div>
              <div className={`h-4 w-4 rounded-full border ${
                !startNow ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
                {!startNow && <div className="h-2 w-2 mx-auto mt-1 rounded-full bg-white"></div>}
              </div>
            </div>
          </div>
          
          {!startNow && (
            <div className="mt-3">
              <input
                type="datetime-local"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={startDate ? startDate.toISOString().slice(0, 16) : ''}
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
          )}
        </div>

        {/* Expiration time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiration time
          </label>
          <p className="text-sm text-gray-500">
            Define when a proposal should expire. After the expiration time, there is no way to approve or execute the proposal.
          </p>
          <div className="mt-3">
            <div 
              className="flex items-center justify-between px-4 py-3 border border-blue-500 bg-blue-50 rounded-md"
            >
              <div className="flex items-center">
                <span className="text-sm font-medium">Duration</span>
              </div>
              <div className="h-4 w-4 rounded-full border border-blue-500 bg-blue-500">
                <div className="h-2 w-2 mx-auto mt-1 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Days
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => adjustDuration('days', false)}
                    disabled={durationDays === 0}
                    className={`p-2 border border-gray-300 rounded-l-md ${
                      durationDays === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={durationDays}
                    onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)}
                    className="p-2 w-full text-center border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => adjustDuration('days', true)}
                    className="p-2 border border-gray-300 rounded-r-md bg-white text-gray-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Hours
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => adjustDuration('hours', false)}
                    disabled={durationHours === 0}
                    className={`p-2 border border-gray-300 rounded-l-md ${
                      durationHours === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={durationHours}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setDurationHours(Math.min(value, 23));
                    }}
                    className="p-2 w-full text-center border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => adjustDuration('hours', true)}
                    className="p-2 border border-gray-300 rounded-r-md bg-white text-gray-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Minutes
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => adjustDuration('minutes', false)}
                    disabled={durationMinutes === 0}
                    className={`p-2 border border-gray-300 rounded-l-md ${
                      durationMinutes === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={durationMinutes}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setDurationMinutes(Math.min(value, 59));
                    }}
                    className="p-2 w-full text-center border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => adjustDuration('minutes', true)}
                    className="p-2 border border-gray-300 rounded-r-md bg-white text-gray-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <Info className="h-5 w-5 mr-2" />
            <p>It's recommended to have an expiration time of five days, so you have a clean proposal list.</p>
          </div>
        </div>
      </div>
    </div>
  );
};