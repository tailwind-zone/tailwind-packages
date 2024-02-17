
export type Tailwind = {

  keplr: any; 
  signing: {
    getOfflineSigner: (
      chainId: string,
      options?: TailwindSignOptions
    ) => Promise<TailwindOfflineSigner>,
  };
  accounts: {
    active: () => Promise<TailwindAccount | undefined>;
  } 
}

// Maybe useWallet() react hook would be nice for non-async usage
// - something like zapatos query builder plus `run` method on
// `await wallet()` at the end
 
