# Contributing to L2 CLI

Thank you for considering contributing to L2 CLI. This document outlines the process and guidelines for contributions.

## Development Setup

### Prerequisites

- Rust 1.75 or newer
- Git
- A GitHub account

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/L2-CLI.git
   cd L2-CLI
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/Puneeth-R-140/L2-CLI.git
   ```
4. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes

### Code Style

- Follow Rust standard formatting (use `cargo fmt`)
- Run `cargo clippy` and address any warnings
- Write clear, descriptive commit messages
- Add tests for new functionality

### Testing

Before submitting a pull request:

```bash
# Format code
cargo fmt

# Run linter
cargo clippy

# Run tests
cargo test

# Build in release mode
cargo build --release

# Test the CLI
cargo run -- init test-app --template react --network base
```

### Commit Messages

Use clear, descriptive commit messages:

```
Add support for Arbitrum network

- Implement Arbitrum chain configuration
- Add RPC endpoints and explorer URLs
- Update documentation
```

## Submitting Changes

1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a pull request on GitHub
3. Describe your changes clearly in the PR description
4. Link any related issues

## Pull Request Guidelines

- Keep changes focused and atomic
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass
- Respond to review feedback promptly

## Areas for Contribution

### High Priority

- Additional L2 network support (Arbitrum, zkSync, Polygon zkEVM)
- Next.js template implementation
- Component generation utilities
- Testing framework integration

### Medium Priority

- Vue.js template
- Svelte template
- TypeScript scaffolding improvements
- CLI performance optimizations

### Documentation

- Tutorial content
- Example projects
- API documentation
- Video guides

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Focus on the code, not the person
- Help create a welcoming environment

## Questions

If you have questions about contributing:

- Open a discussion on GitHub
- Check existing issues and pull requests
- Review the documentation

## License

By contributing to L2 CLI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping improve L2 CLI.
