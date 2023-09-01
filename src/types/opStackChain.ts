import { Address, Chain } from 'viem'

export type OpStackL1Chain = Chain & {
  contracts: {
    optimismL1CrossDomainMessenger: {
      [chainId: number]: Address
    }
    optimismL1Erc721Bridge: {
      [chainId: number]: Address
    }
    optimismL1StandardBridge: {
      [chainId: number]: Address
    }
    optimismL2OutputOracle: {
      [chainId: number]: Address
    }
    optimismPortal: {
      [chainId: number]: Address
    }
    optimismSystemConfig: {
      [chainId: number]: Address
    }
    optimismSystemDictator: {
      [chainId: number]: Address
    }
  }
}

export type OpStackL2Chain = Chain & {
  contracts: {
    optimismL2CrossDomainMessenger: Address
    optimismL2StandardBridge: Address
    optimismGasPriceOracle: Address
    optimismL1Block: Address
    optimismL2ToL1MessagePasser: Address
    optimismL2Erc721Bridge: Address
    optimismMintableErc721Factory: Address
  }
}

export const opStackL2Predeploys = {
  optimismL2CrossDomainMessenger:
    '0x4200000000000000000000000000000000000007' as Address,
  optimismL2StandardBridge:
    '0x4200000000000000000000000000000000000010' as Address,
  optimismGasPriceOracle:
    '0x420000000000000000000000000000000000000F' as Address,
  optimismL1Block: '0x4200000000000000000000000000000000000015' as Address,
  optimismL2ToL1MessagePasser:
    '0x4200000000000000000000000000000000000016' as Address,
  optimismL2Erc721Bridge:
    '0x4200000000000000000000000000000000000014' as Address,
  optimismMintableErc721Factory:
    '0x4200000000000000000000000000000000000017' as Address,
}
