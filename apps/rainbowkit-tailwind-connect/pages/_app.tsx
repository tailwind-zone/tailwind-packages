import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { Wallet } from '@rainbow-me/rainbowkit';
import { tailwindConnector } from '@tailwindzone/connect-wagmi';
import { seimainnet, seiatlantic2 } from "@tailwindzone/connect-wagmi/chains";
import {
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';

export interface MyWalletOptions {
  projectId: string;
}

export const tailwindWallet = ({ projectId }: MyWalletOptions): Wallet => ({
  id: 'tailwind_wallet',
  name: 'TAILWIND',
  iconUrl: 'https://tailwind.zone/brandkit/logo.svg',
  iconBackground: '#0c2f78',
  downloadUrls: {
    chrome: 'https://chromewebstore.google.com/detail/tailwind-wallet/dpnfollacokcbkeiidhplhjpafkbfacj',
  },
  mobile: {
    getUri: (uri: string) => uri,
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://tailwind.zone',
      steps: [
        {
          description:
            'We recommend pinning My Wallet to your taskbar for quicker access to your wallet.',
          step: 'install',
          title: 'Install the My Wallet extension',
        },
        {
          description:
            'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
          step: 'create',
          title: 'Create or Import a Wallet',
        },
        {
          description:
            'Once you set up your wallet, click below to refresh the browser and load up the extension.',
          step: 'refresh',
          title: 'Refresh your browser',
        },
      ],
    },
  },
  createConnector: () => tailwindConnector(),
});

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
