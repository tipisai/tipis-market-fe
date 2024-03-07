import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"

export const contributorCardStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  order: 3;
  ${applyMobileStyle(css`
    flex-direction: column;
    gap: 24px;
    order: 4;
  `)}
`

export const contributorItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  ${applyMobileStyle(css`
    width: 100%;
    flex-direction: column;
  `)}
`

export const contributorLabelStyle = css`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`

export const editorAvatarStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: -8px;
  cursor: pointer;
  flex: none;
  & > div {
    width: 100%;
    height: 100%;
  }
  ${applyMobileStyle(css`
    width: 24px;
    height: 24px;
  `)}
`

export const editorContainerStyle = css`
  display: flex;
  align-items: flex-start;
  padding-left: 8px;
`

export const teamIconStyle = css`
  width: 32px;
  height: 32px;
  ${applyMobileStyle(css`
    width: 24px;
    height: 24px;
  `)}
`
export const teamNameStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`

export const teamInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`
