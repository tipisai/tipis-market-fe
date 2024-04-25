import { Checkbox } from "antd"
import { CheckboxChangeEvent } from "antd/es/checkbox"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useContext } from "react"
import BlackTab from "@/components/common/BlackTab"
import { SingleTag, TagList } from "@/components/common/TagList"
import { SEARCH_KEY } from "@/constants/page"
import { DASH_BOARD_UI_STATE_ACTION_TYPE } from "@/context/getListContext/interface"
import { DashBoardUIStateContext } from "@/context/getListContext/listContext"
import { PRODUCT_SORT_BY } from "@/interface/common"
import { ContentHeaderProps } from "../interface"
import { sortHeaderStyle, sortWrapperStyle } from "./style"

export const SortComponentPC: FC<ContentHeaderProps> = ({
  tagList,
  showRecommendTag,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const options = [
    {
      label: t("dashboard.sort-type.popular"),
      value: PRODUCT_SORT_BY.POPULAR,
      key: PRODUCT_SORT_BY.POPULAR,
    },
    {
      label: t("dashboard.sort-type.recent"),
      value: PRODUCT_SORT_BY.LATEST,
      key: PRODUCT_SORT_BY.LATEST,
    },
  ]
  const searchParams = useSearchParams()
  const showCurrentTag = searchParams.get(SEARCH_KEY.CURRENT_HASH_TAG)

  const { dispatch, dashboardUIState: marketState } = useContext(
    DashBoardUIStateContext,
  )

  const onSortChange = (v: string) => {
    if (v === marketState.sortedBy) return
    dispatch({
      type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_SORTED_BY,
      payload: v as PRODUCT_SORT_BY,
    })
  }

  const onTagChange = (v?: string) => {
    dispatch({
      type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_HASH_TAG,
      payload: v,
    })
  }

  const onOfficialChange = (e: CheckboxChangeEvent) => {
    const v = e.target.checked
    dispatch({
      type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_IS_OFFICIAL,
      payload: v,
    })
  }

  const handleCloseSingleTag = async () => {
    await router.replace({ query: undefined }, undefined, {
      shallow: true,
    })
    dispatch({
      type: DASH_BOARD_UI_STATE_ACTION_TYPE.RESET_PARAMS,
      payload: undefined,
    })
  }

  return (
    <div css={sortWrapperStyle}>
      <div css={sortHeaderStyle}>
        <BlackTab
          tabBarStyle={{
            marginBottom: 0,
          }}
          activeKey={marketState.sortedBy}
          onChange={onSortChange}
          items={options}
        />
        <Checkbox checked={marketState.isOfficial} onChange={onOfficialChange}>
          {t("official")}
        </Checkbox>
      </div>
      {!!showCurrentTag ? (
        <SingleTag onCloseTag={handleCloseSingleTag} />
      ) : (
        !showRecommendTag &&
        tagList &&
        tagList.length > 0 && (
          <TagList
            tagList={tagList}
            handleTagChange={onTagChange}
            activeTag={marketState.hashTag}
          />
        )
      )}
    </div>
  )
}
