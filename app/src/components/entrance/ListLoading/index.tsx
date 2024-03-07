import Icon from "@ant-design/icons"
import { LoadingIcon } from "@illa-public/icon"
import { contentLoadingStyle, loadingStyle } from "./style"

export const ListLoading = () => {
  return (
    <div css={contentLoadingStyle}>
      <Icon component={LoadingIcon} css={loadingStyle} spin />
    </div>
  )
}
