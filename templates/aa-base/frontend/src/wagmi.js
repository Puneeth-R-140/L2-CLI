import { http, createConfig } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
    appName: '{{project_name}}',
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
    chains: [baseSepolia],
    transports: {
        [baseSepolia.id]: http(import.meta.env.VITE_RPC_URL),
    },
})
