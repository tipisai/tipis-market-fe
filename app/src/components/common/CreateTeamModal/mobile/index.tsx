import Icon from "@ant-design/icons"
import { getColor } from "@illa-public/color-scheme"
import { CloseIcon } from "@illa-public/icon"
import { Button, Input, Modal } from "antd"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { createPortal } from "react-dom"
import { Controller, SubmitHandler, useFormContext } from "react-hook-form"
import {
  CreateTeamErrorMsg,
  CreateTeamFields,
} from "@/components/common/CreateTeamModal/interface"
import { DOMAIN_FORMAT } from "@/constants/regExp"
import {
  descriptionStyle,
  errorMsgStyle,
  formStyle,
  inviteCodeLabelStyle,
  modalCloseIconStyle,
  modalTitleStyle,
} from "./style"

interface CreateTeamMobileModalProps {
  loading: boolean
  errorMsg: CreateTeamErrorMsg
  onSubmit: SubmitHandler<CreateTeamFields>
  onCancel: () => void
  visible: boolean
}

const CreateTeamMobileModal: FC<CreateTeamMobileModalProps> = (props) => {
  const { loading, errorMsg, onSubmit, onCancel, visible } = props
  const { t } = useTranslation()
  const { handleSubmit, control, formState } =
    useFormContext<CreateTeamFields>()

  if (typeof document === "undefined") return null
  return createPortal(
    <Modal
      footer={false}
      open={visible}
      width="100%"
      maskClosable={false}
      onCancel={onCancel}
      closeIcon={false}
      centered
      style={{
        maxWidth: 400,
      }}
      styles={{
        content: {
          boxShadow: "0 4px 16px rgb(0 0 0 / 8%)",
          border: `1px solid ${getColor("grayBlue", "08")}`,
          overflow: "hidden",
          borderRadius: 8,
        },
        mask: {
          backgroundColor: getColor("white", "05"),
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <div css={modalCloseIconStyle} onClick={onCancel}>
        <Icon component={CloseIcon} />
      </div>
      <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <header css={modalTitleStyle}>{t("homepage.team_modal.title")}</header>
        <section>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                status={!!formState?.errors.name ? "error" : undefined}
                variant="filled"
                placeholder={t("homepage.team_modal.team_name") || ""}
              />
            )}
            rules={{
              required: t("homepage.team_modal.team_name_empty") || "",
            }}
          />
          {(formState?.errors.name || errorMsg.name) && (
            <div css={errorMsgStyle}>
              {formState?.errors.name?.message || errorMsg.name}
            </div>
          )}
        </section>
        <section>
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
                placeholder={t("homepage.team_modal.team_domain") || ""}
              />
            )}
            rules={{
              required: t("homepage.team_modal.team_domain_empty") || "",
              pattern: {
                value: DOMAIN_FORMAT,
                message: t("homepage.team_modal.team_domain_invalid_character"),
              },
              maxLength: {
                value: 200,
                message: t("homepage.team_modal.team_domain_invalid_length"),
              },
            }}
          />
          <div css={inviteCodeLabelStyle}>
            <span css={descriptionStyle}>
              {t("homepage.team_modal.tip.team_identifier")}
            </span>
          </div>
          {(formState?.errors.identifier || errorMsg.identifier) && (
            <div css={errorMsgStyle}>
              {formState?.errors.identifier?.message || errorMsg.identifier}
            </div>
          )}
        </section>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          block
        >
          {t("homepage.team_modal.create")}
        </Button>
      </form>
    </Modal>,
    document.body,
  )
}

CreateTeamMobileModal.displayName = "CreateTeamMobileModal"

export default CreateTeamMobileModal
