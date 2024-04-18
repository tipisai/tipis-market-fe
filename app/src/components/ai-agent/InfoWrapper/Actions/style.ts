import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const agentActionsStyle = css`
  display: flex;
  gap: 8px;
  order: 2;
  & button {
    height: 22px;
    display: flex;
    align-items: center;
    box-sizing: content-box;
  }
  ${applyMobileStyle(css`
    flex-direction: column;
    gap: 12px;
    width: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid ${getColor("grayBlue", "08")};
  `)}
  & span {
    font-size: 14px;
    line-height: 22px;
  }
`

export const otherActionsStyle = css`
  display: flex;
  gap: 8px;

  ${applyMobileStyle(css`
    > button {
      flex-grow: 1;
      flex-basis: 0;
    }
  `)}
`

export const runButtonAreaStyle = css`
  display: flex;
  width: 200px;

  ${applyMobileStyle(css`
    width: 100%;
  `)}
`

export const numStyle = css`
  margin-left: 4px;
`
