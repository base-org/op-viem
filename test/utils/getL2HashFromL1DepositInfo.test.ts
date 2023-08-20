import { test, expect } from 'vitest'
import { getL2HashFromL1DepositInfo } from '../../src/utils/getL2HashFromL1DepositInfo'
import { TransactionDepositedEvent } from '../../src/types/depositTx'

const event: TransactionDepositedEvent = {
  eventName: 'TransactionDeposited',
  args: {
    from: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    to: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    version: 0n,
    opaqueData:
      '0x0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000001000000000000526c0000',
  },
}

const logIndex = 196
const blockHash =
  '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7'

test('returns correct event info', () => {
  const hash = getL2HashFromL1DepositInfo({ event, logIndex, blockHash })

  expect(hash).toEqual(
    '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
  )
})
