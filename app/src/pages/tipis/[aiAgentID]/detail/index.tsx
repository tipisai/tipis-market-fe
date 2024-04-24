import { IMarketAIAgent } from "@illa-public/public-types"
import type { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { FC } from "react"
import { ActionGroup } from "@/components/ai-agent/ActionGroup"
import ContributeInfo from "@/components/ai-agent/ContributeInfo"
import DetailHeader from "@/components/ai-agent/DetailHeader"
import Knowledge from "@/components/ai-agent/Knowledge"
import Parameters from "@/components/ai-agent/Parameters"
import Prompt from "@/components/ai-agent/Prompt"
import { SocialMedia } from "@/components/common/SocialMedia"
import Layout from "@/layout/detailPage"
import { fetchAIAgentDetail } from "@/services/Server/agent"

interface AgentDetailServerSideProps {
  agentDetail: IMarketAIAgent
}

const AgentDetailPage: FC<AgentDetailServerSideProps> = (props) => {
  const { agentDetail } = props

  return (
    <Layout>
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
      <DetailHeader
        avatarURL={agentDetail?.aiAgent?.icon}
        title={agentDetail?.aiAgent?.name}
        description={agentDetail?.aiAgent?.description}
      />
      <ActionGroup
        runNumber={agentDetail?.marketplace?.numRuns}
        forkNumber={agentDetail?.marketplace?.numForks}
        tipisName={agentDetail.aiAgent.name}
        tipisID={agentDetail.aiAgent.aiAgentID}
        tipisIcon={agentDetail.aiAgent.icon}
        ownerTeamIdentity={
          agentDetail.marketplace.contributorTeam.teamIdentifier
        }
        isPublishConfiguration={
          agentDetail.marketplace.config.publishConfiguration
        }
      />

      <ContributeInfo
        teamName={agentDetail?.marketplace?.contributorTeam?.name}
        teamAvatar={agentDetail?.marketplace?.contributorTeam?.icon}
        contributors={agentDetail?.aiAgent?.editedBy}
      />

      {agentDetail.marketplace.config.publishConfiguration && (
        <>
          <Prompt
            parameters={agentDetail?.aiAgent?.variables ?? []}
            prompt={agentDetail?.aiAgent?.prompt}
          />
          {Array.isArray(agentDetail?.aiAgent?.variables) &&
            agentDetail?.aiAgent?.variables.length > 0 && (
              <Parameters parameters={agentDetail?.aiAgent?.variables} />
            )}
          {Array.isArray(agentDetail?.aiAgent?.knowledge) &&
            agentDetail?.aiAgent?.knowledge.length > 0 && (
              <Knowledge knowledge={agentDetail.aiAgent.knowledge} />
            )}
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<
  AgentDetailServerSideProps
> = async (context) => {
  const { locale, req, query } = context
  const { aiAgentID } = query
  let TIPIS_TOKEN = ""
  const token = req.cookies?.TIPIS_TOKEN
  if (token) {
    TIPIS_TOKEN = token
  }
  if (query.token && typeof query.token === "string") {
    TIPIS_TOKEN = query.token
  }
  const res = await fetchAIAgentDetail(TIPIS_TOKEN, aiAgentID as string)
  const translate = await serverSideTranslations(locale as string)
  return { props: { ...translate, agentDetail: res } }
}

export default AgentDetailPage
