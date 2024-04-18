import { TeamInfo } from "@illa-public/public-types"
import { Button, Modal, Select } from "antd"
import { useTranslation } from "next-i18next"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { TeamSelectItem } from "@/components/common/TeamSelectItem"
import { OPERATE_TYPE } from "@/constants/page"
import { actionAreaStyle, contentStyle, titleStyle } from "./style"

interface TeamSelectModalProps {
  teamItems: TeamInfo[]
  actionType?: OPERATE_TYPE
  onCancel?: () => void
  visible: boolean
  onSelectCallback: (teamIdentifier: string, teamID: string) => void
}
export const AgentTeamSelectModal: FC<TeamSelectModalProps> = (props) => {
  const { t } = useTranslation()
  const { visible, teamItems, actionType, onCancel, onSelectCallback } = props

  const [teamIdentifier, setTeamIdentifier] = useState<string>()

  const teamOptions = useMemo(() => {
    return teamItems.map((item) => {
      return {
        label: <TeamSelectItem teamInfo={item} />,
        value: item.identifier,
      }
    })
  }, [teamItems])

  const handleSelectTeam = useCallback(() => {
    if (!teamIdentifier) return
    const teamID = teamItems.find((item) => (item.identifier = teamIdentifier))
      ?.id!
    onSelectCallback(teamIdentifier, teamID)
  }, [onSelectCallback, teamIdentifier, teamItems])

  const handleSelectChange = useCallback((value: string) => {
    setTeamIdentifier(value)
  }, [])

  useEffect(() => {
    if (!visible) {
      setTeamIdentifier(undefined)
    }
  }, [visible])

  if (typeof document === "undefined") return null
  return createPortal(
    <Modal
      maskClosable={false}
      footer={false}
      open={visible}
      centered
      onCancel={onCancel}
      destroyOnClose
    >
      <div css={contentStyle}>
        <div css={titleStyle}>
          {actionType === OPERATE_TYPE.RUN
            ? t("team.select_team.title.run")
            : t("team.select_team.title.create")}
        </div>
        <Select
          value={teamIdentifier}
          options={teamOptions}
          onChange={handleSelectChange}
        />
        <div css={actionAreaStyle}>
          <Button
            disabled={!teamIdentifier}
            type="primary"
            onClick={handleSelectTeam}
          >
            {t("team.select_team.select_button")}
          </Button>
        </div>
      </div>
    </Modal>,
    document.body,
  )
}

AgentTeamSelectModal.displayName = "AgentTeamSelectModal"
