import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"
import { applyMobileStyle } from "@illa-public/utils"

export const iconStyle = css`
  width: 16px;
  height: 16px;
`

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  background: ${getColor("white", "01")};
  cursor: pointer;

  ${applyMobileStyle(css`
    gap: 12px;
    width: 100%;
  `)}
`
export const headerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  position: relative;
  z-index: 0;
  ${applyMobileStyle(css`
    border-radius: 8px;
    height: 161px;
  `)}
`

export const agentIconStyle = css`
  width: 100%;
`

export const teamInfoContainerStyle = css`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 64px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  ${applyMobileStyle(css`
    padding: 12px;
  `)}
`

export const teamInfoStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const teamAvatarStyle = css`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border: none;
  background-color: transparent;
`

export const teamNameStyle = css`
  color: ${getColor("white", "01")};
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const actionContainerStyle = css`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 64px;
  padding: 16px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  ${applyMobileStyle(css`
    height: 48px;
    padding: 4px 12px;
  `)}
`

export const actionStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  ${applyMobileStyle(css`
    gap: 12px;
  `)}
`

export const actionCountStyle = css`
  display: flex;
  align-items: center;
  color: ${getColor("white", "01")};
  font-size: 12px;
  padding: 1px 0;
  font-weight: 400;
  line-height: 20px;
  ${applyMobileStyle(css`
    line-height: 22px;
  `)}
`

export const cardContentContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

export const textEllipsisStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const nameStyle = css`
  width: 100%;
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  ${textEllipsisStyle};
  ${applyMobileStyle(css`
    font-size: 12px;
    line-height: 20px;
  `)}
`

export const descriptionStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
`

export const officialIconStyle = css`
  font-size: 12px;
`
