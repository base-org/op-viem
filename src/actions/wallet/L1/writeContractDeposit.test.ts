import { optimismPortalABI } from '@eth-optimism/contracts-ts'
import { decodeEventLog, encodeFunctionData } from 'viem'
import { mine } from 'viem/actions'
import { expect, test } from 'vitest'
import { erc721ABI } from 'wagmi'
import { accounts } from '../../../_test/constants.js'
import { publicClient, testClient, walletClient } from '../../../_test/utils.js'
import { base } from '../../../chains/base.js'
import { parseOpaqueData } from '../../../utils/getArgsFromTransactionDepositedOpaqueData.js'
import { writeContractDeposit } from './writeContractDeposit.js'

test('default', async () => {
  const functionName = 'approve'
  const args: [`0x${string}`, bigint] = ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 2048n]
  const l2GasLimit = 100000n
  const hash = await writeContractDeposit(walletClient, {
    abi: erc721ABI,
    address: '0x6171f829e107f70b58d67594c6b62a7d3eb7f23b',
    functionName,
    args,
    account: accounts[0].address,
    l2GasLimit,
    l2Chain: base,
  })
  await mine(testClient, { blocks: 1 })

  const txReceipt = await publicClient.getTransactionReceipt({ hash })
  expect(txReceipt.status).toEqual('success')
  const depositEvents = []
  for (const l of txReceipt.logs) {
    try {
      const event = decodeEventLog({
        abi: optimismPortalABI,
        data: l.data,
        topics: l.topics,
      })
      if (event.eventName === 'TransactionDeposited') {
        depositEvents.push({ event, logIndex: l.logIndex })
      }
    } catch {}
  }
  const parsedOpaqueData = parseOpaqueData(depositEvents[0].event.args.opaqueData)
  expect(BigInt(parsedOpaqueData.mint)).toEqual(0n)
  expect(BigInt(parsedOpaqueData.value)).toEqual(0n)
  expect(BigInt(parsedOpaqueData.gas)).toEqual(l2GasLimit)
  expect(parsedOpaqueData?.data).toEqual(encodeFunctionData({
    abi: erc721ABI,
    args,
    functionName,
  }))
})
