import { test, expect } from 'vitest'
import { parseGwei, serializeTransaction, parseEther, keccak256, toRlp, toBytes, concat, getAddress, toHex, trim } from 'viem'
import { DepositTx } from '@eth-optimism/core-utils'
import { RLP, stripZeros } from 'ethers/lib/utils'
import { BigNumber, BigNumberish } from 'ethers'
import { RecursiveArray } from 'viem/dist/types/utils/encoding/toRlp'

test('simple test', () => {
  expect(1 + 1).toBe(2)
})

test('other', () => {
  const serialized = serializeTransaction({
    from: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    gasLimit: 21100n,
    gasPrice: 0n,
    nonce: 4,
    to: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    value: 1n,
    data: '0x00',
  })
  console.log(keccak256(serialized))
  console.log(BigInt(0x526c))
  const x = {
    blockHash:
      '0xc3a4b13c2e2fe98d212af3754115b761b90e75138c252416068218d94485267d',
    blockNumber: '0x1e5a4c',
    from: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    gas: '0x526c',
    gasPrice: '0x0',
    hash: '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
    input: '0x00',
    mint: '0xde0b6b3a7640000',
    nonce: '0x4',
    r: '0x0',
    s: '0x0',
    sourceHash:
      '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
    to: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    transactionIndex: '0x6',
    type: '0x7e',
    v: '0x0',
    value: '0x1',
  }

  const serialized2 = serializeTransaction({
    chainId: 8453,
    from: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    gas: BigInt(0x526c),
    gasPrice: 0n,
    nonce: 4,
    to: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    value: 1n,
    data: '0x00',
    mint: BigInt('0xde0b6b3a7640000'),
  })
  console.log(keccak256(serialized2))

  const serialized3 = toRlp([
    // source hash
    '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
    // from
    '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    // to
    '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    // value
    '0x1',
    // gas
    '0x526c',
    // data
    '0x00',
    // mint
    '0xde0b6b3a7640000',
    // is system
    '0x0',
  ])
  console.log(keccak256(serialized3))

  const serialized5 = toRlp([
    // source hash
    '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
    // from
    getAddress('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    // to
    getAddress('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    // mint
    formatNumber(BigInt('0xde0b6b3a7640000'), 'mint'),
    // value
    formatNumber(BigInt('0x1'), 'value'),
    // gas
    formatNumber(BigInt('0x526c'), 'value'),
    // is system
    '0x0',
    // data
    '0x00',
  ])
  console.log('yo', keccak256(concat(['0x7E', serialized5])))

  const serialized4 = toRlp([
    toBytes('0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213'),
    toBytes('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    toBytes('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    toBytes('0xde0b6b3a7640000'),
    toBytes(0x1),
    toBytes(0x526c),
    toBytes(false),
    toBytes(0x00)
  ])
  console.log('yo', keccak256(concat(['0x7E', serialized5])))

  const serialized7 = serializeTransaction({
    from: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    gas: BigInt(0x526c),
    gasPrice: 0n,
    nonce: 4,
    to: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    value: 1n,
    data: '0x00',
  })
  console.log(keccak256(serialized7))

  const k = new DepositTx({
    sourceHash: '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
    from: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    gas: '0x526c',
    mint: '0xde0b6b3a7640000',
    to: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
    value: '0x1',
    data: '0x00',
  })

  console.log('hi')
  console.log(k.hash())

  console.log(formatNumber(BigInt('0x526c'), 'c'))
  console.log(toHex(formatNumberEthers('0x526c', 'q')))

  const c = [
    // source hash
    '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
    // from
    getAddress('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    // to
    getAddress('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    // mint
    formatNumberEthers('0xde0b6b3a7640000', 'mint'),
    // value
    formatNumberEthers('0x1', 'value'),
    // gas
    formatNumberEthers('0x526c', 'value'),
    // is system
    formatNumberEthers('0x0', 'system'),
    // data
    '0x00',
  ];

  const q = [
    // source hash
    '0xd0868c8764d81f1749edb7dec4a550966963540d9fe50aefce8cdb38ea7b2213',
    // from
    getAddress('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    // to
    getAddress('0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'),
    // mint
    toBytes('0xde0b6b3a7640000'),
    // value
    toBytes('0x1'),
    // gas
    toBytes('0x526c'),
    // is system
    toBytes(''),
    // data
    '0x00',
  ];
  console.log(RLP.encode(c))
  console.log(toRlp(c as RecursiveArray<`0x${string}`>))
  const z = toRlp(c as RecursiveArray<`0x${string}`>);
  const q2 = toRlp(q as RecursiveArray<`0x${string}`>);
  
  console.log('yo', keccak256(concat(['0x7E', z])))
  console.log('yo', keccak256(concat(['0x7E', q2])))

  console.log(formatNumberEthers('0xde0b6b3a7640000', 'mint'))
  console.log(toBytes('0xde0b6b3a7640000'))
  console.log(formatNumberEthers('0x1', 'mint'))
  console.log(toBytes('0x1'))
  console.log(formatNumberEthers('0x526c', 'mint'))
  console.log(toBytes('0x526c'))
  console.log(formatNumberEthers('0x0', 'mint'))
  console.log(toBytes(false))
})

const formatNumber = (value: bigint, name: string): `0x${string}` => {
  const result = trim(toHex(value))
  // console.log(toHex(value))
  // console.log(result)
  if (result.length > 32) {
    throw new Error(`invalid length for ${name}`)
  }
  return result
}

const formatNumberEthers = (value: BigNumberish, name: string): Uint8Array => {
  const result = stripZeros(BigNumber.from(value).toHexString())
  if (result.length > 32) {
    throw new Error(`invalid length for ${name}`)
  }
  return result
}