import Icon from "@ant-design/icons"
import { PreviousIcon } from "@illa-public/icon"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { FC, useContext } from "react"
import { InfoContext } from "@/context/infoContext"
import { NavHeaderOptions } from "../NavHeaderOptions"
import { backNameStyle, flexStyle, navStyle, rightHeaderStyle } from "./style"

export const DetailNav: FC = () => {
  const { t } = useTranslation()
  const { userInfo } = useContext(InfoContext)

  return (
    <div css={navStyle}>
      <Link css={flexStyle} href={"/"}>
        <Button
          size="middle"
          type="text"
          icon={<Icon component={PreviousIcon} />}
        >
          <span css={backNameStyle}>{t("back")}</span>
        </Button>
      </Link>
      <div css={rightHeaderStyle}>
        <NavHeaderOptions userInfo={userInfo} />
      </div>
    </div>
  )
}
