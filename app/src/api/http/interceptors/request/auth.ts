import { InternalAxiosRequestConfig } from "axios"
import { getAuthToken } from "@/utils/auth"

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getAuthToken()
  if (typeof token === "string") {
    config.headers.Authorization = token
  }
  return config
}
