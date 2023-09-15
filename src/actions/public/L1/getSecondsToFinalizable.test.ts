import { expect, test, vi } from 'vitest'
import { publicClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { getSecondsToFinalizable } from './getSecondsToFinalizable.js'

test('returns 0 if seconds would be negative', async () => {
  const seconds = await getSecondsToFinalizable(publicClient, {
    l2Chain: base,
    withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
  })

  expect(seconds).toEqual(0n)
})

test('returns correctly seconds', async () => {
  // transaction hash of the prove withdrawal tranasction
  const t = await publicClient.getTransaction({
    hash: '0x3e1870a473f62448ea26eafd700052697f13f278a490cc11512b82fd70937f6d',
  })
  const block = await publicClient.getBlock({ blockNumber: t.blockNumber })
  const date = new Date(parseInt(block.timestamp.toString()) * 1000)
  vi.setSystemTime(date)
  const seconds = await getSecondsToFinalizable(publicClient, {
    l2Chain: base,
    withdrawalHash: '0xEC0AD491512F4EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
  })

  // seven days
  expect(seconds).toEqual(604800n)
})

test('raises error if cannot find', async () => {
  expect(() =>
    getSecondsToFinalizable(publicClient, {
      l2Chain: base,
      withdrawalHash: '0xEC0AD491512F5EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709',
    })
  ).rejects.toThrowError(
    'Withdrawal with hash 0xEC0AD491512F5EDC603C2DD7B9371A0B18D4889A23E74692101BA4C6DC9B5709 is not proven',
  )
})
