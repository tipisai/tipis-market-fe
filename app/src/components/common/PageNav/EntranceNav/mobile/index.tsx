import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { Input } from "antd"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { ChangeEvent, FC, useContext } from "react"
import { SearchIcon } from "@illa-design/react"
import Logo from "@/assets/public/illa-logo-puple.svg?react"
import { NavHeaderOptions } from "@/components/common/PageNav/NavHeaderOptions"
import { InfoContext } from "@/context/infoContext"
import { EntranceNavProps } from "../interface"
import {
  flexStyle,
  logoStyle,
  navStyle,
  rightHeaderStyle,
  searchIconStyle,
} from "./style"

export const EntranceNavMobile: FC<EntranceNavProps> = (props) => {
  const { search, onSearch, handleSearchChange } = props
  const { t } = useTranslation()
  const { userInfo } = useContext(InfoContext)

  const { track } = useContext(MixpanelTrackContext)

  // parameter
  const handleLogoClick = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "logo" })
  }

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
    <div css={navStyle}>
      <Link
        css={flexStyle}
        href={`${process.env.ILLA_CLOUD_URL}`}
        onClick={handleLogoClick}
      >
        <Logo css={logoStyle} />
      </Link>
      <div css={rightHeaderStyle}>
        <Input
          prefix={<SearchIcon css={searchIconStyle} />}
          value={search}
          placeholder={t("dashboard.search")}
          size="middle"
          style={{
            borderRadius: "20px",
            padding: "9px 16px",
          }}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onPressEnter={onSearch}
        />
        <NavHeaderOptions userInfo={userInfo} />
      </div>
    </div>
  )
}
