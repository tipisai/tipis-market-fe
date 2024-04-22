import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const navStyle = css`
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  flex: none;
  background-color: ${getColor("white", "01")};
  height: 80px;
  padding: 16px 40px;
  ${applyMobileStyle(css`
    height: 64px;
    padding: 12px 20px 12px 6px;
  `)}
`

export const avatarStyle = css`
  width: 32px;
  height: 32px;
`

export const flexStyle = css`
  display: flex;
`

export const mobileNavStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 12px;
`

export const rightHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 570px;
  gap: 16px;
  ${applyMobileStyle(css`
    width: 100%;
    gap: 12px;
  `)}
`

export const backNameStyle = css`
  font-size: 14px;
  font-weight: 500;
  ${applyMobileStyle(css`
    display: none;
  `)}
`

export const previousIconStyle = css`
  font-size: 14px;
  display: flex;
`
