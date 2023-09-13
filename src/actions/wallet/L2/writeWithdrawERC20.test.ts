import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog } from 'viem'
import { mine, writeContract } from 'viem/actions'
import { expect, test } from 'vitest'
import { erc20ABI } from 'wagmi'
import { rollupPublicClient, rollupTestClient, rollupWalletClient } from '../../../_test/utils.js'
import { opStackL2ChainContracts } from '../../../types/opStackContracts.js'
import { writeWithdrawERC20 } from './writeWithdrawERC20.js'

const USDbC = '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA'
const address = '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4'

test('successfuly submits transaction', async () => {
  const amount = 100n
  await rollupTestClient.impersonateAccount({
    address,
  })
  await rollupTestClient.setBalance({
    address,
    value: 10n ** 22n,
  })
  await writeContract(rollupTestClient, {
    address: USDbC,
    abi: erc20ABI,
    functionName: 'approve',
    args: [opStackL2ChainContracts.l2StandardBridge.address, amount],
    account: address,
  })

  await mine(rollupTestClient, { blocks: 1 })
  const hash = await writeWithdrawERC20(rollupWalletClient, {
    args: { l2Token: USDbC, to: address, amount, minGasLimit: 100000 },
    account: address,
  })
  await mine(rollupTestClient, { blocks: 1 })
  const receipt = await rollupPublicClient.getTransactionReceipt({ hash })
  expect(receipt.status).toEqual('success')
  expect(receipt.to).toEqual(opStackL2ChainContracts.l2StandardBridge.address.toLowerCase())
  const withdawalLogs: any[] = []
  for (const l of receipt.logs) {
    try {
      const event = decodeEventLog({ abi: l2StandardBridgeABI, data: l.data, topics: l.topics })
      if (event.eventName === 'WithdrawalInitiated') {
        withdawalLogs.push(event)
      }
    } catch {}
  }

  expect(withdawalLogs[0].args.l2Token).toEqual(USDbC)
  expect(withdawalLogs[0].args.to.toLowerCase()).toEqual(address)
  expect(withdawalLogs[0].args.from.toLowerCase()).toEqual(address)
  expect(withdawalLogs[0].args.amount).toEqual(amount)
})
