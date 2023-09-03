import { Chain } from "viem";
import { optimismGoerli as viemOptimismGoerli } from "viem/chains";
import { opStackL2ContractAddresses } from "../types/opStackContracts";

export const optimismGoerli = {
  ...viemOptimismGoerli,
  contracts: {
    ...viemOptimismGoerli.contracts,
    ...opStackL2ContractAddresses,
  },
} satisfies Chain;
