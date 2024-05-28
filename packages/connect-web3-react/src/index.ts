import { initializeConnector } from "@web3-react/core"
import { TailwindConnector } from "./tailwind"

const tailwindConnector = initializeConnector(actions => new TailwindConnector({ actions })) 

export {
  tailwindConnector,
  TailwindConnector
}
