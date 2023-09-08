import { createPublicClient, createWalletClient, Hex, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { estimateGas } from 'viem/actions'
import { goerli } from 'viem/chains'
import { test } from 'vitest'
import { DepositTransactionParameters } from '../actions/wallet/L1/writeUnsafeDepositTransaction'
import { baseGoerli } from '../chains/baseGoerli'
import { publicL1OpStackActions } from '../decorators/publicL1OpStackActions'
import { walletL1OpStackActions } from '../decorators/walletL1OpStackActions'

test('correctly retrieves L2 hash', async () => {
  return
  // rome-ignore lint: ok code is unreachable
  const pk = process.env.VITE_PRIVATE_KEY
  if (!pk) {
    console.log('no private key')
    return
  }
  const account = privateKeyToAccount(pk as Hex)
  const walletClient = createWalletClient({
    account,
    chain: goerli,
    transport: http(),
  }).extend(walletL1OpStackActions)

  const baseGoerliPublicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  }).extend(publicL1OpStackActions)

  const args: DepositTransactionParameters = {
    to: account.address,
    value: 1n,
    data: '0x',
    gasLimit: 0n,
    isCreation: false,
  }

  const gas = await estimateGas(baseGoerliPublicClient, {
    account: account.address,
    to: args.to,
    value: args.value,
    data: args.data,
  })

  args.gasLimit = gas

  const depositHash = await walletClient.writeUnsafeDepositTransaction({
    l2Chain: baseGoerli,
    args,
    value: 1n,
  })

  console.log('depositHash', depositHash)

  const mainnetPublicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  }).extend(publicL1OpStackActions)

  await mainnetPublicClient.waitForTransactionReceipt({ hash: depositHash })

  const l2Hash = await mainnetPublicClient.getL2HashesForDepositTx({
    l1TxHash: depositHash,
  })

  console.log('l2Hash', l2Hash)
})
