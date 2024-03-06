
# @tailwindzone/connect
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
import { wallet, keplr } from "@tailwindzone/connect"

// because CosmJS is the standard for client-side   
const signer = await wallet.signing.getOfflineSigner("osmosis-1");

const account = await wallet.accounts.active();
// account.pubkey
// account.visibleChains 
// account.addr("cosmoshub") -> cosmoshub address 
const cosmoshubAddr = await account.addr("cosmoshub");
const { pubkey, visibleChains, addr } = await wallet.accounts.active();
```
