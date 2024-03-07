import { FC } from "react"
import { BaseTag } from "../components/baseTag"
import { TagListProps } from "../interface"
import { containerStyle } from "./style"

export const TagListMobile: FC<TagListProps> = ({
  tagList,
  activeTag,
  isEmptyRecommend = false,
  handleClickTag,
}) => {
  return (
    <div css={containerStyle(isEmptyRecommend)}>
      {tagList &&
        tagList.map((name) => (
          <BaseTag
            key={name}
            name={name}
            isActive={name === activeTag}
            handleClick={handleClickTag}
          />
        ))}
    </div>
  )
}
