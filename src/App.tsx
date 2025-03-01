import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SolanaProvider } from './context/SolanaProvider';
import { DaoProvider } from './context/DaoContext';
import { Layout } from './components/layout/Layout';
import { Explore } from './pages/Explore';
import { Dashboard } from './pages/Dashboard';
import { CreateDao } from './pages/CreateDao';
import { CreateProposal } from './pages/CreateProposal';
import { Governance } from './pages/Governance';
import { Pods } from './pages/Pods';

function App() {
  return (
    <Router>
      <SolanaProvider>
        <DaoProvider>
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/create-dao" element={<CreateDao />} />
            <Route path="/governance" element={<Layout><Governance /></Layout>} />
            <Route path="/governance/new-proposal" element={<Layout><CreateProposal /></Layout>} />
            <Route path="/pods" element={<Layout><Pods /></Layout>} />
            {/* Add more routes as needed */}
          </Routes>
        </DaoProvider>
      </SolanaProvider>
    </Router>
  );
}

export default App;