import { Avatar } from "@illa-public/avatar"
import { MarketAIAgent } from "@illa-public/public-types"
import { Tooltip } from "antd"
import { useTranslation } from "next-i18next"
import { FC, useRef } from "react"
import {
  contributorCardStyle,
  contributorItemStyle,
  contributorLabelStyle,
  editorAvatarStyle,
  editorContainerStyle,
  teamIconStyle,
  teamInfoStyle,
  teamNameStyle,
} from "./style"

interface ContributeCardProps {
  detail: MarketAIAgent
}

export const ContributeCard: FC<ContributeCardProps> = ({ detail }) => {
  const contributerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  return (
    <div css={contributorCardStyle}>
      <div css={contributorItemStyle}>
        <div css={contributorLabelStyle}>
          {t("detail.contributed_team_app")}
        </div>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamIconStyle}
            avatarUrl={detail.marketplace?.contributorTeam?.icon}
            name={detail.marketplace?.contributorTeam?.name}
            id={detail.marketplace?.contributorTeam?.teamID}
          />
          <span css={teamNameStyle}>
            {detail.marketplace?.contributorTeam?.name}
          </span>
        </div>
      </div>
      <div css={contributorItemStyle}>
        <div css={contributorLabelStyle}>{t("detail.contributor")}</div>
        <div css={editorContainerStyle}>
          {detail.aiAgent?.editedBy?.map((editor) =>
            editor ? (
              <Tooltip
                key={editor.userID}
                placement="top"
                title={editor.nickname}
                trigger="hover"
                color="#000"
              >
                <div css={editorAvatarStyle} ref={contributerRef}>
                  <Avatar
                    avatarUrl={editor.avatar}
                    name={editor.nickname}
                    id={editor.userID}
                  />
                </div>
              </Tooltip>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}
