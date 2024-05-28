import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { tailwindConnector } from './main'
import { useWeb3React } from '@web3-react/core'

function App() {
  const {
    connector,
    provider
  } = useWeb3React();

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
        <button onClick={() => {
          const [tailwind] = tailwindConnector
          tailwind.connectEagerly().catch(console.error)
        }}>
          Connect to TAILWIND
        </button>

        {connector && <button onClick={async () => {
          console.log(await provider?.getBlockNumber())
        }}>
          Print block number
        </button>}

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
