import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance } from 'wagmi'

function App() {
    const { address, isConnected } = useAccount()
    const { data: balance } = useBalance({ address })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            {{project_name}}
                        </h1>
                        <p className="text-xl text-gray-700">
                            Built on {{network_display}} L2
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Welcome to L2
                            </h2>
                            <ConnectButton />
                        </div>

                        {isConnected ? (
                            <div className="space-y-6">
                                {/* Wallet Info */}
                                <div className="bg-[#174D38] rounded-xl p-6 border border-gray-300">
                                    <h3 className="text-lg font-medium text-white mb-4">
                                        Wallet Info
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-200">Address:</span>
                                            <span className="text-white font-mono text-sm">
                                                {address?.slice(0, 6)}...{address?.slice(-4)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-200">Balance:</span>
                                            <span className="text-white font-semibold">
                                                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0 ETH'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-200">Network:</span>
                                            <span className="text-white">{{network_display}}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="bg-[#174D38] hover:bg-[#0f3a29] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                                            Send
                                        </button>
                                        <button className="bg-[#4D1717] hover:bg-[#3a1111] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                                            Swap
                                        </button>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-gray-100 border border-gray-300 rounded-xl p-4">
                                    <p className="text-gray-700 text-sm">
                                        <strong className="text-gray-900">Tip:</strong> This is a starter template.
                                        Add your smart contract interactions in the components!
                                    </p>
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
                                    Get started by connecting your wallet to {{network_display}}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            Built with L2 CLI • Powered by {{network_display}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

