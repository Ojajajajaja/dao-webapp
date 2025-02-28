import React from 'react';
import { ProposalAction } from './ActionTypes';
import { AuthorizeWalletSummary } from './AuthorizeWalletForm';
import { RemoveWalletSummary } from './RemoveWalletForm';
import { WithdrawAssetsSummary } from './WithdrawAssetsForm';

interface ActionSummaryProps {
  action: ProposalAction;
}

export const ActionSummary: React.FC<ActionSummaryProps> = ({ action }) => {
  switch (action.type) {
    case 'authorizeWallet':
      return <AuthorizeWalletSummary action={action} />;
    case 'removeWallet':
      return <RemoveWalletSummary action={action} />;
    case 'withdrawAssets':
      return <WithdrawAssetsSummary action={action} />;
    default:
      return <div>Unknown action type</div>;
  }
};