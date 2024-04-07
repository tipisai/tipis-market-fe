import {
  HTTP_REQUEST_PUBLIC_BASE_URL,
  MARKETPLACE_AUTH_PRODUCT_REQUEST_PREFIX,
  MARKETPLACE_PUBLIC_REQUEST_PREFIX,
} from "@illa-public/illa-net/constant"
import { stringify } from "qs"
import { ProductListParams } from "@/interface/common"

export const fetchAIAgentList = async (params: ProductListParams) => {
  const searchParams = stringify(params)
  try {
    const response = await fetch(
      `${HTTP_REQUEST_PUBLIC_BASE_URL}${MARKETPLACE_PUBLIC_REQUEST_PREFIX}/aiAgents?${searchParams}`,
    )
    return await response.json()
  } catch (e) {
    console.log(22222)
    throw e
  }
}

const fetchNeedAuthAgentList = async (agentID?: string, token?: string) => {
  const response = await fetch(
    `${HTTP_REQUEST_PUBLIC_BASE_URL}${MARKETPLACE_AUTH_PRODUCT_REQUEST_PREFIX}/aiAgents/${agentID}`,
    {
      headers: {
        Authorization: token || "",
      },
    },
  )
  return await response.json()
}

const fetchNotNeedAuthAgentList = async (agentID?: string) => {
  const response = await fetch(
    `${HTTP_REQUEST_PUBLIC_BASE_URL}${MARKETPLACE_PUBLIC_REQUEST_PREFIX}/aiAgents/${agentID}`,
  )
  return await response.json()
}

export const fetchAIAgentDetail = async (token?: string, agentID?: string) => {
  const request = token ? fetchNeedAuthAgentList : fetchNotNeedAuthAgentList

  try {
    return await request(agentID, token)
  } catch {
    try {
      return await fetchNotNeedAuthAgentList(agentID)
    } catch (e) {
      throw e
    }
  }
}
