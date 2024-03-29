import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const listEmptyContainerStyle = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 64px 200px;
  ${applyMobileStyle(css`
    width: 100%;
    padding: 40px 0;
  `)}
`

export const emptyColorStyle = css`
  color: ${getColor("grayBlue", "04")};
`

export const emptyIconStyle = css`
  width: 48px;
  height: auto;
`
