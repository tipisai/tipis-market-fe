import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

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
  position: relative;
`

export const flexStyle = css`
  display: flex;
`

export const logoStyle = css`
  width: 51px;
  height: 24px;
  flex-shrink: 0;
`

export const rightHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`

export const createGroupButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 960px) {
    display: none;
  }
`
