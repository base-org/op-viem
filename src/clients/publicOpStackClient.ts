import {
  Chain,
  type PublicClient,
  Transport,
  ClientConfig,
  createPublicClient,
  PublicRpcSchema,
  type Client,
  PublicClientConfig,
} from 'viem'
import { Prettify } from 'viem/dist/types/types/utils'
import {
  type PublicOpStackActions,
  publicOpStackActions,
} from './decorators/publicOpStack'

export type PublicOpStackClientConfig<
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
> = Prettify<
    PublicClientConfig<transport, chain>
>

export type PublicOpStackClient<
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
> = Prettify<
  Client<
    transport,
    chain,
    undefined,
    PublicRpcSchema,
    PublicOpStackActions<transport, chain>
  >
>

export function createPublicOpStackClient<
  transport extends Transport,
  chain extends Chain | undefined = undefined,
>(
  parameters: PublicOpStackClientConfig<transport, chain>,
): PublicOpStackClient<transport, chain>

export function createPublicOpStackClient(
  parameters: PublicOpStackClientConfig,
): PublicOpStackClient {
  const { key = 'publicOpStack', name = 'Public OP Stack Client' } = parameters
  const client = createPublicClient({
    ...parameters,
    key,
    name,
  })
  return client.extend(publicOpStackActions)
}
