import { authCloudRequest } from "@illa-public/illa-net"
import { CurrentUserInfo } from "@illa-public/public-types"

export type IPinItem = {
  tabID: string
  tabIcon: string
  tabName: string
  tipiID: string
  tipiOwnerTeamIdentity: string
}
export interface ITempUserInfo extends CurrentUserInfo {
  personalization: {
    pinedTipisTabs: Record<string, IPinItem[]>
  }
}

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

export const fetchUserInfo = async () => {
  return authCloudRequest<ITempUserInfo>({
    method: "get",
    url: "/users",
  })
}
