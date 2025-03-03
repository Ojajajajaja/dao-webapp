import React from 'react';
import { PieChart, Vote } from 'lucide-react';

const Governance = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Governance</h1>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Active Proposals</h2>
        </div>
        <div className="p-0">
          {[
            { id: 'PROP-1234', title: 'Increase Treasury Allocation for Marketing', status: 'Active', votes: { for: 65, against: 35 } },
            { id: 'PROP-1233', title: 'New Community Guidelines', status: 'Active', votes: { for: 82, against: 18 } },
            { id: 'PROP-1232', title: 'Reduce Quorum Requirements', status: 'Active', votes: { for: 49, against: 51 } },
          ].map((proposal) => (
            <div key={proposal.id} className="border-b p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{proposal.title}</h3>
                  <p className="text-sm text-gray-500">{proposal.id}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {proposal.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${proposal.votes.for}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{proposal.votes.for}% For</span>
                <span>{proposal.votes.against}% Against</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Voting Power Distribution</h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex items-center justify-center">
              <PieChart className="text-gray-300" size={100} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Recent Governance Activity</h2>
          </div>
          <div className="p-0">
            {[
              { event: 'Proposal #1221 accepted', time: '12 hours ago' },
              { event: 'New voting period started', time: '1 day ago' },
              { event: 'Quorum reached on Proposal #1220', time: '2 days ago' },
              { event: 'Proposal #1219 rejected', time: '3 days ago' },
            ].map((activity, index) => (
              <div key={index} className={`p-4 ${index !== 3 ? 'border-b' : ''} hover:bg-gray-50`}>
                <div className="flex justify-between">
                  <span>{activity.event}</span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;