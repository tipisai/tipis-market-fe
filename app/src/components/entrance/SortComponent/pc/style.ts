import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const sortHeaderStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const sortWrapperStyle = css`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: flex-start;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${getColor("white", "01")};
  padding-bottom: 8px;
`
