import { App } from "antd"
import { useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { v4 } from "uuid"
import { InfoContext } from "@/context/infoContext"
import { forkAIAgentToTeam } from "@/services/Client/aiAgent"
import { putPersonalization } from "@/services/Client/users"
import { toEditAgent } from "@/utils/navigate"

export const useActionMethods = (
  tipisID: string,
  tipisName: string,
  tipisIcon: string,
  ownerTeamIdentity: string,
) => {
  const { t } = useTranslation()
  const { userInfo, setUserInfo } = useContext(InfoContext)
  const { message } = App.useApp()

  const forkAIAgent = useCallback(
    async (teamIdentifier: string, teamId: string) => {
      try {
        const res = await forkAIAgentToTeam(tipisID, teamId)
        if (res.data.aiAgentID) {
          toEditAgent(res.data.aiAgentID, teamIdentifier)
        }
      } catch (error) {}
    },
    [tipisID],
  )

  const pinOrUnPinTipi = useCallback(
    async (teamID: string) => {
      if (!userInfo) {
        return
      }
      try {
        let isPin = true
        let personalization = userInfo.personalization
        const currentTeamPinList =
          personalization?.pinedTipisTabs?.[teamID] || []

        const targetIndex = currentTeamPinList.findIndex(
          (item) => item.tipiID === tipisID,
        )
        if (targetIndex !== -1) {
          currentTeamPinList.splice(targetIndex, 1)
          isPin = false
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
        if (!!personalization) {
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
        } else {
          personalization = {
            pinedTipisTabs: {
              [teamID]: currentTeamPinList,
            },
          }
        }
        await putPersonalization(personalization)
        isPin && message.success(t("pin_suc"))
        setUserInfo({
          ...userInfo,
          personalization,
        })
      } catch (e) {
        message.error(t("pin_error"))
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

  return {
    forkAIAgent,
    pinOrUnPinTipi,
  }
}
