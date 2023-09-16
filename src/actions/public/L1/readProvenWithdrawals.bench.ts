import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { bench, describe } from 'vitest'
import { opSDKMessenger } from '../../../_test/bench.js'
import { publicClient } from '../../../_test/utils.js'
import { base } from '../../../chains/index.js'
import { readProvenWithdrawals } from './readProvenWithdrawals.js'

describe('reads proven withdrawal', () => {
  const withdrawalHash = '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709'
  bench(
    'op-viem: `readProvenWithdrawals`',
    async () => {
      await readProvenWithdrawals(publicClient, {
        l2Chain: base,
        withdrawalHash: withdrawalHash,
      })
    },
  )

  bench(
    '@eth-optimism/sdk: `getProvenWithdrawal`',
    async () => {
      await opSDKMessenger.getProvenWithdrawal(withdrawalHash)
    },
  )
})
