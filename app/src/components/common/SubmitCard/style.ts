import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const linkStyle = css`
  display: flex;
  width: 100%;
`

export const bgContainer = css`
  background: linear-gradient(90deg, #88c605 0%, #00d7f4 100%);
  padding: 1px;
  border-radius: 9px;
  ${applyMobileStyle(css`
    width: 100%;
    grid-column: 3 span;
  `)}
`

export const cardContainerStyle = css`
  width: 100%;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: #fafff0;
  ${applyMobileStyle(css`
    justify-content: center;
  `)}
`

export const leftItemContentStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
`
