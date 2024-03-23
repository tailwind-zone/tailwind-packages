# `@tailwindzone` Mono-repo

This is a monorepo of TAILWIND's public packages. See packages below.

## Packages

- `@tailwindzone/connect` Use this package to directly integrate the tailwind wallet using Vailla JS/TS. See [docs](https://developer.tailwind.zone/vanilla) for more.
- `@tailwindzone/cosmoskit` Use this package to integrate the tailwind wallet using an API that is identical to [`@cosmos-kit/tailwind-extension`](https://www.npmjs.com/package/@cosmos-kit/tailwind-extension)


# `@tailwindzone/connect`
Tailwind Connect is a wallet connection library for 
[Tailwind wallet](https://tailwind.zone/). 

See full developer documentation at [developer.tailwind.zone](https://developer.tailwind.zone/introduction#integrate-in-under-5-minutes).


# Getting Started
```bash
# install dependencies
pnpm install
# Typescript transpile 
pnpm build
```

# Using the library
You can use Tailwind with its own interface or existing Keplr-compatible interface.

```typescript
import { connect } from "@tailwindzone/connect"

export type TailwindSignOptions = {
  // funds required for tx you want to sign
  readonly fundsRequired?: Array<{
    readonly token: { denom: string; chain: string };
    readonly amount: string;
  }>;
  readonly dstChain: string;
  // gas estimation for tx you want to sign
  readonly maxGas?: number;
  // defaults to direct
  readonly signMode?: "amino" | "direct";
};

// because CosmJS is the standard for client-side
const wallet = await connect();
const signer = await wallet.getOfflineSigner("osmosis-1", {
  fundsRequired: [{
    token: { denom: "uosmo", chain: "osmosis-1" },
    amount: "1000000",
  }],
  dstChain: "osmosis-1"
  maxGas: 200_000,
  signMode: "direct"
});

// Sign transaction
const [account] = await signer.getAccounts();
const client = await SigningStargateClient.connectWithSigner(
  OSMO_RPC_URL,
  signer
);
const res = await client.signAndBroadcast(
  account.address,
  [msg],
  fee,
  memo
);
```
