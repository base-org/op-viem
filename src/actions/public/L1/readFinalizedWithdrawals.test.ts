import { expect, test } from 'vitest'
import { publicClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { readFinalizedWithdrawals } from './readFinalizedWithdrawals.js'

test('read finalized withdrawals', async () => {
  const finalizedWithdrawal = await readFinalizedWithdrawals(publicClient, {
    l2Chain: base,
    withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
  })

  expect(finalizedWithdrawal).toEqual(true)
})

test('raises error if not finalized', async () => {
  expect(() =>
    readFinalizedWithdrawals(publicClient, {
      l2Chain: base,
      withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0C18D4889A23E74692101BA4C6DC9B5709',
    })
  ).rejects.toThrowError(
    'Withdrawal with hash 0xEC0AD491512F4EDC603C2DD7B9371A0C18D4889A23E74692101BA4C6DC9B5709 is not finalized',
  )
})
