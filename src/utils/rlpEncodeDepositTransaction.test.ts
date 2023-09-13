import { DepositTx } from '@eth-optimism/core-utils'
import { expect, test } from 'vitest'
import type { DepositTransaction } from '../types/depositTransaction.js'
import { rlpEncodeDepositTransaction } from './rlpEncodeDepositTransaction.js'

const ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000'
const DEPOSIT_TX: DepositTransaction = {
  sourceHash: '0x9d7b6db5fcbc23b017d4f179574dfe34b792f60d89bc077ca567af7cc65e8b3e',
  from: '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
  to: '0x4200000000000000000000000000000000000007',
  mint: '0x0000000000000000000000000000000000000000000000000000000000000001',
  value: '0x0000000000000000000000000000000000000000000000000000000000000001',
  gas: '0x000000000006b8c4',
  isSystemTransaction: false,
  data:
    '0xd764ad0b000100000000000000000000000000000000000000000000000000000000af0a0000000000000000000000006587a6164b091a058acba2e91f971454ec172940000000000000000000000000a81d244a1814468c734e5b4101f7b9c0c577a8fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000249f000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c4cc29a306000000000000000000000000f282ed5de6f51854b4f07f5c1dbc8f178ab8a89b000000000000000000000000000000000000000000000000000000011af9f9f000000000000000000000000000000000000000000000000000000001181336b40000000000000000000000000000000000000000000000000000000064f98c01000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
}

// adding these tests after we saw some unexpected behavior between ethers and viem methods
// when encoding
test('produces correct encoding', () => {
  const coreUtilsDeposit = new DepositTx({
    ...DEPOSIT_TX,
  })
  expect(coreUtilsDeposit.encode()).toEqual(
    rlpEncodeDepositTransaction(DEPOSIT_TX).toLocaleLowerCase(),
  )
})

test('produces correct encoding when mint is 0', () => {
  const coreUtilsDeposit = new DepositTx({
    ...DEPOSIT_TX,
    mint: ZERO,
  })
  expect(coreUtilsDeposit.encode()).toEqual(
    rlpEncodeDepositTransaction({
      ...DEPOSIT_TX,
      mint: ZERO,
    }).toLocaleLowerCase(),
  )
})

test('produces correct encoding when value is 0', () => {
  const coreUtilsDeposit = new DepositTx({
    ...DEPOSIT_TX,
    value: ZERO,
  })
  expect(coreUtilsDeposit.encode()).toEqual(
    rlpEncodeDepositTransaction({
      ...DEPOSIT_TX,
      value: ZERO,
    }).toLocaleLowerCase(),
  )
})

test('produces correct encoding when gas is 0', () => {
  const coreUtilsDeposit = new DepositTx({
    ...DEPOSIT_TX,
    gas: ZERO,
  })
  expect(coreUtilsDeposit.encode()).toEqual(
    rlpEncodeDepositTransaction({
      ...DEPOSIT_TX,
      gas: ZERO,
    }).toLocaleLowerCase(),
  )
})
