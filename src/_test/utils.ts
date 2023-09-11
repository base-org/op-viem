import {
  type Chain,
  createPublicClient,
  createTestClient,
  createWalletClient,
  custom,
  type EIP1193Provider,
  http,
  type PublicClient,
  RpcRequestError,
  webSocket,
} from 'viem'
import { localhost, mainnet } from 'viem/chains'
import { rpc } from 'viem/utils'
import { base } from '../chains/base.js'
import { OpStackChain } from '../types/opStackChain.js'
import { accounts, localHttpUrl, localRollupHttpUrl, localWsUrl, locaRolluplWsUrl } from './constants.js'

export class ProviderRpcError extends Error {
  code: number
  details: string

  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.details = message
  }
}

export const anvilChain = {
  ...localhost,
  id: 1,
  contracts: {
    ...mainnet.contracts,
  },
  rpcUrls: {
    default: {
      http: [localHttpUrl],
      webSocket: [localWsUrl],
    },
    public: {
      http: [localHttpUrl],
      webSocket: [localWsUrl],
    },
  },
} as const satisfies Chain

export const rollupAnvilChain = {
  ...base,
  id: 8453,
  name: 'Rollup Localhost',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [localRollupHttpUrl],
      webSocket: [locaRolluplWsUrl],
    },
    public: {
      http: [localRollupHttpUrl],
      webSocket: [locaRolluplWsUrl],
    },
  },
} as const satisfies OpStackChain

const provider: EIP1193Provider = {
  on: (message, listener) => {
    if (message === 'accountsChanged') {
      listener([accounts[0].address] as any)
    }
  },
  removeListener: () => null,
  request: async ({ method, params }: any) => {
    if (method === 'eth_requestAccounts') {
      return [accounts[0].address]
    }
    if (method === 'personal_sign') {
      method = 'eth_sign'
      params = [params[1], params[0]]
    }
    if (method === 'wallet_watchAsset') {
      if (params.type === 'ERC721') {
        throw new ProviderRpcError(-32602, 'Token type ERC721 not supported.')
      }
      return true
    }
    if (method === 'wallet_addEthereumChain') return null
    if (method === 'wallet_switchEthereumChain') {
      if (params[0].chainId === '0xfa') {
        throw new ProviderRpcError(-4902, 'Unrecognized chain.')
      }
      return null
    }
    if (
      method === 'wallet_getPermissions'
      || method === 'wallet_requestPermissions'
    ) {
      return [
        {
          invoker: 'https://example.com',
          parentCapability: 'eth_accounts',
          caveats: [
            {
              type: 'filterResponse',
              value: ['0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb'],
            },
          ],
        },
      ]
    }

    const { error, result } = await rpc.http(localHttpUrl, {
      body: {
        method,
        params,
      },
    })
    if (error) {
      throw new RpcRequestError({
        body: { method, params },
        error,
        url: localHttpUrl,
      })
    }
    return result
  },
}

const rollupProvider: EIP1193Provider = {
  on: (message, listener) => {
    if (message === 'accountsChanged') {
      listener([accounts[0].address] as any)
    }
  },
  removeListener: () => null,
  request: async ({ method, params }: any) => {
    if (method === 'eth_requestAccounts') {
      return [accounts[0].address]
    }
    if (method === 'personal_sign') {
      method = 'eth_sign'
      params = [params[1], params[0]]
    }
    if (method === 'wallet_watchAsset') {
      if (params.type === 'ERC721') {
        throw new ProviderRpcError(-32602, 'Token type ERC721 not supported.')
      }
      return true
    }
    if (method === 'wallet_addEthereumChain') return null
    if (method === 'wallet_switchEthereumChain') {
      if (params[0].chainId === '0xfa') {
        throw new ProviderRpcError(-4902, 'Unrecognized chain.')
      }
      return null
    }
    if (
      method === 'wallet_getPermissions'
      || method === 'wallet_requestPermissions'
    ) {
      return [
        {
          invoker: 'https://example.com',
          parentCapability: 'eth_accounts',
          caveats: [
            {
              type: 'filterResponse',
              value: ['0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb'],
            },
          ],
        },
      ]
    }

    const { error, result } = await rpc.http(localRollupHttpUrl, {
      body: {
        method,
        params,
      },
    })
    if (error) {
      throw new RpcRequestError({
        body: { method, params },
        error,
        url: localRollupHttpUrl,
      })
    }
    return result
  },
}

export const rollUpHttpClient: PublicClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === 'true',
  },
  chain: rollupAnvilChain,
  pollingInterval: 1_000,
  transport: http(localRollupHttpUrl, {
    batch: process.env.VITE_BATCH_JSON_RPC === 'true',
  }),
}) as PublicClient

export const rollupWebSocketClient: PublicClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === 'true',
  },
  chain: rollupAnvilChain,
  pollingInterval: 1_000,
  transport: webSocket(locaRolluplWsUrl),
}) as PublicClient

export const rollupPublicClient: PublicClient = (
  process.env.VITE_NETWORK_TRANSPORT_MODE === 'webSocket'
    ? rollupWebSocketClient
    : rollUpHttpClient
) as typeof rollUpHttpClient

export const rollupWalletClient = createWalletClient({
  chain: rollupAnvilChain,
  transport: custom(rollupProvider),
})

export const rollupTestClient = createTestClient({
  chain: rollupAnvilChain,
  mode: 'anvil',
  transport: http(localRollupHttpUrl),
})

export const httpClient: PublicClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === 'true',
  },
  chain: anvilChain,
  pollingInterval: 1_000,
  transport: http(localHttpUrl, {
    batch: process.env.VITE_BATCH_JSON_RPC === 'true',
  }),
})

export const webSocketClient: PublicClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === 'true',
  },
  chain: anvilChain,
  pollingInterval: 1_000,
  transport: webSocket(localWsUrl),
})

export const publicClient: PublicClient = (
  process.env.VITE_NETWORK_TRANSPORT_MODE === 'webSocket'
    ? webSocketClient
    : httpClient
) as typeof httpClient

export const publicClientMainnet: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export const walletClient = createWalletClient({
  chain: anvilChain,
  transport: custom(provider),
})

export const walletClientWithAccount = createWalletClient({
  account: accounts[0].address,
  chain: anvilChain,
  transport: custom(provider),
})

export const walletClientWithoutChain = createWalletClient({
  transport: custom(provider),
})

export const testClient = createTestClient({
  chain: anvilChain,
  mode: 'anvil',
  transport: http(localHttpUrl),
})

// export function createHttpServer(
//   handler: RequestListener,
// ): Promise<{ close: () => Promise<unknown>; url: string }> {
//   const server = createServer(handler)

//   const closeAsync = () =>
//     new Promise((resolve, reject) =>
//       server.close((err) => (err ? reject(err) : resolve(undefined))),
//     )

//   return new Promise((resolve) => {
//     server.listen(() => {
//       const { port } = server.address() as AddressInfo
//       resolve({ close: closeAsync, url: `http://localhost:${port}` })
//     })
//   })
// }

// export async function deploy<const TAbi extends Abi | readonly unknown[]>(
//   args: DeployContractParameters<
//     TAbi,
//     typeof walletClientWithAccount['chain'],
//     typeof walletClientWithAccount['account']
//   >,
// ) {
//   const hash = await deployContract(walletClientWithAccount, args)
//   await mine(testClient, { blocks: 1 })
//   const { contractAddress } = await getTransactionReceipt(publicClient, {
//     hash,
//   })
//   return { contractAddress }
// }

// export async function deployBAYC() {
//   return deploy({
//     ...baycContractConfig,
//     args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
//     account: accounts[0].address,
//   })
// }

// export async function deployErrorExample() {
//   return deploy({
//     abi: errorsExampleABI,
//     bytecode: errorsExample.bytecode.object as Hex,
//     account: accounts[0].address,
//   })
// }

// export async function deployEnsAvatarTokenUri() {
//   return deploy({
//     abi: ensAvatarTokenUriABI,
//     bytecode: ensAvatarTokenUri.bytecode.object as Hex,
//     account: accounts[0].address,
//   })
// }

// export async function deployErc20InvalidTransferEvent() {
//   return deploy({
//     abi: erc20InvalidTransferEventABI,
//     bytecode: erc20InvalidTransferEvent.bytecode.object as Hex,
//     account: accounts[0].address,
//   })
// }

// export async function deployOffchainLookupExample({
//   urls,
// }: { urls: string[] }) {
//   return deploy({
//     abi: offchainLookupExampleABI,
//     bytecode: offchainLookupExample.bytecode.object as Hex,
//     account: accounts[0].address,
//     args: [urls],
//   })
// }

// export async function deployPayable() {
//   return deploy({
//     abi: payableABI,
//     bytecode: payable.bytecode.object as Hex,
//     account: accounts[0].address,
//   })
// }

// export async function setBlockNumber(blockNumber: bigint) {
//   await reset(testClient, {
//     blockNumber,
//     jsonRpcUrl: forkUrl,
//   })
// }

// export async function setVitalikResolver() {
//   await impersonateAccount(testClient, {
//     address: address.vitalik,
//   })
//   await writeContract(walletClient, {
//     ...ensRegistryConfig,
//     account: address.vitalik,
//     functionName: 'setResolver',
//     args: [namehash('vitalik.eth'), ensRegistryConfig.address],
//   })
//   await mine(testClient, { blocks: 1 })
//   await stopImpersonatingAccount(testClient, {
//     address: address.vitalik,
//   })
// }
// /* c8 ignore stop */
