import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 24px;
`

export const titleStyle = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const actionAreaStyle = css`
  display: flex;
  justify-content: end;
  gap: 12px;
`
