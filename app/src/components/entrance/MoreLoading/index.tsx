import Icon from "@ant-design/icons"
import { LoadingIcon } from "@illa-public/icon"
import { loadingIconStyle, loadingStyle } from "./style"

export const MoreLoading = () => {
  return (
    <div css={loadingStyle}>
      <Icon component={LoadingIcon} spin css={loadingIconStyle} />
    </div>
  )
}
