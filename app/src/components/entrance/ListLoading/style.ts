import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const contentLoadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const loadingStyle = css`
  height: 16px;
  width: 16px;
  color: ${getColor("techPurple", "03")};
`
