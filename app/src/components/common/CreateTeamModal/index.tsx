import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { App } from "antd"
import { useTranslation } from "next-i18next"
import { FC, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import {
  CreateTeamErrorMsg,
  CreateTeamFields,
} from "@/components/common/CreateTeamModal/interface"
import CreateTeamMobileModal from "@/components/common/CreateTeamModal/mobile"
import CreateTeamPCModal from "@/components/common/CreateTeamModal/pc"
import { createTeam } from "@/services/Client/team"

interface CreateTeamModalProps {
  visible: boolean
  onCancel?: () => void
  onCreateTeamSuccess?: (identifier: string, id: string) => void
}

const CreateTeamModal: FC<CreateTeamModalProps> = (props) => {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const { visible, onCancel, onCreateTeamSuccess } = props

  const createFormProps = useForm<CreateTeamFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })
  const [loading, setLoading] = useState(false)
  const [createErrorMsg, _setCreateErrorMsg] = useState<CreateTeamErrorMsg>({})

  const onCloseCreateModal = () => {
    onCancel?.()
    createFormProps.reset({})
  }

  const onSubmitCreateTeam: SubmitHandler<CreateTeamFields> = async (data) => {
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
