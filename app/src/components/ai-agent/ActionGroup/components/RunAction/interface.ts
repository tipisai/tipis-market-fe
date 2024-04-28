import { TeamInfo } from "@illa-public/public-types"
import { OPERATE_TYPE } from "@/constants/page"

export interface IRunActionProps {
  runNum: number
  tipisID: string
  ownerTeamIdentity: string
  setTeamItems: (teamItems: TeamInfo[]) => void
  setActionType: (actionType: OPERATE_TYPE) => void
  setTeamSelectVisible: (visible: boolean) => void
  setCreateTeamVisible: (visible: boolean) => void
}
