import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 24px;
`

export const titleStyle = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const actionAreaStyle = css`
  display: flex;
  justify-content: end;
  gap: 12px;
`

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  text-align: center;
  top: 12px;
  right: 12px;
  font-size: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${getColor("grayBlue", "02")};
`
