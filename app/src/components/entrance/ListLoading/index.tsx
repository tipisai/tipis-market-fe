import { LoadingIcon, getColor } from "@illa-design/react"
import { contentLoadingStyle } from "./style"

export const ListLoading = () => {
  return (
    <div css={contentLoadingStyle}>
      <LoadingIcon size="16" spin color={getColor("techPurple", "03")} />
    </div>
  )
}
