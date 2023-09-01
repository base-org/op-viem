import { test, expect } from 'vitest'
import { publicClient } from '../../../_test/utils'
import { getL2HashesForDepositTx } from './getL2HashesForDepositTx'
import { ethers } from 'ethers'
import { optimism } from '@roninjin10/rollup-chains'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { ethersProvider } from '../../../_test/bench'
import { DepositTx } from '@eth-optimism/core-utils'

test('correctly retrieves L2 hash', async () => {
  const hashes = await getL2HashesForDepositTx(publicClient, {
    l1TxHash:
      '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
  })

  expect(hashes.length).toEqual(1)

  expect(hashes[0]).toEqual(
    '0xed88afbd3f126180bd5488c2212cd033c51a6f9b1765249bdb738dcac1d0cb41',
  )
})

test('matches @eth-optimism/core-utils', async () => {
  const hashes = await getL2HashesForDepositTx(publicClient, {
    l1TxHash:
      '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
  })

  const contract = new ethers.Contract(
    optimism.opContracts.OptimismPortalProxy,
    optimismPortalABI,
    ethersProvider,
  )
  const filter = contract.filters['TransactionDeposited'](
    '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
    '0x4200000000000000000000000000000000000007',
  )
  const events = await contract.queryFilter(filter, 18033412, 18033413)
  const depositTx = DepositTx.fromL1Event(events[0])
  expect(depositTx.hash()).toEqual(hashes[0])
})

// test('matches', async () => {
//   const contract = new ethers.Contract(
//     optimism.opContracts.OptimismPortalProxy,
//     optimismPortalABI,
//     ethersProvider,
//   )
//   console.log(await ethersProvider.getBlockNumber())
//   const filter = contract.filters['TransactionDeposited'](
//     '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
//     '0x4200000000000000000000000000000000000007',
//   )
//   const events = await contract.queryFilter(filter, 18033412, 18033413)
//   // const event = {
//   //   blockNumber: 18033413,
//   //   blockHash: '0x7a40f5453bb6ff0095de5ee3c49a41309a227dec7e961e9e8536f4da80e9d913',
//   //   transactionIndex: 76,
//   //   removed: false,
//   //   address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
//   //   data: '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000020d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b8c400d764ad0b000100000000000000000000000000000000000000000000000000000000af0a0000000000000000000000006587a6164b091a058acba2e91f971454ec172940000000000000000000000000a81d244a1814468c734e5b4101f7b9c0c577a8fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000249f000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c4cc29a306000000000000000000000000f282ed5de6f51854b4f07f5c1dbc8f178ab8a89b000000000000000000000000000000000000000000000000000000011af9f9f000000000000000000000000000000000000000000000000000000001181336b40000000000000000000000000000000000000000000000000000000064f98c01000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   //   topics: [
//   //     '0xb3813568d9991fc951961fcb4c784893574240a28925604d09fc577c55bb7c32',
//   //     '0x00000000000000000000000036bde71c97b33cc4729cf772ae268934f7ab70b2',
//   //     '0x0000000000000000000000004200000000000000000000000000000000000007',
//   //     '0x0000000000000000000000000000000000000000000000000000000000000000'
//   //   ],
//   //   transactionHash: '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
//   //   logIndex: 139,
//   //   removeListener: () => {},
//   //   getBlock: () => {},
//   //   getTransaction: () => {},
//   //   getTransactionReceipt: () => {},
//   //   event: 'TransactionDeposited',
//   //   eventSignature: 'TransactionDeposited(address,address,uint256,bytes)',
//   //   args: [
//   //     // '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
//   //     // '0x4200000000000000000000000000000000000007',
//   //     // BigNumber.from('0x00'),// { _hex: '0x00', _isBigNumber: true },
//   //     // '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b8c400d764ad0b000100000000000000000000000000000000000000000000000000000000af0a0000000000000000000000006587a6164b091a058acba2e91f971454ec172940000000000000000000000000a81d244a1814468c734e5b4101f7b9c0c577a8fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000249f000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c4cc29a306000000000000000000000000f282ed5de6f51854b4f07f5c1dbc8f178ab8a89b000000000000000000000000000000000000000000000000000000011af9f9f000000000000000000000000000000000000000000000000000000001181336b40000000000000000000000000000000000000000000000000000000064f98c01000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   //     from: '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
//   //     to: '0x4200000000000000000000000000000000000007',
//   //     version: BigNumber.from('0x00'),
//   //     opaqueData: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b8c400d764ad0b000100000000000000000000000000000000000000000000000000000000af0a0000000000000000000000006587a6164b091a058acba2e91f971454ec172940000000000000000000000000a81d244a1814468c734e5b4101f7b9c0c577a8fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000249f000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c4cc29a306000000000000000000000000f282ed5de6f51854b4f07f5c1dbc8f178ab8a89b000000000000000000000000000000000000000000000000000000011af9f9f000000000000000000000000000000000000000000000000000000001181336b40000000000000000000000000000000000000000000000000000000064f98c01000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
//   //   ]
//   // }
//   // console.log(events)
//   const d = DepositTx.fromL1Event(events[0])
// const receipt = await getTransactionReceipt(publicClient, {
//   hash: '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
// })
// const depositEvents = getDepositEventsInfoFromTxReceipt({ receipt })
// const opd = getDepositTransactionFromTransactionDepositedEvent({
//   event: depositEvents[0].event,
//   sourceHash: d.sourceHash() as Hex,
// })
//   expect(d.data).toEqual(opd.data)
//   expect(d.to).toEqual(opd.to)
//   expect(d.from).toEqual(opd.from)
//   expect(d.sourceHash()).toEqual(
//     '0x9d7b6db5fcbc23b017d4f179574dfe34b792f60d89bc077ca567af7cc65e8b3e',
//   )
// expect(d.mint).toEqual(BigNumber.from(opd.mint))
// expect(d.gas).toEqual(BigNumber.from(opd.gas))
// expect(d.value).toEqual(BigNumber.from(opd.value))
//   console.log(d)
//   console.log(opd)
//   expect(d.sourceHash()).toEqual(opd.sourceHash)
//   expect(RLP.encode(d.sourceHash())).toEqual(toRlp(opd.sourceHash))
//   console.log('mint', toRlp('0x'), RLP.encode(formatNumber(d.mint, 'mint')), formatNumber(d.mint, 'mint'))
//   console.log('size', size(trim(opd.mint)))
//   console.log('size', size('0x1'))
//   console.log('size', size('0x'))
//   console.log(stripZeros('0x00'))
//   console.log('')
//   console.log('ethers stripZeros(new Uint8Array([0, 0, 0, 0, 0, 0])) =>', stripZeros(new Uint8Array([0, 0, 0, 0, 0, 0])))
//   console.log('viem trim(new Uint8Array([0, 0, 0, 0, 0, 0])) =>', trim(new Uint8Array([0, 0, 0, 0, 0, 0])))
//   expect(RLP.encode(formatNumber(d.mint, 'mint'))).toEqual(toRlp('0x'))
//   expect(RLP.encode(formatNumber(d.value, 'mint'))).toEqual(toRlp('0x'))
//   console.log(d.gas)
//   console.log(opd.gas)
//   console.log(trim(opd.gas))
//   expect(formatNumber(d.gas, 'mint')).toEqual(toBytes(trim(opd.gas)))
//   expect(RLP.encode(formatNumber(d.gas, 'mint'))).toEqual(toRlp(trim(opd.gas)))
//   expect(RLP.encode(formatNumber(d.value, 'mint'))).toEqual(toRlp('0x'))
//   expect(RLP.encode(d.data)).toEqual(toRlp(opd.data))
//   expect(d.encode().toLocaleLowerCase()).toEqual(rlpEncodeDepositTransaction(opd).toLocaleLowerCase())
//   expect(
// new DepositTx({
//   sourceHash: opd.sourceHash,
//   to: opd.to,
//   from: opd.from,
//   data: opd.data,
//   value: opd.value,
//   mint: opd.mint,
//   gas: opd.gas,
//   isSystemTransaction: false,
// }).encode(),
//   ).toEqual(d.encode())

//   // console.log(d)
//   // console.log(d.sourceHash())
//   // console.log(events[0])
//   // console.log(d.hash())
//   // console.log(d.mint.toString())
//   // console.log(d.data.toString())
//   // console.log(d.domain)
//   // expect(d.hash()).toEqual(
//   //   '0xabbe5a7d5dd309f79e4d0335e99f9d9656f087bbff9fef8ad4e8b4f31f97752b',
//   // )
// })

// const formatNumber = (value: BigNumberish, name: string): Uint8Array => {
//   const result = stripZeros(BigNumber.from(value).toHexString())
//   if (result.length > 32) {
//     throw new Error(`invalid length for ${name}`)
//   }
//   return result
// }
