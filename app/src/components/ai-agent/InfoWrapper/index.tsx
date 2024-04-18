import { MarketAIAgent } from "@illa-public/public-types"
import { FC } from "react"
import { Actions } from "./Actions"
import { ContributeCard } from "./ContributeCard"
import {
  agentDescriptionStyle,
  agentIconStyle,
  agentInfoStyle,
  agentNameStyle,
  infoWrapperStyle,
} from "./style"

interface InfoWrapperProps {
  detail: MarketAIAgent
  setAgentDetail: (detail: MarketAIAgent) => void
}

export const InfoWrapper: FC<InfoWrapperProps> = ({ detail }) => {
  return (
    <div css={infoWrapperStyle}>
      <div css={agentInfoStyle}>
        <img css={agentIconStyle} src={detail.aiAgent?.icon} alt="icon" />
        <h1 css={agentNameStyle}>{detail.aiAgent?.name}</h1>
        <p css={agentDescriptionStyle}>{detail.aiAgent?.description}</p>
      </div>
      <Actions detail={detail} />
      <ContributeCard detail={detail} />
    </div>
  )
}
