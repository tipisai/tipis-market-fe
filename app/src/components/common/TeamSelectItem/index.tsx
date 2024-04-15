import { TeamInfo } from "@illa-public/public-types"
import { FC } from "react"
import { teamSelectItemContainerStyle } from "./style"

interface TeamSelectItemProps {
  teamInfo?: TeamInfo
}

export const TeamSelectItem: FC<TeamSelectItemProps> = ({ teamInfo }) => {
  return (
    <div css={teamSelectItemContainerStyle}>
      <span>{teamInfo?.name}</span>
    </div>
  )
}
