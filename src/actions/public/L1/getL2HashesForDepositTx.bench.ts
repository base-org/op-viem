import { bench, describe } from 'vitest'
import { ethersProvider } from '../../../_test/bench'
import { publicClient } from '../../../_test/utils'
import { getL2HashesForDepositTx } from './getL2HashesForDepositTx'
import { DepositTx } from '@eth-optimism/core-utils'
import { ethers } from 'ethers'
import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { base } from 'viem/chains'
import { mainnet } from '../../../chains/mainnet'

describe('Computes L2 hash for L1 event', () => {
  bench('op-viem: `getL2HashesForDepositTx`', async () => {
    await getL2HashesForDepositTx(publicClient, {
      l1TxHash:
        '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
    })
  })

  bench('@eth-optimism/core-utils: `DepositTx`', async () => {
    // Note(Wilson): I could not find a more efficient way to get the event needed from ethers.
    // I am not sure how to produce an event from a transaction receipt.
    // Happy to update this if there is a better comparison
    const contract = new ethers.Contract(
      mainnet.contracts.optimismPortal[base.id],
      optimismPortalABI,
      ethersProvider,
    )
    const filter = contract.filters['TransactionDeposited'](
      '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
      '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    )
    const events = await contract.queryFilter(filter, 17809754, 17809754)
    DepositTx.fromL1Event(events[0]).hash()
  })
})
