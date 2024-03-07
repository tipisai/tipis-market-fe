import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const errorPageStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 30vh;
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  font-weight: bold;
  line-height: 22px;
  span + span {
    font-weight: normal;
    color: ${getColor("grayBlue", "03")};
  }
`
