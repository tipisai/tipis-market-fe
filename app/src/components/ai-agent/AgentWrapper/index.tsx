import { CodeEditor } from "@illa-public/code-editor"
import { MarketAIAgent, getLLM } from "@illa-public/market-agent"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { FC } from "react"
import { BaseTag } from "@/components/common/TagList/components/baseTag"
import {
  agentWrapperStyle,
  modalOrderStyle,
  modelInfoStyle,
  modelNameStyle,
  promptOrderStyle,
  propertyLabelStyle,
  propertyWrapperStyle,
  tagContainerStyle,
  tagOrderStyle,
  variableOrderStyle,
} from "./style"

const RecordEditor = dynamic(
  () => import("@illa-public/record-editor").then((mod) => mod.RecordEditor),
  { ssr: false },
)

interface AgentWrapperProps {
  detail: MarketAIAgent
}

export const AgentWrapper: FC<AgentWrapperProps> = ({ detail }) => {
  const { t } = useTranslation()

  const model = getLLM(detail.aiAgent?.model)

  return (
    <div css={agentWrapperStyle}>
      <div css={[propertyWrapperStyle, promptOrderStyle]}>
        <div css={propertyLabelStyle}>{t("detail.label.prompt")}</div>
        <CodeEditor
          minWidth="100%"
          readOnly
          editable={false}
          value={detail.aiAgent?.prompt}
          completionOptions={detail.aiAgent?.variables}
        />
      </div>
      {detail?.marketplace?.hashtags?.length > 0 && (
        <div css={[propertyWrapperStyle, tagOrderStyle]}>
          <div css={propertyLabelStyle}>{t("detail.tag")}</div>
          <div css={tagContainerStyle}>
            {detail.marketplace?.hashtags.map((tag) => (
              <Link key={tag} href={`/?currentHashtag=${tag}`} target="__blank">
                <BaseTag name={tag} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div css={[propertyWrapperStyle, modalOrderStyle]}>
        <div css={propertyLabelStyle}>{t("detail.label.model")}</div>
        <div css={modelInfoStyle}>
          {model?.logo}
          <span css={modelNameStyle}>{model?.name}</span>
        </div>
      </div>
      {detail?.aiAgent?.variables && detail?.aiAgent?.variables?.length > 0 && (
        <div css={[propertyWrapperStyle, variableOrderStyle]}>
          <div css={propertyLabelStyle}>{t("detail.label.variable")}</div>
          <RecordEditor
            fillOnly
            readOnly
            records={detail?.aiAgent?.variables}
            label={""}
          />
        </div>
      )}
    </div>
  )
}
