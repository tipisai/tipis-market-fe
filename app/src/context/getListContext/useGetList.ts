import { IMarketAgentListData } from "@illa-public/public-types"
import { useCallback, useEffect, useRef, useState } from "react"
import { INITIAL_PAGE } from "@/constants/page"
import { fetchAIgentList } from "@/services/Client/aiAgent"
import { IDashBoardUIState } from "./interface"

export const useGetList = (
  uiState: IDashBoardUIState,
  isInitPage: boolean,
  listResponse: IMarketAgentListData,
  extraCallback: () => void,
) => {
  const [isLoading, setLoading] = useState(false)
  const controllerRef = useRef<AbortController | null>(null)
  const [currentListResponse, setCurrentListResponse] =
    useState<IMarketAgentListData>(listResponse)

  const getMarketList = useCallback(async () => {
    setLoading(true)
    const controller = new AbortController()
    if (!controllerRef.current) {
      controllerRef.current = controller
    } else {
      controllerRef.current.abort()
      controllerRef.current = controller
    }
    try {
      const res = await fetchAIgentList(uiState, controller.signal)
      if (uiState.page > INITIAL_PAGE) {
        setCurrentListResponse((prevState) => {
          const product = [...prevState.products]
          const newProduct = product.concat(res.data.products)
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
      extraCallback()
    }
  }, [extraCallback, uiState])

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
