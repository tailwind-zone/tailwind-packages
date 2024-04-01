
import { OfflineAminoSigner, OfflineDirectSigner, TailwindSignOptions } from "./types";
import { Keplr } from "@keplr-wallet/types";

export type TailwindOfflineSigner = OfflineAminoSigner & OfflineDirectSigner;  

export type TailwindKeplrSubset = Pick<
  Keplr,
  | "enable"
  | "getKey"
  | "signAmino"
  | "signDirect"
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
  interface Window extends TailwindDecoratedWindow {}
}

export const connectWithKeplrApi = async (): Promise<TailwindKeplrSubset | undefined> => {
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

export const connect = async (): Promise<TailwindWallet | undefined> => {
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