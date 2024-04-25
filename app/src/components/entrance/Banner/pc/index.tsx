import Icon from "@ant-design/icons"
import { SearchIcon } from "@illa-public/icon"
import { Input } from "antd"
import { debounce } from "lodash-es"
import { useTranslation } from "next-i18next"
import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { DASH_BOARD_UI_STATE_ACTION_TYPE } from "@/context/getListContext/interface"
import { DashBoardUIStateContext } from "@/context/getListContext/listContext"
import {
  descriptionStyle,
  headerStyle,
  headerTitleStyle,
  searchIconStyle,
  titleStyle,
} from "./style"

export const BannerPC: FC = () => {
  const { t } = useTranslation()

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
    return debounce(handleChange, 160)
  }, [handleChange])

  const handleChangeSearchValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
      debounceHandleChange(e)
    },
    [debounceHandleChange],
  )

  return (
    <div css={headerStyle}>
      <h1 css={headerTitleStyle}>
        <span>{t("title.ai-agent.title-1")} </span>
        <span css={titleStyle}>{t("title.ai-agent.feature")} </span>
        <span>{t("title.ai-agent.title-2")}</span>
      </h1>
      <p css={descriptionStyle}>{t("description.ai-agent")}</p>
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
        value={searchValue}
        placeholder={t("dashboard.search")}
        onChange={handleChangeSearchValue}
      />
    </div>
  )
}
