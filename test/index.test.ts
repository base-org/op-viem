import { test, expect } from 'vitest'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'wagmi'
import { publicOpStackActions } from '../src/decorators/publicOpStack'

test('simple test', () => {
  expect(1 + 1).toBe(2)
})

test('computes L2 hash correctly', async () => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  }).extend(publicOpStackActions)

  const hashes = await client.getL2HashesForDepositTx({
    l1TxHash:
      '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
  })

  expect(hashes.length).toEqual(1)

  expect(hashes[0]).toEqual(
    '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
  )
})
