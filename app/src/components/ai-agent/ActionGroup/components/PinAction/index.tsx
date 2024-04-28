import Icon from "@ant-design/icons"
import { PinIcon } from "@illa-public/icon"
import { TeamInfo } from "@illa-public/public-types"
import { Button, Popover } from "antd"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { PinContent } from "@/components/ai-agent/PinContent"
import { OPERATE_TYPE } from "@/constants/page"
import { InfoContext } from "@/context/infoContext"
import { useCheckLogin } from "@/hooks/useCheckLogin"
import { fetchTeamsInfo } from "@/services/Client/team"
import { canUseTeam } from "@/utils/filterTeam"
import { IPinActionProps } from "./interface"

const PinAction: FC<IPinActionProps> = ({
  tipisID,
  pinOrUnPinTipi,
  setCreateTeamVisible,
  setActionType,
}) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [canPinTeamItems, setCanPinTeamItems] = useState<TeamInfo[]>([])

  const [pinLoading, setPinLoading] = useState(false)
  const [pinModalVisible, setPinModalVisible] = useState(false)

  const { userInfo } = useContext(InfoContext)

  const checkLoginAndRedirect = useCheckLogin()

  const handlePin = useCallback(async () => {
    const isLogin = checkLoginAndRedirect(OPERATE_TYPE.PIN)
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
    setCanPinTeamItems(teamItems ?? [])
    if (!teamItems || teamItems.length === 0) {
      setActionType(OPERATE_TYPE.PIN)
      setCreateTeamVisible(true)
    } else if (teamItems?.length === 1) {
      await pinOrUnPinTipi(teamItems[0].id)
    } else {
      setActionType(OPERATE_TYPE.PIN)
      setPinModalVisible(true)
    }
  }, [
    checkLoginAndRedirect,
    pinOrUnPinTipi,
    setActionType,
    setCreateTeamVisible,
    setPinModalVisible,
    setCanPinTeamItems,
  ])

  useEffect(() => {
    const redirectAction = searchParams.get("operateType") as OPERATE_TYPE
    if (redirectAction && redirectAction === OPERATE_TYPE.PIN) {
      handlePin()
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true })
    }
  }, [handlePin, router, searchParams])

  return (
    <Popover
      open={pinModalVisible}
      content={
        <PinContent
          teamItems={canPinTeamItems}
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
        <span>{t("pin")}</span>
      </Button>
    </Popover>
  )
}

export default PinAction
