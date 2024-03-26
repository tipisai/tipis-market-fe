import { MarketAIAgent } from "@illa-public/public-types"
import { useRouter } from "next/router"
import { FC, useContext, useEffect, useState } from "react"
import { SubmitCard } from "@/components/common/SubmitCard"
import { InfoContext } from "@/context/infoContext"
import { fetchIsAgentOwner } from "@/services/Client/aiAgent"
import { ContributeCard } from "./ContributeCard"
import { Operational } from "./Operational"
import {
  agentDescriptionStyle,
  agentIconStyle,
  agentInfoStyle,
  agentNameStyle,
  infoWrapperStyle,
  submitCardStyle,
} from "./style"

interface InfoWrapperProps {
  detail: MarketAIAgent
  setAgentDetail: (detail: MarketAIAgent) => void
}

export const InfoWrapper: FC<InfoWrapperProps> = ({
  detail,
  setAgentDetail,
}) => {
  const router = useRouter()
  const [isOwn, setIsOwn] = useState(false)
  const { userInfo } = useContext(InfoContext)

  useEffect(() => {
    const handleIsOwner = async () => {
      if (userInfo && userInfo?.userID) {
        const res = await fetchIsAgentOwner(detail.aiAgent?.aiAgentID)
        setIsOwn(res?.data?.canEdit)
      }
    }
    handleIsOwner()
  }, [detail.aiAgent?.aiAgentID, userInfo])

  return (
    <div css={infoWrapperStyle}>
      <div css={agentInfoStyle}>
        <img css={agentIconStyle} src={detail.aiAgent?.icon} alt="icon" />
        <h1 css={agentNameStyle}>{detail.aiAgent?.name}</h1>
        <p css={agentDescriptionStyle}>{detail.aiAgent?.description}</p>
      </div>
      <Operational detail={detail} setAgentDetail={setAgentDetail} />
      <ContributeCard detail={detail} />
      {isOwn && (
        <div css={submitCardStyle}>
          <SubmitCard
            link="https://github.com/illacloud/illa-builder/tree/beta/hacktoberfest2023/awesome-ai-agents"
            itemName={detail?.aiAgent?.name}
            itemDesc={detail?.aiAgent?.description}
            itemLink={`${process.env.ILLA_MARKET_URL}${router.asPath}`}
          />
        </div>
      )}
    </div>
  )
}
