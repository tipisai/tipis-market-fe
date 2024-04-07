import { getAuthToken } from "@/utils/auth"

export const toRunAgent = (
  agentID: string,
  teamIdentifier: string,
  ownerTeamIdentifier: string,
) => {
  const token = getAuthToken()
  window.location.href = `${process.env.ILLA_CLOUD_URL}/workspace/${ownerTeamIdentifier}/tipi/${agentID}/run?token=${token}&myTeamIdentifier=${teamIdentifier}`
}

export const toEditAgent = (agentID: string, teamIdentifier: string) => {
  const token = getAuthToken()
  window.location.href = `${process.env.ILLA_CLOUD_URL}/workspace/${teamIdentifier}/tipi/${agentID}/edit?token=${token}`
}

export const toCreateAgent = (teamIdentifier: string) => {
  const token = getAuthToken()
  window.location.href = `${process.env.ILLA_CLOUD_URL}/workspace/${teamIdentifier}/tipi/create?token=${token}`
}

export const toAccountSetting = () => {
  window.location.href = `${process.env.ILLA_CLOUD_URL}/setting/account`
}
