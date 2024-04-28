import { TeamInfo } from "@illa-public/public-types"
import { OPERATE_TYPE } from "@/constants/page"

export interface IForkActionProps {
  forkNum: number
  setTeamItems: (teamItems: TeamInfo[]) => void
  setActionType: (actionType: OPERATE_TYPE) => void
  setTeamSelectVisible: (visible: boolean) => void
  setCreateTeamVisible: (visible: boolean) => void
  forkAIAgent: (teamIdentifier: string, teamId: string) => Promise<void>
}
