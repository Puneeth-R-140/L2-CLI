# L2 CLI

A command-line scaffolding tool for Ethereum Layer 2 application development, with first-class support for Base and Optimism networks.

## Overview

L2 CLI streamlines the process of creating production-ready applications on Ethereum Layer 2 networks. Built with Rust for performance and reliability, it provides opinionated templates and tooling to help developers ship faster.

## Features

- **Multi-network Support**: Seamless integration with Base and Optimism L2 networks
- **Modern Stack**: React 18, Vite, Tailwind CSS, and wagmi for Web3 interactions
- **Zero Configuration**: Sensible defaults with the flexibility to customize
- **Type-safe**: Full TypeScript support across all templates
- **Production Ready**: Optimized builds and best practices baked in

## Installation

### From Source

```bash
git clone https://github.com/Puneeth-R-140/L2-CLI.git
cd L2-CLI
cargo install --path .
```

### Prerequisites

- Rust 1.75 or newer
- Node.js 18+ (for generated React applications)

## Usage

### Creating a New Project

```bash
# Interactive mode
l2 init

# With options
l2 init my-dapp --network base --template react

# Quick start with defaults
l2 init my-project
```

### Configuration Management

```bash
# View current configuration
l2 config list

# Set default network
l2 config set network optimism

# Set default template
l2 config set template react

# Reset to defaults
l2 config reset
```

### Environment Verification

```bash
# Check development environment
l2 doctor
```

## Supported Networks

### Base

Coinbase's Ethereum L2 network built on the OP Stack.

- **Chain ID**: 8453
- **RPC**: https://mainnet.base.org
- **Explorer**: https://basescan.org
- **Documentation**: https://docs.base.org

### Optimism

Ethereum's first production-grade optimistic rollup.

- **Chain ID**: 10
- **RPC**: https://mainnet.optimism.io
- **Explorer**: https://optimistic.etherscan.io
- **Documentation**: https://docs.optimism.io

## Templates

### JavaScript (Default)

Minimal setup with vanilla JavaScript and Web3.js integration. Ideal for quick prototypes and learning.

### React

Modern React 18 application with:
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- wagmi hooks for Web3 interactions
- RainbowKit for wallet connection UI
- Pre-configured for Base and Optimism networks

## Project Structure

Generated projects follow a standard structure:

```
my-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── wagmi.js         # Web3 configuration
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/Puneeth-R-140/L2-CLI.git
cd L2-CLI

# Build the project
cargo build --release

# Run locally
cargo run -- init test-app

# Run tests
cargo test
```

### Contributing

Contributions are welcome. Please ensure your code follows the existing style and includes appropriate tests.

Areas of interest:
- Additional framework templates (Vue, Svelte, Angular)
- Support for more L2 networks (Arbitrum, zkSync)
- Code generation utilities
- Testing frameworks integration

## Roadmap

- [x] Base and Optimism network support
- [x] JavaScript template
- [x] React template with wagmi integration
- [x] Configuration management
- [ ] Next.js template
- [ ] Component generation
- [ ] TypeScript scaffolding
- [ ] Arbitrum network support
- [ ] Testing utilities
- [ ] Deployment automation

## Resources

- [Base Documentation](https://docs.base.org)
- [Optimism Documentation](https://docs.optimism.io)
- [Ethereum Layer 2 Overview](https://ethereum.org/layer-2)
- [wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)

## License

MIT License. See [LICENSE](LICENSE) for details.

## Author

Puneeth R - Solo developer focused on Ethereum L2 tooling and infrastructure.

## Support

- Issues: [GitHub Issues](https://github.com/Puneeth-R-140/L2-CLI/issues)
- Discussions: [GitHub Discussions](https://github.com/Puneeth-R-140/L2-CLI/discussions)

---

Built for the Ethereum Layer 2 ecosystem.
