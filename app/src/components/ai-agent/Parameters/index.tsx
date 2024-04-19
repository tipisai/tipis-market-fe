import { RecordEditor } from "@illa-public/record-editor"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { IParameterProps } from "./interface"
import { ParametersContainerStyle, labelStyle } from "./style"

const Parameters: FC<IParameterProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div css={ParametersContainerStyle}>
      <p css={labelStyle}>{t("detail.label.variable")}</p>
      <RecordEditor records={props.parameters} label="" readOnly />
    </div>
  )
}

Parameters.displayName = "Parameters"
export default Parameters
