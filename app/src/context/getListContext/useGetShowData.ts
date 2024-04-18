import { MarketAgentListData } from "@illa-public/market-agent"
import { useMemo } from "react"
import { INITIAL_PAGE } from "@/constants/page"
import { IDashBoardUIState } from "./interface"

const INIT_MARKET_LIST_DATA: MarketAgentListData = {
  products: [],
  summaryHashtags: [],
  recommendHashtags: [],
  hasMore: false,
}

export const useGetShowData = (
  data: MarketAgentListData = INIT_MARKET_LIST_DATA,
  marketState: IDashBoardUIState,
  isLoading: boolean,
) => {
  const { search, hashTag, page, isOfficial } = marketState
  const { recommendHashtags, summaryHashtags, products } = data

  const showRecommendTag = products.length === 0 && !hashTag
  const isMoreLoading = isLoading && page !== INITIAL_PAGE

  const tagList = useMemo(() => {
    if (search || isOfficial) {
      if (products && products.length > 0) {
        return summaryHashtags || []
      } else if (hashTag) {
        return [hashTag]
      } else {
        return []
      }
    } else {
      return recommendHashtags
    }
  }, [
    hashTag,
    isOfficial,
    products,
    recommendHashtags,
    search,
    summaryHashtags,
  ])

  return {
    showRecommendTag,
    tagList,
    isMoreLoading,
  }
}
