import { createPublicClient, http } from "viem";
import { expect, test } from "vitest";
import { base } from "../../../chains/base";
import { mainnet } from "../../../chains/mainnet";
import { getOutputForL2Block } from "../L1/getOutputForL2Block";
import { getProveWithdrawalTransactionArgs } from "./getProveWithdrawalTransactionArgs";
import { getWithdrawalMessages } from "./getWithdrawalMessages";

// from OP SDK getMessageBedrockOutput
const expectedResult = {
  outputRootProof: {
    version: "0x0",
    stateRoot: "0xe909d5e15d0c6146b47ebd1607c3182af86e18485f7f305fa2021917497d5d98",
    messagePasserStorageRoot: "0x063558cfefd548f5e1e10bb279d77f844e0c1600b82e001b61dc39d8a110c99d",
    latestBlockhash: "0xbabd4c84a2ae4686fe3a2316e506fbdf7a29186ec0bdfb4b0c94dfed235f59ba",
  },
  withdrawalProof: [
    "0xf90211a0c442ec16927b8c3a1d21b1926328917a0192530092c0bc0485ab3d5ff58c9915a01b4b2c26f0a7cfec3eb54a054d0c9ba01e36ef95a0b788ca5f25068916097947a09eb06f396b1eb0085fc9285698a0c80ff641d906f236bb27ce54f2adf84249d4a0469745da855a3245c2d7229ccf83f873c380b855e37b3b979327acb8b8dd1c56a035b1a95302ea66542c5723c6cdb22f3de2f01df5b884c511efbfab43b14e6fdaa083c5c51af88e8683fc07cecae70dbf3f221596a4cfc6e98bec487313694fa4a5a04426a8fdd48061b3274d6bb69347c770eef779d133f74728ab8515a0eaf18cc2a081de94617abfccf4d2f3f4abd1e54b9e611719e3336369e157f03342ff50cd8fa00eb27d15da1575a7c7870631d4c664ce2a4843e4a1cabbcd9aca0849d48bf1dea08124114055387b96a2684b4836b5240221739f71967a7cdae17c8f8d4bcdf585a046e4ce5462d16834e9096e979bd55ed804e198a2ce80d724502ab8d7847c20c9a0111dbdc04debfd506c6e9e5907b979e4a90e1033723c94b488586680bde1e71fa095ef1e24dc9c70f82816f9a7c14c79d6fab6306b5e710ecf4f1c271b6a9c9938a08f5fd3bd1f5bcc1c5d1e74c5b0b775fddc7ff748f07d33493b7b29ca5890ae80a06514e76dc7564149abf673d7aafca95e8e3fabfd3e19fc652fc4571dd0ba9ce2a037095a85d48c6a099bb02f9ec6e7ab106a832e23ccf9b414e425c55792c8b0f480",
    "0xf90211a04bd2a9d5d641329d3c26921b89e340444efd29113100357fc134c08110365720a09599e7d5af6cc71196e9521db732aa05b65ae6a62c0a851d540ee142bedfe9e1a070c7e05824b8444ea2466ab0eaa8aa9d557011df93f14bade1bb59aadb2729aaa0a80b36cb94054714e3b5073919ab3867b6a9120aac0268c26b8ac5a8952a5341a094b91043b0c38db0436d4141dd9a8f1b83f692c8b50b51ed8dfc821c37d83597a0a8df18ca6bc9a73270cc1e5e60a551745ff5e558231f14f0ea3223fe17a6bf1ea05d5c9e4aab932a06a1212a7111e87d4b5b54b312a8febb9a4fb0e50b695ae5f4a00c26fa694fc6f0cb4eb3874c87e3db5fa0c9da7819c79ad1bd853eb90eaa2bb4a0b57afb132d073b9908fb52510ef3bbaf48c4fcd9d1896beb64846c9c64d6f970a0b515f93b23fffc1ab2f88d26f6de422513552849475217d67f0c8f4dd31e6169a07196961036fe0f1bebc3073967a7ed7ce083b47854ab02c1d585d6cd2611dc4da0ceed40ad39c13321e7cf9a432d040dac16cdc6d595cb048e4a5ef5022ad39992a0529c3acae4a8f95b706bf4745df0694c4475240cf8ba8803cfdcf320d41b8d0aa0bf488ebf95fa22809076954b070293063decc2689ffbc47c346160dff5754e0ea027265575861175b575f0a1a86bbf68942bea09c3aeee913f7aa0f771481eaf45a05a16105a18250c62478758722ba0f2a9a7dbf55ae076140494bb9eda8a7af73380",
    "0xf901f1a0d2036bc2ee0d9b434a836bd40ffd07df618ee2dfe872cd44adae4d6b4f061884a0cda404b70b650ac2f83c3294ee94070664b56a9433a98f5f485cef0e4635055ca0b7b831fb142df517fe108c38b5cc9b0ace556c3d87d6852a6a1258e57050f47fa0caf4152cedd6840ebf1d0d681eb2414917a40f397ad8e155b72006308cc0a110a0d654bbff805f24d0809f88c26c06fa3a6ec21c5168b7ec48e462e55ba1766bdda07d507fd6b79893438babd2aa9c4172ef2ba9863138582e405b87c487ab723c9480a0955905bebf922adf568857eb8200e6503c7595b547da39217b3282fb932f7efba0fa5a1fe6968b590f8c9e73169e02b6235b15c92bf26b781df8890b9582db2674a00896dd9f1c2652ea73839b700ea8dbbd7ff86ab9dd08a807f06a9c43de60e219a0579531d4004aff2de16798967f2a32d338b2dcf3fa8782f2ab446a817febd0b0a03f37603aee5751159791f5a6b54b4c4af907acc3e198f82b1bfaf2ed26ba8192a0cf8aef17001ef0409c500a13c06f6bba4db0024bea043bfc9a1e57b5ce6b8663a073e0854e2c3bbbc5a93366a14506f826b2ea72c937f3aaddc9e044a12ce231dda0172527e7857d131c22b52dc9469da84c9c947e796c2d58a6872f35afef69e638a02cd8a4052bfdee7a144b44c1b62fe2872c99464f464199b91c4e714bdb3cc6c480",
    "0xf90171a0e85daa28f328c44aac38d01afaaa2c8a4daf72c72f14af13e44e17c2e065e3e0a0e786fd2f627b78a3c92c345b9c477323073a7a7fe11454d8abef780f88d92a9ca027f05db0b6cae631415926d6118142f4574ffd2b718dd94ac66d71cda7687e6f80a042f849cea0f5656299dbda38dbdc7de1d5fd8268a57bd9060a0e0101a9628ef3a0e3af109e9c8264661031731f195a50be7490e7eba86ddd35ae498403ca886899a0a4ad1dd7898dc071407c227b59ca7d26aa04466b03ba8c0f2d5fdaf7ba5b9b6ea0e569e86111634db99a1d80ac53d351a90be7319286b21ea864091e2b854b9531a01696449e49bde5e863ae32d8cdc01a57884503b53f9264fe8c8b1ca7e0bd72c5808080a07bcf679a845fb9ec87176225a3234f7245525a5fecaeafb33958d8fdf6454edda0a271115e3916d43d10a0030020a7cfb328994e7c30b8aa8132bf7f8acf59c54280a049e0501f9c907e94f38addec497bf6d7f0c8e70c138944aafd765fc3c3d368da80",
    "0xe19f203481d0e7a51c34fce1e3ec56e93b58975fbcefc313b6ea07f4701a7f74b801",
  ],
  l2OutputIndex: 1748n,
};

test("correctly generates args", async () => {
  // cannot currently use anvil rollupPublicClient for this as eth_getProof isn't working
  const client = createPublicClient({
    chain: base,
    transport: http(),
  });

  const withdrawalMessages = await getWithdrawalMessages(client, {
    hash: "0xd0eb2a59f3cc4c61b01c350e71e1804ad6bd776dc9abc1bdb5e2e40695ab2628",
  });

  // TODO: using publicClient was giving issues in CI, need to solve
  const l1Client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const output = await getOutputForL2Block(l1Client, {
    l2BlockNumber: withdrawalMessages.blockNumber,
    l2ChainId: base.id,
  });

  // TODO(wilson): We should simplify these test to not require so much setup ^
  const args = await getProveWithdrawalTransactionArgs(client, {
    message: withdrawalMessages.messages[0],
    output: output,
  });

  expect(args.L2OutputIndex).toEqual(expectedResult.l2OutputIndex);
  expect(args.outputRootProof).toEqual(expectedResult.outputRootProof);
  expect(args.withdrawalProof).toEqual(expectedResult.withdrawalProof);
  const { withdrawalHash, ...withdrawalTransaction } = withdrawalMessages.messages[0];
  expect(args.withdrawalTransaction).toEqual(withdrawalTransaction);
});
