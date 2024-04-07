import { MarketAgentCard } from "@illa-public/market-agent"
import Link from "next/link"
import { FC, useCallback } from "react"
import { AgentCardContainerProps } from "./interface"
import { cardContainerStyle } from "./style"

export const AgentCardContainer: FC<AgentCardContainerProps> = ({
  agentList = [],
}) => {
  const handleAgentCardClick = useCallback((_id: string) => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "card", parameter5: id })
  }, [])
  return (
    <div css={cardContainerStyle}>
      {agentList &&
        agentList.map((item) => (
          <Link
            key={item.aiAgent?.aiAgentID}
            href={`/ai-agent/${item.aiAgent?.aiAgentID}/detail`}
            replace
          >
            <MarketAgentCard
              marketAIAgent={item}
              onClick={() => handleAgentCardClick(item.aiAgent?.aiAgentID)}
            />
          </Link>
        ))}
    </div>
  )
}
