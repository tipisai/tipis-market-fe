import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { FC, useEffect, useRef } from "react"
import HomeStructuredData from "@/components/ai-agent/HomeStructuredData"
import { SocialMedia } from "@/components/common/SocialMedia"
import Entrance from "@/components/entrance"
import { INITIAL_PAGE, PAGESIZE } from "@/constants/page"
import { DashboardUIStateProvider } from "@/context/getListContext/listContext"
import { PRODUCT_SORT_BY } from "@/interface/common"
import { AgentPageProps } from "@/interface/pageIndex"
import Layout from "@/layout/entrancePage"
import { fetchAIAgentList } from "@/services/Server/agent"

const AgentPage: FC<AgentPageProps> = (props) => {
  const { listData } = props
  const { t } = useTranslation()
  const isServerInitPage = useRef(true)

  useEffect(() => {
    isServerInitPage.current = false
    return () => {
      isServerInitPage.current = true
    }
  }, [])

  return (
    <DashboardUIStateProvider>
      <Layout>
        <Head>
          <title>{t("meta.meta-title.ai-agent")}</title>
          <meta
            name="description"
            content={t("meta.meta-description.ai-agent") || ""}
          />
          <meta name="keywords" content={t("keywords_agent") || ""} />
        </Head>
        <HomeStructuredData />
        <SocialMedia
          title={t("meta.meta-title.ai-agent")}
          description={t("meta.meta-description.ai-agent")}
        />
        <Entrance listData={listData} />
      </Layout>
    </DashboardUIStateProvider>
  )
}

export const getServerSideProps: GetServerSideProps<AgentPageProps> = async (
  context,
) => {
  const { locale, query } = context
  const translate = await serverSideTranslations(locale as string)
  const response = await fetchAIAgentList({
    page: INITIAL_PAGE,
    limit: PAGESIZE,
    sortedBy: PRODUCT_SORT_BY.POPULAR,
    hashtags: query.currentHashtag as string,
    isOfficial: false,
  })
  return { props: { ...translate, listData: response } }
}

export default AgentPage
