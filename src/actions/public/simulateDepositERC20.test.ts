import { expect, test } from 'vitest'
import { publicClient, walletClient, testClient } from '../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../_test/constants'
import { simulateDepositERC20 } from './simulateDepositERC20'
import { writeContract } from 'viem/actions'

const CBETHL1 = '0xbe9895146f7af43049ca1c1ae358b0541ea49704'
const CBETHl2 = '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22'

const USDCL1 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

const approveABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
    type: 'function',
  },
]

test('default', async () => {
  await testClient.impersonateAccount({
    address: '0xFd4F24676eD4588928213F37B126B53c07186F45',
  })
  await testClient.setBalance({
    address: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    value: 1000000000000000000n,
  })
  await writeContract(testClient, {
    address: USDCL1,
    abi: approveABI,
    functionName: 'approve',
    args: [base.opContracts.L1StandardBridgeProxy, 100000n],
    account: '0xFd4F24676eD4588928213F37B126B53c07186F45',
  })
  expect(
    await simulateDepositERC20(publicClient, {
      args: {
        l1Token: USDCL1,
        l2Token: CBETHl2,
        amount: 1n,
        gasLimit: 1n,
        data: '0x',
      },
      toChain: base,
      account: '0xFd4F24676eD4588928213F37B126B53c07186F45',
    }),
  ).toBeDefined()
})
