import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const modalContentStyle = {
  border: "unset",
  background: '#f7fff9 url("/create-team-modal/create-team-bg.svg") no-repeat',
  backgroundPosition: "bottom",
  width: "746px",
  minHeight: "540px",
  borderRadius: "16px",
  boxShadow: "0px 4px 16px rgb(0 0 0 / 8%)",
}

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 24px;
  right: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`

const decorateStyle = css`
  background-repeat: no-repeat;
  width: 130px;
  height: 251px;
  position: absolute;
  top: 61px;
  pointer-events: none;
`

export const requireStyle = css`
  &::after {
    margin-left: 2px;
    display: inline;
    content: "*";
    font-size: 14px;
    color: rgb(235, 54, 57);
    font-weight: 500;
  }
`

export const modalDecorateLeftStyle = css`
  ${decorateStyle};
  background-image: url("/create-team-modal/decorate-left.svg");
  left: 0;
`

export const modalDecorateRightStyle = css`
  ${decorateStyle};
  width: 678px;
  background-image: url("/create-team-modal/decorate-right.svg");
  right: 0;
`

export const formHeaderStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: ${getColor("grayBlue", "02")};
  margin-bottom: 41px;
`

export const formStyle = css`
  margin: 84px 106px;
  padding: 24px 16px;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "09")};
  border-radius: 8px;
`

export const gridFormFieldStyle: SerializedStyles = css`
  display: grid;
  gap: 16px;
`

export const gridItemStyle: SerializedStyles = css`
  display: grid;
  gap: 9px;
`

export const inviteCodeLabelStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const descriptionStyle = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "04")};
`

export const tipTextStyle = css`
  white-space: pre;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "04")};
`

export const errorMsgStyle: SerializedStyles = css`
  position: relative;
  font-size: 14px;
  padding-left: 24px;
  line-height: 22px;
  color: ${getColor("orange", "03")};
`

export const errorIconStyle: SerializedStyles = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`

export const formLabelStyle: SerializedStyles = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
`
