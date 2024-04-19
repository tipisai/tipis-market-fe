import { css } from "@emotion/react"

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 24px;
`

export const titleStyle = css`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`

export const actionAreaStyle = css`
  display: flex;
  justify-content: end;
  gap: 12px;
`

export const teamItemStyle = css`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  overflow: hidden;
  gap: 12px;
`

export const teamNameStyle = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
`
