import { useState, useEffect, useCallback } from 'react'
import { useWalletClient } from 'wagmi'
import { createSmartAccountClient } from 'permissionless'
import { toSimpleSmartAccount } from 'permissionless/accounts'
import { createPimlicoClient } from 'permissionless/clients/pimlico'
import { baseSepolia } from 'viem/chains'
import { http, createPublicClient } from 'viem'

// EntryPoint v0.7 address (constant)
const ENTRYPOINT_V07_ADDRESS = '0x0000000071727De22E5E9d8BAf0edAc6f37da032'

/**
 * Custom hook for managing ERC-4337 smart account
 * Integrates with permissionless.js for account abstraction
 */
export function useSmartAccount() {
    const { data: walletClient } = useWalletClient()
    const [smartAccountClient, setSmartAccountClient] = useState(null)
    const [smartAccountAddress, setSmartAccountAddress] = useState(null)
    const [isDeployed, setIsDeployed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Initialize smart account when wallet connects
    useEffect(() => {
        if (!walletClient) {
            setSmartAccountClient(null)
            setSmartAccountAddress(null)
            setIsDeployed(false)
            return
        }

        const initializeSmartAccount = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const bundlerUrl = import.meta.env.VITE_BUNDLER_URL
                const paymasterUrl = import.meta.env.VITE_PAYMASTER_URL

                // Check configuration
                if (!bundlerUrl || bundlerUrl.includes('YOUR_')) {
                    setError('Bundler URL not configured. Please add VITE_BUNDLER_URL to your .env file.')
                    setIsLoading(false)
                    return
                }

                // Create public client
                const publicClient = createPublicClient({
                    chain: baseSepolia,
                    transport: http(import.meta.env.VITE_RPC_URL || 'https://sepolia.base.org'),
                })

                // Create pimlico paymaster client (optional)
                const paymasterClient = paymasterUrl && !paymasterUrl.includes('YOUR_')
                    ? createPimlicoClient({
                        entryPoint: {
                            address: ENTRYPOINT_V07_ADDRESS,
                            version: '0.7',
                        },
                        transport: http(paymasterUrl),
                    })
                    : undefined

                // Create simple smart account
                const simpleAccount = await toSimpleSmartAccount({
                    client: publicClient,
                    owner: walletClient,
                    entryPoint: {
                        address: ENTRYPOINT_V07_ADDRESS,
                        version: '0.7',
                    },
                })

                setSmartAccountAddress(simpleAccount.address)

                // Create smart account client options
                const clientConfig = {
                    account: simpleAccount,
                    chain: baseSepolia,
                    bundlerTransport: http(bundlerUrl),
                }

                // Add paymaster if configured
                if (paymasterClient) {
                    clientConfig.paymaster = paymasterClient
                    clientConfig.userOperation = {
                        estimateFeesPerGas: async () => {
                            return (await paymasterClient.getUserOperationGasPrice()).fast
                        },
                    }
                }

                // Create smart account client
                const smartClient = createSmartAccountClient(clientConfig)

                setSmartAccountClient(smartClient)

                // Check if account is already deployed
                const code = await publicClient.getBytecode({
                    address: simpleAccount.address,
                })
                setIsDeployed(code && code !== '0x')

                setIsLoading(false)
            } catch (err) {
                console.error('Failed to initialize smart account:', err)
                setError(err.message || 'Failed to initialize smart account')
                setIsLoading(false)
            }
        }

        initializeSmartAccount()
    }, [walletClient])

    // Send a user operation (gasless transaction)
    const sendUserOperation = useCallback(
        async ({ target, value = 0n, data = '0x' }) => {
            if (!smartAccountClient) {
                throw new Error('Smart account not initialized')
            }

            try {
                const userOpHash = await smartAccountClient.sendUserOperation({
                    calls: [{
                        to: target,
                        value,
                        data,
                    }],
                })

                return userOpHash
            } catch (err) {
                console.error('User operation failed:', err)
                throw err
            }
        },
        [smartAccountClient]
    )

    // Wait for user operation receipt
    const waitForUserOperationReceipt = useCallback(
        async (userOpHash) => {
            if (!smartAccountClient) {
                throw new Error('Smart account not initialized')
            }

            const receipt = await smartAccountClient.waitForUserOperationReceipt({
                hash: userOpHash,
            })

            return receipt
        },
        [smartAccountClient]
    )

    return {
        smartAccountClient,
        smartAccountAddress,
        isDeployed,
        isLoading,
        error,
        sendUserOperation,
        waitForUserOperationReceipt,
    }
}
