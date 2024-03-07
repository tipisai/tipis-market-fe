import Link from "next/link"
import { labelContainerStyle, labelImgStyle } from "./style"

export const FeatureLabelCard = () => {
  return (
    <div css={labelContainerStyle}>
      <Link href="https://theresanaiforthat.com/ai/illa/?ref=featured&v=436094">
        <img
          css={labelImgStyle}
          src="https://media.theresanaiforthat.com/featured3.png"
        />
      </Link>
    </div>
  )
}
