import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const contentContainerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const mainStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`

export const contentStyle = css`
  height: 100%;
  width: 640px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  ${applyMobileStyle(css`
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  `)}
`
