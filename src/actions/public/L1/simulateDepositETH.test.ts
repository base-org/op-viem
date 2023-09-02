import { accounts } from '../../../_test/constants'
import { publicClient, walletClient } from '../../../_test/utils'
import { simulateDepositETH } from './simulateDepositETH'
import { writeContract } from 'viem/actions'
import { base } from 'viem/chains'
import { expect, test } from 'vitest'

test('default', async () => {
  const { request } = await simulateDepositETH(publicClient, {
    args: {
      gasLimit: 100000n,
      data: '0x',
    },
    value: 1n,
    l2ChainId: base.id,
    account: accounts[0].address,
  })
  expect(request).toBeDefined()
  expect(await writeContract(walletClient, request)).toBeDefined()
})
