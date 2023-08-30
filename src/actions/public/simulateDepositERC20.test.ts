import { expect, test } from 'vitest'
import { publicClient, walletClient, testClient } from '../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { accounts } from '../../_test/constants'
import { simulateDepositERC20 } from './simulateDepositERC20'
import {
  writeContract,
  getBalance,
  simulateContract,
  readContract,
} from 'viem/actions'

const CBETHL1 = '0xbe9895146f7af43049ca1c1ae358b0541ea49704'
const CBETHl2 = '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22'

const USDCL1 = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const USDCL2 = '0x2e668bb88287675e34c8df82686dfd0b7f0c0383'
const zenaddress = '0xFd4F24676eD4588928213F37B126B53c07186F45'

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

const balanceOfABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    type: 'function',
  },
]

test('default', async () => {
  console.log(
    await getBalance(testClient, {
      address: zenaddress,
    }),
  )
  await testClient.impersonateAccount({
    address: zenaddress,
  })
  await testClient.setBalance({
    address: zenaddress,
    value: 1000000000000000000n,
  })
  const { request } = await simulateContract(testClient, {
    address: USDCL1,
    abi: approveABI,
    functionName: 'approve',
    args: [base.opContracts.L1StandardBridgeProxy, 100000n],
    account: zenaddress,
  })
  console.log(
    await getBalance(testClient, {
      address: zenaddress,
    }),
  )
  await writeContract(testClient, request)

  console.log(
    'balanceOf',
    await readContract(testClient, {
      address: USDCL1,
      abi: balanceOfABI,
      functionName: 'balanceOf',
      args: [zenaddress],
    }),
  )
  // const { request } = await simulateContract(publicClient, {
  //   address: USDCL1,
  //   abi: approveABI,
  //   functionName: 'approve',
  //   args: [base.opContracts.L1StandardBridgeProxy, 100000n],
  //   account: accounts[0].address,
  // })
  // await writeContract(publicClient, request)
  // await testClient.mine({ blocks: 1 })
  expect(
    await simulateDepositERC20(publicClient, {
      args: {
        l1Token: USDCL1,
        l2Token: USDCL2,
        amount: 100n,
        gasLimit: 100000000000000000000n,
        data: '0x',
      },
      toChain: base,
      account: zenaddress,
    }),
  ).toBeDefined()
})
