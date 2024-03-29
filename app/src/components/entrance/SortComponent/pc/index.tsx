import { getColor } from "@illa-public/color-scheme"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ConfigProvider, Tabs } from "antd"
import { useSearchParams } from "next/navigation"
import { FC, useCallback, useContext } from "react"
import { SingleTag, TagList } from "@/components/common/TagList"
import { SEARCH_KEY } from "@/constants/page"
import { GTagCategory, GTagEvent } from "@/interface/common"
import { sendTagEvent } from "@/utils/gtag"
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
  const { track } = useContext(MixpanelTrackContext)
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
      track(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
        element: "filter_select",
        parameter1: v,
      })
      sendTagEvent({
        action: GTagEvent.CLICK,
        category: GTagCategory.SORT_CLICK,
        label: v,
      })
      handleSortChange && handleSortChange(v)
    },
    [handleSortChange, sort, track],
  )

  return (
    <div css={sortWrapperStyle}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: getColor("grayBlue", "03"),
              itemHoverColor: getColor("grayBlue", "03"),
              itemSelectedColor: getColor("grayBlue", "02"),
              inkBarColor: getColor("grayBlue", "02"),
            },
          },
        }}
      >
        <Tabs
          tabBarStyle={{
            marginBottom: 0,
          }}
          activeKey={sort}
          onChange={onChange}
          items={tabItems}
        />
      </ConfigProvider>

      <>
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
      </>
    </div>
  )
}
