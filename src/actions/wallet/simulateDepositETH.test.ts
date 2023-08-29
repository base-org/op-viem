import { expect, test } from 'vitest'
import {
  walletClient,
  publicClientMainnet,
  publicClient,
} from '../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../_test/constants'
// import {  } from './writeDepositETH'
import { simulateDepositETH } from './simulateDepositETH'

test('default', async () => {
  expect(
    await simulateDepositETH(publicClient, {
      args: {
        gasLimit: 1n,
        data: '0x',
      },
      value: 2n,
      toChain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})
