import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts'
import type {
  Account,
  Address,
  Chain,
  SendTransactionParameters,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import { optimism, type mainnet } from 'viem/chains'
import type { OpStackConfig } from '../../../index.js'
import { ChainMismatchError } from 'wagmi'

/**
 * This wouldn't be in this file but just showing we can reexport contracts from @eth-optimism/contracts-ts
 * This is a wagmi/core contract now but we can change it to viem
 */
export { getL1CrossDomainMessenger } from '@eth-optimism/contracts-ts/actions'

// This type is less abstracted but in general I would recomend not abstracting and keeping it very simple
// This API is very very likely to change (currently in alpha) and might radically change when it moves to viem
// Keeping the types simple even if less DRY makes this easier to manage
export type WriteDepositETHParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  // here we  are extending SendTransactionParameters because it's the closest viem action to what we are doing (sending eth)
  // to make api intuitive use same api as sendTransaction. This makes it so we don't have to omit any properties
  SendTransactionParameters<
    TChain,
    TAccount,
    TChainOverride
  > & {
    l1StandardBridge: Address
    value: bigint
    /**
     * Provide really good jsdoc on what this is
     */
    minGasLimit: bigint
  }
/**
 * Deposits ETH to L2 using the standard messenger contract
 * @param parameters - {@link WriteDepositETHParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositETH<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    to,
    minGasLimit,
    data = '0x',
    l1StandardBridge,
    ...rest
  }: WriteDepositETHParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  // warn if this is way too low
  const SOME_REASONABLE_MINIMUM = 420n
  if (minGasLimit < SOME_REASONABLE_MINIMUM) {
    console.warn('minGasLimit is very low. This might fail. Consider increasing it')
  }

  if (to) {
    return writeContract(client, {
      address: l1StandardBridge,
      abi: l1StandardBridgeABI,
      functionName: 'depositETHTo',
      args: [to, minGasLimit, data],
      ...rest,
    } as unknown as WriteContractParameters<
      typeof l1StandardBridgeABI,
      'depositETH',
      TChain,
      TAccount,
      TChainOverride
    >)
  }

  return writeContract(client, {
    address: l1StandardBridge,
    abi: l1StandardBridgeABI,
    functionName: 'depositETH',
    args: [minGasLimit, data],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof l1StandardBridgeABI,
    'depositETH',
    TChain,
    TAccount,
    TChainOverride
  >)
}

// Instead of putting the config on the chain we put the chain on the config
// this is significantly less invasive to viem
const optimismConfig = {
  ...(await import('../../../chains/optimism.js')).optimism.opStackConfig,
  chain: optimism,
}
/**
 * Most users will be using the client not the action. Actions in viem tend to be used mostly by those trying to squeeze out bundle size wins We can keep the actions simpler while still providing a streamlined experience for users using the client
 */
export const actionUsageExample = async () => {
  // import {optimismConfig} from 'viem/optimism' ---- This import is reexported from the superchain registry package so no maintence is needed as more op chains are added except updating package

  const client: WalletClient<any, typeof mainnet, Account> = {} as any

  writeDepositETH(
    client,
    {
      l1StandardBridge: optimismConfig.l1.contracts.l1StandardBridge.address,
      minGasLimit: 420n,
      value: 420n,
    },
  )
}

// As a general convention extensions/plugins tend to be factories so they can be configured
// Our extension can get the same devx as previous API by taking in a config
// This keeps the copmlexity of the op chains completely out of viem/chains and viem proper
// Note we are only supporting 1 op chain here just like how a viem client only supports 1 l1 chain
// This is great for these reasons:
// 1. User can make multiple clients if they are using multiple chains. This totally fine and IMO actually cleaner than passing l2ChainId every usage
// 2. Most users will have a single op chain. For them they get a simpler hook with less boilerplate
// 3. They can still override the address if they choose to
export const opViemExtension = <TConfig extends OpStackConfig>(config: TConfig) => {
  return <
    TTransport extends Transport = Transport,
    TAccount extends Account = Account,
    // gonna typecheck the l2 chains and l1 chains match here
    TL1ChainId = TConfig['l1']['chainId'],
    TChain extends Chain & { id: TL1ChainId } = Chain & { id: TL1ChainId },
  > // this type could be even stricter but gonna keep it simple so it's easier to follow
    (client: WalletClient<TTransport, TChain, TAccount>) => {
    if (client.chain.id !== config.l1.chainId) {
      throw new ChainMismatchError({
        activeChain: client.chain.name,
        targetChain: (config as any).chain.name
      })
    }
    // here we can provide that good ux of not needing to provide contract addresses. User simply needs to configure them once in their entire app
    // This is in line with how with viem clients you only need to configure rpc providers, multicall chain, chain objects etc. once
    return {
      // we are not going to allow users to override the chainId because they should just configure it up front
      writeDepositETH: (
        args:
          & Omit<
            WriteDepositETHParameters<
              TChain,
              TAccount,
              TChain
            >,
            'l1StandardBridge'
          >
          & {
            l1StandardBridge?: Address
          },
      ) => {
        return writeDepositETH(client, {
          l1StandardBridge: config.l1.contracts.l1StandardBridge.address,
          ...args,
        } as any)
      },
    }
  }
}

export const opViemExtensionUsageExample = async () => {
  // import {opViemExtension} from 'viem/optimism' ---- This import is reexported from the superchain registry package so no maintence is needed as more op chains are added except updating package

  const client: WalletClient<any, typeof mainnet, Account> = {} as any

  const opClient = client.extend(
    opViemExtension(optimismConfig),
  )

  // don't need to provide contract address nor chain id because it was configured in the constructor
  opClient.writeDepositETH({
    // passing in minGasLimit sucks so we should encourage folks to use the prepare hooks
    minGasLimit: 420n,
    value: 420n,
  })
}
