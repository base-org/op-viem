import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { walletClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { writeDepositETH } from './writeDepositETH.js'

test('default', async () => {
  expect(
    await writeDepositETH(walletClient, {
      args: {
        to: accounts[0].address,
        minGasLimit: 1n,
        extraData: '0x',
      },
      value: 1n,
      l2Chain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})
