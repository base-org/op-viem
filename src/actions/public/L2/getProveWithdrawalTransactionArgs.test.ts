import { createPublicClient, http } from 'viem'
import { base } from 'viem/chains'
import { expect, test } from 'vitest'
import { accounts } from '../../../_test/constants.js'
import { publicClient, walletClient } from '../../../_test/utils.js'
import { baseAddresses } from '../../../chains/index.js'
import { writeProveWithdrawalTransaction } from '../../index.js'
import { getLatestProposedL2BlockNumber } from '../L1/getLatestProposedL2BlockNumber.js'
import { getOutputForL2Block } from '../L1/getOutputForL2Block.js'
import { getProveWithdrawalTransactionArgs } from './getProveWithdrawalTransactionArgs.js'
import { getWithdrawalMessages } from './getWithdrawalMessages.js'

test('correctly generates args', async () => {
  // cannot currently use anvil rollupPublicClient for this as eth_getProof isn't working
  const client = createPublicClient({
    chain: base,
    transport: http(),
  })

  const withdrawalMessages = await getWithdrawalMessages(client, {
    hash: '0xd0eb2a59f3cc4c61b01c350e71e1804ad6bd776dc9abc1bdb5e2e40695ab2628',
  })

  const { l2BlockNumber } = await getLatestProposedL2BlockNumber(publicClient, {
    ...baseAddresses,
  })

  const output = await getOutputForL2Block(publicClient, {
    l2BlockNumber,
    ...baseAddresses,
  })

  // TODO(wilson): We should simplify these test to not require so much setup ^
  const args = await getProveWithdrawalTransactionArgs(client, {
    message: withdrawalMessages.messages[0],
    output: output,
  })

  const hash = await writeProveWithdrawalTransaction(walletClient, {
    args,
    ...baseAddresses,
    account: accounts[0].address,
  })
  expect(hash).toBeDefined()
})
