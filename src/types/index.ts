export interface DAO {
  id: string;
  name: string;
  description: string;
  logo?: string;
  members: number;
  proposals: number;
  treasury: {
    amount: number;
    symbol: string;
  }[];
}

export interface Member {
  address: string;
  votingPower: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  creator: string;
  status: 'active' | 'executed' | 'defeated' | 'pending';
  startDate: Date;
  endDate: Date;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  actions: ProposalAction[];
}

export interface ProposalAction {
  type: string;
  data: any;
}

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number;
  price?: number;
  logoURI?: string;
}

export interface Transfer {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  token: Token;
  date: Date;
  from: string;
  to: string;
  transactionHash: string;
}