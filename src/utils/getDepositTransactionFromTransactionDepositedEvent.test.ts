import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { optimism } from '@roninjin10/rollup-chains'
import { BigNumber, ethers } from 'ethers'
import { expect, test } from 'vitest'
import { ethersProvider } from '../_test/bench'
import { DepositTx } from '@eth-optimism/core-utils'
import { getTransactionReceipt } from 'viem/actions'
import { publicClient } from '../_test/utils'
import { getDepositEventsInfoFromTxReceipt } from './getDepositEventsInfoFromTxReceipt'
import { getDepositTransactionFromTransactionDepositedEvent } from './getDepositTransactionFromTransactionDepositedEvent'
import { getSourceHash } from './getSourceHash'
import { SourceHashDomain } from '../types/depositTransaction'

// Simply testing against another implementation is not the best practice
// but I added these after debugging a difference. They will be useful to have
// if debugging again in the future.
test('derives same values as op-ethereum/core-utils', async () => {
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

  const receipt = await getTransactionReceipt(publicClient, {
    hash: '0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4',
  })
  const depositEvents = getDepositEventsInfoFromTxReceipt({ receipt })
  const opViemTx = getDepositTransactionFromTransactionDepositedEvent({
    event: depositEvents[0].event,
    sourceHash: getSourceHash({
      domain: SourceHashDomain.UserDeposit,
      logIndex: depositEvents[0].logIndex,
      l1BlockHash: receipt.blockHash,
    }),
  })
  expect(depositTx.sourceHash()).toEqual(opViemTx.sourceHash)
  expect(depositTx.from).toEqual(opViemTx.from)
  expect(depositTx.to).toEqual(opViemTx.to)
  expect(depositTx.mint).toEqual(BigNumber.from(opViemTx.mint))
  expect(depositTx.gas).toEqual(BigNumber.from(opViemTx.gas))
  expect(depositTx.value).toEqual(BigNumber.from(opViemTx.value))
  expect(depositTx.data).toEqual(opViemTx.data)
  expect(depositTx.isSystemTransaction).toEqual(opViemTx.isSystemTransaction)
})
