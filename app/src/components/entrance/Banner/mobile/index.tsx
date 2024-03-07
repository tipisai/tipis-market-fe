import { useTranslation } from "next-i18next"
import { FC } from "react"
import { BannerProps } from "../interface"
import {
  descriptionStyle,
  headerStyle,
  headerTitleStyle,
  titleStyle,
} from "./style"

export const BannerMobile: FC<BannerProps> = ({
  titleAfter,
  titleBefore,
  description,
  feature,
}) => {
  const { t } = useTranslation()
  return (
    <div css={headerStyle}>
      <h1 css={headerTitleStyle}>
        <span>{t(titleBefore)} </span>
        <br />
        <span css={titleStyle}>{t(feature)} </span>
        <span>{t(titleAfter)}</span>
      </h1>
      <p css={descriptionStyle}>{t(description)}</p>
    </div>
  )
}
