import Icon from "@ant-design/icons"
import { PenIcon, PinIcon } from "@illa-public/icon"
import { TeamInfo } from "@illa-public/public-types"
import { Button, Modal } from "antd"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { createPortal } from "react-dom"
import { IPinItem } from "@/services/Client/users"
import { contentStyle, titleStyle } from "./style"

interface TeamSelectModalProps {
  agentID: string
  teamItems: TeamInfo[]
  pinedTipisTabs?: Record<string, IPinItem[]> | undefined
  onCancel?: () => void
  visible: boolean
  onPinCallback: (teamID: string) => void
}
export const PinModal: FC<TeamSelectModalProps> = (props) => {
  const { t } = useTranslation()
  const {
    visible,
    teamItems,
    pinedTipisTabs,
    agentID,
    onCancel,
    onPinCallback,
  } = props

  if (typeof document === "undefined") return null
  return createPortal(
    <Modal
      maskClosable={false}
      footer={false}
      open={visible}
      centered
      onCancel={onCancel}
    >
      <div css={contentStyle}>
        <span css={titleStyle}>{t("_pin")}</span>
      </div>
      {teamItems.map(({ id, name }) => {
        const isPin =
          Array.isArray(pinedTipisTabs?.[id]) &&
          pinedTipisTabs[id].find((item) => item.tipiID === agentID)
        return (
          <div key={id}>
            <span>{name}</span>
            <Button
              onClick={() => onPinCallback(id)}
              icon={<Icon component={isPin ? PenIcon : PinIcon} />}
            />
          </div>
        )
      })}
    </Modal>,
    document.body,
  )
}

PinModal.displayName = "PinModal"
