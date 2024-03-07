import { TeamInfo } from "@illa-public/public-types"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { Tag } from "@illa-design/react"
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
      {isCurrentFree && <Tag colorScheme="purple">{t("free")}</Tag>}
    </div>
  )
}
