import { getCookie, removeCookie } from "@/utils/cookie"
import { isServerSide } from "@/utils/serverHelper"

export const getAuthToken = () => {
  if (isServerSide()) return
  return getCookie("ILLA_TOKEN")
}

export const removeAuthToken = () => {
  removeCookie("ILLA_TOKEN")
}
