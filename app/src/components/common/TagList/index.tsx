import { FC } from "react"
import { MediaLayout } from "@/layout/mediaLayout"
import { TagListContainerProps } from "./interface"
import { TagListMobile } from "./mobile"
import { TagListPC } from "./pc"

export const TagList: FC<TagListContainerProps> = ({
  tagList,
  activeTag,
  isEmptyRecommend,
  handleTagChange,
}) => {
  const handleClickTag = (name: string) => {
    if (isEmptyRecommend) {
      handleTagChange?.(name)
      return
    }
    if (name === activeTag) {
      handleTagChange?.()
    } else {
      handleTagChange?.(name)
    }
  }
  return (
    <MediaLayout
      desktopPage={
        <TagListPC
          tagList={tagList}
          isEmptyRecommend={isEmptyRecommend}
          activeTag={activeTag}
          handleClickTag={handleClickTag}
        />
      }
      mobilePage={
        <TagListMobile
          tagList={tagList}
          isEmptyRecommend={isEmptyRecommend}
          activeTag={activeTag}
          handleClickTag={handleClickTag}
        />
      }
    />
  )
}

export { SingleTag } from "./singleTag"
