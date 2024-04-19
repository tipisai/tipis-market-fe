import Icon from "@ant-design/icons"
import { SearchIcon } from "@illa-public/icon"
import { Input } from "antd"
import { debounce } from "lodash-es"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { ChangeEvent, FC, useCallback, useContext, useMemo } from "react"
import Logo from "@/assets/public/illa-logo-puple.svg?react"
import { NavHeaderOptions } from "@/components/common/PageNav/NavHeaderOptions"
import { DASH_BOARD_UI_STATE_ACTION_TYPE } from "@/context/getListContext/interface"
import { DashBoardUIStateContext } from "@/context/getListContext/listContext"
import { InfoContext } from "@/context/infoContext"
import {
  flexStyle,
  logoStyle,
  navStyle,
  rightHeaderStyle,
  searchIconStyle,
} from "./style"

export const EntranceNavMobile: FC = () => {
  const { t } = useTranslation()
  const { userInfo } = useContext(InfoContext)
  const { dispatch, dashboardUIState } = useContext(DashBoardUIStateContext)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      dispatch({
        type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_SEARCH,
        payload: v,
      })
    },
    [dispatch],
  )

  const debounceHandleChange = useMemo(() => {
    return debounce(handleChange, 160)
  }, [handleChange])

  return (
    <div css={navStyle}>
      <Link css={flexStyle} href={`${process.env.ILLA_CLOUD_URL}`}>
        <Logo css={logoStyle} />
      </Link>
      <div css={rightHeaderStyle}>
        <Input
          prefix={<Icon component={SearchIcon} css={searchIconStyle} />}
          value={dashboardUIState.search}
          placeholder={t("dashboard.search")}
          size="middle"
          style={{
            borderRadius: "20px",
            padding: "9px 16px",
          }}
          onChange={debounceHandleChange}
        />
        <NavHeaderOptions userInfo={userInfo} />
      </div>
    </div>
  )
}
