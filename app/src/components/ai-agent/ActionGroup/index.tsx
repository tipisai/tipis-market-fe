import Icon from "@ant-design/icons"
import { ForkIcon, PinIcon, PlayFillIcon, ShareIcon } from "@illa-public/icon"
import "@illa-public/market-share"
import { MarketShareModal } from "@illa-public/market-share"
import { TeamInfo } from "@illa-public/public-types"
import { formatNumForAgent } from "@illa-public/utils"
import { App, Popover } from "antd"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { v4 } from "uuid"
import CreateTeamModal from "@/components/common/CreateTeamModal"
import { OPERATE_TYPE } from "@/constants/page"
import { InfoContext } from "@/context/infoContext"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import { forkAIAgentToTeam } from "@/services/Client/aiAgent"
import { fetchTeamsInfo } from "@/services/Client/team"
import { putPersonalization } from "@/services/Client/users"
import { canEditTeam, canUseTeam } from "@/utils/filterTeam"
import { toEditAgent, toRunAgent } from "@/utils/navigate"
import { PinContent } from "../PinContent"
import { AgentTeamSelectModal } from "../TeamSelectModal"
import {
  agentActionsStyle,
  numStyle,
  otherActionsStyle,
  runButtonAreaStyle,
} from "./style"

interface OperationalProps {
  tipisName: string
  tipisID: string
  tipisIcon: string
  runNumber: number
  forkNumber: number
  ownerTeamIdentity: string
  isPublishConfiguration: boolean
}

export const ActionGroup: FC<OperationalProps> = ({
  tipisID,
  tipisIcon,
  tipisName,
  runNumber,
  forkNumber,
  ownerTeamIdentity,
  isPublishConfiguration,
}) => {
  const checkLoginAndRedirect = useCheckLogin()
  const { t } = useTranslation()
  const { message } = App.useApp()

  const searchParams = useSearchParams()
  const router = useRouter()
  const { userInfo, isMobile, setUserInfo } = useContext(InfoContext)

  const [pinLoading, setPinLoading] = useState(false)
  const [runLoading, setRunLoading] = useState(false)
  const [forkLoading, setForkLoading] = useState(false)
  const [shareVisible, setShareVisible] = useState(false)
  const [createTeamVisible, setCreateTeamVisible] = useState(false)
  const [teamSelectVisible, setTeamSelectVisible] = useState(false)
  const [pinModalVisible, setPinModalVisible] = useState(false)
  const [teamItems, setTeamItems] = useState<TeamInfo[]>([])
  const [actionType, setActionType] = useState<OPERATE_TYPE>()

  const forkAIAgent = useCallback(
    async (teamIdentifier: string, teamId: string) => {
      if (forkLoading) return
      setForkLoading(true)
      try {
        const res = await forkAIAgentToTeam(tipisID, teamId)
        if (res.data.aiAgentID) {
          toEditAgent(res.data.aiAgentID, teamIdentifier)
        }
      } catch (error) {
      } finally {
        setForkLoading(false)
      }
    },
    [tipisID, forkLoading],
  )

  const pinOrUnPinTipi = useCallback(
    async (teamID: string) => {
      if (!userInfo) {
        return
      }
      try {
        const personalization = userInfo.personalization
        const currentTeamPinList =
          personalization?.pinedTipisTabs?.[teamID] || []

        const targetIndex = currentTeamPinList.findIndex(
          (item) => item.tipiID === tipisID,
        )
        if (targetIndex !== -1) {
          currentTeamPinList.splice(targetIndex, 1)
        } else {
          const info = {
            tabID: v4(),
            tabName: tipisName,
            tabIcon: tipisIcon,
            tipiID: tipisID,
            tipiOwnerTeamIdentity: ownerTeamIdentity,
          }
          currentTeamPinList.push(info)
        }
        if (personalization?.pinedTipisTabs) {
          personalization.pinedTipisTabs = {
            ...personalization.pinedTipisTabs,
            [teamID]: currentTeamPinList,
          }
        } else {
          personalization.pinedTipisTabs = {
            [teamID]: currentTeamPinList,
          }
        }
        await putPersonalization(personalization)
        setUserInfo({
          ...userInfo,
          personalization,
        })
      } catch (e) {
        message.error(t("_pin error"))
      }
    },
    [
      message,
      ownerTeamIdentity,
      setUserInfo,
      t,
      tipisID,
      tipisIcon,
      tipisName,
      userInfo,
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
      toRunAgent(tipisID, teamIdentifier, ownerTeamIdentity)
    } else {
      setActionType(OPERATE_TYPE.RUN)
      setTeamSelectVisible(true)
    }
  }, [checkLoginAndRedirect, ownerTeamIdentity, tipisID])

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
          toRunAgent(tipisID, teamIdentifier, ownerTeamIdentity)
          break
        }
        case OPERATE_TYPE.PIN: {
          pinOrUnPinTipi(teamID)
        }
      }
    },
    [actionType, forkAIAgent, ownerTeamIdentity, pinOrUnPinTipi, tipisID],
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
          >
            {t("detail.operation.run")}{" "}
            {runNumber !== 0 ? formatNumForAgent(runNumber) : ""}
          </Button>
        </div>
        <div css={otherActionsStyle}>
          {isPublishConfiguration ||
            (true && (
              <Button
                size="large"
                block
                onClick={handleForkAgent}
                loading={forkLoading}
                icon={<Icon component={ForkIcon} />}
                style={{ justifyContent: "center" }}
              >
                <span>{t("detail.operation.fork")}</span>
                {forkNumber !== 0 && (
                  <span css={numStyle}>{formatNumForAgent(forkNumber)}</span>
                )}
              </Button>
            ))}
          <Popover
            open={pinModalVisible}
            content={
              <PinContent
                teamItems={teamItems}
                agentID={tipisID}
                onPinCallback={pinOrUnPinTipi}
                pinedTipisTabs={userInfo?.personalization?.pinedTipisTabs}
              />
            }
            trigger={["click"]}
            onOpenChange={(visible) => {
              if (!visible) {
                setPinModalVisible(false)
              }
            }}
          >
            <Button
              size="large"
              block
              onClick={handlePin}
              loading={pinLoading}
              icon={<Icon component={PinIcon} />}
            >
              <span>{t("_pin")}</span>
            </Button>
          </Popover>

          <Button
            size="large"
            block
            onClick={() => setShareVisible(true)}
            icon={<Icon component={ShareIcon} />}
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
          agentName: tipisName,
        })}`}
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        ID={tipisID}
        name={tipisName}
      />
    </>
  )
}
