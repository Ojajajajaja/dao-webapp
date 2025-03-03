import React from 'react';
import { Users } from 'lucide-react';

const Pods = () => {
  const podCategories = [
    'Communication',
    'Design',
    'Merch',
    'Cuddling',
    'Trading',
    'Chilling'
  ];

  return (
    <div className="p-6">
      <div className="flex items-center text-sm text-[#555555] mb-4">
        <h1 className="text-2xl font-bold mb-6">PODs</h1>
      </div>
      
      <div className="flex justify-between mb-6">
        <div className="flex space-x-2">
          {podCategories.map((category, index) => (
            <button 
              key={index} 
              className={`px-4 py-2 rounded-full text-sm ${
                category === 'Communication' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-[#252525] text-white hover:bg-[#333333]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
          Join the Pod
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-[#252525] rounded-lg p-4">
            <h2 className="text-white text-lg mb-4">Feed</h2>
            {/* Feed content would go here */}
            <div className="h-64 flex items-center justify-center text-[#555555]">
              <p>Pod feed content will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-[#252525] rounded-lg p-4">
            <h2 className="text-white text-lg mb-4">Pod Proposal</h2>
            {/* Pod proposal content would go here */}
            <div className="h-64 flex items-center justify-center text-[#555555]">
              <p>Pod proposal content will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pods;