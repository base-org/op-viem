import { Address } from 'viem'
import { useOptimismPortalDepositTransaction as useDepositTransaction } from '../generated/optimismPortal'
import { Chain, mainnet, useAccount, usePublicClient } from 'wagmi'
import { MustSupplyAddressOrL2ChainIdError } from '../errors'
import { getL1PortalForChain } from '../utils/getL1PortalForChain'
import { goerli } from 'viem/dist/types/chains'
import { useEffect, useState } from 'react'
import { OPStackMainnetChains, OPStackTestnetChains } from '../lib/chains'

type DepositTransactionArgs = {
  to: Address
  value: bigint
  gasLimit: bigint
  isCreation: boolean
  data: `0x${string}`
}

export function usePortal(
  {
    to,
    value = BigInt(0),
    gasLimit = BigInt(0),
    isCreation = false,
    data = '0x0',
  }: DepositTransactionArgs,
  l1ChainId: number = mainnet.id,
  portalAddress?: Address,
  l2Chain?: Chain,
) {
  const [finalGasLimit, setFinalGasLimit] = useState<bigint>(gasLimit)

  if (!portalAddress && !l2Chain) {
    throw new MustSupplyAddressOrL2ChainIdError()
  }

  if (l2Chain) {
    if (
      (l1ChainId == mainnet.id && !OPStackMainnetChains.includes(l2Chain)) ||
      (l1ChainId == goerli.id && !OPStackTestnetChains.includes(l2Chain))
    ) {
      throw new Error(
        `L2 chain ${l2Chain} does not match known chains, given L1 chain ID ${l1ChainId}`,
      )
    }
  }

  useEffect(() => {
    if (gasLimit) return

    if (!l2Chain) {
      throw new Error('Must supply L2 chain if gasLimit is not provided')
    }

    const publicClient = usePublicClient({ chainId: l2Chain!.id })
    const { address } = useAccount()

    if (!address) return

    const fetchGasEstimate = async () => {
      if (!l2Chain) {
        throw new Error('Must supply L2 chain if gasLimit is not provided')
      }

      const gasEstimate = await publicClient.estimateGas({
        account: address!,
        to: to,
        value: value,
        data: data,
        gasPrice: BigInt(1),
      })

      // RPC estimate is probably already high, but having a gas limit
      // too low when using the portal can lead to unrecoverable funds
      // so we add some more
      setFinalGasLimit(gasEstimate * BigInt(1.1))
    }

    fetchGasEstimate()
  }, [gasLimit])

  return useDepositTransaction({
    chainId: l1ChainId,
    address: portalAddress || getL1PortalForChain(l2Chain!),
    value: value,
    args: [to, value, finalGasLimit, isCreation, data],
  })
}
