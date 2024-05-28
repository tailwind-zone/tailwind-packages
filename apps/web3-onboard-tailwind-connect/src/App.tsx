import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { tailwind } from "@tailwindzone/connect-web3-onboard"

const injected = injectedModule()
const wallets = [injected, tailwind()]

const seimainnet = {
  id: 531,
  token: "Sei",
  label: "Sei Mainnet",
  rpcUrl: "https://evm-rpc.sei-apis.com"
}

const chains = [seimainnet]

const onboard = Onboard({
  theme: "dark",
  wallets,
  chains
})

function App() {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={
          async () => {
            await onboard.connectWallet()
          }
        }>
          Connect
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
