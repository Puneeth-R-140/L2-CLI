# L2 CLI

A command-line scaffolding tool for Ethereum Layer 2 application development, with first-class support for Base and Optimism networks. Features integrated Account Abstraction (ERC-4337) support for building next-generation Web3 applications.

## Overview

L2 CLI streamlines the process of creating production-ready applications on Ethereum Layer 2 networks. Built with Rust for performance and reliability, it provides opinionated templates and tooling to help developers ship faster. The tool includes comprehensive support for Account Abstraction, enabling gasless transactions and improved user experience on Base.

## Features

- **Multi-network Support**: Seamless integration with Base and Optimism L2 networks
- **Account Abstraction**: Built-in ERC-4337 support with smart account templates and gasless transactions (Base-first)
- **Modern Stack**: React 18, Vite, Tailwind CSS, and wagmi for Web3 interactions
- **Smart Contract Integration**: Foundry-based contract development with deployment scripts
- **Zero Configuration**: Sensible defaults with the flexibility to customize
- **Production Ready**: Optimized builds and best practices baked in

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/Puneeth-R-140/L2-CLI.git
cd L2-CLI

# Install the binary
cargo install --path .
```

This installs the `l2` command globally on your system.

**Note for Windows users:** You may need to restart your terminal or add `C:\Users\<username>\.cargo\bin` to your PATH environment variable.

### Prerequisites

- Rust 1.75 or newer
- Node.js 18+ (for generated React applications)
- Foundry (optional, for smart contract development)

### Verify Installation

```bash
l2 --version
l2 --help
```

If the `l2` command is not found, restart your terminal or add Cargo's bin directory to your PATH.

## Usage

### Creating a Standard Project

```bash
# Interactive mode
l2 init

# With options
l2 init my-app --network base --template react
```

### Creating an Account Abstraction Project

```bash
# Initialize with AA support (Base only)
l2 init my-app --network base --template react --account-abstraction
```

This generates a complete project structure with:
- ERC-4337 smart account contracts (Foundry)
- React frontend with permissionless.js integration
- Pimlico bundler/paymaster configuration
- Ready-to-use gasless transaction components

### Available Options

- `--network <network>`: Target L2 network (base, optimism)
- `--template <template>`: Project template (javascript, react)
- `--account-abstraction`: Enable Account Abstraction support (Base only)

## Account Abstraction Setup

When using the `--account-abstraction` flag, the generated project includes:

### Contracts

```bash
cd my-app/contracts
forge install
forge build
forge test
```

Includes:
- `SimpleAccount.sol`: ERC-4337 compatible smart account
- Deployment scripts for Base Sepolia
- EntryPoint v0.7 integration

### Frontend

```bash
cd my-app/frontend
npm install
npm run dev
```

Features:
- Smart account creation and management
- Gasless transaction support via Pimlico paymaster
- WalletConnect integration with RainbowKit
- React hooks for ERC-4337 operations

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
VITE_BUNDLER_URL=https://api.pimlico.io/v2/84532/rpc?apikey=YOUR_API_KEY
VITE_PAYMASTER_URL=https://api.pimlico.io/v2/84532/rpc?apikey=YOUR_API_KEY
VITE_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

Get API keys:
- Pimlico: https://dashboard.pimlico.io (free tier available)
- WalletConnect: https://cloud.walletconnect.com

## Configuration

### Global Configuration

```bash
# View current config
l2 config list

# Set a value
l2 config set <key> <value>

# Get a value
l2 config get <key>

# Reset to defaults
l2 config reset
```

Configuration is stored in `~/.l2-cli/config.toml`.

### Environment Check

```bash
l2 doctor
```

Validates your development environment, including:
- Rust and Cargo installation
- Node.js and npm versions
- Configuration status
- Network connectivity

## Project Structure

### Standard React Template

```
my-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── wagmi.js
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### Account Abstraction Template

```
my-app/
├── contracts/
│   ├── src/
│   │   └── SimpleAccount.sol
│   ├── script/
│   │   └── Deploy.s.sol
│   ├── test/
│   └── foundry.toml
├── frontend/
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useSmartAccount.js
│   │   ├── components/
│   │   │   └── GaslessButton.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── wagmi.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## Technology Stack

### CLI
- Rust with Clap for argument parsing
- Tera for template rendering
- Colored output for better UX

### Generated Applications
- **Frontend**: React 18, Vite, Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **Account Abstraction**: permissionless.js v0.3+
- **Contracts**: Foundry, Solidity 0.8.23+

## Development

### Running from Source

```bash
# During development
cargo run -- init my-app --network base

# After installation
l2 init my-app --network base
```

### Running Tests

```bash
cargo test
```

### Building

```bash
cargo build --release
```

The binary will be available at `target/release/l2`.

## Contributing

Contributions are welcome. Please ensure:
- Code follows Rust best practices
- Tests pass
- Documentation is updated
- Commits are clear and descriptive

## License

MIT License - see LICENSE file for details.

## Author

Puneeth R
- GitHub: [@Puneeth-R-140](https://github.com/Puneeth-R-140)
- Repository: [L2-CLI](https://github.com/Puneeth-R-140/L2-CLI)

## Acknowledgments

Built with Rust. Powered by Base, Optimism, Pimlico, and the Ethereum ecosystem.

## Support

For issues and feature requests, please use the GitHub issue tracker.

## Roadmap

- Additional L2 network support
- More smart contract templates
- Advanced AA features (session keys, multi-sig)
- Enhanced developer tooling
