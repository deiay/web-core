import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import { getExplorerLink } from './gateway'
import chains from '@/config/chains'

export enum FEATURES {
  ERC721 = 'ERC721',
  SAFE_APPS = 'SAFE_APPS',
  CONTRACT_INTERACTION = 'CONTRACT_INTERACTION',
  DOMAIN_LOOKUP = 'DOMAIN_LOOKUP',
  SPENDING_LIMIT = 'SPENDING_LIMIT',
  EIP1559 = 'EIP1559',
  SAFE_TX_GAS_OPTIONAL = 'SAFE_TX_GAS_OPTIONAL',
  TX_SIMULATION = 'TX_SIMULATION',
  DEFAULT_TOKENLIST = 'DEFAULT_TOKENLIST',
}

export const hasFeature = (chain: ChainInfo, feature: FEATURES): boolean => {
  return (chain.features as string[]).includes(feature)
}

export const getBlockExplorerLink = (
  chain: ChainInfo,
  address: string,
): { href: string; title: string } | undefined => {
  if (chain.blockExplorerUriTemplate) {
    return getExplorerLink(address, chain.blockExplorerUriTemplate)
  }
}

export const getShortName = (chainId: string): string | undefined => {
  return Object.keys(chains).find((prefix) => chains[prefix] === chainId)
}

export const getChainId = (shortName: string): string | undefined => {
  return chains[shortName]
}
