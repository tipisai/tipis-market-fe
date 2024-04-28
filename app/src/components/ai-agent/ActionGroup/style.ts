import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const agentActionsStyle = css`
  display: flex;
  gap: 8px;
  ${applyMobileStyle(css`
    flex-direction: column;
    gap: 12px;
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid ${getColor("grayBlue", "08")};
  `)}
`

export const otherActionsStyle = css`
  display: flex;
  gap: 8px;
`
