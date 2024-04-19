import { authCloudRequest } from "@illa-public/illa-net"
import { BaseUserInfo } from "@illa-public/public-types"

export interface IPinedTipiTabInfo {
  tabID: string
  tabName: string
  tabIcon: string
  tipiID: string
  tipiOwnerTeamIdentity: string
}

export interface ICurrentUserInfo extends BaseUserInfo {
  personalization: {
    pinedTipisTabs: Record<string, IPinedTipiTabInfo[]>
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

export const putPersonalization = async (data: Record<string, unknown>) => {
  return authCloudRequest<ICurrentUserInfo>({
    method: "PUT",
    url: "/users/personalization",
    data: data,
  })
}
