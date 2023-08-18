export class MustSupplyAddressOrL2ChainIdError extends Error {
  name = 'MustSupplyAddressOrL2ChainIdError'
  message = 'Must supply either an L1 Optimism Portal address or an L2 ChainId'
}
