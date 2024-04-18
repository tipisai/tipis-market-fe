import {
  agentRequest,
  marketplaceRequest,
  publicMarketplaceRequest,
} from "@illa-public/illa-net"
import { MarketAgentListData } from "@illa-public/market-agent/service"
import { Agent } from "@illa-public/public-types"
import {
  CanEditResponse,
  PRODUCT_SORT_BY,
  ProductListParams,
} from "@/interface/common"

export const fetchStarAIgentList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  const {
    page = 1,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.STARRED,
    search,
    hashtags,
  } = params
  return marketplaceRequest<MarketAgentListData>({
    url: `/aiAgents`,
    method: "GET",
    signal: signal,
    params: {
      page,
      limit,
      sortedBy,
      search,
      hashtags,
    },
  })
}

export const fetchAIgentList = (
  params: ProductListParams,
  signal?: AbortSignal,
) => {
  const {
    page = 1,
    limit = 10,
    sortedBy = PRODUCT_SORT_BY.POPULAR,
    search,
    hashtags,
  } = params
  return publicMarketplaceRequest<MarketAgentListData>({
    url: `/aiAgents`,
    method: "GET",
    signal: signal,
    params: {
      page,
      limit,
      sortedBy,
      search,
      hashtags,
    },
  })
}

export const forkAIAgentToTeam = (aiAgentID: string, teamID: string) => {
  return agentRequest<Agent>({
    url: `/aiAgent/${aiAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export const fetchIsAgentOwner = (aiAgentID: string) => {
  return marketplaceRequest<CanEditResponse>({
    url: `/aiAgents/${aiAgentID}/canEdit`,
    method: "GET",
  })
}

export const fetchPinTipi = (teamID: string, aiAgentID: string) => {
  return agentRequest<Agent>({
    url: `/teams/${teamID}/aiAgents/${aiAgentID}/pin`,
    method: "POST",
  })
}

export const fetchUnPinTipi = (teamID: string, aiAgentID: string) => {
  return agentRequest<Agent>({
    url: `/teams/${teamID}/aiAgents/${aiAgentID}/pin`,
    method: "DELETE",
  })
}
