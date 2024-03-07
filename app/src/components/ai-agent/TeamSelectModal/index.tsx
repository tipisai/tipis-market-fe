import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { TeamInfo } from "@illa-public/public-types"
import { App, Button, Modal, Select } from "antd"
import { useTranslation } from "next-i18next"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { TeamSelectItem } from "@/components/common/TeamSelectItem"
import { ModalActionType } from "@/interface/common"
import { forkAIAgentToTeam } from "@/services/Client/aiAgent"
import { toCreateAgent, toEditAgent, toRunAgent } from "@/utils/navigate"
import { actionAreaStyle, contentStyle, titleStyle } from "./style"

interface TeamSelectModalProps {
  ownerTeamIdentifier?: string
  teamItems: TeamInfo[]
  actionType?: ModalActionType
  aiAgentID?: string
  onCancel?: () => void
  visible: boolean
}
export const AgentTeamSelectModal: FC<TeamSelectModalProps> = (props) => {
  const { message } = App.useApp()
  const { t } = useTranslation()
  const {
    visible,
    actionType = "create",
    aiAgentID = "",
    teamItems,
    ownerTeamIdentifier = "",
    onCancel,
  } = props

  const [teamIdentifier, setTeamIdentifier] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const teamOptions = useMemo(() => {
    return teamItems.map((item) => {
      return {
        label: <TeamSelectItem teamInfo={item} />,
        value: item.identifier,
      }
    })
  }, [teamItems])

  const forkAgent = useCallback(
    async (aiAgentID: string, teamIdentifier: string) => {
      if (loading) return
      setLoading(true)
      const teamId = teamItems?.find(
        (item) => item.identifier === teamIdentifier,
      )?.id!!
      try {
        const res = await forkAIAgentToTeam(aiAgentID, teamId)
        if (res.data.aiAgentID) {
          toEditAgent(res.data.aiAgentID, teamIdentifier)
        }
        onCancel?.()
        message.success({
          content: t("dashboard.message.fork-suc"),
        })
      } catch (error) {
        console.log(error)
        message.error({
          content: t("dashboard.message.fork-failed"),
        })
      } finally {
        setLoading(false)
      }
    },
    [loading, teamItems, onCancel, message, t],
  )

  const handleSelectTeam = useCallback(() => {
    if (!teamIdentifier) return
    switch (actionType) {
      case "fork":
        forkAgent(aiAgentID, teamIdentifier)
        break
      case "create":
        toCreateAgent(teamIdentifier)
        break
      case "run":
        toRunAgent(aiAgentID, teamIdentifier, ownerTeamIdentifier)
        break
    }
  }, [teamIdentifier, actionType, forkAgent, aiAgentID, ownerTeamIdentifier])

  const handleSelectChange = useCallback(
    (value: string) => {
      track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "select_team_modal",
        parameter1: actionType,
        parameter5: aiAgentID,
        team_id: String(value),
      })
      setTeamIdentifier(value as string)
    },
    [actionType, aiAgentID, track],
  )

  useEffect(() => {
    if (visible) {
      track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "select_team_modal",
        parameter1: actionType,
        parameter5: aiAgentID,
      })
    }
  }, [actionType, aiAgentID, track, visible])

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
    >
      <div css={contentStyle}>
        <div css={titleStyle}>
          {actionType === "run"
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
            loading={loading}
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
