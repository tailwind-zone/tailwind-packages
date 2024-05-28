import { defineChain } from "viem"

export const seimainnet = defineChain({
  id: 1329,
  name: 'Sei Mainnet',
  nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc.sei-apis.com'],
    },
  },
})

export const seiatlantic2 = defineChain({
  id: 1328,
  name: 'Sei Atlantic-2 Testnet',
  nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc.atlantic-2.seinetwork.io'],
    },
  },
})

export const seiartic1 = defineChain({
  id: 713715,
  name: 'Sei Artic-1 Testnet',
  nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm-rpc-arctic-1.sei-apis.com'],
    },
  },
})