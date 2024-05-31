import { Wallet } from '@rainbow-me/rainbowkit';
import { createConnector } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { CreateConnector } from '@rainbow-me/rainbowkit/dist/wallets/Wallet';

export interface TailwindWalletOptions {}

export const tailwindWallet = (_: TailwindWalletOptions): Wallet => ({
  id: 'tailwind_wallet',
  name: 'TAILWIND',
  iconUrl: "https://tailwind.zone/brandkit/logo.svg",
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
  createConnector: createInjectedConnector(
    (window) => window?.tailwind
  )
});

const createInjectedConnector = (provider?: any): CreateConnector => {
  return (walletDetails: any) => {
    // Create the injected configuration object conditionally based on the provider.
    const injectedConfig = provider
      ? {
        target: () => ({
          id: walletDetails.rkDetails.id,
          name: walletDetails.rkDetails.name,
          provider,
        }),
      }
      : {};

    return createConnector((config) => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...injected(injectedConfig)(config),
      ...walletDetails,
    }));
  };
}
