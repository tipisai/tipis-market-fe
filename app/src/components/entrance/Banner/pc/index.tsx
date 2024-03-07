import Icon from "@ant-design/icons"
import { SearchIcon } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { Input } from "antd"
import { useTranslation } from "next-i18next"
import { ChangeEvent, FC, useContext } from "react"
import { BannerProps } from "../interface"
import {
  descriptionStyle,
  headerStyle,
  headerTitleStyle,
  searchIconStyle,
  titleStyle,
} from "./style"

export const BannerPC: FC<BannerProps> = ({
  titleAfter,
  titleBefore,
  description,
  feature,
  search,
  handleSearchChange,
  onSearch,
}) => {
  const { t } = useTranslation()

  const { track } = useContext(MixpanelTrackContext)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    track(ILLA_MIXPANEL_EVENT_TYPE.REQUEST, {
      element: "search",
      parameter1: val,
    })
    handleSearchChange?.(val)
  }

  const handleOnFocus = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, { element: "search" })
  }
  return (
    <div css={headerStyle}>
      <h1 css={headerTitleStyle}>
        <span>{t(titleBefore)} </span>
        <span css={titleStyle}>{t(feature)} </span>
        <span>{t(titleAfter)}</span>
      </h1>
      <p css={descriptionStyle}>{t(description)}</p>
      <Input
        style={{
          width: "800px",
          padding: "17px 32px",
          borderRadius: "36px",
          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.06)",
        }}
        styles={{
          prefix: {
            marginRight: "8px",
          },
        }}
        prefix={<Icon component={SearchIcon} css={searchIconStyle} />}
        value={search}
        placeholder={t("dashboard.search")}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onPressEnter={onSearch}
      />
    </div>
  )
}
