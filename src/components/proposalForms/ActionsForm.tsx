import React from 'react';
import { Plus, UserPlus, UserMinus, Wallet, Trash2, Edit } from 'lucide-react';
import { ProposalAction } from '../proposalActions/ActionTypes';
import { ActionModal } from '../proposalActions/ActionModal';
import { ActionSummary } from '../proposalActions/ActionSummary';

interface ActionsFormProps {
  actions: ProposalAction[];
  setActions: (actions: ProposalAction[]) => void;
}

export const ActionsForm: React.FC<ActionsFormProps> = ({ actions, setActions }) => {
  const [showActionModal, setShowActionModal] = React.useState(false);
  const [currentAction, setCurrentAction] = React.useState<ProposalAction | null>(null);
  const [editingActionId, setEditingActionId] = React.useState<string | null>(null);

  // Open action modal
  const openActionModal = () => {
    setShowActionModal(true);
    setCurrentAction(null);
    setEditingActionId(null);
  };

  // Close action modal
  const closeActionModal = () => {
    setShowActionModal(false);
    setCurrentAction(null);
    setEditingActionId(null);
  };

  // Save action
  const saveAction = (action: ProposalAction) => {
    if (editingActionId) {
      // Update existing action
      setActions(actions.map(a => a.id === editingActionId ? action : a));
    } else {
      // Add new action
      setActions([...actions, action]);
    }
    closeActionModal();
  };

  // Edit action
  const editAction = (id: string) => {
    const actionToEdit = actions.find(action => action.id === id);
    if (actionToEdit) {
      setCurrentAction(actionToEdit);
      setEditingActionId(id);
      setShowActionModal(true);
    }
  };

  // Remove action
  const removeAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  // Get action type icon
  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case 'authorizeWallet':
        return <UserPlus className="h-5 w-5 text-blue-600 mr-2" />;
      case 'removeWallet':
        return <UserMinus className="h-5 w-5 text-red-600 mr-2" />;
      case 'withdrawAssets':
        return <Wallet className="h-5 w-5 text-green-600 mr-2" />;
      default:
        return null;
    }
  };

  // Get action type display name
  const getActionTypeName = (type: string) => {
    switch (type) {
      case 'authorizeWallet':
        return 'Authorize Wallets';
      case 'removeWallet':
        return 'Remove Wallets';
      case 'withdrawAssets':
        return 'Withdraw Assets';
      default:
        return type;
    }
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div>
        <div className="flex items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">If option "Yes" wins</h3>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Optional
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          This action will execute if the vote passes. A common automatic action is transferring funds to a guild or person if their proposal passes a vote.
        </p>
        
        {actions.length === 0 ? (
          <div className="mt-6 text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No actions</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add an action that will execute if this proposal passes.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={openActionModal}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add action
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="space-y-4">
              {actions.map((action) => (
                <div key={action.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getActionTypeIcon(action.type)}
                      <h4 className="text-sm font-medium text-gray-900">{getActionTypeName(action.type)}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => editAction(action.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAction(action.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <ActionSummary action={action} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={openActionModal}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add another action
              </button>
            </div>
          </div>
        )}
      </div>

      <ActionModal
        isOpen={showActionModal}
        onClose={closeActionModal}
        onSave={saveAction}
        currentAction={currentAction}
        setCurrentAction={setCurrentAction}
      />
    </div>
  );
};