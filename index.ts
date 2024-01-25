import { AccountData, OfflineAminoSigner, OfflineDirectSigner } from "./types";

export type TailwindOfflineSigner = OfflineAminoSigner &
  OfflineDirectSigner &
  Readonly<{
    declareFundsRequired: (_: {
      readonly token: { denom: string; chain: string };
      readonly amount: string;
      readonly dst_chain: string;
    }) => void;
    declareMaxGasEstimate: (gas: number) => void;
  }>;

export type TailwindWallet = {
  getOfflineSigner: (chainId: string) => Promise<TailwindOfflineSigner>,
  getAccount: (chainId: string, address: string) => Promise<AccountData>,
};

type TailwindDecoratedWindow = {
  readonly tailwind: TailwindWallet;
}

declare global {
  interface Window extends TailwindDecoratedWindow {}
}

export const getWallet = async (): Promise<TailwindWallet | undefined> => {
    if (typeof window === "undefined") 
      return undefined;  

    if (window.tailwind)
      return window.tailwind;
  
    if (document.readyState === "complete") 
      return window.tailwind;
 
    return new Promise((resolve) => {
      const documentStateChange = (event: Event) => {
        if (
          event.target &&
          (event.target as Document).readyState === "complete"
        ) {
          resolve(window.tailwind);
          document.removeEventListener("readystatechange", documentStateChange);
        }
      };
  
      document.addEventListener("readystatechange", documentStateChange);
    });
 };
