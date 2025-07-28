import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config, projectId, celoAlfajores, wagmiAdapter } from './wagmiConfig';
import { AppProvider } from './context/AppContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter], // Ensure wagmiAdapter is passed
  networks: [celoAlfajores],
  projectId,
  metadata: {
    name: 'Splitzy',
    description: 'Splitzy App',
    url: 'https://yourdomain.com',
    icons: ['https://yourdomain.com/favicon.png'],
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#15803d',
  },
  features: { analytics: true },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);