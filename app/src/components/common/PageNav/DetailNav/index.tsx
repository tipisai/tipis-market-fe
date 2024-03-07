import { Button } from "antd"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { FC, useContext } from "react"
import { PreviousIcon } from "@illa-design/react"
import { InfoContext } from "@/context/infoContext"
import { NavHeaderOptions } from "../NavHeaderOptions"
import {
  backNameStyle,
  backStyle,
  flexStyle,
  navStyle,
  rightHeaderStyle,
} from "./style"

export const DetailNav: FC = () => {
  const { t } = useTranslation()
  const { userInfo } = useContext(InfoContext)

  return (
    <div css={navStyle}>
      <Link css={flexStyle} href={"/"}>
        <Button size="middle" type="text">
          <span css={backStyle}>
            <PreviousIcon size="20" />
            <span css={backNameStyle}>{t("back")}</span>
          </span>
        </Button>
      </Link>
      <div css={rightHeaderStyle}>
        <NavHeaderOptions userInfo={userInfo} />
      </div>
    </div>
  )
}
