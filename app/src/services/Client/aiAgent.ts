import {
  agentRequest,
  marketplaceRequest,
  publicMarketplaceRequest,
} from "@illa-public/illa-net"
import { Agent, IMarketAgentListData } from "@illa-public/public-types"
import { PAGESIZE } from "@/constants/page"
import { IDashBoardUIState } from "@/context/getListContext/interface"
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
  return marketplaceRequest<IMarketAgentListData>({
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
  params: IDashBoardUIState,
  signal?: AbortSignal,
) => {
  const {
    page = 1,
    sortedBy = PRODUCT_SORT_BY.POPULAR,
    search,
    hashTag,
    isOfficial,
  } = params
  return publicMarketplaceRequest<IMarketAgentListData>({
    url: `/aiAgents`,
    method: "GET",
    signal: signal,
    params: {
      page,
      limit: PAGESIZE,
      sortedBy,
      search,
      hashtags: hashTag,
      isOfficial: isOfficial,
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
