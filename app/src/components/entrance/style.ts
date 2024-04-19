import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 0 20px 48px 20px;
  overflow-x: hidden;
  overflow-y: auto;
  ${applyMobileStyle(css`
    gap: 20px;
    padding: 0 20px 40px 20px;
  `)}
`
