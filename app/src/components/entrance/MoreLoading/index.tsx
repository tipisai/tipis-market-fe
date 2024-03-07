import { LoadingIcon, getColor } from "@illa-design/react"
import { loadingStyle } from "./style"

export const MoreLoading = () => {
  return (
    <div css={loadingStyle}>
      <LoadingIcon spin color={getColor("techPurple", "03")} />
    </div>
  )
}
