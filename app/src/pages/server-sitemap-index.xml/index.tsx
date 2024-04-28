import { GetServerSideProps } from "next"
import { getServerSideSitemapIndexLegacy } from "next-sitemap"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return getServerSideSitemapIndexLegacy(ctx, [
    `${process.env.ILLA_MARKET_URL}/tipis-sitemap.xml`,
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
