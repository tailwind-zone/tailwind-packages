import { WalletInit, createEIP1193Provider } from "@web3-onboard/common"
import { connect } from "@tailwindzone/connect"

export const tailwind = (): WalletInit => {
  return () => ({
    label: "TAILWIND",
    getIcon: async () => (await require("./logo.svg")).default,
    getInterface: async () => {
      try {
        const provider = await connect();
        return {
          provider: createEIP1193Provider(provider)
        }
      } catch {
        window.open("https://tailwind.zone", "_blank")
        throw new Error("Download the Tailwind Wallet to continue.")
      }
    }
  })
}
