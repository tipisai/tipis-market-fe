import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  text-align: center;
  top: 12px;
  right: 8px;
  font-size: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`

export const modalTitleStyle: SerializedStyles = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: ${getColor("grayBlue", "02")};
`

export const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`

export const inviteCodeLabelStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const descriptionStyle = css`
  margin-top: 8px;
  font-weight: 400;
  font-size: 12px;
  color: ${getColor("grayBlue", "04")};
`

export const errorMsgStyle: SerializedStyles = css`
  position: absolute;
  font-size: 12px;
  padding-top: 4px;
  color: ${getColor("orange", "03")};
`
