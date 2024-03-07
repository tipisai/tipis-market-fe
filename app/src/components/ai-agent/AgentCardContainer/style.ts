import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const cardContainerStyle = css`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 24px 24px;
  margin-top: -8px;

  ${applyMobileStyle(css`
    grid-template-columns: repeat(auto-fill, minmax(161px, 1fr));
    grid-gap: 24px;
    margin-top: 0;
  `)}
`
