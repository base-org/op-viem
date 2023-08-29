import { bench, describe } from 'vitest'
import { getWithdrawalMessageStorageSlot } from './getWithdrawalMessageStorageSlot'
import { Hex } from 'viem'
import { hashMessageHash } from '@eth-optimism/sdk'

describe('Hashes message hash', () => {
  const hash: Hex =
    '0xB1C3824DEF40047847145E069BF467AA67E906611B9F5EF31515338DB0AABFA2'
  bench('op-viem: `getWithdrawalMessageStorageSlot`', async () => {
    getWithdrawalMessageStorageSlot(hash)
  })

  bench('@eth-optimism/sdk: `hashMessageHash`', async () => {
    hashMessageHash(hash)
  })
})
