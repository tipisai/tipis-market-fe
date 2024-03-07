/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.ILLA_MARKET_URL || 'https://illa.ai',
  generateRobotsTxt: true, // (optional)
  exclude: ['/server-sitemap-index.xml', "/app-sitemap.xml", "/agent-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.ILLA_MARKET_URL}/server-sitemap-index.xml`,
    ],
  },
}