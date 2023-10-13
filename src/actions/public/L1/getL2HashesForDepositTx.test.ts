import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { DepositTx } from '@eth-optimism/core-utils'
import { ethers } from 'ethers'
import { expect, test } from 'vitest'
import { ethersProvider } from '../../../_test/bench.js'
import { publicClient } from '../../../_test/utils.js'
import { optimism } from '../../../chains/optimism.js'
import { getL2HashesForDepositTx } from './getL2HashesForDepositTx.js'

test('correctly retrieves L2 hash', async () => {
  const hashes = await getL2HashesForDepositTx(publicClient, {
    l1TxHash: '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
  })

  expect(hashes.length).toEqual(1)

  expect(hashes[0]).toEqual(
    '0xed88afbd3f126180bd5488c2212cd033c51a6f9b1765249bdb738dcac1d0cb41',
  )
})

test('correctly retrieves L2 hash when given receipt', async () => {
  const l1TxReceipt = await publicClient.getTransactionReceipt({
    hash: '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
  })
  const hashes = await getL2HashesForDepositTx(publicClient, {
    l1TxReceipt,
  })

  expect(hashes.length).toEqual(1)

  expect(hashes[0]).toEqual(
    '0xed88afbd3f126180bd5488c2212cd033c51a6f9b1765249bdb738dcac1d0cb41',
  )
})

test('matches @eth-optimism/core-utils', async () => {
  const hashes = await getL2HashesForDepositTx(publicClient, {
    l1TxHash: '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
  })

  const contract = new ethers.Contract(
    optimism.opStackConfig.l1.contracts.portal.address,
    optimismPortalABI,
    ethersProvider,
  )
  const filter = contract.filters.TransactionDeposited(
    '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
    '0x4200000000000000000000000000000000000007',
  )
  const events = await contract.queryFilter(filter, 18033412, 18033413)
  const depositTx = DepositTx.fromL1Event(events[0])
  expect(depositTx.hash()).toEqual(hashes[0])
})
