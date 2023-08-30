export const accounts = [
  {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    balance: 10000000000000000000000n,
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
  {
    address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x976ea74026e726554db657fa54763abd0c3a0aa9',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x14dc79964da2c08b23698b3d3cc7ca32193d9955',
    balance: 10000000000000000000000n,
  },
  {
    address: '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f',
    balance: 10000000000000000000000n,
  },
  {
    address: '0xa0ee7a142d267c1f36714e4a8f75612f20a79720',
    balance: 10000000000000000000000n,
  },
] as const

export const poolId = Number(process.env.VITEST_POOL_ID ?? 1)
export const localHttpUrl = `http://127.0.0.1:8545/${poolId}`
export const localWsUrl = `ws://127.0.0.1:8545/${poolId}`

const messages = new Map()
function warn(message: string) {
  if (!messages.has(message)) {
    messages.set(message, true)
    console.warn(message)
  }
}

export let forkBlockNumber: bigint
if (process.env.VITE_ANVIL_BLOCK_NUMBER) {
  forkBlockNumber = BigInt(Number(process.env.VITE_ANVIL_BLOCK_NUMBER))
} else {
  forkBlockNumber = 17987353n
  warn(
    `\`VITE_ANVIL_BLOCK_NUMBER\` not found. Falling back to \`${forkBlockNumber}\`.`,
  )
}

export let forkUrl: string
if (process.env.VITE_ANVIL_FORK_URL) {
  forkUrl = process.env.VITE_ANVIL_FORK_URL
} else {
  forkUrl = 'https://cloudflare-eth.com'
  warn(`\`VITE_ANVIL_FORK_URL\` not found. Falling back to \`${forkUrl}\`.`)
}

export let blockTime: number
if (process.env.VITE_ANVIL_BLOCK_TIME) {
  blockTime = Number(process.env.VITE_ANVIL_BLOCK_TIME)
} else {
  blockTime = 1
  warn(`\`VITE_ANVIL_BLOCK_TIME\` not found. Falling back to \`${blockTime}\`.`)
}
