import { expect, test } from 'vitest'
import { publicClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { readProvenWithdrawals } from './readProvenWithdrawals.js'

test('read proven withdrawals', async () => {
  const expected = {
    outputRoot: '0xe83cb1b39b2d1059fafec9cf9b9338b9944d2683c421856ead33b1eb02036a56',
    timestamp: 1692521795n,
    l2OutputIndex: 1490n,
  }

  const provenWithdrawal = await readProvenWithdrawals(publicClient, {
    l2Chain: base,
    withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
  })

  expect(provenWithdrawal).toEqual(expected)
})

test('raises error if not proven', async () => {
  expect(() =>
    readProvenWithdrawals(publicClient, {
      l2Chain: base,
      withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0C18D4889A23E74692101BA4C6DC9B5709',
    })
  ).rejects.toThrowError(
    'Withdrawal with hash 0xEC0AD491512F4EDC603C2DD7B9371A0C18D4889A23E74692101BA4C6DC9B5709 is not proven',
  )
})
