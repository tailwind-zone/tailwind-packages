import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { 
  tailwindWallet 
} from "@tailwindzone/connect-rainbowkit"
import { defineChain } from 'viem';

export const seimainnet = defineChain({
  id: 1329,
  name: 'Sei Mainnet',
  nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc.sei-apis.com'],
    },
  },
})

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [seimainnet],
  wallets: [{
    groupName: 'Popular',
    wallets: [
      tailwindWallet
    ]
  }],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  ,
)
