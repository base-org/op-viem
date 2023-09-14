import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { rollupPublicClient } from '../../../_test/utils.js'
import { opStackL2ChainContracts } from '../../../index.js'
import { OVM_ETH } from '../../../types/withdrawTo.js'
import { simulateWithdrawETH } from './simulateWithdrawETH.js'

test('correctly simulatwes transaction', async () => {
  const amount = 100n
  const extraData = '0x1234'
  const minGasLimit = 10000
  const to = accounts[0].address
  const { request } = await simulateWithdrawETH(rollupPublicClient, {
    args: { to, amount, minGasLimit, extraData },
  })
  expect(request.args).toEqual([OVM_ETH, to, amount, minGasLimit, extraData])
  expect(request.address).toEqual(opStackL2ChainContracts.l2StandardBridge.address)
  expect(request.functionName).toEqual('withdrawTo')
})
