
import { OfflineAminoSigner, OfflineDirectSigner, TailwindSignOptions } from "./types";
import { Keplr } from "@keplr-wallet/types";

export type TailwindOfflineSigner = OfflineAminoSigner & OfflineDirectSigner;  

export type EthereumProvider = { request(...args: any): Promise<any> }

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
  readonly getOfflineSigner: (
    chainId: string,
    options?: TailwindSignOptions
  ) => TailwindOfflineSigner,
  readonly keplr: TailwindKeplrSubset,
  readonly ethereum: EthereumProvider,
} & EthereumProvider;

type TailwindDecoratedWindow = {
  readonly tailwind: TailwindWallet;
}

declare global {
  interface Window extends TailwindDecoratedWindow {}
}

export const connect = async (): Promise<TailwindWallet> => {
  if (typeof window === "undefined")
    throw new Error("window is not defined");

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
