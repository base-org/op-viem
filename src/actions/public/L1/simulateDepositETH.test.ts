import { writeContract } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants'
import { publicClient, walletClient } from '../../../_test/utils'
import { base } from '../../../chains/base'
import { simulateDepositETH } from './simulateDepositETH'

test('default', async () => {
  const { request } = await simulateDepositETH(publicClient, {
    args: {
      minGasLimit: 100000n,
    },
    value: 1n,
    l2Chain: base,
    account: accounts[0].address,
  })
  expect(request).toBeDefined()
  expect(await writeContract(walletClient, request)).toBeDefined()
})
