import { test, expect } from 'vitest'
import { createPublicClient, http } from 'viem'
import { mainnet } from '@wagmi/chains'
import { publicOpStackActions } from '../../decorators/publicOpStack'
import { optimismPortalABI } from '../../generated/contracts'
import { base } from '@roninjin10/rollup-chains'
import { publicClient } from '../../_test/utils'

test('correctly retrieves L2 hash', async () => {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  }).extend(publicOpStackActions)

  const hashes = await client.getL2HashesForDepositTx({
    l1TxHash:
      '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
  })

  expect(hashes.length).toEqual(1)

  expect(hashes[0]).toEqual(
    '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
  )

  const c = await publicClient.readContract({
    abi: optimismPortalABI,
    address: base.opContracts.OptimismPortalProxy,
    functionName: 'minimumGasLimit',
    args: [10n],
  })
  console.log(c)
})
