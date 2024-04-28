import { OPERATE_TYPE } from "@/constants/page"

export interface IPinActionProps {
  tipisID: string
  pinOrUnPinTipi: (tipisID: string) => void
  setActionType: (actionType: OPERATE_TYPE) => void
  setCreateTeamVisible: (visible: boolean) => void
}
