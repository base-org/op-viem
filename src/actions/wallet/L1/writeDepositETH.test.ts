import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants'
import { walletClient } from '../../../_test/utils'
import { base } from '../../../chains/base'
import { writeDepositETH } from './writeDepositETH'

test('default', async () => {
  expect(
    await writeDepositETH(walletClient, {
      args: {
        minGasLimit: 1n,
        extraData: '0x',
      },
      value: 1n,
      l2Chain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})
