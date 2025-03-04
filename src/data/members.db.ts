// Define Member type
export interface Member {
  id: number;
  name: string;
  wallet: string;
  username: string;
  avatar: string;
  pods: string[];
  discordId: string;
  twitter: string;
  telegram: string;
  lastLogin: string;
  lastInteraction: string;
}

// Sample member data
const membersData: Member[] = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    wallet: '8xrt67Dj9q2rjvVwVVN2Nqeis1mGFHpwXamRYcSVsRXB', 
    username: 'alexj', 
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
    pods: ['Design', 'Marketing'], 
    discordId: 'alexj#1234', 
    twitter: '@alexjohnson', 
    telegram: '@alex_j', 
    lastLogin: '2023-10-15T14:30:00Z', 
    lastInteraction: '2023-10-15T16:45:00Z' 
  },
  { 
    id: 2, 
    name: 'Sarah Williams', 
    wallet: '6Kcm7sSmKSsuDCPaAFTYo7aMvX9CzfPVcbCHDQrZ89QA', 
    username: 'sarahw', 
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
    pods: ['Communication'], 
    discordId: 'sarahw#5678', 
    twitter: '@sarahwilliams', 
    telegram: '@sarah_w', 
    lastLogin: '2023-10-14T09:15:00Z', 
    lastInteraction: '2023-10-14T11:20:00Z' 
  }
];

// Function to get all members
export const getMembers = (): Member[] => {
  return membersData;
};

// Function to get member by ID
export const getMemberById = (id: number): Member | undefined => {
  return membersData.find(member => member.id === id);
};

export default membersData; 