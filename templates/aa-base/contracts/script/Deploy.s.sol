// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../src/SimpleAccount.sol";
import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";

/**
 * @title Deploy
 * @notice Deployment script for SimpleAccount on Base Sepolia
 */
contract Deploy is Script {
    // Base Sepolia EntryPoint v0.7
    IEntryPoint constant ENTRYPOINT = IEntryPoint(0x0000000071727De22E5E9d8BAf0edAc6f37da032);

    function run() external {
        // Get the deployer's private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying SimpleAccount...");
        console.log("Owner:", deployer);
        console.log("EntryPoint:", address(ENTRYPOINT));

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the SimpleAccount
        SimpleAccount account = new SimpleAccount(ENTRYPOINT, deployer);

        console.log("SimpleAccount deployed at:", address(account));

        vm.stopBroadcast();

        // Log deployment info
        console.log("\n=== Deployment Complete ===");
        console.log("Network: Base Sepolia");
        console.log("Account:", address(account));
        console.log("Owner:", deployer);
        console.log("\nNext steps:");
        console.log("1. Fund the account with testnet ETH");
        console.log("2. Update frontend .env with VITE_ACCOUNT_ADDRESS");
        console.log("3. Run 'npm run dev' in the frontend directory");
    }
}
