import { bench, describe } from 'vitest'
import { createPublicClient, http } from 'viem'
import { getWithdrawalMessages } from './getWithdrawalMessages'
import { getOutputForL2Block } from './getOutputForL2Block'
import { getProveArgsForWithdrawal } from './getProveArgsForWithdrawal'
import { base } from '@roninjin10/rollup-chains'
import { mainnet } from '@wagmi/chains'
import { providers } from 'ethers'
import { CrossChainMessenger } from '@eth-optimism/sdk'

describe('Computes L1 prove args from L2 tx hash', () => {
  const hash =
    '0xd0eb2a59f3cc4c61b01c350e71e1804ad6bd776dc9abc1bdb5e2e40695ab2628'
  bench(
    'op-viem: `getWithdrawalMessages, getOutputForL2Block, getProveArgsForWithdrawal`',
    async () => {
      const client = createPublicClient({
        chain: base,
        transport: http(),
      })

      const withdrawalMessages = await getWithdrawalMessages(client, {
        hash,
      })

      const l1Client = createPublicClient({
        chain: mainnet,
        transport: http(),
      })

      const output = await getOutputForL2Block(l1Client, {
        blockNumber: withdrawalMessages.blockNumber,
        rollup: base,
      })

      await getProveArgsForWithdrawal(client, {
        message: withdrawalMessages.messages[0],
        output: output,
      })
    },
    // these test take a while to run and I worry we'll get throttled by RPC since
    // we're using live for now
    { iterations: 2 },
  )

  bench(
    '@eth-optimism/sdk: `getBedrockMessageProof`',
    async () => {
      const ethersProvider = new providers.JsonRpcProvider(
        'https://cloudflare-eth.com',
      )
      const ethersRollupProvider = new providers.JsonRpcProvider(
        'https://mainnet.base.org',
      )
      const messenger = new CrossChainMessenger({
        l1ChainId: mainnet.id,
        l2ChainId: base.id,
        l1SignerOrProvider: ethersProvider,
        l2SignerOrProvider: ethersRollupProvider,
      })
      await messenger.getBedrockMessageProof(hash)
    },
    { iterations: 2 },
  )
})
