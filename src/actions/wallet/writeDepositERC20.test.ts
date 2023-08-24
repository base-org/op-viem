import { expect, test } from 'vitest'
import { walletClient } from '../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../_test/constants'
import { writeDepositERC20 } from './writeDepositERC20'

const CBETHL1 = '0xbe9895146f7af43049ca1c1ae358b0541ea49704'
const CBETHl2 = '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22'

test('default', async () => {
  expect(
    await writeDepositERC20(walletClient, {
      args: {
        l1Token: CBETHL1,
        l2Token: CBETHl2,
        amount: 1n,
        gasLimit: 1n,
        data: '0x',
      },
      toChain: base,
      account: accounts[0].address,
    }),
  ).toBeDefined()
})
