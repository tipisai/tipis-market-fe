import Icon from "@ant-design/icons"
import {
  ForkIcon,
  PlayFillIcon,
  ShareIcon,
  StarFillIcon,
  StarOutlineIcon,
} from "@illa-public/icon"
import { MarketShareAgent } from "@illa-public/invite-modal"
import { getAIAgentMarketplaceInfo } from "@illa-public/market-agent/service"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { MarketAIAgent } from "@illa-public/public-types"
import { TeamInfo, USER_ROLE } from "@illa-public/public-types"
import { isBiggerThanTargetRole } from "@illa-public/user-role-utils"
import {
  COPY_STATUS,
  copyToClipboard,
  formatNumForAgent,
} from "@illa-public/utils"
import { App } from "antd"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import CreateTeamModal from "@/components/common/CreateTeamModal"
import { OPERATE_TYPE } from "@/constants/page"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import { GTagCategory, GTagEvent, ModalActionType } from "@/interface/common"
import {
  forkAIAgentToTeam,
  starAiAgent,
  unStarAiAgent,
} from "@/services/Client/aiAgent"
import { fetchTeamsInfo } from "@/services/Client/team"
import { filterTeam } from "@/utils/filterTeam"
import { sendTagEvent } from "@/utils/gtag"
import { toEditAgent, toRunAgent } from "@/utils/navigate"
import { AgentTeamSelectModal } from "../../TeamSelectModal"
import {
  agentActionsStyle,
  numStyle,
  otherActionsStyle,
  runButtonAreaStyle,
  starStyle,
} from "./style"

interface OperationalProps {
  detail: MarketAIAgent
  setAgentDetail: (detail: MarketAIAgent) => void
}

export const Operational: FC<OperationalProps> = ({
  detail,
  setAgentDetail,
}) => {
  const checkLoginAndRedirect = useCheckLogin()
  const { t } = useTranslation()
  const { message } = App.useApp()

  const { track } = useContext(MixpanelTrackContext)
  const searchParams = useSearchParams()
  const [operateType, setOperateType] = useState<OPERATE_TYPE | null>(
    searchParams.get("operateType") as OPERATE_TYPE,
  )
  const router = useRouter()

  const [starLoading, setStarLoading] = useState(false)
  const [runLoading, setRunLoading] = useState(false)
  const [forkLoading, setForkLoading] = useState(false)
  const [shareVisible, setShareVisible] = useState(false)
  const [createTeamVisible, setCreateTeamVisible] = useState(false)
  const [teamSelectVisible, setTeamSelectVisible] = useState(false)
  const [teamItems, setTeamItems] = useState<TeamInfo[]>([])
  const [teamSelectActionType, setTeamSelectActionType] =
    useState<ModalActionType>("run")
  const aiAgentID = detail?.aiAgent?.aiAgentID

  const openShapxodal = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "share",
      parameter5: aiAgentID,
    })
    sendTagEvent({
      action: GTagEvent.CLICK,
      category: GTagCategory.AGENT_DETAIL_SHARE_CLICK,
    })
    setShareVisible(true)
    track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "share_modal",
      parameter5: aiAgentID,
    })
  }

  const closeTeamSelectModal = () => {
    setTeamSelectVisible(false)
  }

  const closeCreateTeamModal = () => {
    setCreateTeamVisible(false)
  }

  const handleRunAgent = useCallback(async () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "run",
      parameter5: aiAgentID,
    })
    sendTagEvent({
      action: GTagEvent.CLICK,
      category: GTagCategory.AGENT_DETAIL_RUN_CLICK,
    })
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.RUN)
    if (!isLogin) return
    setRunLoading(true)
    let res, teamItems
    try {
      res = await fetchTeamsInfo()
      if (res.data) {
        teamItems = res.data.filter((item) => {
          return isBiggerThanTargetRole(USER_ROLE.VIEWER, item.myRole)
        })
      }
    } finally {
      setRunLoading(false)
    }
    setTeamItems(teamItems ?? [])
    if (!teamItems || teamItems?.length === 0) {
      setTeamSelectActionType("run")
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      const teamIdentifier = teamItems[0].identifier
      toRunAgent(
        aiAgentID,
        teamIdentifier,
        detail.marketplace?.contributorTeam?.teamIdentifier,
      )
    } else {
      setTeamSelectActionType("run")
      setTeamSelectVisible(true)
    }
  }, [
    aiAgentID,
    checkLoginAndRedirect,
    detail.marketplace?.contributorTeam?.teamIdentifier,
    track,
  ])

  const star = useCallback(async () => {
    setStarLoading(true)
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "star",
      parameter5: aiAgentID,
    })
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.STAR)
    if (!isLogin) return
    sendTagEvent({
      action: GTagEvent.CLICK,
      category: GTagCategory.AGENT_DETAIL_STAR_CLICK,
    })
    try {
      detail.marketplace?.isStarredByCurrentUser
        ? await unStarAiAgent(aiAgentID)
        : await starAiAgent(aiAgentID)
      const res = await getAIAgentMarketplaceInfo(aiAgentID)
      setAgentDetail(res.data)
      message.success(t("dashboard.message.star-suc"))
    } catch (error) {
      message.error(t("dashboard.message.star-failed"))
    } finally {
      setStarLoading(false)
    }
  }, [
    aiAgentID,
    checkLoginAndRedirect,
    detail.marketplace?.isStarredByCurrentUser,
    message,
    setAgentDetail,
    t,
    track,
  ])

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

  const handleForkAgent = useCallback(async () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "fork",
      parameter5: aiAgentID,
    })
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.FORK)
    sendTagEvent({
      action: GTagEvent.CLICK,
      category: GTagCategory.AGENT_DETAIL_FORK_CLICK,
    })
    if (!isLogin) return
    setForkLoading(true)
    let res, teamItems
    try {
      res = await fetchTeamsInfo()
      teamItems = filterTeam(res.data)
    } catch (e) {
    } finally {
      setForkLoading(false)
    }
    setTeamItems(teamItems ?? [])
    if (!teamItems || teamItems.length === 0) {
      setTeamSelectActionType("fork")
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      const teamInfo = teamItems[0]
      const teamId = teamInfo.id
      const teamIdentifier = teamInfo.identifier
      await forkAIAgent(teamIdentifier, teamId)
    } else {
      setTeamSelectActionType("fork")
      setTeamSelectVisible(true)
    }
  }, [aiAgentID, checkLoginAndRedirect, forkAIAgent, track])

  const onCreateTeamSuccess = useCallback(
    (teamIdentifier: string, teamId: string) => {
      switch (teamSelectActionType) {
        case "fork":
          forkAIAgent(teamIdentifier, teamId)
          break
        case "run":
          toRunAgent(
            aiAgentID,
            teamIdentifier,
            detail.marketplace?.contributorTeam?.teamIdentifier,
          )
          break
      }
    },
    [
      teamSelectActionType,
      aiAgentID,
      detail.marketplace?.contributorTeam?.teamIdentifier,
      forkAIAgent,
    ],
  )

  const handleCopyMarketplaceLink = useCallback(
    (link: string) => {
      track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "share_modal_link",
        parameter5: aiAgentID,
      })
      sendTagEvent({
        action: GTagEvent.CLICK,
        category: GTagCategory.AGENT_DETAIL_SHARE_COPY_CLICK,
      })
      const flag = copyToClipboard(
        t("user_management.modal.contribute.default_text.agent", {
          agentName: detail.aiAgent?.name,
          agentLink: link,
        }),
      )
      if (flag === COPY_STATUS.EMPTY) {
        message.info({
          content: t("empty_copied_tips"),
        })
        message.info(t("empty_copied_tips"))
      } else {
        message.success(t("copied"))
      }
    },
    [aiAgentID, detail.aiAgent?.name, message, t, track],
  )

  const handleShareByMedia = useCallback(
    (name: string) => {
      track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "share_modal_social_media",
        parameter4: name,
        parameter5: aiAgentID,
      })
      sendTagEvent({
        action: GTagEvent.CLICK,
        category: GTagCategory.AGENT_DETAIL_SHARE_SOCIAL_MEDIA_CLICK,
        label: name,
      })
    },
    [aiAgentID, track],
  )

  useEffect(() => {
    if (operateType) {
      switch (operateType) {
        case OPERATE_TYPE.STAR:
          !detail.marketplace?.isStarredByCurrentUser && star()
          break
        case OPERATE_TYPE.FORK:
          handleForkAgent()
          break
        case OPERATE_TYPE.RUN:
          handleRunAgent()
          break
      }
      setOperateType(null)
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true })
    }
  }, [detail, handleForkAgent, handleRunAgent, operateType, star, router])

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
          <Button
            size="large"
            loading={starLoading}
            onClick={star}
            icon={
              detail.marketplace?.isStarredByCurrentUser ? (
                <Icon component={StarFillIcon} css={starStyle} />
              ) : (
                <Icon component={StarOutlineIcon} />
              )
            }
            style={{ justifyContent: "center" }}
          >
            <span>{t("detail.operation.star")}</span>
            {detail.marketplace?.numStars !== 0 && (
              <span css={numStyle}>
                {formatNumForAgent(detail.marketplace?.numStars)}
              </span>
            )}
          </Button>
          <Button
            size="large"
            onClick={openShapxodal}
            icon={<Icon component={ShareIcon} />}
            style={{ justifyContent: "center" }}
          >
            <span>{t("detail.operation.share")}</span>
          </Button>
        </div>
      </div>
      <CreateTeamModal
        visible={createTeamVisible}
        actionType={teamSelectActionType}
        ID={detail.aiAgent?.aiAgentID}
        onCancel={closeCreateTeamModal}
        onCreateTeamSuccess={onCreateTeamSuccess}
      />
      <AgentTeamSelectModal
        aiAgentID={detail.aiAgent?.aiAgentID}
        visible={teamSelectVisible}
        teamItems={teamItems}
        ownerTeamIdentifier={
          detail.marketplace?.contributorTeam?.teamIdentifier
        }
        actionType={teamSelectActionType}
        onCancel={closeTeamSelectModal}
      />
      {shareVisible && (
        <MarketShareAgent
          title={`${t("user_management.modal.social_media.default_text.agent", {
            agentName: detail.aiAgent?.name,
          })}`}
          onClose={() => setShareVisible(false)}
          agentID={detail.aiAgent?.aiAgentID}
          defaultAgentContributed={true}
          onAgentContributed={() => {}}
          onCopyAgentMarketLink={handleCopyMarketplaceLink}
          userRoleForThisAgent={USER_ROLE.GUEST}
          ownerTeamID={detail.marketplace?.contributorTeam?.teamID}
          onShare={handleShareByMedia}
        />
      )}
    </>
  )
}
