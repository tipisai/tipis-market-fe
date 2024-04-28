import { IMarketAgentListData } from "@illa-public/public-types"
import { GetServerSideProps } from "next"
import { ISitemapField, getServerSideSitemapLegacy } from "next-sitemap"
import { PRODUCT_SORT_BY } from "../../interface/common"
import { fetchAIAgentList } from "../../services/Server/agent"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let agentSiteMap: ISitemapField[] = []

  try {
    const agentListResponse = await fetchAIAgentList({
      page: 1,
      limit: 50,
      sortedBy: PRODUCT_SORT_BY.POPULAR,
      isOfficial: false,
    })
    agentSiteMap = (agentListResponse as IMarketAgentListData).products.map(
      (agent) => {
        return {
          loc: `${process.env.ILLA_MARKET_URL}/tipis/${agent.aiAgent?.aiAgentID}/detail`,
          lastmod: new Date().toISOString(),
        }
      },
    )
  } catch (e) {}

  return getServerSideSitemapLegacy(ctx, agentSiteMap)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
