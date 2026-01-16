import { http, createConfig } from 'wagmi'
import { {{network_import}} } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: '{{project_name}}',
  projectId: 'YOUR_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [{{network_name}}],
  transports: {
    [{{network_name}}.id]: http(),
  },
})
