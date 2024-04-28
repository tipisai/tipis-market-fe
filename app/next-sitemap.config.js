/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.ILLA_MARKET_URL || "https://marketplace.tipis.ai",
  generateRobotsTxt: true, // (optional)
  exclude: ["/server-sitemap-index.xml", "/tipis-sitemap.xml.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.ILLA_MARKET_URL}/server-sitemap-index.xml`,
    ],
  },
}
