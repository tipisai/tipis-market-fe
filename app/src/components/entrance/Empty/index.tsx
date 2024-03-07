import { Empty } from "antd"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import EmptyIcon from "@/assets/public/empty.svg?react"
import { TagList } from "@/components/common/TagList"
import {
  emptyColorStyle,
  emptyIconStyle,
  listEmptyContainerStyle,
} from "./style"

interface ListEmptyProps {
  tagList: string[]
  showRecommendTag?: boolean
  handleClickEmptyTag?: (name?: string) => void
}
export const ListEmpty: FC<ListEmptyProps> = ({
  tagList,
  showRecommendTag,
  handleClickEmptyTag,
}) => {
  const { t } = useTranslation()
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
          handleTagChange={handleClickEmptyTag}
        />
      )}
    </div>
  )
}
