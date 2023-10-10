import { writeContract } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, walletClient } from '../../../_test/utils.js'
import { base } from '../../../chains/index.js'
import { simulateDepositETH } from './simulateDepositETH.js'

test('default', async () => {
  const { request } = await simulateDepositETH(publicClient, {
    args: {
      to: accounts[0].address,
      gasLimit: 100000,
    },
    value: 1n,
    l2Chain: base,
    account: accounts[0].address,
  })
  expect(request).toBeDefined()
  expect(await writeContract(walletClient, request)).toBeDefined()
})
