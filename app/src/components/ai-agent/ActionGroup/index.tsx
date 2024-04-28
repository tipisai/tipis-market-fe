import Icon from "@ant-design/icons"
import { ShareIcon } from "@illa-public/icon"
import "@illa-public/market-share"
import { MarketShareModal } from "@illa-public/market-share"
import { TeamInfo } from "@illa-public/public-types"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import { FC, useCallback, useState } from "react"
import CreateTeamModal from "@/components/common/CreateTeamModal"
import { OPERATE_TYPE } from "@/constants/page"
import { toRunAgent } from "@/utils/navigate"
import { AgentTeamSelectModal } from "../TeamSelectModal"
import ForkAction from "./components/ForkAction"
import PinAction from "./components/PinAction"
import RunAction from "./components/RunAction"
import { useActionMethods } from "./components/hooks"
import { agentActionsStyle, otherActionsStyle } from "./style"

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
  const { t } = useTranslation()

  const [shareVisible, setShareVisible] = useState(false)
  const [createTeamVisible, setCreateTeamVisible] = useState(false)
  const [teamSelectVisible, setTeamSelectVisible] = useState(false)
  const [teamItems, setTeamItems] = useState<TeamInfo[]>([])
  const [actionType, setActionType] = useState<OPERATE_TYPE>()

  const { forkAIAgent, pinOrUnPinTipi } = useActionMethods(
    tipisID,
    tipisName,
    tipisIcon,
    ownerTeamIdentity,
  )

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

  return (
    <>
      <div css={agentActionsStyle}>
        <RunAction
          runNum={runNumber}
          tipisID={tipisID}
          ownerTeamIdentity={ownerTeamIdentity}
          setTeamItems={setTeamItems}
          setActionType={setActionType}
          setCreateTeamVisible={setCreateTeamVisible}
          setTeamSelectVisible={setTeamSelectVisible}
        />
        <div css={otherActionsStyle}>
          {isPublishConfiguration && (
            <ForkAction
              forkNum={forkNumber}
              forkAIAgent={forkAIAgent}
              setTeamItems={setTeamItems}
              setActionType={setActionType}
              setCreateTeamVisible={setCreateTeamVisible}
              setTeamSelectVisible={setTeamSelectVisible}
            />
          )}
          <PinAction
            tipisID={tipisID}
            pinOrUnPinTipi={pinOrUnPinTipi}
            setActionType={setActionType}
            setCreateTeamVisible={setCreateTeamVisible}
          />
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
      {createTeamVisible && (
        <CreateTeamModal
          visible={createTeamVisible}
          onCancel={() => setCreateTeamVisible(false)}
          onCreateTeamSuccess={onCreateOrSelectCallback}
        />
      )}

      {teamSelectVisible && (
        <AgentTeamSelectModal
          visible={teamSelectVisible}
          teamItems={teamItems}
          actionType={actionType}
          onCancel={() => setTeamSelectVisible(false)}
          onSelectCallback={onCreateOrSelectCallback}
        />
      )}
      {shareVisible && (
        <MarketShareModal
          title={`${t("user_management.modal.social_media.default_text.agent", {
            tipisName: tipisName,
          })}`}
          visible={shareVisible}
          onClose={() => setShareVisible(false)}
          ID={tipisID}
          name={tipisName}
        />
      )}
    </>
  )
}
