import { bench, describe } from 'vitest'
import { ethersProvider } from '../_test/bench'
import { publicClient } from '../_test/utils'
import { DepositTx } from '@eth-optimism/core-utils'
import { ethers } from 'ethers'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { getTransactionReceipt } from 'viem/actions'
import { getDepositEventsInfoFromTxReceipt } from './getDepositEventsInfoFromTxReceipt'
import { getL2HashFromL1DepositInfo } from './getL2HashFromL1DepositInfo'
import { base } from 'viem/chains'
import { mainnet } from '../chains/mainnet'

describe('Obtain L2 hash from already fetched event', async () => {
  const receipt = await getTransactionReceipt(publicClient, {
    hash: '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
  })
  const events = getDepositEventsInfoFromTxReceipt({ receipt })
  bench('op-viem: `getL2HashFromL1DepositInfo`', async () => {
    getL2HashFromL1DepositInfo({
      event: events[0].event,
      logIndex: events[0].logIndex,
      blockHash: receipt.blockHash,
    })
  })

  const contract = new ethers.Contract(
    mainnet.contracts.optimismPortal[base.id],
    optimismPortalABI,
    ethersProvider,
  )
  const filter = contract.filters['TransactionDeposited'](
    '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
  )
  const ethersEvents = await contract.queryFilter(filter, 17809754, 17809754)
  bench('@eth-optimism/core-utils: `DepositTx.fromL1Event`', async () => {
    DepositTx.fromL1Event(ethersEvents[0]).hash()
  })
})
