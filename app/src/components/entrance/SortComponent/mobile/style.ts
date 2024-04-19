import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const sortWrapperStyle = css`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  flex-shrink: 0;
  background: ${getColor("white", "01")};
`

export const tagContainerStyle = css`
  width: 100vw;
  padding: 0 20px;
  position: static;
  transform: translateX(-20px);
`

export const singleTagContainerStyle = css`
  width: 100%;
`

export const sortHeaderStyle = css`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`
