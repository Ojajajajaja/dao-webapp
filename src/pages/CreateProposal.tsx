import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowLeft, ArrowRight, Wallet, Check } from 'lucide-react';
import { useDao } from '../context/DaoContext';
import { ProposalAction } from '../components/proposalActions/ActionTypes';
import { 
  ProposalDetailsForm, 
  VotingPeriodForm, 
  ActionsForm,
  ReviewForm
} from '../components/proposalForms';

interface Resource {
  id: string;
  name: string;
  url: string;
}

export const CreateProposal: React.FC = () => {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const { currentDao } = useDao();
  
  // Form state
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [startNow, setStartNow] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [durationDays, setDurationDays] = useState(5);
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [actions, setActions] = useState<ProposalAction[]>([]);
  const [confirmValues, setConfirmValues] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle next step
  const handleNext = () => {
    if (step === 1) {
      // Validate first step
      if (!title.trim()) {
        alert('Please enter a title for your proposal');
        return;
      }
      if (!summary.trim()) {
        alert('Please enter a summary for your proposal');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate second step
      if (!startNow && !startDate) {
        alert('Please select a start date');
        return;
      }
      if (durationDays === 0 && durationHours === 0 && durationMinutes === 0) {
        alert('Please set a duration for your proposal');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Move to review step
      setStep(4);
    } else if (step === 4) {
      // Validate confirmation checkbox
      if (!confirmValues) {
        alert('Please confirm that the information is correct');
        return;
      }
      // Submit proposal
      handleSubmit();
    }
  };

  // Handle back
  const handleBack = () => {
    setStep(step - 1);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would create the proposal on-chain
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to governance page
      navigate('/governance');
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Failed to create proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <Wallet className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connect Your Wallet</h2>
          <p className="mt-2 text-sm text-gray-600">
            You need to connect your Solana wallet to create a proposal.
          </p>
          <div className="mt-6 flex justify-center">
            <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentDao) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <Wallet className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">No DAO Selected</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please select a DAO first to create a proposal.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Explore DAOs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Create a Proposal</h1>
          <p className="mt-2 text-lg text-gray-600">
            Create a new proposal for {currentDao.name}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress indicator */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <div className={`flex-1 h-0.5 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                4
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="font-medium">Details</span>
              <span className="font-medium">Voting Period</span>
              <span className="font-medium">Actions</span>
              <span className="font-medium">Review</span>
            </div>
          </div>

          {/* Step 1: Proposal Details */}
          {step === 1 && (
            <ProposalDetailsForm
              title={title}
              setTitle={setTitle}
              summary={summary}
              setSummary={setSummary}
              body={body}
              setBody={setBody}
              resources={resources}
              setResources={setResources}
              authorAddress={publicKey?.toString() || ''}
            />
          )}

          {/* Step 2: Voting Period */}
          {step === 2 && (
            <VotingPeriodForm
              startNow={startNow}
              setStartNow={setStartNow}
              startDate={startDate}
              setStartDate={setStartDate}
              durationDays={durationDays}
              setDurationDays={setDurationDays}
              durationHours={durationHours}
              setDurationHours={setDurationHours}
              durationMinutes={durationMinutes}
              setDurationMinutes={setDurationMinutes}
            />
          )}

          {/* Step 3: Actions */}
          {step === 3 && (
            <ActionsForm
              actions={actions}
              setActions={setActions}
            />
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <ReviewForm
              title={title}
              summary={summary}
              body={body}
              resources={resources}
              authorAddress={publicKey?.toString() || ''}
              startNow={startNow}
              startDate={startDate}
              durationDays={durationDays}
              durationHours={durationHours}
              durationMinutes={durationMinutes}
              actions={actions}
              confirmValues={confirmValues}
              setConfirmValues={setConfirmValues}
            />
          )}

          {/* Form actions */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => navigate('/governance')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Submit Proposal
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};