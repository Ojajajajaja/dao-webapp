import React from 'react';
import { X, ArrowLeft, ChevronRight, UserPlus, UserMinus, Wallet, Code } from 'lucide-react';
import { ProposalAction } from './ActionTypes';
import { AuthorizeWalletForm } from './AuthorizeWalletForm';
import { RemoveWalletForm } from './RemoveWalletForm';
import { WithdrawAssetsForm } from './WithdrawAssetsForm';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (action: ProposalAction) => void;
  currentAction: ProposalAction | null;
  setCurrentAction: (action: ProposalAction | null) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentAction,
  setCurrentAction
}) => {
  if (!isOpen) return null;

  const selectAction = (type: 'authorizeWallet' | 'removeWallet' | 'withdrawAssets') => {
    setCurrentAction({
      id: Date.now().toString(),
      type,
      data: {}
    });
  };

  const renderActionForm = () => {
    if (!currentAction) return null;

    switch (currentAction.type) {
      case 'authorizeWallet':
        return (
          <AuthorizeWalletForm
            action={currentAction}
            onSave={onSave}
            onCancel={onClose}
          />
        );
      case 'removeWallet':
        return (
          <RemoveWalletForm
            action={currentAction}
            onSave={onSave}
            onCancel={onClose}
          />
        );
      case 'withdrawAssets':
        return (
          <WithdrawAssetsForm
            action={currentAction}
            onSave={onSave}
            onCancel={onClose}
          />
        );
      default:
        return <div>Unknown action type</div>;
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                {!currentAction ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Add action</h3>
                      <button
                        type="button"
                        onClick={onClose}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div 
                        className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        onClick={() => selectAction('authorizeWallet')}
                      >
                        <div>
                          <h4 className="text-base font-medium text-gray-900 flex items-center">
                            <UserPlus className="h-5 w-5 text-blue-600 mr-2" />
                            Authorize wallets
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Create a proposal to authorize new wallets to vote in your DAO.
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div 
                        className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        onClick={() => selectAction('removeWallet')}
                      >
                        <div>
                          <h4 className="text-base font-medium text-gray-900 flex items-center">
                            <UserMinus className="h-5 w-5 text-red-600 mr-2" />
                            Remove wallets
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Create a proposal to unauthorize wallets from voting in your DAO.
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div 
                        className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        onClick={() => selectAction('withdrawAssets')}
                      >
                        <div>
                          <h4 className="text-base font-medium text-gray-900 flex items-center">
                            <Wallet className="h-5 w-5 text-green-600 mr-2" />
                            Withdraw assets
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Create a proposal to withdraw assets to a wallet.
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-between opacity-50 cursor-not-allowed">
                        <div>
                          <h4 className="text-base font-medium text-gray-900 flex items-center">
                            <Code className="h-5 w-5 text-purple-600 mr-2" />
                            Smart contract composer
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Interact with an external contract on the chain your DAO is deployed on.
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <button
                        type="button"
                        onClick={() => setCurrentAction(null)}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none flex items-center"
                      >
                        <ArrowLeft className="h-5 w-5 mr-1" />
                        <span>Back</span>
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    {renderActionForm()}
                  </>
                )}
              </div>
            </div>
          </div>
          {currentAction && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => {
                  // This is handled by the individual form components
                }}
                className="hidden"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};