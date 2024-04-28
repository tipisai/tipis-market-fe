import Icon from "@ant-design/icons"
import { PlayFillIcon } from "@illa-public/icon"
import { formatNumForAgent } from "@illa-public/utils"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useState } from "react"
import { OPERATE_TYPE } from "@/constants/page"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import { fetchTeamsInfo } from "@/services/Client/team"
import { canUseTeam } from "@/utils/filterTeam"
import { toRunAgent } from "@/utils/navigate"
import { IRunActionProps } from "./interface"
import { runButtonAreaStyle } from "./style"

const RunAction: FC<IRunActionProps> = ({
  runNum,
  tipisID,
  ownerTeamIdentity,
  setTeamItems,
  setActionType,
  setCreateTeamVisible,
  setTeamSelectVisible,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [runLoading, setRunLoading] = useState(false)
  const checkLoginAndRedirect = useCheckLogin()
  const searchParams = useSearchParams()

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
  }, [
    checkLoginAndRedirect,
    ownerTeamIdentity,
    setActionType,
    setCreateTeamVisible,
    setTeamItems,
    setTeamSelectVisible,
    tipisID,
  ])

  useEffect(() => {
    const redirectAction = searchParams.get("operateType") as OPERATE_TYPE
    if (redirectAction && redirectAction === OPERATE_TYPE.RUN) {
      handleRunAgent()
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true })
    }
  }, [handleRunAgent, router, searchParams])

  return (
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
        {runNum !== 0 ? formatNumForAgent(runNum) : ""}
      </Button>
    </div>
  )
}

export default RunAction
