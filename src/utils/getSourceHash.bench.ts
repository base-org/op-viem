import { bench, describe } from "vitest"

describe('Create contract instance', () => {
    bench('op-viem: `getContract`', async () => {
      getContract({
        ...wagmiContractConfig,
        publicClient,
      })
    })
  
    bench('ethers@5: `new Contract`', async () => {
      new Contract(
        wagmiContractConfig.address,
        wagmiContractConfig.abi,
        ethersProvider,
      )
    })
}