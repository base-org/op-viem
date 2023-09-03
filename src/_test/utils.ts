import {
  Address,
  Chain,
  createPublicClient,
  createTestClient,
  createWalletClient,
  custom,
  EIP1193Provider,
  http,
  RpcRequestError,
  webSocket,
} from "viem";
import { base, localhost, mainnet } from "viem/chains";
import { rpc } from "viem/utils";
import { accounts, localHttpUrl, localRollupHttpUrl, localWsUrl, locaRolluplWsUrl } from "./constants.js";

export class ProviderRpcError extends Error {
  code: number;
  details: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.details = message;
  }
}

// TODO(wilson): remove after viem updates types
export type ContractRichChain = Chain & {
  contracts: {
    [key: string]: { [chainId: number]: Address };
  };
};

export const anvilChain = {
  ...localhost,
  id: 1,
  contracts: {
    ...mainnet.contracts,
    optimismL1CrossDomainMessenger: {
      8453: "0x866E82a600A1414e583f7F13623F1aC5d58b0Afa",
    },
    optimismL1Erc721Bridge: {
      8453: "0x608d94945A64503E642E6370Ec598e519a2C1E53",
    },
    optimismL1StandardBridge: {
      8453: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
    },
    optimismL2OutputOracle: {
      8453: "0x56315b90c40730925ec5485cf004d835058518A0",
    },
    optimismPortal: {
      8453: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
    },
    optimismSystemConfig: {
      8453: "0x73a79Fab69143498Ed3712e519A88a918e1f4072",
    },
    optimismSystemDictator: {
      8453: "0x1fE3fdd1F0193Dd657C0a9AAC37314D6B479E557",
    },
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
} as const satisfies ContractRichChain;

export const rollupAnvilChain = {
  id: 2,
  name: "Rollup Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  contracts: base.contracts,
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
} as const satisfies Chain;

const provider: EIP1193Provider = {
  on: (message, listener) => {
    if (message === "accountsChanged") {
      listener([accounts[0].address] as any);
    }
  },
  removeListener: () => null,
  request: async ({ method, params }: any) => {
    if (method === "eth_requestAccounts") {
      return [accounts[0].address];
    }
    if (method === "personal_sign") {
      method = "eth_sign";
      params = [params[1], params[0]];
    }
    if (method === "wallet_watchAsset") {
      if (params.type === "ERC721") {
        throw new ProviderRpcError(-32602, "Token type ERC721 not supported.");
      }
      return true;
    }
    if (method === "wallet_addEthereumChain") return null;
    if (method === "wallet_switchEthereumChain") {
      if (params[0].chainId === "0xfa") {
        throw new ProviderRpcError(-4902, "Unrecognized chain.");
      }
      return null;
    }
    if (
      method === "wallet_getPermissions"
      || method === "wallet_requestPermissions"
    ) {
      return [
        {
          invoker: "https://example.com",
          parentCapability: "eth_accounts",
          caveats: [
            {
              type: "filterResponse",
              value: ["0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb"],
            },
          ],
        },
      ];
    }

    const { error, result } = await rpc.http(localHttpUrl, {
      body: {
        method,
        params,
      },
    });
    if (error) {
      throw new RpcRequestError({
        body: { method, params },
        error,
        url: localHttpUrl,
      });
    }
    return result;
  },
};

const rollupProvider: EIP1193Provider = {
  on: (message, listener) => {
    if (message === "accountsChanged") {
      listener([accounts[0].address] as any);
    }
  },
  removeListener: () => null,
  request: async ({ method, params }: any) => {
    if (method === "eth_requestAccounts") {
      return [accounts[0].address];
    }
    if (method === "personal_sign") {
      method = "eth_sign";
      params = [params[1], params[0]];
    }
    if (method === "wallet_watchAsset") {
      if (params.type === "ERC721") {
        throw new ProviderRpcError(-32602, "Token type ERC721 not supported.");
      }
      return true;
    }
    if (method === "wallet_addEthereumChain") return null;
    if (method === "wallet_switchEthereumChain") {
      if (params[0].chainId === "0xfa") {
        throw new ProviderRpcError(-4902, "Unrecognized chain.");
      }
      return null;
    }
    if (
      method === "wallet_getPermissions"
      || method === "wallet_requestPermissions"
    ) {
      return [
        {
          invoker: "https://example.com",
          parentCapability: "eth_accounts",
          caveats: [
            {
              type: "filterResponse",
              value: ["0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb"],
            },
          ],
        },
      ];
    }

    const { error, result } = await rpc.http(localRollupHttpUrl, {
      body: {
        method,
        params,
      },
    });
    if (error) {
      throw new RpcRequestError({
        body: { method, params },
        error,
        url: localRollupHttpUrl,
      });
    }
    return result;
  },
};

export const rollUpHttpClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === "true",
  },
  chain: rollupAnvilChain,
  pollingInterval: 1_000,
  transport: http(localRollupHttpUrl, {
    batch: process.env.VITE_BATCH_JSON_RPC === "true",
  }),
});

export const rollupWebSocketClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === "true",
  },
  chain: rollupAnvilChain,
  pollingInterval: 1_000,
  transport: webSocket(locaRolluplWsUrl),
});

export const rollupPublicClient = (
  process.env.VITE_NETWORK_TRANSPORT_MODE === "webSocket"
    ? rollupWebSocketClient
    : rollUpHttpClient
) as typeof rollUpHttpClient;

export const rollupWalletClient = createWalletClient({
  chain: rollupAnvilChain,
  transport: custom(rollupProvider),
});

export const rollupTestClient = createTestClient({
  chain: rollupAnvilChain,
  mode: "anvil",
  transport: http(localHttpUrl),
});

export const httpClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === "true",
  },
  chain: anvilChain,
  pollingInterval: 1_000,
  transport: http(localHttpUrl, {
    batch: process.env.VITE_BATCH_JSON_RPC === "true",
  }),
});

export const webSocketClient = createPublicClient({
  batch: {
    multicall: process.env.VITE_BATCH_MULTICALL === "true",
  },
  chain: anvilChain,
  pollingInterval: 1_000,
  transport: webSocket(localWsUrl),
});

export const publicClient = (
  process.env.VITE_NETWORK_TRANSPORT_MODE === "webSocket"
    ? webSocketClient
    : httpClient
) as typeof httpClient;

export const publicClientMainnet = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: anvilChain,
  transport: custom(provider),
});

export const walletClientWithAccount = createWalletClient({
  account: accounts[0].address,
  chain: anvilChain,
  transport: custom(provider),
});

export const walletClientWithoutChain = createWalletClient({
  transport: custom(provider),
});

export const testClient = createTestClient({
  chain: anvilChain,
  mode: "anvil",
  transport: http(localHttpUrl),
});

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
