import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const contentContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  ${applyMobileStyle(css`
    height: 100%;
    overflow: auto;
  `)}
`
export const contentStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  justify-content: center;
`
