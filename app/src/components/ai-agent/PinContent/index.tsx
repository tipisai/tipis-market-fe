import { TeamInfo } from "@illa-public/public-types"
import { Avatar, Checkbox } from "antd"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { IPinedTipiTabInfo } from "@/services/Client/users"
import { teamItemStyle, teamNameStyle, titleStyle } from "./style"

interface TeamSelectModalProps {
  agentID: string
  teamItems: TeamInfo[]
  pinedTipisTabs?: Record<string, IPinedTipiTabInfo[]> | undefined
  onPinCallback: (teamID: string) => void
}
export const PinContent: FC<TeamSelectModalProps> = (props) => {
  const { t } = useTranslation()
  const { teamItems, pinedTipisTabs, agentID, onPinCallback } = props

  return (
    <>
      <span css={titleStyle}>{t("_title")}</span>
      {teamItems.map(({ id, name, icon }) => {
        const isPin =
          Array.isArray(pinedTipisTabs?.[id]) &&
          !!pinedTipisTabs[id].find((item) => item.tipiID === agentID)
        return (
          <div key={id} css={teamItemStyle}>
            <Avatar
              src={icon}
              size={24}
              shape="square"
              style={{ flex: "none" }}
            />
            <span css={teamNameStyle}>{name}</span>
            <Checkbox checked={isPin} onChange={() => onPinCallback(id)} />
          </div>
        )
      })}
    </>
  )
}

PinContent.displayName = "PinContent"
