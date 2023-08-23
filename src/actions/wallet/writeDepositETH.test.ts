import { expect, test } from 'vitest'
import { walletClient } from '../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../_test/constants'
import { writeDepositETH } from './writeDepositETH'

test('default', async () => {
  expect(
    await writeDepositETH(walletClient, {
      args: {
        gasLimit: 1n,
        data: '0x',
      },
      value: 1n,
      toChain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})
