import { initializeConnector } from "@web3-react/core"
import { TailwindConnector } from "./tailwind"

export const tailwindConnector = initializeConnector(actions => new TailwindConnector({ actions })) 

export {
  TailwindConnector
};
