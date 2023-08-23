import { test, expect } from 'vitest'
import { Hex, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli, mainnet } from '@wagmi/chains'
import { walletOpStackActions } from '../decorators/walletOpStack'
import { baseGoerli } from '@roninjin10/rollup-chains'
import { publicOpStackActions } from '../decorators/publicOpStack'

test('correctly retrieves L2 hash', async () => {
  return
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
  }).extend(walletOpStackActions)

  const depositHash = await walletClient.writeUnsafeDepositTransaction({
    toChain: baseGoerli,
    args: {
      to: account.address,
      value: 1n,
      data: '0x',
      gasLimit: 25000n,
      isCreation: false,
    },
    value: 1n,
  })

  console.log('depositHash', depositHash)

  const mainnetPublicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  }).extend(publicOpStackActions)

  await mainnetPublicClient.waitForTransactionReceipt({ hash: depositHash })

  const l2Hash = await mainnetPublicClient.getL2HashesForDepositTx({
    l1TxHash: depositHash,
  })

  console.log('l2Hash', l2Hash)
})
