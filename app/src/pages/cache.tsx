import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { GetServerSideProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { FC, useMemo } from "react"
import { FeatureLabelCard } from "@/components/ai-agent/FeatureLabel"
import HomeStructuredData from "@/components/ai-agent/HomeStructuredData"
import { SocialMedia } from "@/components/common/SocialMedia"
import { AgentCardContainer } from "@/components/entrance/AgentCardContainer"
import { Banner } from "@/components/entrance/Banner"
import { ListEmpty } from "@/components/entrance/Empty"
import { ListLoading } from "@/components/entrance/ListLoading"
import { MoreLoading } from "@/components/entrance/MoreLoading"
import { SortComponent } from "@/components/entrance/SortComponent"
import { INITIAL_PAGE, PAGESIZE } from "@/constants/page"
import { useGetList } from "@/hooks/useGetList"
import { PRODUCT_SORT_BY } from "@/interface/common"
import { AgentPageProps } from "@/interface/pageIndex"
import Layout from "@/layout/entrancePage"
import { fetchAIAgentList } from "@/services/Server/agent"

export const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 0 20px 48px 20px;
  overflow-x: hidden;
  overflow-y: auto;
  ${applyMobileStyle(css`
    gap: 20px;
    padding: 0 20px 40px 20px;
  `)}
`

const AgentPage: FC<AgentPageProps> = (props) => {
  const { agent } = props
  const { t } = useTranslation()

  const getListProps = useGetList(agent)

  const noData = getListProps?.agentList.length === 0
  const bannerContent = useMemo(
    () => ({
      titleBefore: "title.ai-agent.title-1",
      titleAfter: "title.ai-agent.title-2",
      description: "description.ai-agent",
      feature: "title.ai-agent.feature",
    }),
    [],
  )

  return (
    <Layout
      handleSearchChange={getListProps?.handleSearchChange}
      onSearch={getListProps?.onSearch}
      search={getListProps?.search}
    >
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
      <div css={contentStyle} onScroll={getListProps?.handleCardScroll}>
        <Banner
          {...bannerContent}
          search={getListProps?.search}
          handleSearchChange={getListProps?.handleSearchChange}
          onSearch={getListProps?.onSearch}
        />
        <SortComponent
          sort={getListProps?.sort}
          sortOptions={getListProps?.sortOptions}
          handleSortChange={getListProps?.handleSortChange}
          activeTag={getListProps?.activeTag}
          tagList={getListProps?.tagList}
          handleCloseTag={getListProps?.handleCloseTag}
          handleTagChange={getListProps?.handleTagChange}
        />
        {getListProps?.reLoading ? (
          <ListLoading />
        ) : noData ? (
          <ListEmpty
            tagList={getListProps?.cacheTagList}
            showRecommendTag={getListProps?.showRecommendTag}
            handleClickEmptyTag={getListProps?.handleClickEmptyTag}
          />
        ) : (
          <>
            <AgentCardContainer agentList={getListProps?.agentList} />
            {getListProps?.hasMoreData && getListProps?.loading && (
              <MoreLoading />
            )}
          </>
        )}
        {!getListProps?.hasMoreData && !getListProps?.loading && (
          <FeatureLabelCard />
        )}
      </div>
    </Layout>
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
  })
  return { props: { ...translate, agent: response } }
}

export default AgentPage
