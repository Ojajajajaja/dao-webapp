import React from 'react';
import { 
  CircleDollarSign,
  Vote,
  Users,
  Activity,
  PieChart
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Treasury Balance</h3>
            <CircleDollarSign className="text-text" size={20} />
          </div>
          <p className="text-2xl font-bold">$1,245,678</p>
          <p className="text-text text-sm">+2.4% from last month</p>
        </div>
        
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Active Proposals</h3>
            <Vote className="text-text" size={20} />
          </div>
          <p className="text-2xl font-bold">7</p>
          <p className="text-text text-sm">3 closing soon</p>
        </div>
        
        <div className="bg-primary text-text rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Member Count</h3>
            <Users className="text-text" size={20} />
          </div>
          <p className="text-2xl font-bold">1,342</p>
          <p className="text-text text-sm">+12 this week</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-300 text-text rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Activity Overview</h3>
          <div className="h-64 flex items-center justify-center">
            <Activity className="text-text" size={100} />
          </div>
        </div>
        
        <div className="bg-surface-300 text-text rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Token Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <PieChart className="text-text" size={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;