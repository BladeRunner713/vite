import {useAccount, useBalance, useConnect, useContractWrite, useDisconnect, useNetwork} from 'wagmi'
import './index.css'
import abi from './abi.json'
import {parseEther} from "viem";

export function App() {
    const {connect, connectors, error, isLoading, pendingConnector} = useConnect()
    const {address, isConnected, isDisconnected} = useAccount()
    const {disconnect} = useDisconnect()
    const {chain, chains} = useNetwork()
    const {data} = useBalance({address: address})
    const {write} = useContractWrite({
        address: '0x70BaD09280FD342D02fe64119779BC1f0791BAC2',
        abi: abi.abi,
        functionName: 'sendMessage',
        args: [address, parseEther("0.01"), "0x"],
    })

    return (
        <div className="bg-black min-h-screen flex justify-center items-center flex-col">
            {isDisconnected && <div className="bg-white rounded-3xl py-2 px-4">
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({connector})}
                    >
                        connect to {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading &&
                            connector.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </button>
                ))}
                {error && <div>{error.message}</div>}
            </div>}
            {isConnected && <div className="bg-white rounded-3xl py-2 px-4">
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>}
            {isConnected && <button
                className={chain?.name === 'Goerli' ? "bg-white rounded-3xl py-2 px-4 mt-4" : "bg-gray-500 rounded-3xl py-2 px-4 mt-4 cursor-not-allowed"}
                onClick={() => {
                    if (chain?.name === 'Goerli') {
                        write({
                            value: parseEther('0.01'),
                        })
                    }
                }
                }>
                {chain?.name === 'Goerli' ? data?.value && data?.value < BigInt(10 ** 16) ? "Insufficient Balance" : "Bridge 0.01 ETH to Linea Testnet" : "Wrong network! Please switch to Goerli"}
            </button>
            }
        </div>
    )
}
