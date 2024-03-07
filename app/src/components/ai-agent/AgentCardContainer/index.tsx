import { MarketAgentCard } from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import Link from "next/link"
import { FC, useCallback, useContext } from "react"
import { GTagCategory, GTagEvent } from "@/interface/common"
import { sendTagEvent } from "@/utils/gtag"
import { AgentCardContainerProps } from "./interface"
import { cardContainerStyle } from "./style"

export const AgentCardContainer: FC<AgentCardContainerProps> = ({
  agentList = [],
}) => {
  const { track } = useContext(MixpanelTrackContext)

  const handleAgentCardClick = useCallback(
    (id: string) => {
      track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "card", parameter5: id })
      sendTagEvent({
        action: GTagEvent.CLICK,
        category: GTagCategory.AGENT_CARD_CLICK,
        label: id,
      })
    },
    [track],
  )
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
