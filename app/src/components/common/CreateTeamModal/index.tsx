import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { App } from "antd"
import { useTranslation } from "next-i18next"
import { FC, useContext, useEffect, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import {
  CreateTeamErrorMsg,
  CreateTeamFields,
} from "@/components/common/CreateTeamModal/interface"
import CreateTeamMobileModal from "@/components/common/CreateTeamModal/mobile"
import CreateTeamPCModal from "@/components/common/CreateTeamModal/pc"
import { ModalActionType } from "@/interface/common"
import { createTeam } from "@/services/Client/team"

interface CreateTeamModalProps {
  visible: boolean
  actionType?: ModalActionType
  ID?: string
  onCancel?: () => void
  onCreateTeamSuccess?: (identifier: string, id: string) => void
}

const CreateTeamModal: FC<CreateTeamModalProps> = (props) => {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const {
    visible,
    actionType = "create",
    ID,
    onCancel,
    onCreateTeamSuccess,
  } = props

  const createFormProps = useForm<CreateTeamFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })
  const [loading, setLoading] = useState(false)
  const [createErrorMsg, _setCreateErrorMsg] = useState<CreateTeamErrorMsg>({})
  const { track } = useContext(MixpanelTrackContext)

  const onCloseCreateModal = () => {
    onCancel?.()
    createFormProps.reset({})
  }

  const onSubmitCreateTeam: SubmitHandler<CreateTeamFields> = async (data) => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "create_team_modal",
      parameter1: actionType,
      parameter5: ID,
    })
    setLoading(true)
    try {
      const res = await createTeam(data)
      message.success(t("team_create_suc"))
      onCloseCreateModal()
      onCreateTeamSuccess?.(data.identifier, res.data.id)
    } catch (error) {
      if (isILLAAPiError(error)) {
        switch (error?.data?.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_TEAM_IDENTIFIER_HAS_BEEN_TAKEN:
            message.error(t("page.user.sign_in.tips.fail_account"))
            break
          case ERROR_FLAG.ERROR_FLAG_PROMOTE_CODE_ALREADY_USED:
            message.error(t("team.create.fail_invite_code_used"))
            break
          case ERROR_FLAG.ERROR_FLAG_CAN_NOT_CREATE_TEAM:
            message.error(t("team.create.fail_same_identifier"))
            break
          default:
            message.error(t("team_create_fail"))
            break
        }
      } else {
        message.warning(t("network_error"))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (visible) {
      track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "create_team_modal",
        parameter1: actionType,
        parameter5: ID,
      })
    }
  }, [ID, actionType, track, visible])

  return (
    <FormProvider {...createFormProps}>
      <LayoutAutoChange
        desktopPage={
          <CreateTeamPCModal
            loading={loading}
            errorMsg={createErrorMsg}
            visible={visible}
            onCancel={onCloseCreateModal}
            onSubmit={onSubmitCreateTeam}
          />
        }
        mobilePage={
          <CreateTeamMobileModal
            loading={loading}
            errorMsg={createErrorMsg}
            visible={visible}
            onCancel={onCloseCreateModal}
            onSubmit={onSubmitCreateTeam}
          />
        }
      />
    </FormProvider>
  )
}

CreateTeamModal.displayName = "CreateTeamModal"

export default CreateTeamModal
