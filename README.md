
# @tailwindzone/connect
Tailwind Connect is a wallet connection library for 
[Tailwind wallet](https://tailwind.zone/). 

See full developer documentation at [developer.tailwind.zone](https://docs.tailwind.zone/).


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
import { getWallet, getWalletKeplr } from "@tailwindzone/connect"

const wallet = await getWallet();
const signer = await wallet.getOfflineSigner("osmosis-1");

const [account] = await signer.getAccounts();

// using CosmJS, see https://github.com/cosmos/cosmjs 
const client = await SigningStargateClient.connectWithSigner(
  "https://rpc.testnet.osmosis.network",
  signer
);
const res = await client.signAndBroadcast(
  account.address,
  [msg],
  fee,
  memo
);

```


```typescript
import { connect, useWallet } from "@tailwindzone/connect"

const wallet = await connect();
// because CosmJS is the standard for client-side   
wallet.signing.getOfflineSigner();

// { address, } 
const { pubkey, visibleChains } = wallet.accounts.active();

const account = wallet.accounts.active();
const cosmoshubAddr = account.addr("cosmoshub");
```
