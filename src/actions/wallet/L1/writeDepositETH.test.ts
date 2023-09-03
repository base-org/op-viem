import { base } from 'viem/chains'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants'
import { walletClient } from '../../../_test/utils'
import { writeDepositETH } from './writeDepositETH'

test('default', async () => {
  expect(
    await writeDepositETH(walletClient, {
      args: {
        gasLimit: 1n,
        data: '0x',
      },
      value: 1n,
      l2ChainId: base.id,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})
