import { getCookie, removeCookie } from "@/utils/cookie"
import { isServerSide } from "@/utils/serverHelper"

export const getAuthToken = () => {
  if (isServerSide()) return
  return getCookie("TIPIS_TOKEN")
}

export const removeAuthToken = () => {
  removeCookie("TIPIS_TOKEN")
}
