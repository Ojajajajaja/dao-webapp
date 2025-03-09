import { DAO, Proposal, Member, Token, Transfer, Pod } from '../types';

export const mockDaos: DAO[] = [
  {
    id: 'bwen-dao',
    name: 'BWEN DAO',
    description: 'BWEN DAO is the primary decentralized autonomous organization focused on community governance and blockchain empowerment.',
    logo: 'https://placehold.co/400x400/2563eb/FFFFFF?text=BWEN',
    members: 1800,
    proposals: 42,
    treasury: [
      { amount: 2000000, symbol: 'SOL' },
      { amount: 3500000, symbol: 'USDC' },
      { amount: 1200000, symbol: 'BWEN' }
    ]
  },
  {
    id: 'solana-dao',
    name: 'Solana DAO',
    description: 'The Solana DAO governs key parameters of Solana ecosystem using the voting power of SOL.',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    members: 1250,
    proposals: 32,
    treasury: [
      { amount: 1500000, symbol: 'SOL' },
      { amount: 2500000, symbol: 'USDC' }
    ]
  },
  {
    id: 'serum-dao',
    name: 'Serum DAO',
    description: 'Serum DAO enables the community to govern the Serum DEX protocol.',
    logo: 'https://cryptologos.cc/logos/serum-srm-logo.png',
    members: 850,
    proposals: 24,
    treasury: [
      { amount: 750000, symbol: 'SRM' },
      { amount: 1200000, symbol: 'USDC' }
    ]
  },
  {
    id: 'raydium-dao',
    name: 'Raydium DAO',
    description: 'Raydium DAO enables community governance for the Raydium AMM protocol.',
    logo: 'https://cryptologos.cc/logos/raydium-ray-logo.png',
    members: 920,
    proposals: 18,
    treasury: [
      { amount: 850000, symbol: 'RAY' },
      { amount: 950000, symbol: 'USDC' }
    ]
  },
  {
    id: 'mango-dao',
    name: 'Mango DAO',
    description: 'Mango DAO governs the Mango Markets protocol for decentralized trading.',
    logo: 'https://cryptologos.cc/logos/mango-markets-mngo-logo.png',
    members: 680,
    proposals: 15,
    treasury: [
      { amount: 650000, symbol: 'MNGO' },
      { amount: 800000, symbol: 'USDC' }
    ]
  }
];

export const mockProposals: Proposal[] = [
  {
    id: 'prop-1',
    title: 'Increase Treasury Allocation for Developer Grants',
    description: 'This proposal aims to increase the allocation of treasury funds for developer grants to boost ecosystem growth.',
    creator: '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB',
    status: 'active',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    votes: {
      yes: 650000,
      no: 120000,
      abstain: 30000
    },
    actions: [
      {
        type: 'transfer',
        data: {
          amount: 100000,
          token: 'SOL',
          recipient: 'DeveloperGrantsMultisig'
        }
      }
    ]
  },
  {
    id: 'prop-2',
    title: 'Update Governance Parameters',
    description: 'This proposal suggests updating the voting duration and quorum requirements for future proposals.',
    creator: '6Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA',
    status: 'executed',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    votes: {
      yes: 780000,
      no: 90000,
      abstain: 15000
    },
    actions: [
      {
        type: 'updateSettings',
        data: {
          votingDuration: 7 * 24 * 60 * 60, // 7 days in seconds
          quorumPercentage: 10
        }
      }
    ]
  },
  {
    id: 'prop-3',
    title: 'Add New Community Multisig Members',
    description: 'This proposal suggests adding three new members to the community multisig to improve decentralization.',
    creator: '2xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1',
    status: 'pending',
    startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    votes: {
      yes: 0,
      no: 0,
      abstain: 0
    },
    actions: [
      {
        type: 'addMembers',
        data: {
          members: [
            '9xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1',
            '7Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA',
            '5xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB'
          ]
        }
      }
    ]
  },
  {
    id: 'prop-4',
    title: 'Macron in Congo',
    description: 'This proposal discusses the diplomatic relations and economic partnerships between France and Congo.',
    creator: '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB',
    status: 'active',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    votes: {
      yes: 450000,
      no: 220000,
      abstain: 10000
    },
    actions: [
      {
        type: 'authorizeWallet',
        data: {
          wallets: ['CongoEconomicPartnershipWallet']
        }
      }
    ]
  }
];

export const mockMembers: Member[] = [
  {
    address: '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB',
    votingPower: 120000
  },
  {
    address: '6Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA',
    votingPower: 85000
  },
  {
    address: '2xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1',
    votingPower: 65000
  },
  {
    address: '9xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1',
    votingPower: 45000
  },
  {
    address: '7Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA',
    votingPower: 32000
  }
];

export const mockTokens: Token[] = [
  {
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    balance: 1500000,
    price: 150.25,
    logoURI: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  },
  {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    balance: 2500000,
    price: 1.00,
    logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
  },
  {
    address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
    symbol: 'SRM',
    name: 'Serum',
    decimals: 6,
    balance: 750000,
    price: 0.85,
    logoURI: 'https://cryptologos.cc/logos/serum-srm-logo.png'
  }
];

export const mockTransfers: Transfer[] = [
  {
    id: 'tx-1',
    type: 'deposit',
    amount: 50000,
    token: mockTokens[0],
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    from: '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB',
    to: 'dao-treasury',
    transactionHash: '4sCJGzRiDGBqrEVuLuPQXyGNvE8SBbrXCSQHXYf5qB5B9jU8GvVXrJEMxQrPAMwkHEh9KXhg'
  },
  {
    id: 'tx-2',
    type: 'withdraw',
    amount: 25000,
    token: mockTokens[1],
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    from: 'dao-treasury',
    to: '6Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA',
    transactionHash: '2sCJGzRiDGBqrEVuLuPQXyGNvE8SBbrXCSQHXYf5qB5B9jU8GvVXrJEMxQrPAMwkHEh9KXhg'
  },
  {
    id: 'tx-3',
    type: 'deposit',
    amount: 35000,
    token: mockTokens[2],
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    from: '2xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1',
    to: 'dao-treasury',
    transactionHash: '3sCJGzRiDGBqrEVuLuPQXyGNvE8SBbrXCSQHXYf5qB5B9jU8GvVXrJEMxQrPAMwkHEh9KXhg'
  }
];

export const mockPods: Pod[] = [
  {
    id: 'pod-1',
    name: 'Development',
    description: 'Core development team responsible for protocol improvements and maintenance',
    icon: 'Code',
    color: 'blue',
    members: 12,
    membersList: [
      '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB',
      '6Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA'
    ],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    budget: {
      amount: 250000,
      symbol: 'USDC'
    }
  },
  {
    id: 'pod-2',
    name: 'Marketing',
    description: 'Handles all marketing, social media, and community engagement activities',
    icon: 'Megaphone',
    color: 'purple',
    members: 8,
    membersList: [
      '2xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1'
    ],
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
    budget: {
      amount: 120000,
      symbol: 'USDC'
    }
  },
  {
    id: 'pod-3',
    name: 'Treasury Management',
    description: 'Responsible for managing DAO treasury assets and financial planning',
    icon: 'Wallet',
    color: 'green',
    members: 5,
    membersList: [
      '9xPv3CnUAcxpWJJtpYQCxKrfZMjSPEsG2MxZ9P3FbfU1',
      '7Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA'
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    budget: {
      amount: 50000,
      symbol: 'USDC'
    }
  },
  {
    id: 'pod-4',
    name: 'Content Creation',
    description: 'Creates educational content, documentation, and tutorials for the community',
    icon: 'FileText',
    color: 'orange',
    members: 7,
    membersList: [],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'pod-5',
    name: 'Governance',
    description: 'Oversees governance processes and proposal improvements',
    icon: 'Vote',
    color: 'red',
    members: 6,
    membersList: [],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
];