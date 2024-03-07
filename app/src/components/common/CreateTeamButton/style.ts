import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const contentCreateButtonStyle = css`
  display: flex;
  justify-content: center;
  min-width: 400px;
  height: 48px;
  font-size: 14px;
  line-height: 22px;
  ${applyMobileStyle(css`
    display: none;
  `)}
`

export const topCreateButtonStyle = css`
  display: flex;
  min-width: 168px;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  line-height: 22px;
  ${applyMobileStyle(css`
    display: none;
  `)}
`
