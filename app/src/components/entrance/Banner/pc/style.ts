import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const headerStyle = css`
  width: 100%;
  max-width: 1040px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 0;
  color: ${getColor("grayBlue", "01")};
`

export const headerTitleStyle = css`
  text-align: center;
  font-size: 56px;
  font-weight: 700;
  line-height: 64px;
  margin: 0;
`

export const titleStyle = css`
  background: linear-gradient(90deg, #7134f3 0%, #d739ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const descriptionStyle = css`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
`

export const searchIconStyle = css`
  color: ${getColor("grayBlue", "04")};
`
