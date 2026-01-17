import { useState } from 'react'
import { useSmartAccount } from '../hooks/useSmartAccount'

/**
 * Demo component showing gasless transaction functionality
 * Sends a simple transaction without the user paying gas
 */
export function GaslessButton() {
    const {
        smartAccountAddress,
        isDeployed,
        isLoading: accountLoading,
        error: accountError,
        sendUserOperation,
        waitForUserOperationReceipt,
    } = useSmartAccount()

    const [txStatus, setTxStatus] = useState('ready') // ready, sending, pending, success, error
    const [txHash, setTxHash] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSendGaslessTransaction = async () => {
        if (!smartAccountAddress) {
            setErrorMessage('Smart account not initialized')
            return
        }

        try {
            setTxStatus('sending')
            setErrorMessage(null)

            // Simple demo: send 0 ETH to self
            // In production, this would call a real contract function
            const userOpHash = await sendUserOperation({
                target: smartAccountAddress,
                value: 0n,
                data: '0x',
            })

            console.log('UserOperation hash:', userOpHash)
            setTxStatus('pending')

            // Wait for the transaction to be mined
            const receipt = await waitForUserOperationReceipt(userOpHash)

            console.log('Transaction receipt:', receipt)
            setTxHash(receipt.receipt.transactionHash)
            setTxStatus('success')
        } catch (error) {
            console.error('Transaction failed:', error)
            setErrorMessage(error.message || 'Transaction failed')
            setTxStatus('error')
        }
    }

    if (accountLoading) {
        return (
            <div className="p-6 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#174D38]"></div>
                    <span className="ml-3 text-gray-700">Initializing smart account...</span>
                </div>
            </div>
        )
    }

    if (accountError) {
        return (
            <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Account Error</h3>
                <p className="text-red-700 text-sm">{accountError}</p>
                <p className="text-red-600 text-xs mt-2">
                    Make sure you've configured VITE_BUNDLER_URL in your .env file
                </p>
            </div>
        )
    }

    if (!smartAccountAddress) {
        return (
            <div className="p-6 bg-gray-100 rounded-xl border border-gray-200">
                <p className="text-gray-700 text-center">Connect your wallet to use the smart account</p>
            </div>
        )
    }

    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Gasless Transaction Demo
            </h3>

            {/* Smart Account Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Smart Account:</span>
                    <span className="text-xs font-mono text-gray-900">
                        {smartAccountAddress?.slice(0, 6)}...{smartAccountAddress?.slice(-4)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-xs font-semibold ${isDeployed ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                        {isDeployed ? 'Deployed' : 'Not deployed (will deploy on first tx)'}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={handleSendGaslessTransaction}
                disabled={txStatus === 'sending' || txStatus === 'pending'}
                className="w-full bg-[#174D38] hover:bg-[#0f3a29] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
                {txStatus === 'ready' && 'Send Gasless Transaction'}
                {txStatus === 'sending' && (
                    <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        Preparing Transaction...
                    </>
                )}
                {txStatus === 'pending' && (
                    <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        Confirming on-chain...
                    </>
                )}
                {txStatus === 'success' && '✓ Transaction Successful!'}
                {txStatus === 'error' && 'Try Again'}
            </button>

            {/* Success Message */}
            {txStatus === 'success' && txHash && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 font-semibold mb-2">Transaction successful!</p>
                    <a
                        href={`https://sepolia.basescan.org/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                    >
                        View on BaseScan →
                    </a>
                </div>
            )}

            {/* Error Message */}
            {txStatus === 'error' && errorMessage && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-800 font-semibold mb-1">Transaction failed</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-900 text-sm">
                    <strong>How it works:</strong> This transaction is executed through your smart account
                    using ERC-4337. With a paymaster configured, gas fees are sponsored!
                </p>
            </div>
        </div>
    )
}
