import { getColor } from "@illa-public/color-scheme"
import { TeamInfo } from "@illa-public/public-types"
import { Tag } from "antd"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { isFreeLicense } from "@/utils/filterTeam"
import { teamSelectItemContainerStyle } from "./style"

interface TeamSelectItemProps {
  teamInfo?: TeamInfo
}

export const TeamSelectItem: FC<TeamSelectItemProps> = ({ teamInfo }) => {
  const { t } = useTranslation()
  const isCurrentFree = isFreeLicense(
    teamInfo?.currentTeamLicense?.plan,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )
  return (
    <div css={teamSelectItemContainerStyle}>
      <span>{teamInfo?.name}</span>
      {isCurrentFree && (
        <Tag
          style={{
            padding: "1px 8px",
            margin: 0,
            borderRadius: "12px",
            backgroundColor: getColor("techPurple", "08"),
            color: getColor("techPurple", "03"),
          }}
        >
          {t("free")}
        </Tag>
      )}
    </div>
  )
}
