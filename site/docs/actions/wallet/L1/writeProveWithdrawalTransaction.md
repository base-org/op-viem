# writeProveWithdrawalTransaction

Excutes a [proveWithdrawalTransaction](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L208) call to the `OptimismPortal` contract.

::: info
This is the second step in a withdrawal flow, or more generally, an L2 -> L1 call flow.

Calling this method requires that the state root of the L2 transaction has been written to L1. [getProveWithdrawalTransactionArgs]() supplies the arguments for this function.

To finalize after this is called, anyone can call [writeFinalizeWithdrawalTransaction](/docs/actions/wallet/L1/writeFinalizeWithdrawalTransaction) after the fault challenge period has elapsed.

Read [here](https://community.optimism.io/docs/developers/bridge/messaging/#for-op-mainnet-l2-to-ethereum-l1-transactions) for more details.

:::

::: warning

From Viem [writeContract](https://viem.sh/docs/contract/writeContract.html#writecontract), which this function uses internally.

> The `writeContract` internally sends a transaction – it **does not** validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `simulateContract`](#usage) before you execute it.

In this case, you can use [simulateProveWithdrawalTransactoin](/docs/actions/public/L1/simulateProveWithdrawalTransactoin).

:::

::: code-group

```ts [example.ts]
import { ProveWithdrawalTransactionArgs } from 'op-viem'
import { baseAddresses } from 'op-viem/chains'
import {
  account,
  opStackL1PublicClient,
  opStackL1WalletClient,
  opStackL2PublicClient,
} from './config'

// with static args
const args: ProveWithdrawalTransactionArgs = {
  withdrawalTransaction: {
    nonce:
      1766847064778384329583297500742918515827483896875618958121606201292641781n,
    sender: '0x6fF4d0F93f42085905465a1F95C84C6F479276d4',
    target: '0x6fF4d0F93f42085905465a1F95C84C6F479276d4',
    value: 510000000000000000n,
    gasLimit: 100000n,
    data: '0x01',
  },
  L2OutputIndex: 1983n,
  outputRootProof: {
    version:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    stateRoot:
      '0x2f88eba150af9466a113eb46ff906a065ef22e8c95ad1dd32aae1cbbe1e12678',
    messagePasserStorageRoot:
      '0x3d8776996ba02c6892afe905bddd91f5f16d718428731529f67aa13cfa868990',
    latestBlockhash:
      '0x1a596b3e71a8911bd8b9a4ce5ac9e50c99d98045c2776cba1456c6fa09d4589f',
  },
  withdrawalProof: [
    '0xf90211a02a319e7abc4ec426abc118e2145d45818a17e510fbdb5efd77eeab0be1aa736ea067b51916602727d793da6fca50a032af418cfa40005128543c74bf9802b75f3ca07d02607a46ecf6b2968044541c164bbf77f97f77f98306f80733691ab2dd6d55a075c44265884ab94c2242c5322a2ddc7e124989a70b14305450643a75c6914e65a03ef0bb4c7b51afd74fc25858747b7732cbb989f1d0188587c4c54846fbf2b4faa05218ce134b033f69d1b15bd752dd1346cabd86baafaa493a74999503811a16d3a0a24d9dd8ea660bf4c76878aaa903e4d1f802737176eab5ef088019d66a511de8a05936abfe5940ba9cdcd5b61d5b4f004f1fab649a6cb824942ea98dcc9ad7a772a0bb670f6c969ad1ec5f9a031282b52adef1b254813c435311a317513a414800a7a00a83e81a10be10f4de8a1b1e785fe7317833d6a8143713e133dd30cd3dff5825a07359f68c401781269362a230f03c94a1052a04013970f9fbcc2cc54491f8c2faa0dceae97e2c8c7b98d9543767c5ccfab1e6321e3929156536229ceaef8cddc902a07529b54f2c3ebdccb914fb04f5931d5a1fd92a7dbb073005566f6b344629c71ea09512611957638089948e04e689514e8ec839affc76cfc728141ea2780624645da064e873538af53ccdbdbab0c6023496afdcb299595925f206a25357a108cd4145a08c65c405453b6d44f28efb5c88bf4d74f5e516f7831363d037da81de816257d880',
    '0xf90211a0cc4d4aa031ad23e4820383c8b2b170af65319b20fb8989ec780f34c0c459818ca0a328e501718601c2fb4c3fae8dee0559ebea072ccf2a67bcd93ec83a4770f837a0414aade9b01d3ece8f041e80d816f4ebeb91cf441ca87673fa078146d5ca9ae1a0d032a02cf47d3e4e93b0f748b2e7c01d55db212c1c51aea996184b7946698452a04221ac12d69dea8d081c9686963e05aaacc569b6a1489ee46c06a1232313428fa03173de4fbdb28fb72758bd7bd39c41159625cf1162ed640c1502e86f3337e119a0d6b0f8d99c7d002ca95b318c37fe377c45680e0a4b68b86329054e879ae09b57a037faa7a07843c8da38e2cb5f2374577eb3355ed36eb2cebb27c3ba37d51e11b9a0dcaf9ec37101820826722e32b2598ed99f71e2a0359ffd90d8ef08d3e9f006e3a02ef2fa41273664f39e82b489a21fd98374b1bcec7f1f7b18223a81ae71909ae2a02f97fc82e94015c33068ceca5c81faffc3b0720eb29ae2b3fdf73547bb1b5651a0ced24404203865f41fdf98a01011461a7ae2b569cbfc148efd31c82cef997169a0d46bc21eedf9f0e7896d4824795a0c9c8064d4dff79ab675e215486346a1c9b9a0306900c5c36125307eb82b17415f5b632f10f6bb00efb930a657d10937833381a0dd061dfa9786b28ece9e537c72d50b502a7363a41d4b1d1e0ef9a0acb43abff9a010d95fa564a4e917212ccf143f96c3ef9ceacf990d5abc7af0c5651f3764f81680',
    '0xf90211a0c869887a437ad7ab6787fe3a29c84e0ebb44a33759da07b9c08d58d2e77e438ba09a9f45fc228fb87962f90bed526a7691be2f305ecf6bdda998ce18b5c69adb5fa072dbef4a968aeacb48aef4335b4dae48140473d5d0486fd9b58e8a13ae0246aca03a6921ff386c9e79220be15734535f0117ff7068d853a154cab9f757bcabf70da0a79605cbd7ecf0aa93b6166a82fab43d045987df0659af66a3065768dd540265a081a92fd6fb094ce6d60bc5c96b59ff9e2b6d249c7fc4c9d17ed4b7d8ae8f835ca09162c818b3953c9e453777d8f52b0134b65ca692a42d991b24eb6e1b3b20014ca061b955321045edd643a83f1e9ee3f81d6052186beab9c90b5066aa616084d15fa09c09972fcb9b769510a2bf63288d99665d551e485748da9b07f7616113c4e2e8a0504e04ef7b032a42bb473378fce612d805a005d15d338dd95919f638cbe15602a02cc203f87c7f8f9558e96defec67f052e9369494ebd8833823fdf2e393abef57a0c13d7fd32e9b9db08a7934979467f7d4c284156a42c7a7ab74cab56fa81102fca02dcb3873e69232064dfca6614bb5f7cef8680af2ef2af89be672a5d09167e78ba0b2edc8539719e352099535d41dec44be43291cae7beef94562100776203bf705a09a1b963cb8607557e42e402cf1471a52bde335cc53427d7fa61507a0068dd785a095b2547a4099d41a7062b2541844f07383620d2a39dd7748d233ab877288538780',
    '0xf8b1a078d60230b73b8ac956db1e265165bd0af7fcf4463798e3563aab8836ec61b551a06bf2909bcc2df3f20785ca22b2ba016fd59d1bf7bed1be47ee611a2324d37f3ea087095a2e2862cd18ac3a07ff586b587c87d2aa6461669178446a81d4446bb9b5808080a0c8fff4788282b797a02e9d61430e3a7063a0de9f053835a4cf9f78049dd2ebed8080808080808080a0fee4bc47902fc516a836782b80ef2a78c144be96fb5629c76832b903bca4915980',
    '0xf851808080a0416fd1169258cec24c52324935014bf4f68f3536180a4602708b5cd521a2659e8080a0b01b31a59349372e45452b61e689ecbfe33939eb609207f4b650c173c05722bf80808080808080808080',
    '0xe09e3244a3f2d3e778ea2b2c739f085da3cf4453befda1c8c31c84e17e18a39301',
  ],
}

// with fetched args
const withdrawalMessages = await opStackL2PublicClient.getWithdrawalMessages({
  hash: '0xd0eb2a59f3cc4c61b01c350e71e1804ad6bd776dc9abc1bdb5e2e40695ab2628',
})

const output = await opStackL1PublicClient.getOutputForL2Block({
  l2BlockNumber: withdrawalMessages.blockNumber,
  ...baseAddresses,
})

const args = await opStackL2PublicClient.getProveWithdrawalTransactionArgs({
  message: withdrawalMessages.messages[0],
  output: output,
})

const hash = await opStackL1WalletClient.writeProveWithdrawalTransaction({
  args,
  ...baseAdddresses,
  account: account,
})
```

```ts [config.ts]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { walletL1OpStackActions, publicL1OpStackActions, publicL2OpStackActions } from 'op-viem'

export const opStackL1WalletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletL1OpStackActions)

export const opStackL1PublicClient = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicL1OpStackActions)

export const opStackL2PublicClient = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicL2OpStackActions)

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()
// Local Account
export const account = privateKeyToAccount(...)
```

:::

## Return Value

[`Hash`](https://viem.sh/docs/glossary/types#hash)

A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash).

`writeContract` only returns a [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). If you would like to retrieve the return data of a write function, you can use the [`simulateProveWithdrawalTransaction` action](/docs/actions/public/L1/simulateProveWithdrawalTransactoin) – this action does not execute a transaction, and does not require gas.

## Parameters

### args

- #### withdrawalTransaction
  - **Type:** [`MessagePassedEvent`]() with `withdrawalHash` omitted
  - The L2 MessagePassedEvent emitted for this withdrawal

- #### L2OutputIndex
  - **Type:** `bigint`
  - The index of the L2 output, written to L1, which includes the state root of the L2 transaction.

- #### outputRootProof
  - **Type:** [`OutputRootProof`]()
  - Inclusion proof of the L2ToL1MessagePasser contract's storage root.

- #### withdrawalProof
  - **Type:** `Hex[]`
  - Inclusion proof of the withdrawal in L2ToL1MessagePasser contract.

```ts
await walletClient.writeProveWithdrawalTransaction({
  args: { // [!code focus:30]
    withdrawalTransaction: {
      nonce:
        1766847064778384329583297500742918515827483896875618958121606201292641781n,
      sender: '0x6fF4d0F93f42085905465a1F95C84C6F479276d4',
      target: '0x6fF4d0F93f42085905465a1F95C84C6F479276d4',
      value: 510000000000000000n,
      gasLimit: 100000n,
      data: '0x01',
    },
    L2OutputIndex: 1983n,
    outputRootProof: {
      version:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      stateRoot:
        '0x2f88eba150af9466a113eb46ff906a065ef22e8c95ad1dd32aae1cbbe1e12678',
      messagePasserStorageRoot:
        '0x3d8776996ba02c6892afe905bddd91f5f16d718428731529f67aa13cfa868990',
      latestBlockhash:
        '0x1a596b3e71a8911bd8b9a4ce5ac9e50c99d98045c2776cba1456c6fa09d4589f',
    },
    withdrawalProof: [
      '0xf90211a02a319e7abc4ec426abc118e2145d45818a17e510fbdb5efd77eeab0be1aa736ea067b51916602727d793da6fca50a032af418cfa40005128543c74bf9802b75f3ca07d02607a46ecf6b2968044541c164bbf77f97f77f98306f80733691ab2dd6d55a075c44265884ab94c2242c5322a2ddc7e124989a70b14305450643a75c6914e65a03ef0bb4c7b51afd74fc25858747b7732cbb989f1d0188587c4c54846fbf2b4faa05218ce134b033f69d1b15bd752dd1346cabd86baafaa493a74999503811a16d3a0a24d9dd8ea660bf4c76878aaa903e4d1f802737176eab5ef088019d66a511de8a05936abfe5940ba9cdcd5b61d5b4f004f1fab649a6cb824942ea98dcc9ad7a772a0bb670f6c969ad1ec5f9a031282b52adef1b254813c435311a317513a414800a7a00a83e81a10be10f4de8a1b1e785fe7317833d6a8143713e133dd30cd3dff5825a07359f68c401781269362a230f03c94a1052a04013970f9fbcc2cc54491f8c2faa0dceae97e2c8c7b98d9543767c5ccfab1e6321e3929156536229ceaef8cddc902a07529b54f2c3ebdccb914fb04f5931d5a1fd92a7dbb073005566f6b344629c71ea09512611957638089948e04e689514e8ec839affc76cfc728141ea2780624645da064e873538af53ccdbdbab0c6023496afdcb299595925f206a25357a108cd4145a08c65c405453b6d44f28efb5c88bf4d74f5e516f7831363d037da81de816257d880',
      '0xf90211a0cc4d4aa031ad23e4820383c8b2b170af65319b20fb8989ec780f34c0c459818ca0a328e501718601c2fb4c3fae8dee0559ebea072ccf2a67bcd93ec83a4770f837a0414aade9b01d3ece8f041e80d816f4ebeb91cf441ca87673fa078146d5ca9ae1a0d032a02cf47d3e4e93b0f748b2e7c01d55db212c1c51aea996184b7946698452a04221ac12d69dea8d081c9686963e05aaacc569b6a1489ee46c06a1232313428fa03173de4fbdb28fb72758bd7bd39c41159625cf1162ed640c1502e86f3337e119a0d6b0f8d99c7d002ca95b318c37fe377c45680e0a4b68b86329054e879ae09b57a037faa7a07843c8da38e2cb5f2374577eb3355ed36eb2cebb27c3ba37d51e11b9a0dcaf9ec37101820826722e32b2598ed99f71e2a0359ffd90d8ef08d3e9f006e3a02ef2fa41273664f39e82b489a21fd98374b1bcec7f1f7b18223a81ae71909ae2a02f97fc82e94015c33068ceca5c81faffc3b0720eb29ae2b3fdf73547bb1b5651a0ced24404203865f41fdf98a01011461a7ae2b569cbfc148efd31c82cef997169a0d46bc21eedf9f0e7896d4824795a0c9c8064d4dff79ab675e215486346a1c9b9a0306900c5c36125307eb82b17415f5b632f10f6bb00efb930a657d10937833381a0dd061dfa9786b28ece9e537c72d50b502a7363a41d4b1d1e0ef9a0acb43abff9a010d95fa564a4e917212ccf143f96c3ef9ceacf990d5abc7af0c5651f3764f81680',
      '0xf90211a0c869887a437ad7ab6787fe3a29c84e0ebb44a33759da07b9c08d58d2e77e438ba09a9f45fc228fb87962f90bed526a7691be2f305ecf6bdda998ce18b5c69adb5fa072dbef4a968aeacb48aef4335b4dae48140473d5d0486fd9b58e8a13ae0246aca03a6921ff386c9e79220be15734535f0117ff7068d853a154cab9f757bcabf70da0a79605cbd7ecf0aa93b6166a82fab43d045987df0659af66a3065768dd540265a081a92fd6fb094ce6d60bc5c96b59ff9e2b6d249c7fc4c9d17ed4b7d8ae8f835ca09162c818b3953c9e453777d8f52b0134b65ca692a42d991b24eb6e1b3b20014ca061b955321045edd643a83f1e9ee3f81d6052186beab9c90b5066aa616084d15fa09c09972fcb9b769510a2bf63288d99665d551e485748da9b07f7616113c4e2e8a0504e04ef7b032a42bb473378fce612d805a005d15d338dd95919f638cbe15602a02cc203f87c7f8f9558e96defec67f052e9369494ebd8833823fdf2e393abef57a0c13d7fd32e9b9db08a7934979467f7d4c284156a42c7a7ab74cab56fa81102fca02dcb3873e69232064dfca6614bb5f7cef8680af2ef2af89be672a5d09167e78ba0b2edc8539719e352099535d41dec44be43291cae7beef94562100776203bf705a09a1b963cb8607557e42e402cf1471a52bde335cc53427d7fa61507a0068dd785a095b2547a4099d41a7062b2541844f07383620d2a39dd7748d233ab877288538780',
      '0xf8b1a078d60230b73b8ac956db1e265165bd0af7fcf4463798e3563aab8836ec61b551a06bf2909bcc2df3f20785ca22b2ba016fd59d1bf7bed1be47ee611a2324d37f3ea087095a2e2862cd18ac3a07ff586b587c87d2aa6461669178446a81d4446bb9b5808080a0c8fff4788282b797a02e9d61430e3a7063a0de9f053835a4cf9f78049dd2ebed8080808080808080a0fee4bc47902fc516a836782b80ef2a78c144be96fb5629c76832b903bca4915980',
      '0xf851808080a0416fd1169258cec24c52324935014bf4f68f3536180a4602708b5cd521a2659e8080a0b01b31a59349372e45452b61e689ecbfe33939eb609207f4b650c173c05722bf80808080808080808080',
      '0xe09e3244a3f2d3e778ea2b2c739f085da3cf4453befda1c8c31c84e17e18a39301',
    ],
  }
  ...baseAddresses
})
```

### portal

- **Type:** [`RawOrContractAddress`](https://opviem.sh/docs/glossary/types.html#raworcontractaddress)

The `OptimismPortal` contract where the sendMessage call should be made.

```ts
await walletClient.writeProveWithdrawalTransaction({
  args,
  portal: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e', // [!code focus:1]
})
```

::: tip
`account`, `accessList`, `chain`, `dataSuffix`, `gasPrice`, `maxFeePerGas`, `maxPriorityFeePerGas`, and `nonce` can all also be passed and behave as with any viem writeContract call. See [their documentation](https://viem.sh/docs/contract/writeContract.html#writecontract) for more details.
:::
