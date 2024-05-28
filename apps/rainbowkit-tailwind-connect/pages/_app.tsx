import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { seimainnet, seiatlantic2 } from "@tailwindzone/connect-wagmi/chains";
import {
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { tailwindWallet } from '../tailwindWallet';

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    // @ts-ignore
    seimainnet,
    seiatlantic2
  ],
  wallets: [{
    groupName: 'Popular',
    wallets: [
      tailwindWallet,
      rainbowWallet,
      metaMaskWallet
    ]
  }],
  ssr: true,
  showWallets: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
