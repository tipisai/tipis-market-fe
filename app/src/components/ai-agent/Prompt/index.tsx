import { CodeEditor } from "@illa-public/code-editor"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { IPromptProps } from "./interface"
import { knowledgeContainerStyle, labelStyle } from "./style"

const Prompt: FC<IPromptProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div css={knowledgeContainerStyle}>
      <p css={labelStyle}>{t("detail.label.prompt")}</p>
      <CodeEditor
        minWidth="100%"
        readOnly
        editable={false}
        value={props.prompt}
        completionOptions={props.parameters}
      />
    </div>
  )
}

Prompt.displayName = "Prompt"
export default Prompt
