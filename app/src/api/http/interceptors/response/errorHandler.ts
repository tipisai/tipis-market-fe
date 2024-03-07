import { AxiosError } from "axios"
import { removeAuthToken } from "@/utils/auth"

export const errorHandlerInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) {
    return Promise.reject(error)
  }

  const { status } = response
  switch (status) {
    case 401: {
      removeAuthToken()
      const currentHref = window.location.href
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set("redirectURL", currentHref)
      urlParams.delete("token")
      const stringURLSearch = urlParams.toString()
      window.location.href = `${process.env.ILLA_CLOUD_URL}/login${
        stringURLSearch ? `?${stringURLSearch}` : ""
      }`
      break
    }
    default: {
      // throw new Response(message, { status: status })
    }
  }
  return Promise.reject(error)
}
