import { goerli as viemGoerli } from "viem/chains";
import { ContractRichChain } from "../_test/utils";

export const goerli = {
  ...viemGoerli,
  contracts: {
    ...viemGoerli.contracts,
    optimismL1CrossDomainMessenger: {
      84531: "0x8e5693140eA606bcEB98761d9beB1BC87383706D",
      999: "0xD87342e16352D33170557A7dA1e5fB966a60FafC",
      420: "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294",
    },
    optimismL1Erc721Bridge: {
      84531: "0x5E0c967457347D5175bF82E8CCCC6480FCD7e568",
    },
    optimismL1StandardBridge: {
      84531: "0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a",
      999: "0x7CC09AC2452D6555d5e0C213Ab9E2d44eFbFc956",
      420: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8",
    },
    optimismL2OutputOracle: {
      84531: "0x2A35891ff30313CcFa6CE88dcf3858bb075A2298",
      999: "0xdD292C9eEd00f6A32Ff5245d0BCd7f2a15f24e00",
      420: "0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0",
    },
    optimismPortal: {
      84531: "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA",
      999: "0xDb9F51790365e7dc196e7D072728df39Be958ACe",
      420: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383",
    },
    optimismSystemConfig: {
      84531: "0xb15eea247eCE011C68a614e4a77AD648ff495bc1",
    },
    optimismSystemDictator: {
      84531: "0x3A2b271C49e673DEF1561c7fF159b99a7c5801b8",
    },
  },
} satisfies ContractRichChain;
