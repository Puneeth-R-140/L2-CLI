# {{project_name}}

A decentralized application built for {{network_display}} Layer 2.

## Overview

This project was scaffolded using L2 CLI and is configured for development on the {{network_display}} network.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173

### Production Build

```bash
npm run build
```

## Technology Stack

- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **wagmi**: React hooks for Ethereum
- **RainbowKit**: Wallet connection interface
- **Viem**: TypeScript library for Ethereum

## Network Configuration

### {{network_display}}

- **Chain ID**: {{chain_id}}
- **RPC Endpoint**: {{rpc_url}}
- **Block Explorer**: {{explorer_url}}
- **Documentation**: {{docs_url}}

## Web3 Configuration

The Web3 configuration is located in `src/wagmi.js`. To enable wallet connections:

1. Create a project at https://cloud.walletconnect.com
2. Copy your Project ID
3. Update the `projectId` field in `src/wagmi.js`

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
├── wagmi.js         # Web3 configuration
└── index.css        # Global styles and Tailwind imports
```

## Development

### Adding Smart Contract Interactions

1. Import your contract ABI
2. Use wagmi hooks for contract reads and writes
3. Handle transaction states and errors

Example:
```javascript
import { useReadContract, useWriteContract } from 'wagmi'

// Read from contract
const { data } = useReadContract({
  address: '0x...',
  abi: contractABI,
  functionName: 'balanceOf',
  args: [address]
})

// Write to contract
const { writeContract } = useWriteContract()
```

### Styling

This project uses Tailwind CSS. Customize the theme in `tailwind.config.js`.

## Resources

- [{{network_display}} Documentation]({{docs_url}})
- [wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [Vite Documentation](https://vitejs.dev)

## License

MIT
