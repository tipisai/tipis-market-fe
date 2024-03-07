import { useCallback, useContext } from "react"
import { OPERATE_TYPE } from "@/constants/page"
import { InfoContext } from "@/context/infoContext"
import { addUrlParams } from "@/utils/urlParams"

export const useCheckLogin = () => {
  const { userInfo } = useContext(InfoContext)
  const checkLoginAndRedirect = useCallback(
    (operateType?: OPERATE_TYPE) => {
      if (userInfo && userInfo.userID) {
        return true
      } else {
        const url = addUrlParams(location.origin + location.pathname, {
          operateType: operateType,
        })
        window.location.href = `${
          process.env.ILLA_CLOUD_URL
        }?redirectURL=${encodeURIComponent(url)}`
        return false
      }
    },
    [userInfo],
  )
  return checkLoginAndRedirect
}
