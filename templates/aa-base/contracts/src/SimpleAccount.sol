// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/core/Helpers.sol";

/**
 * @title SimpleAccount
 * @notice Minimal ERC-4337 smart account implementation for {{project_name}}
 * @dev This is a production-ready smart account with basic ownership and execution
 */
contract SimpleAccount is BaseAccount {
    address public immutable owner;

    event SimpleAccountInitialized(IEntryPoint indexed entryPoint, address indexed owner);

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    /// @inheritdoc BaseAccount
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    // Explicit visibility for the immutable field
    IEntryPoint private immutable _entryPoint;

    receive() external payable {}

    constructor(IEntryPoint anEntryPoint, address anOwner) {
        _entryPoint = anEntryPoint;
        owner = anOwner;
        emit SimpleAccountInitialized(anEntryPoint, anOwner);
    }

    function _onlyOwner() internal view {
        require(msg.sender == owner || msg.sender == address(this), "only owner");
    }

    /**
     * @dev Execute a transaction (called directly by owner or by entryPoint)
     */
    function execute(address dest, uint256 value, bytes calldata func) external {
        _requireFromEntryPointOrOwner();
        _call(dest, value, func);
    }

    /**
     * @dev Execute a sequence of transactions
     */
    function executeBatch(address[] calldata dest, bytes[] calldata func) external {
        _requireFromEntryPointOrOwner();
        require(dest.length == func.length, "wrong array lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            _call(dest[i], 0, func[i]);
        }
    }

    /**
     * @dev Internal execute call
     */
    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    /**
     * @dev Validate signature for ERC-4337 UserOperation
     */
    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        if (owner != hash.recover(userOp.signature)) {
            return SIG_VALIDATION_FAILED;
        }
        return 0;
    }

    function _requireFromEntryPointOrOwner() internal view {
        require(
            msg.sender == address(entryPoint()) || msg.sender == owner,
            "account: not Owner or EntryPoint"
        );
    }
}
