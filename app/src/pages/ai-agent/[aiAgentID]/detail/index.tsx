import { css } from "@emotion/react"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_MARKET_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { MarketAIAgent } from "@illa-public/public-types"
import { applyMobileStyle } from "@illa-public/utils"
import type { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { FC, useEffect, useState } from "react"
import { AgentWrapper } from "@/components/ai-agent/AgentWrapper"
import { InfoWrapper } from "@/components/ai-agent/InfoWrapper"
import { SocialMedia } from "@/components/common/SocialMedia"
import Layout from "@/layout/detailPage"
import { fetchAIAgentDetail } from "@/services/Server/agent"
import {
  track,
  trackPageDurationEnd,
  trackPageDurationStart,
} from "@/utils/mixpanelHelper"

const wrapperStyle = css`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  ${applyMobileStyle(css`
    width: 100%;
    padding: 0 20px;
  `)}
`
const agentDetailStyle = css`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px 124px 20px;
  justify-content: center;

  ${applyMobileStyle(css`
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 16px 0 124px 0;
  `)}
`

interface AgentDetailServerSideProps {
  detail: MarketAIAgent
}

const AgentDetailPage: FC<AgentDetailServerSideProps> = (props) => {
  const { detail } = props
  const [agentDetail, setAgentDetail] = useState<MarketAIAgent>(detail)

  useEffect(() => {
    trackPageDurationStart()
    return () => {
      trackPageDurationEnd(
        ILLA_MIXPANEL_MARKET_PAGE_NAME.COMMUNITY_AGENT_DETAIL,
      )
    }
  }, [])

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.VISIT,
      ILLA_MIXPANEL_MARKET_PAGE_NAME.COMMUNITY_AGENT_DETAIL,
    )
  }, [])

  return (
    <MixpanelTrackProvider
      pageName={ILLA_MIXPANEL_MARKET_PAGE_NAME.COMMUNITY_AGENT_DETAIL}
      basicTrack={track}
    >
      <Layout>
        <div css={wrapperStyle}>
          <Head>
            <title>{agentDetail.aiAgent?.name.slice(0, 60)}</title>
            <meta
              name="description"
              content={agentDetail.aiAgent?.description.slice(0, 160)}
            />
          </Head>
          <SocialMedia
            title={agentDetail.aiAgent?.name}
            description={agentDetail.aiAgent?.description}
          />
          <div css={agentDetailStyle}>
            <InfoWrapper detail={agentDetail} setAgentDetail={setAgentDetail} />
            <AgentWrapper detail={agentDetail} />
          </div>
        </div>
      </Layout>
    </MixpanelTrackProvider>
  )
}

export const getServerSideProps: GetServerSideProps<
  AgentDetailServerSideProps
> = async (context) => {
  const { locale, req, query } = context
  const { aiAgentID } = query
  let ILLA_TOKEN = ""
  const token = req.cookies?.ILLA_TOKEN
  if (token) {
    ILLA_TOKEN = token
  }
  if (query.token && typeof query.token === "string") {
    ILLA_TOKEN = query.token
  }
  const res = await fetchAIAgentDetail(ILLA_TOKEN, aiAgentID as string)
  const translate = await serverSideTranslations(locale as string, "index")
  return { props: { ...translate, detail: res } }
}

export default AgentDetailPage
