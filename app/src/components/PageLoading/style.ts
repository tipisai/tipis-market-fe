import { css } from "@emotion/react"
import { getColor } from "@illa-public/color-scheme"

export const containerStyle = (
  isFinished: boolean,
  animationDuration: number,
) => css`
  opacity: ${isFinished ? 0 : 1};
  pointer-events: none;
  transition: opacity ${animationDuration}ms linear;
`

export const barStyle = (progress: number, animationDuration: number) => css`
  background: linear-gradient(90deg, #7134f3 0%, #d739ff 100%);
  height: 2px;
  left: 0;
  margin-left: ${(-1 + progress) * 100}%;
  position: fixed;
  top: 0;
  transition: margin-left ${animationDuration}ms linear;
  width: 100%;
  z-index: 1031;
`

export const spinnerStyle = css`
  box-shadow:
    0 0 10px ${getColor("techPurple", "03")},
    0 0 5px ${getColor("techPurple", "03")};
  display: block;
  height: 100%;
  opacity: 1;
  position: absolute;
  right: 0;
  transform: rotate(3deg) translate(0px, -4px);
  width: 100px;
`
