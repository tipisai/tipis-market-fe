import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const navStyle = css`
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  background-color: ${getColor("white", "01")};
  padding: 16px 20px 16px 20px;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const flexStyle = css`
  display: flex;
`

export const logoStyle = css`
  width: 42px;
  height: 20px;
  flex-shrink: 0;
`

export const rightHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`

export const searchIconStyle = css`
  color: ${getColor("grayBlue", "04")};
`
