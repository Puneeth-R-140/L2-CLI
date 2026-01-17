# {{project_name}} - Smart Contracts

ERC-4337 smart account implementation using Foundry.

## Setup

Install dependencies:
```bash
forge install
```

## Build

```bash
forge build
```

## Test

```bash
forge test -vv
```

## Deploy to Base Sepolia

1. Set up environment variables:
```bash
export PRIVATE_KEY=your_private_key_here
export BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

2. Deploy:
```bash
forge script script/Deploy.s.sol:Deploy --rpc-url base_sepolia --broadcast --verify
```

3. Save the deployed account address for the frontend.

## Contract Details

- **SimpleAccount.sol**: ERC-4337 smart account
- **EntryPoint**: `0x0000000071727De22E5E9d8BAf0edAc6f37da032` (Base Sepolia)
- **Owner**: Your EOA (from PRIVATE_KEY)

## Resources

- [Base Sepolia Faucet](https://faucet.quicknode.com/base/sepolia)
- [BaseScan Sepolia](https://sepolia.basescan.org/)
- [ERC-4337 Spec](https://eips.ethereum.org/EIPS/eip-4337)
