import { test } from 'vitest'
import { estimateRelayMessageGas } from './estimateRelayMessageGas'
import { createPublicClient, http } from 'viem'
import { optimismGoerli } from 'viem/chains'

test('default', async () => {
  const client = createPublicClient({
    chain: optimismGoerli,
    transport: http()
  })
  const x = await estimateRelayMessageGas(client, {
    args: {
      nonce: 1766847064778384329583297500742918515827483896875618958121606201292719403n,
      sender: '0x87E2deCE7d0A080D579f63cbcD7e1629BEcd7E7d',
      target: '0xc6307a58556FDcF93255ad541dccacCC10b75eA4',
      value: 0n,
      minGasLimit: 500000n,
      message:
        '0x69ea17710000000000000000000000000000000000000000000000000eda8cee19280bba',
    },
    blockNumber: 14353205n,
  })
  console.log(x)
})
