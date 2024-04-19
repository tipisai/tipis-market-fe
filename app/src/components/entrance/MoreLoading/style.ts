import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`
export const loadingIconStyle = css`
  color: ${getColor("techPurple", "03")};
  height: 16px;
  width: 16px;
`
