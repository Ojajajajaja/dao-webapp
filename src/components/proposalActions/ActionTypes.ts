import { ReactNode } from 'react';

export interface ProposalAction {
  id: string;
  type: 'authorizeWallet' | 'removeWallet' | 'withdrawAssets';
  data: any;
}

export interface AuthorizeWalletData {
  wallets: string[];
}

export interface RemoveWalletData {
  wallets: string[];
}

export interface WithdrawAssetsData {
  token: string;
  amount: number;
  recipient: string;
}

export interface ActionFormProps {
  action: ProposalAction | null;
  onSave: (action: ProposalAction) => void;
  onCancel: () => void;
}

export interface ActionSummaryProps {
  action: ProposalAction;
}

export const getActionTypeName = (type: string): string => {
  switch (type) {
    case 'authorizeWallet':
      return 'Authorize Wallets';
    case 'removeWallet':
      return 'Remove Wallets';
    case 'withdrawAssets':
      return 'Withdraw Assets';
    default:
      return 'Unknown Action';
  }
};