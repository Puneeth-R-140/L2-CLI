import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'final-test',
  projectId: 'YOUR_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
