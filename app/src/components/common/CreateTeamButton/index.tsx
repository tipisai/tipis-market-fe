import Icon from "@ant-design/icons"
import { AddIcon } from "@illa-public/icon"
import { TeamInfo } from "@illa-public/public-types"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { useCallback, useState } from "react"
import { AgentTeamSelectModal } from "@/components/ai-agent/TeamSelectModal"
import CreateTeamModal from "@/components/common/CreateTeamModal"
import { OPERATE_TYPE } from "@/constants/page"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import { fetchTeamsInfo } from "@/services/Client/team"
import { filterTeam } from "@/utils/filterTeam"
import { toCreateAgent } from "@/utils/navigate"
import BlackButton from "../BlackButton"

export const CreateTeamButton: FC = () => {
  const { t } = useTranslation()
  const checkLoginAndRedirect = useCheckLogin()
  const [teamItems, setTeamItems] = useState<TeamInfo[]>([])
  const [loading, setLoading] = useState(false)

  const [teamSelectVisible, setTeamSelectVisible] = useState(false)
  const [createTeamVisible, setCreateTeamVisible] = useState(false)

  const closeTeamSelectModal = () => {
    setTeamSelectVisible(false)
  }

  const closeCreateTeamModal = () => {
    setCreateTeamVisible(false)
  }

  const handleCreate = useCallback(async () => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "create" })
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.CREATE)
    setLoading(true)
    if (!isLogin) return
    let res, teamItems
    try {
      res = await fetchTeamsInfo()
      teamItems = filterTeam(res.data)
    } finally {
      setLoading(false)
    }
    setTeamItems(teamItems ?? [])
    if (!teamItems || teamItems?.length === 0) {
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      const teamIdentifier = teamItems[0].identifier
      toCreateAgent(teamIdentifier)
    } else {
      setTeamSelectVisible(true)
    }
  }, [checkLoginAndRedirect])

  const handleCreateTeamSuccess = useCallback((teamIdentifier: string) => {
    toCreateAgent(teamIdentifier)
  }, [])

  return (
    <>
      <BlackButton
        type="default"
        size="large"
        style={{
          minWidth: "168px",
        }}
        loading={loading}
        onClick={handleCreate}
        icon={<Icon component={AddIcon} />}
      >
        {t("create_agent")}
      </BlackButton>
      <AgentTeamSelectModal
        actionType="create"
        teamItems={teamItems}
        visible={teamSelectVisible}
        onCancel={closeTeamSelectModal}
      />
      <CreateTeamModal
        visible={createTeamVisible}
        actionType="create"
        onCancel={closeCreateTeamModal}
        onCreateTeamSuccess={handleCreateTeamSuccess}
      />
    </>
  )
}

CreateTeamButton.displayName = "CreateTeamButton"
