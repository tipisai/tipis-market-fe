export interface TagListContainerProps {
  tagList: string[]
  clickable?: boolean
  activeTag?: string
  isEmptyRecommend?: boolean
  handleTagChange?: (tag?: string) => void
}

export interface TagListProps
  extends Pick<TagListContainerProps, "tagList" | "isEmptyRecommend"> {
  activeTag?: string
  handleClickTag?: (tag: string) => void
}
