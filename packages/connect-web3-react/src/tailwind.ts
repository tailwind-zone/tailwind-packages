import { Actions, Connector, AddEthereumChainParameter } from '@web3-react/types'
import { connect, TailwindWallet } from "@tailwindzone/connect"

export interface TailwindConnectorArgs {
  actions: Actions,
  onError?: (error: Error) => void
}

/**
 * Parse chain ID from hex string. 
 */
function parseChainId(chainId: string): number {
  return Number.parseInt(chainId, 16)
}

const connectData = async (tailwind: TailwindWallet): Promise<{
  chainId: number,
  accounts: string[]
}> => {
  const accounts = (await tailwind.request({ method: 'eth_accounts', })) as string[]
  const chainId = parseChainId(await tailwind.request({ method: 'eth_chainId' }));
  return {
    accounts,
    chainId
  }
}

export class TailwindConnector extends Connector {
  constructor({ actions, onError }: TailwindConnectorArgs) {
    super(actions, onError)
  }

  public async connectEagerly(): Promise<void> {
    try {
      const tailwind = await connect()
      this.provider = tailwind;

      this.actions.update(await connectData(tailwind))
    } catch (error) {
      this.actions.resetState()
    }
  }

  /**
   * Initiates a connection.
   *
   * @param chain_id_or_chain_params - If defined, indicates the desired chain to connect to. If the user is
   * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
   * to the chain, if one of two conditions is met: either they already have it added in their extension, or the
   * argument is of type AddEthereumChainParameter, in which case the user will be prompted to add the chain with the
   * specified parameters first, before being prompted to switch.
   */
  public async activate(chain_id_or_chain_params?: number | AddEthereumChainParameter): Promise<void> {
    const chainId = typeof chain_id_or_chain_params === 'number' ? chain_id_or_chain_params : chain_id_or_chain_params?.chainId
    if (!chainId) {
      throw new Error('No chainId provided')
    }

    try {
      const provider = await connect();
      this.provider = provider;

      const {
        accounts,
        chainId: verifyChainId
      } = await connectData(provider)

      if (chainId == verifyChainId)
        return this.actions.update({
          chainId,
          accounts,
        })

      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId
          }
        ]
      });

      const revalidate = await connectData(provider)
      if (revalidate.chainId !== chainId) 
        throw new Error('Failed to switch chain')

      this.actions.update(revalidate)
    } catch (err) {
      throw new Error(err as string)
    }
  }

} 