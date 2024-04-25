import Icon from "@ant-design/icons"
import { SearchIcon } from "@illa-public/icon"
import { Input } from "antd"
import { throttle } from "lodash-es"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import Logo from "@/assets/public/logo.svg?react"
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
  const [searchValue, setSearchValue] = useState(dashboardUIState.search)

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
    return throttle(handleChange, 160)
  }, [handleChange])

  const handleChangeSearchValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
      debounceHandleChange(e)
    },
    [debounceHandleChange],
  )

  return (
    <div css={navStyle}>
      <Link css={flexStyle} href={`${process.env.ILLA_CLOUD_URL}`}>
        <Logo css={logoStyle} />
      </Link>
      <div css={rightHeaderStyle}>
        <Input
          prefix={<Icon component={SearchIcon} css={searchIconStyle} />}
          value={searchValue}
          placeholder={t("dashboard.search")}
          size="middle"
          style={{
            borderRadius: "20px",
            padding: "9px 16px",
          }}
          onChange={handleChangeSearchValue}
        />
        <NavHeaderOptions userInfo={userInfo} />
      </div>
    </div>
  )
}
