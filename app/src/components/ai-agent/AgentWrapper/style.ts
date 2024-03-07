import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const agentWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 576px;

  ${applyMobileStyle(css`
    gap: 24px;
    width: unset;
  `)}
`

export const propertyWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 8px 32px;

  ${applyMobileStyle(css`
    gap: 8px;
    padding: 0;
  `)}
`

export const promptOrderStyle = css`
  order: 1;
  ${applyMobileStyle(css`
    order: 3;
  `)}
`

export const modalOrderStyle = css`
  order: 3;
  ${applyMobileStyle(css`
    order: 2;
  `)}
`

export const tagOrderStyle = css`
  order: 2;
  ${applyMobileStyle(css`
    order: 1;
  `)}
`

export const tagContainerStyle = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  & a {
    display: inline-flex;
  }
`

export const variableOrderStyle = css`
  order: 4;
`

export const propertyLabelStyle = css`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 22px;
  `)}
`

export const modelInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  & svg {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
`

export const modelNameStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`
