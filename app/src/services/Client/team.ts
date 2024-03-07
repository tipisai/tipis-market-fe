import { authCloudRequest } from "@illa-public/illa-net"
import { TeamInfo } from "@illa-public/public-types"

export const createTeam = (data: { name: string; identifier: string }) => {
  return authCloudRequest<TeamInfo>({
    url: "/teams",
    method: "POST",
    data,
  })
}

export const fetchTeamsInfo = () => {
  return authCloudRequest<TeamInfo[]>({
    url: "/teams/my",
    method: "GET",
  })
}
