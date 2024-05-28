import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Web3ReactProvider, initializeConnector } from '@web3-react/core'
import { MetaMask } from "@web3-react/metamask"
import { TailwindConnector } from './tailwind.ts'

export const tailwindConnector = initializeConnector(actions => new TailwindConnector({ actions }))
export const metaMaskConnector = initializeConnector(actions => new MetaMask({ actions }))

const connectors = [
  metaMaskConnector,
  tailwindConnector
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ReactProvider
      connectors={connectors}
    >
    <App />
    </Web3ReactProvider>
  </React.StrictMode>,
)
