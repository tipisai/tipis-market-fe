import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const runButtonAreaStyle = css`
  display: flex;
  width: 307px;

  ${applyMobileStyle(css`
    width: 100%;
  `)}
`
