# L2 CLI

> Fast, opinionated scaffolding for Ethereum Layer 2 applications

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Rust](https://img.shields.io/badge/rust-1.75%2B-orange)

Command-line tool for quickly creating production-ready applications on Base and Optimism.

## Why L2 CLI?

Building on Layer 2 should be easy. L2 CLI gets you from idea to working app in 60 seconds:

- **Zero config** - Sensible defaults, works out of the box
- **Multiple networks** - Base and Optimism support
- **Modern stack** - React, Next.js, TypeScript ready
- **Best practices** - Security, gas optimization built-in

## Quick Start

```bash
# Install
cargo install l2-cli

# Create an app
l2 init my-dapp

# Select network (Base/Optimism)
# Project ready in seconds!
```

## Installation

### From Cargo (Recommended)

```bash
cargo install l2-cli
```

### From Source

```bash
git clone https://github.com/Puneeth-R-140/L2-CLI.git
cd L2-CLI
cargo install --path .
```

### Prerequisites

- Rust 1.75 or newer
- Node.js 18+ (for React/Next.js templates)

## Usage

### Create a New Project

```bash
# Interactive mode
l2 init

# With options
l2 init my-app --network base --template react --typescript

# Quick start
l2 init my-dapp
```

### Configuration

```bash
# View settings
l2 config list

# Set defaults
l2 config set network optimism
l2 config set template react

# Reset to defaults
l2 config reset
```

### Health Check

```bash
# Verify environment
l2 doctor
```

## Supported Networks

### Base (Coinbase L2)
- **Mainnet:** Chain ID 8453
- **RPC:** https://mainnet.base.org
- **Explorer:** https://basescan.org

### Optimism
- **Mainnet:** Chain ID 10
- **RPC:** https://mainnet.optimism.io
- **Explorer:** https://optimistic.etherscan.io

## Templates

### JavaScript (Default)
- Vanilla JavaScript + Web3.js
- Minimal setup, maximum flexibility
- Perfect for quick prototypes

### React (Coming Soon)
- React 18 + Vite
- TypeScript support
- wagmi for Web3 hooks
- Tailwind CSS integration

### Next.js (Coming Soon)
- Next.js 14 App Router
- Server-side rendering
- API routes
- Production-optimized

## Project Structure

```
my-app/
├── index.html      # Main entry point
├── app.js          # Web3 integration
└── README.md       # Project documentation
```

## Examples

### Basic DeFi App
```bash
l2 init defi-dashboard --network base
cd defi-dashboard
# Edit index.html, add your logic
```

### NFT Marketplace
```bash
l2 init nft-market --network optimism
cd nft-market
# Build your marketplace
```

## Development

```bash
# Clone repository
git clone https://github.com/Puneeth-R-140/L2-CLI.git
cd L2-CLI

# Build
cargo build

# Run locally
cargo run -- init test-app

# Run tests
cargo test
```

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Areas we'd love help:**
- Additional templates (Vue, Svelte, Angular)
- More L2 networks (Arbitrum, zkSync)
- Component generators
- Testing utilities

## Roadmap

- [x] Base & Optimism support
- [x] JavaScript template
- [x] Configuration management
- [ ] React template
- [ ] Next.js template
- [ ] Component generation
- [ ] TypeScript scaffolding
- [ ] Arbitrum support
- [ ] Testing utilities
- [ ] Deployment tools

## Resources

- [Base Documentation](https://docs.base.org)
- [Optimism Documentation](https://docs.optimism.io)
- [Ethereum L2 Overview](https://ethereum.org/layer-2)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Community

- **Issues:** [GitHub Issues](https://github.com/Puneeth-R-140/L2-CLI/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Puneeth-R-140/L2-CLI/discussions)

---

**Built for the Ethereum L2 community**  
Made with ⚡ by developers, for developers

_Star this repo if you find it useful!_ ⭐
