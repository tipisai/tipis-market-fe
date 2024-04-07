import { useSearchParams } from "next/navigation"
import { FC, useCallback } from "react"
import BlackTab from "@/components/common/BlackTab"
import { SingleTag, TagList } from "@/components/common/TagList"
import { SEARCH_KEY } from "@/constants/page"
import { ContentHeaderProps } from "../interface"
import { sortWrapperStyle } from "./style"

export const SortComponentPC: FC<ContentHeaderProps> = ({
  sort,
  sortOptions,
  activeTag,
  tagList,
  handleSortChange,
  handleCloseTag,
  handleTagChange,
}) => {
  const searchParams = useSearchParams()
  const showCurrentTag = searchParams.get(SEARCH_KEY.CURRENT_HASH_TAG)

  const tabItems = sortOptions
    .filter(({ hidden }) => !hidden)
    .map(({ label, value }) => ({
      label,
      key: value,
    }))

  const onChange = useCallback(
    (v: string) => {
      if (v === sort) return
      // track(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
      //   element: "filter_select",
      //   parameter1: v,
      // })
      // sendTagEvent({
      //   action: GTagEvent.CLICK,
      //   category: GTagCategory.SORT_CLICK,
      //   label: v,
      // })
      handleSortChange && handleSortChange(v)
    },
    [handleSortChange, sort],
  )

  return (
    <div css={sortWrapperStyle}>
      <BlackTab
        tabBarStyle={{
          marginBottom: 0,
        }}
        activeKey={sort}
        onChange={onChange}
        items={tabItems}
      />
      {!!showCurrentTag ? (
        <SingleTag onCloseTag={handleCloseTag} />
      ) : (
        tagList &&
        tagList.length > 0 && (
          <TagList
            tagList={tagList}
            handleTagChange={handleTagChange}
            activeTag={activeTag}
          />
        )
      )}
    </div>
  )
}
