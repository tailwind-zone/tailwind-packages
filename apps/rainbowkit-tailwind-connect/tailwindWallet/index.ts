import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";
import { Wallet } from '@rainbow-me/rainbowkit';

import { tailwindConnector } from '@tailwindzone/connect-wagmi';

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
  createConnector: tailwindConnector
});