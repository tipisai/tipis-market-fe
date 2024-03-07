import { COPY_STATUS, copyToClipboard } from "@illa-public/utils"
import { App } from "antd"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { FC } from "react"
import GitHubIcon from "@/assets/public/github.svg?react"
import {
  bgContainer,
  cardContainerStyle,
  leftItemContentStyle,
  linkStyle,
} from "./style"

interface ContributeCardProps {
  link: string
  itemName?: string
  itemDesc?: string
  itemLink?: string
}

export const SubmitCard: FC<ContributeCardProps> = ({
  link,
  itemName,
  itemDesc,
  itemLink,
}) => {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const handleClick = () => {
    const copyDetail = `# ${itemName}\n${itemDesc || ""}${
      itemDesc && "\n"
    }Fast try: ${itemLink?.split("?")[0]}`
    const res = copyToClipboard(copyDetail)
    if (res === COPY_STATUS.SUCCESS) {
      message.success(t("copied"))
    }
  }

  return (
    <div css={bgContainer}>
      <Link href={link} onClick={handleClick} css={linkStyle}>
        <div css={cardContainerStyle}>
          <GitHubIcon />
          <span css={leftItemContentStyle}>
            {t("detail.hacktober.submit.button")}
          </span>
        </div>
      </Link>
    </div>
  )
}
