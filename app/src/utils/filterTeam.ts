import { SUBSCRIBE_PLAN, TeamInfo } from "@illa-public/public-types"
import { getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"

export const filterTeam = (teamItems: TeamInfo[]) => {
  if (!teamItems) return
  return teamItems?.filter((item) => {
    return canManage(
      item.myRole,
      ATTRIBUTE_GROUP.AI_AGENT,
      getPlanUtils(item),
      ACTION_MANAGE.CREATE_AI_AGENT,
    )
  })
}

export const isFreeLicense = (plan?: SUBSCRIBE_PLAN, purchased?: boolean) => {
  return plan === SUBSCRIBE_PLAN.TEAM_LICENSE_FREE && !purchased
}
