import { IMarketAgentListData } from "@illa-public/public-types"
import { FC, UIEvent, useCallback, useContext, useEffect, useRef } from "react"
import { AgentCardContainer } from "@/components/entrance/AgentCardContainer"
import { Banner } from "@/components/entrance/Banner"
import { ListEmpty } from "@/components/entrance/Empty"
import { ListLoading } from "@/components/entrance/ListLoading"
import { MoreLoading } from "@/components/entrance/MoreLoading"
import { SortComponent } from "@/components/entrance/SortComponent"
import { DASH_BOARD_UI_STATE_ACTION_TYPE } from "@/context/getListContext/interface"
import { DashBoardUIStateContext } from "@/context/getListContext/listContext"
import { useGetList } from "@/context/getListContext/useGetList"
import { useGetShowData } from "@/context/getListContext/useGetShowData"
import { contentStyle } from "./style"

interface IEntranceProps {
  listData: IMarketAgentListData
}

const Entrance: FC<IEntranceProps> = ({ listData }) => {
  const isServerInitPage = useRef(true)
  const { dashboardUIState, dispatch } = useContext(DashBoardUIStateContext)
  const flag = useRef(false)

  const extraCallback = useCallback(() => {
    flag.current = false
  }, [])

  const { isLoading, currentListResponse } = useGetList(
    dashboardUIState,
    isServerInitPage.current,
    listData,
    extraCallback,
  )

  const { tagList, showRecommendTag, isMoreLoading } = useGetShowData(
    currentListResponse,
    dashboardUIState,
    isLoading,
  )

  console.log(showRecommendTag, tagList)

  const handleListLoadMore = async (event: UIEvent<HTMLDivElement>) => {
    if (
      isLoading ||
      isMoreLoading ||
      !currentListResponse.hasMore ||
      flag.current
    )
      return
    const target = event.target as HTMLDivElement
    if (target.scrollHeight - target.scrollTop - target.clientHeight <= 800) {
      flag.current = true
      dispatch({
        type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_PAGE,
        payload: dashboardUIState.page + 1,
      })
    }
  }

  useEffect(() => {
    if (isServerInitPage.current) {
      isServerInitPage.current = false
    }

    return () => {
      isServerInitPage.current = true
    }
  }, [])

  return (
    <div css={contentStyle} onScroll={handleListLoadMore}>
      <Banner />
      <SortComponent tagList={tagList} showRecommendTag={showRecommendTag} />
      {isLoading && !isMoreLoading ? (
        <ListLoading />
      ) : !Array.isArray(currentListResponse?.products) ||
        currentListResponse.products.length === 0 ? (
        <ListEmpty tagList={tagList} showRecommendTag={showRecommendTag} />
      ) : (
        <>
          <AgentCardContainer agentList={currentListResponse?.products} />
          {isMoreLoading && <MoreLoading />}
        </>
      )}
    </div>
  )
}

export default Entrance
