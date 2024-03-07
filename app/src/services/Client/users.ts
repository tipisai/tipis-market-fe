import { authCloudRequest } from "@illa-public/illa-net"

export interface RegisterResult {
  id: string
  nickname: string
  email: string
  language: string
}

export const fetchLogout = async () => {
  return authCloudRequest<RegisterResult>({
    method: "POST",
    url: "/users/logout",
  })
}
