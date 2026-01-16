# System Requirements

## For CLI Development

### Required

**Rust Toolchain**
- Version: 1.75 or newer
- Purpose: Building the L2 CLI binary
- Installation: https://rustup.rs

**Cargo**
- Included with Rust installation
- Purpose: Dependency management and build system

### Status

The L2 CLI tool itself requires only Rust and Cargo. No additional runtime dependencies are needed to build or run the CLI.

## For Generated Applications

When users generate React applications using `l2 init`, they will need:

### Required

**Node.js**
- Version: 18.0.0 or newer
- Purpose: Running the development server and build tools
- Installation: https://nodejs.org
- Verification: `node --version`

**npm**
- Included with Node.js installation
- Purpose: Package management for JavaScript dependencies
- Verification: `npm --version`

### Optional

**MetaMask or Compatible Web3 Wallet**
- Purpose: Testing wallet connection features in generated applications
- Not required for development, only for testing Web3 functionality
- Browser extension or mobile app

## Network Connectivity

**During CLI Build**
- Internet connection required to download Rust crates
- Specifically needed for `include_dir` dependency

**During Application Development**
- Internet connection required for `npm install`
- RPC access to Base or Optimism networks for Web3 functionality

## Development Environment

### Recommended

- **Terminal**: PowerShell, bash, or zsh
- **Editor**: VS Code, Vim, or any text editor with Rust support
- **Git**: For version control and repository management

### Tested Platforms

- Windows 10/11 with PowerShell
- macOS 12+
- Linux (Ubuntu 20.04+, Fedora 35+)

## Build Process

### CLI Tool

```bash
# Clean build
cargo clean
cargo build --release

# Development build (faster, larger binary)
cargo build
```

### Generated React Applications

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
```

## Troubleshooting

### Python Dependency Errors

Some npm packages require Python for native module compilation. If you encounter errors during `npm install`:

**Option 1**: Install Python 3.x from python.org

**Option 2**: Skip native module builds (recommended for development):
```bash
npm install --legacy-peer-deps --ignore-scripts
```

The `utf-8-validate` and similar packages are optional performance optimizations and not required for functionality.

### Network Issues

If cargo build fails with network errors:
- Check internet connectivity
- Retry the build command
- Consider using a VPN if behind restrictive firewall

## Summary

**To build L2 CLI**: Rust + Cargo

**To run generated apps**: Node.js 18+

**To test Web3 features**: MetaMask or compatible wallet (optional)
