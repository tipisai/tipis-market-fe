import Icon from "@ant-design/icons"
import { CloseIcon, WarningCircleIcon } from "@illa-public/icon"
import { Button, ConfigProvider, Input, Modal } from "antd"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { createPortal } from "react-dom"
import { Controller, SubmitHandler, useFormContext } from "react-hook-form"
import {
  CreateTeamErrorMsg,
  CreateTeamFields,
} from "@/components/common/CreateTeamModal/interface"
import { DOMAIN_FORMAT } from "@/constants/regExp"
import { errorIconStyle, errorMsgStyle, formLabelStyle } from "./style"
import {
  descriptionStyle,
  formHeaderStyle,
  formStyle,
  gridFormFieldStyle,
  gridItemStyle,
  inviteCodeLabelStyle,
  modalCloseIconStyle,
  modalContentStyle,
  modalDecorateLeftStyle,
  modalDecorateRightStyle,
  requireStyle,
} from "./style"

interface CreateTeamModalProps {
  loading: boolean
  errorMsg: CreateTeamErrorMsg
  onSubmit: SubmitHandler<CreateTeamFields>
  onCancel: () => void
  visible: boolean
}

const CreateTeamPCModal: FC<CreateTeamModalProps> = (props) => {
  const { loading, errorMsg, onSubmit, onCancel, visible } = props
  const { t } = useTranslation()
  const { handleSubmit, control, formState } =
    useFormContext<CreateTeamFields>()

  if (typeof document === "undefined") return null
  return createPortal(
    <ConfigProvider
      theme={{
        components: {
          Modal: {},
        },
      }}
    >
      <Modal
        styles={{
          content: modalContentStyle,
        }}
        maskClosable={false}
        footer={false}
        closeIcon={false}
        onCancel={onCancel}
        open={visible}
        centered
      >
        <div css={modalCloseIconStyle} onClick={onCancel}>
          <Icon component={CloseIcon} width="12px" height="12px" />
        </div>
        <div css={modalDecorateLeftStyle} />
        <div css={modalDecorateRightStyle} />
        <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
          <header css={formHeaderStyle}>
            {t("homepage.team_modal.title")}
          </header>
          <section css={gridFormFieldStyle}>
            <section css={gridItemStyle}>
              <label css={[formLabelStyle, requireStyle]}>
                {t("homepage.team_modal.team_name")}
              </label>
              <div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      status={!!formState?.errors.name ? "error" : undefined}
                      variant="filled"
                    />
                  )}
                  rules={{
                    required: t("homepage.team_modal.team_name_empty") || "",
                  }}
                />
                {(formState?.errors.name || errorMsg.name) && (
                  <div css={errorMsgStyle}>
                    <Icon component={WarningCircleIcon} css={errorIconStyle} />
                    {formState?.errors.name?.message || errorMsg.name}
                  </div>
                )}
              </div>
            </section>
            <section css={gridItemStyle}>
              <div css={inviteCodeLabelStyle}>
                <label css={[formLabelStyle, requireStyle]}>
                  {t("homepage.team_modal.team_domain")}
                </label>
                <label css={descriptionStyle}>
                  {t("homepage.team_modal.tip.team_identifier")}
                </label>
              </div>
              <div>
                <Controller
                  name="identifier"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      status={
                        !!formState?.errors.identifier || !!errorMsg.identifier
                          ? "error"
                          : undefined
                      }
                      variant="filled"
                    />
                  )}
                  rules={{
                    required: t("homepage.team_modal.team_domain_empty") || "",
                    pattern: {
                      value: DOMAIN_FORMAT,
                      message: t(
                        "homepage.team_modal.team_domain_invalid_character",
                      ),
                    },
                    maxLength: {
                      value: 200,
                      message: t(
                        "homepage.team_modal.team_domain_invalid_length",
                      ),
                    },
                  }}
                />
                {(formState?.errors.identifier || errorMsg.identifier) && (
                  <div css={errorMsgStyle}>
                    <Icon component={WarningCircleIcon} css={errorIconStyle} />
                    {formState?.errors.identifier?.message ||
                      errorMsg.identifier}
                  </div>
                )}
              </div>
            </section>
            <Button
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
              block
            >
              {t("homepage.team_modal.create")}
            </Button>
          </section>
        </form>
      </Modal>
    </ConfigProvider>,
    document.body,
  )
}

CreateTeamPCModal.displayName = "CreateTeamPCModal"

export default CreateTeamPCModal
