import Icon from "@ant-design/icons"
import { ForkIcon, PlayFillIcon, ShareIcon } from "@illa-public/icon"
import "@illa-public/market-share"
import { MarketShareModal } from "@illa-public/market-share"
import { MarketAIAgent } from "@illa-public/public-types"
import { TeamInfo } from "@illa-public/public-types"
import { formatNumForAgent } from "@illa-public/utils"
import { App } from "antd"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import CreateTeamModal from "@/components/common/CreateTeamModal"
import { OPERATE_TYPE } from "@/constants/page"
import { InfoContext } from "@/context/infoContext"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import {
  fetchPinTipi,
  fetchUnPinTipi,
  forkAIAgentToTeam,
} from "@/services/Client/aiAgent"
import { fetchTeamsInfo } from "@/services/Client/team"
import { fetchUserInfo } from "@/services/Client/users"
import { canEditTeam, canUseTeam } from "@/utils/filterTeam"
import { toEditAgent, toRunAgent } from "@/utils/navigate"
import { PinModal } from "../../PinModal"
import { AgentTeamSelectModal } from "../../TeamSelectModal"
import {
  agentActionsStyle,
  numStyle,
  otherActionsStyle,
  runButtonAreaStyle,
} from "./style"

interface OperationalProps {
  detail: MarketAIAgent
}

export const Actions: FC<OperationalProps> = ({ detail }) => {
  const checkLoginAndRedirect = useCheckLogin()
  const { t } = useTranslation()
  const { message } = App.useApp()

  const searchParams = useSearchParams()
  const router = useRouter()
  const { userInfo, setUserInfo } = useContext(InfoContext)

  const [pinLoading, setPinLoading] = useState(false)
  const [runLoading, setRunLoading] = useState(false)
  const [forkLoading, setForkLoading] = useState(false)
  const [shareVisible, setShareVisible] = useState(false)
  const [createTeamVisible, setCreateTeamVisible] = useState(false)
  const [teamSelectVisible, setTeamSelectVisible] = useState(false)
  const [pinModalVisible, setPinModalVisible] = useState(false)
  const [teamItems, setTeamItems] = useState<TeamInfo[]>([])
  const [actionType, setActionType] = useState<OPERATE_TYPE>()
  const aiAgentID = detail?.aiAgent?.aiAgentID

  const forkAIAgent = useCallback(
    async (teamIdentifier: string, teamId: string) => {
      if (forkLoading) return
      setForkLoading(true)
      try {
        const res = await forkAIAgentToTeam(aiAgentID, teamId)
        if (res.data.aiAgentID) {
          toEditAgent(res.data.aiAgentID, teamIdentifier)
        }
      } catch (error) {
      } finally {
        setForkLoading(false)
      }
    },
    [aiAgentID, forkLoading],
  )

  const pinOrUnPinTipi = useCallback(
    async (teamID: string) => {
      try {
        const targetTeamPinList =
          userInfo?.personalization?.pinedTipisTabs?.[teamID]
        if (
          Array.isArray(targetTeamPinList) &&
          targetTeamPinList.find((item) => item.tipiID === aiAgentID)
        ) {
          await fetchUnPinTipi(teamID, aiAgentID)
          message.success(t("_un pin success"))
        } else {
          await fetchPinTipi(teamID, aiAgentID)
          message.success(t("_pin success"))
        }
        const currentUerInfo = await fetchUserInfo()
        setUserInfo(currentUerInfo.data)
      } catch (e) {
        message.error(t("_pin error"))
      }
    },
    [
      aiAgentID,
      message,
      setUserInfo,
      t,
      userInfo?.personalization?.pinedTipisTabs,
    ],
  )

  const handleForkAgent = useCallback(async () => {
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.FORK)
    if (!isLogin) return
    setForkLoading(true)
    let res, teamItems
    try {
      res = await fetchTeamsInfo()
      teamItems = canEditTeam(res.data)
    } catch (e) {
    } finally {
      setForkLoading(false)
    }
    setTeamItems(teamItems ?? [])
    if (!teamItems || teamItems.length === 0) {
      setActionType(OPERATE_TYPE.FORK)
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      const teamInfo = teamItems[0]
      const teamId = teamInfo.id
      const teamIdentifier = teamInfo.identifier
      await forkAIAgent(teamIdentifier, teamId)
    } else {
      setActionType(OPERATE_TYPE.FORK)
      setTeamSelectVisible(true)
    }
  }, [checkLoginAndRedirect, forkAIAgent])

  const handleRunAgent = useCallback(async () => {
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.RUN)
    if (!isLogin) return
    setRunLoading(true)
    let res, teamItems
    try {
      res = await fetchTeamsInfo()
      teamItems = canUseTeam(res.data)
    } catch (e) {
    } finally {
      setRunLoading(false)
    }
    setTeamItems(teamItems ?? [])
    if (!teamItems || teamItems?.length === 0) {
      setActionType(OPERATE_TYPE.RUN)
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      const teamIdentifier = teamItems[0].identifier
      toRunAgent(
        aiAgentID,
        teamIdentifier,
        detail.marketplace?.contributorTeam?.teamIdentifier,
      )
    } else {
      setActionType(OPERATE_TYPE.RUN)
      setTeamSelectVisible(true)
    }
  }, [
    aiAgentID,
    checkLoginAndRedirect,
    detail.marketplace?.contributorTeam?.teamIdentifier,
  ])

  const handlePin = useCallback(async () => {
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.FORK)
    if (!isLogin) return
    setPinLoading(true)
    let res, teamItems
    try {
      res = await fetchTeamsInfo()
      teamItems = canUseTeam(res.data)
    } catch (e) {
    } finally {
      setPinLoading(false)
    }
    setTeamItems(teamItems ?? [])
    if (!teamItems || teamItems.length === 0) {
      setActionType(OPERATE_TYPE.PIN)
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      await pinOrUnPinTipi(teamItems[0].id)
    } else {
      setActionType(OPERATE_TYPE.PIN)
      setPinModalVisible(true)
    }
  }, [checkLoginAndRedirect, pinOrUnPinTipi])

  const onCreateOrSelectCallback = useCallback(
    (teamIdentifier: string, teamID: string) => {
      switch (actionType) {
        case OPERATE_TYPE.FORK: {
          forkAIAgent(teamIdentifier, teamID)
          break
        }
        case OPERATE_TYPE.RUN: {
          toRunAgent(
            aiAgentID,
            teamIdentifier,
            detail.marketplace?.contributorTeam?.teamIdentifier,
          )
          break
        }
        case OPERATE_TYPE.PIN: {
          pinOrUnPinTipi(teamID)
        }
      }
    },
    [
      actionType,
      forkAIAgent,
      aiAgentID,
      detail.marketplace?.contributorTeam?.teamIdentifier,
      pinOrUnPinTipi,
    ],
  )

  useEffect(() => {
    const redirectAction = searchParams.get("operateType") as OPERATE_TYPE
    if (redirectAction) {
      switch (redirectAction) {
        case OPERATE_TYPE.FORK: {
          handleForkAgent()
          break
        }
        case OPERATE_TYPE.RUN: {
          handleRunAgent()
          break
        }
        case OPERATE_TYPE.PIN: {
          handlePin()
        }
      }
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true })
    }
  }, [handleForkAgent, handleRunAgent, handlePin, router, searchParams])

  return (
    <>
      <div css={agentActionsStyle}>
        <div css={runButtonAreaStyle}>
          <Button
            block
            size="large"
            type="primary"
            loading={runLoading}
            onClick={handleRunAgent}
            icon={<Icon component={PlayFillIcon} />}
            style={{ justifyContent: "center" }}
          >
            <span>{t("detail.operation.run")}</span>
            {detail.marketplace?.numRuns !== 0 && (
              <span css={numStyle}>
                {formatNumForAgent(detail.marketplace?.numRuns)}
              </span>
            )}
          </Button>
        </div>
        <div css={otherActionsStyle}>
          <Button
            size="large"
            onClick={handleForkAgent}
            loading={forkLoading}
            icon={<Icon component={ForkIcon} />}
            style={{ justifyContent: "center" }}
          >
            <span>{t("detail.operation.fork")}</span>
            {detail.marketplace?.numForks !== 0 && (
              <span css={numStyle}>
                {formatNumForAgent(detail.marketplace?.numForks)}
              </span>
            )}
          </Button>
          <Button size="large" onClick={handlePin} loading={pinLoading}>
            <span>{t("_pin")}</span>
          </Button>
          <Button
            size="large"
            onClick={() => setShareVisible(true)}
            icon={<Icon component={ShareIcon} />}
            style={{ justifyContent: "center" }}
          >
            <span>{t("detail.operation.share")}</span>
          </Button>
        </div>
      </div>
      <CreateTeamModal
        visible={createTeamVisible}
        onCancel={() => setCreateTeamVisible(false)}
        onCreateTeamSuccess={onCreateOrSelectCallback}
      />
      <AgentTeamSelectModal
        visible={teamSelectVisible}
        teamItems={teamItems}
        actionType={actionType}
        onCancel={() => setTeamSelectVisible(false)}
        onSelectCallback={onCreateOrSelectCallback}
      />
      <MarketShareModal
        title={`${t("user_management.modal.social_media.default_text.agent", {
          agentName: detail.aiAgent?.name,
        })}`}
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        ID={detail.aiAgent?.aiAgentID}
        name={detail.aiAgent?.name}
      />
      <PinModal
        visible={pinModalVisible}
        teamItems={teamItems}
        agentID={aiAgentID}
        onPinCallback={pinOrUnPinTipi}
        pinedTipisTabs={userInfo?.personalization?.pinedTipisTabs}
        onCancel={() => setPinModalVisible(false)}
      />
    </>
  )
}
