import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog } from 'viem'
import { mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { rollupPublicClient, rollupTestClient, rollupWalletClient } from '../../../_test/utils.js'
import { opStackL2ChainContracts } from '../../../types/opStackContracts.js'
import { OVM_ETH } from '../../../types/withdrawTo.js'
import { writeWithdrawETH } from './writeWithdrawETH.js'

test('successfuly submits transaction', async () => {
  const amount = 100n
  const account = accounts[0].address
  const hash = await writeWithdrawETH(rollupWalletClient, {
    args: { to: account, amount, minGasLimit: 100000 },
    account: account,
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

  expect(withdawalLogs[0].args.l2Token).toEqual(OVM_ETH)
  expect(withdawalLogs[0].args.to.toLowerCase()).toEqual(account)
  expect(withdawalLogs[0].args.from.toLowerCase()).toEqual(account)
  expect(withdawalLogs[0].args.amount).toEqual(amount)
})
