import { createConnector } from '@wagmi/core'
import { connect as getTailwind, TailwindWallet } from '@tailwindzone/connect'
import { getAddress } from 'viem'

export type TailwindConnectorOptions = {}

export function tailwindConnector(_: TailwindConnectorOptions = {}) {
  return createConnector(() => ({
    icon: "https://tailwind.zone/brand/logo.svg",
    id: 'tailwindSDK',
    name: 'TAILWIND',
    supportsSimulation: false,
    type: 'tailwind' as const,
    async getProvider(): Promise<TailwindWallet> {
      return getTailwind()
    },
    async getAccounts() {
      const provider = (await this.getProvider()) as TailwindWallet;
      const accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]
      return accounts.map((x) => getAddress(x))
    },
    async connect() {
      const provider = await this.getProvider();
      if (!provider) {
        throw new Error('Provider not found')
      }
      return {
        accounts: await this.getAccounts(),
        chainId: await this.getChainId(),
      }
    },
    async getChainId() {
      const provider = (await this.getProvider()) as TailwindWallet;
      if (!provider) {
        throw new Error('Provider not found')
      }
      const res = await provider.request({ method: 'eth_chainId' });
      return Number(res)
    },
    async disconnect() {
      const provider = (await this.getProvider()) as TailwindWallet;
      if (!provider) {
        throw new Error('Provider not found')
      }
      return provider.request({ method: 'eth_disconnect' })
    },
    async isAuthorized() {
      return true
    },
    onAccountsChanged() { },
    onChainChanged() { },
    onDisconnect() { },
  }))
}