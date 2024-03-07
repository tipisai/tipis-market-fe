import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const infoWrapperStyle = css`
  color: ${getColor("grayBlue", "02")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  width: 592px;

  ${applyMobileStyle(css`
    width: 100%;
    gap: 24px;
  `)}
`

export const agentInfoStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  order: 1;
  ${applyMobileStyle(css`
    align-items: center;
    width: 100%;
    text-align: center;
  `)}
`

export const agentIconStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: lightgray 50% / cover no-repeat;
`

export const agentNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  margin: 0;
  word-wrap: break-word;
  width: 100%;
  ${applyMobileStyle(css`
    font-size: 24px;
    line-height: 28px;
  `)}
`

export const agentDescriptionStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
  word-wrap: break-word;
  width: 100%;
  ${applyMobileStyle(css`
    line-height: 17px;
  `)}
`

export const submitCardStyle = css`
  order: 4;
  ${applyMobileStyle(css`
    order: 3;
    width: 100%;
  `)}
`
