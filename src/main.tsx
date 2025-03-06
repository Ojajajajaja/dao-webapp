// Import the Buffer polyfill and make it globally available
import { Buffer } from 'buffer';
window.Buffer = Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SolanaProvider } from './context/SolanaProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SolanaProvider>
      <App />
    </SolanaProvider>
  </StrictMode>
);