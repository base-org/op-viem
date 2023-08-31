import { test, expect } from 'vitest'
import { publicClient } from '../../../_test/utils'
import { getL2HashesForDepositTx } from './getL2HashesForDepositTx'

test('correctly retrieves L2 hash', async () => {
  const hashes = await getL2HashesForDepositTx(publicClient, {
    l1TxHash:
      '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
  })

  expect(hashes.length).toEqual(1)

  expect(hashes[0]).toEqual(
    '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
  )
})
