import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { rollupPublicClient } from '../../../_test/utils.js'
import { opStackL2ChainContracts } from '../../../index.js'
import { simulateWithdrawERC20 } from './simulateWithdrawERC20.js'

test('correctly simulatwes transaction', async () => {
  const l2Token = '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA'
  const amount = 100n
  const extraData = '0x1234'
  const minGasLimit = 10000
  const to = accounts[0].address
  const { request } = await simulateWithdrawERC20(rollupPublicClient, {
    args: { l2Token, to, amount, minGasLimit, extraData },
    account: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
  })
  expect(request.args).toEqual([l2Token, to, amount, minGasLimit, extraData])
  expect(request.address).toEqual(opStackL2ChainContracts.l2StandardBridge.address)
  expect(request.functionName).toEqual('withdrawTo')
})
