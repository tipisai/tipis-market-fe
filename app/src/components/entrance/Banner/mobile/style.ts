import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const headerStyle = css`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0 0 0;
  color: ${getColor("grayBlue", "01")};
`

export const headerTitleStyle = css`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  margin: 0;
`

export const titleStyle = css`
  background: linear-gradient(90deg, #7134f3 0%, #d739ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const descriptionStyle = css`
  font-weight: 400;
  margin: 0;
  width: 100%;
  font-size: 14px;
  line-height: 17px;
`

export const inputStyle = css`
  display: flex;
  padding: 17px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 36px;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
  margin-left: 16px;
  & > div:first-of-type {
    border: none;
    height: 100%;
    padding: 0;
  }
`
