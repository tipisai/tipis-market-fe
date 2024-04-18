import { MarketAgentListData } from "@illa-public/market-agent"
import { useCallback, useEffect, useRef, useState } from "react"
import { INITIAL_PAGE, LIMIT_ITEMS } from "@/constants/page"
import { fetchAIgentList } from "@/services/Client/aiAgent"
import { IDashBoardUIState } from "./interface"

export const useGetList = (
  uiState: IDashBoardUIState,
  isInitPage: boolean,
  listResponse: MarketAgentListData,
) => {
  const [isLoading, setLoading] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)
  const [currentListResponse, setCurrentListResponse] =
    useState<MarketAgentListData>(listResponse)

  const getMarketList = useCallback(async () => {
    setLoading(true)
    const controller = new AbortController()
    if (!controllerRef.current) {
      controllerRef.current = controller
    } else {
      controllerRef.current.abort()
      controllerRef.current = controller
    }
    const params = {
      ...uiState,
      limit: 40,
    }
    try {
      const res = await fetchAIgentList(params, controller.signal)
      if (params.page > INITIAL_PAGE) {
        setCurrentListResponse((prevState) => {
          const product = [...prevState.products]
          const newProduct = product
            .concat(res.data.products)
            .slice(-LIMIT_ITEMS)
          return {
            ...prevState,
            ...res.data,
            products: newProduct,
          }
        })
      } else {
        setCurrentListResponse(res.data)
      }
    } catch (e: unknown) {
    } finally {
      setLoading(false)
    }
  }, [uiState])

  useEffect(() => {
    if (!isInitPage) {
      getMarketList()
    }
  }, [getMarketList, isInitPage])

  return {
    isLoading,
    currentListResponse,
  }
}
