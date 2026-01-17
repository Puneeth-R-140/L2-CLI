import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { GaslessButton } from './components/GaslessButton'
import { useSmartAccount } from './hooks/useSmartAccount'

function App() {
    const { address, isConnected } = useAccount()
    const { smartAccountAddress } = useSmartAccount()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            {{ project_name }}
                        </h1>
                        <p className="text-xl text-gray-700 mb-2">
                            Account Abstraction on Base
                        </p>
                        <p className="text-sm text-gray-600">
                            Experience gasless transactions with ERC-4337
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Smart Account Wallet
                            </h2>
                            <ConnectButton />
                        </div>

                        {isConnected ? (
                            <div className="space-y-6">
                                {/* EOA Info */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Your Wallet (EOA)
                                    </h3>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Address:</span>
                                        <span className="font-mono text-sm text-gray-900">
                                            {address?.slice(0, 6)}...{address?.slice(-4)}
                                        </span>
                                    </div>
                                </div>

                                {/* Smart Account Demo */}
                                <GaslessButton />

                                {/* Info Section */}
                                <div className="bg-[#174D38] rounded-xl p-6 text-white">
                                    <h3 className="text-lg font-semibold mb-3">What is Account Abstraction?</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Your smart account is a contract wallet with advanced features</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Gasless transactions - someone else pays the gas fees</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>More security - programmable transaction validation</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Better UX - no need to hold ETH to transact</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Links */}
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="https://docs.base.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center transition-colors"
                                    >
                                        <span className="text-gray-90 font-medium">Base Docs</span>
                                    </a>
                                    <a
                                        href="https://eips.ethereum.org/EIPS/eip-4337"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center transition-colors"
                                    >
                                        <span className="text-gray-900 font-medium">ERC-4337 Spec</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mb-6">
                                    <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                    Connect Your Wallet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Get started with account abstraction on Base Sepolia
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            Built with L2 CLI • Powered by Base • ERC-4337 Account Abstraction
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
