import Icon from "@ant-design/icons"
import { ForkIcon } from "@illa-public/icon"
import { formatNumForAgent } from "@illa-public/utils"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useState } from "react"
import { OPERATE_TYPE } from "@/constants/page"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import { fetchTeamsInfo } from "@/services/Client/team"
import { canEditTeam } from "@/utils/filterTeam"
import { IForkActionProps } from "./interface"
import { numStyle } from "./style"

const ForkAction: FC<IForkActionProps> = ({
  forkNum,
  setTeamItems,
  setActionType,
  setCreateTeamVisible,
  setTeamSelectVisible,
  forkAIAgent,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [forkLoading, setForkLoading] = useState(false)
  const checkLoginAndRedirect = useCheckLogin()
  const searchParams = useSearchParams()

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
  }, [
    checkLoginAndRedirect,
    forkAIAgent,
    setActionType,
    setCreateTeamVisible,
    setTeamItems,
    setTeamSelectVisible,
  ])

  useEffect(() => {
    const redirectAction = searchParams.get("operateType") as OPERATE_TYPE
    if (redirectAction && redirectAction === OPERATE_TYPE.FORK) {
      handleForkAgent()
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true })
    }
  }, [handleForkAgent, router, searchParams])

  return (
    <Button
      size="large"
      block
      onClick={handleForkAgent}
      loading={forkLoading}
      icon={<Icon component={ForkIcon} />}
      style={{ justifyContent: "center" }}
    >
      <span>{t("detail.operation.fork")}</span>
      {forkNum !== 0 && (
        <span css={numStyle}>{formatNumForAgent(forkNum)}</span>
      )}
    </Button>
  )
}

export default ForkAction
