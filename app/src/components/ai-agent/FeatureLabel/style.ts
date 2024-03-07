import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const labelContainerStyle = css`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding-top: 96px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  ${applyMobileStyle(css`
    width: 100%;
    padding-top: 20px;
    align-items: center;
  `)}
`

export const labelImgStyle = css`
  width: 200px;
  opacity: 0.3;
  ${applyMobileStyle(css`
    width: 118px;
    padding-top: 20px;
    align-items: center;
  `)}
`
