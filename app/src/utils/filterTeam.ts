import { TeamInfo, USER_ROLE } from "@illa-public/public-types"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"

export const canUseTeam = (teamItems: TeamInfo[]) => {
  if (!teamItems) return
  return teamItems?.filter((item) =>
    isBiggerThanTargetRole(USER_ROLE.VIEWER, item.myRole),
  )
}

export const canEditTeam = (teamItems: TeamInfo[]) => {
  if (!teamItems) return
  return teamItems?.filter((item) =>
    isBiggerThanTargetRole(USER_ROLE.EDITOR, item.myRole),
  )
}
