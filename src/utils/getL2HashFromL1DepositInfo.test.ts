import { expect, test } from 'vitest'
import { TransactionDepositedEvent } from '../types/depositTransaction'
import { getL2HashFromL1DepositInfo } from './getL2HashFromL1DepositInfo'

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

const eventWithZeroData: TransactionDepositedEvent = {
  eventName: 'TransactionDeposited',
  args: {
    from: '0x80B01fDEd19145FFB893123eC38eBba31b4043Ee',
    to: '0x80B01fDEd19145FFB893123eC38eBba31b4043Ee',
    version: 0n,
    opaqueData:
      '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000520800',
  },
}

test('returns correct hash', () => {
  const logIndex = 196
  const blockHash = '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7'
  const hash = getL2HashFromL1DepositInfo({ event, logIndex, blockHash })

  expect(hash).toEqual(
    '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
  )
})

test('returns correct hash with zero data', () => {
  const event = eventWithZeroData
  const logIndex = 36
  const blockHash = '0x9375ba075993fcc3cd3f66ef1fc45687aeccc04edfc06da2bc7cdb8984046ed7'
  const hash = getL2HashFromL1DepositInfo({ event, logIndex, blockHash })

  expect(hash).toEqual(
    '0xb81d4b3fe43986c51d29bf29a8c68c9a301c074531d585298bc1e03df68c8459',
  )
})
