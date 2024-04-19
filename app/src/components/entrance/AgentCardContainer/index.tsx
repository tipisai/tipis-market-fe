import Link from "next/link"
import { FC } from "react"
import { MarketAgentCard } from "../MarketCard"
import { AgentCardContainerProps } from "./interface"
import { cardContainerStyle } from "./style"

export const AgentCardContainer: FC<AgentCardContainerProps> = ({
  agentList = [],
}) => {
  return (
    <div css={cardContainerStyle}>
      {agentList &&
        agentList.map((item) => (
          <Link
            key={item.aiAgent?.aiAgentID}
            href={`/tipis/${item.aiAgent?.aiAgentID}/detail`}
            replace
          >
            <MarketAgentCard marketAIAgent={item} />
          </Link>
        ))}
    </div>
  )
}
