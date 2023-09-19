import type { Chain } from 'viem'
import { expect, test } from 'vitest'
import { publicClient } from '../_test/utils.js'
import { base } from '../chains/base.js'
import { OpStackL1Contract } from '../types/opStackContracts.js'
import { resolveL1OpStackContractAddress } from './resolveL1OpStackContractAddress.js'

test('resolves Base OptimismPortal contract address', async () => {
  const resolvedPortalAddress = await resolveL1OpStackContractAddress(
    {
      l2Chain: base,
      chain: publicClient.chain,
      contract: OpStackL1Contract.OptimismPortal,
    },
  )

  expect(resolvedPortalAddress).toEqual('0x49048044D57e1C92A77f79988d21Fa8fAF74E97e')
})

test('raises error if chain undefined', async () => {
  await expect(async () =>
    resolveL1OpStackContractAddress(
      // @ts-expect-error
      {
        l2Chain: undefined,
        chain: publicClient.chain,
        contract: OpStackL1Contract.OptimismPortal,
      },
    )
  ).rejects.toThrowError('Must provide either l2Chain or optimismPortalAddress')
})

test('raises error if L1 mismatch', async () => {
  // Create a mock of publicClient with the modified chain ID
  const mockClient = { ...publicClient, chain: { id: 0 } as Chain }

  await expect(async () =>
    resolveL1OpStackContractAddress(
      {
        l2Chain: base,
        chain: mockClient.chain,
        contract: OpStackL1Contract.OptimismPortal,
      },
    )
  ).rejects.toThrowError('Chain ID "0" does not match expected L1 chain ID "1"')
})
