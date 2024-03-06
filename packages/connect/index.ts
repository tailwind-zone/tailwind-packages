import { OfflineAminoSigner, OfflineDirectSigner } from "./types";
import { Keplr } from "@keplr-wallet/types";

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

export type TailwindSignOptions = {
  readonly funds_required?: Array<{
    readonly token: { denom: string; chain: string };
    readonly amount: string;
    readonly dst_chain: string;
  }>;
  readonly max_gas?: number;
  readonly sign_mode?: "amino" | "direct";
};

export type TailwindKeplrSubset = Pick<
  Keplr,
  | "enable"
  | "getKey"
  | "signAmino"
  | "signDirect"
  // @todo change keplr sign options to add tailwind sign options
  | "getOfflineSigner"
  | "getOfflineSignerAuto"
  | "getOfflineSignerOnlyAmino"
  | "experimentalSuggestChain"
  | "getChainInfosWithoutEndpoints"
>;

export type TailwindWallet = {
  getOfflineSigner: (
    chainId: string,
    options?: TailwindSignOptions
  ) => Promise<TailwindOfflineSigner>,
};

type TailwindDecoratedWindow = {
  readonly tailwind: TailwindWallet;
  readonly tailwind_keplr: TailwindKeplrSubset;
}

declare global {
  interface Window extends TailwindDecoratedWindow { }
}

export const getWalletKeplr = async (): Promise<any | undefined> => {
  if (typeof window === "undefined")
    return undefined;

  if (window.tailwind_keplr || document.readyState === "complete")
    return window.tailwind_keplr;

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        resolve(window.tailwind_keplr);
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
}

export const getWallet = async (): Promise<TailwindWallet | undefined> => {
  if (typeof window === "undefined")
    return undefined;

  if (window.tailwind || document.readyState === "complete")
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
