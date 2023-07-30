import {configureChains, createConfig} from 'wagmi'
import {goerli} from 'wagmi/chains'
import {MetaMaskConnector} from 'wagmi/connectors/metaMask'

import {publicProvider} from 'wagmi/providers/public'

const {chains, publicClient, webSocketPublicClient} = configureChains(
    [goerli],
    [
        publicProvider(),
    ],
)

export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({chains}),
    ],
    publicClient,
    webSocketPublicClient,
})
