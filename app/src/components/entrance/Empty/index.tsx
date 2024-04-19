import { Empty } from "antd"
import { useTranslation } from "next-i18next"
import { FC, useContext } from "react"
import EmptyIcon from "@/assets/public/empty.svg?react"
import { TagList } from "@/components/common/TagList"
import { DASH_BOARD_UI_STATE_ACTION_TYPE } from "@/context/getListContext/interface"
import { DashBoardUIStateContext } from "@/context/getListContext/listContext"
import {
  emptyColorStyle,
  emptyIconStyle,
  listEmptyContainerStyle,
} from "./style"

interface ListEmptyProps {
  tagList: string[]
  showRecommendTag?: boolean
}
export const ListEmpty: FC<ListEmptyProps> = ({
  tagList,
  showRecommendTag,
}) => {
  const { t } = useTranslation()
  const { dispatch } = useContext(DashBoardUIStateContext)

  const handleClick = (name?: string) => {
    if (!name) return
    dispatch({
      type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_RECOMMEND_TAG,
      payload: name,
    })
  }

  return (
    <div css={listEmptyContainerStyle}>
      <Empty
        imageStyle={{ height: "auto" }}
        image={<EmptyIcon css={emptyIconStyle} />}
        description={<span css={emptyColorStyle}>{t("status.blank")}</span>}
      />
      {showRecommendTag && (
        <TagList
          tagList={tagList}
          isEmptyRecommend
          handleTagChange={handleClick}
        />
      )}
    </div>
  )
}
