import { useTranslation } from "next-i18next"
import { FC } from "react"
import {
  descriptionStyle,
  headerStyle,
  headerTitleStyle,
  titleStyle,
} from "./style"

export const BannerMobile: FC = ({}) => {
  const { t } = useTranslation()
  return (
    <div css={headerStyle}>
      <h1 css={headerTitleStyle}>
        <span>{t("title.ai-agent.title-1")} </span>
        <br />
        <span css={titleStyle}>{t("title.ai-agent.feature")} </span>
        <span>{t("title.ai-agent.title-2")}</span>
      </h1>
      <p css={descriptionStyle}>{t("description.ai-agent")}</p>
    </div>
  )
}
