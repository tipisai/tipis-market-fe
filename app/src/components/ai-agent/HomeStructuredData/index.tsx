import { FC } from "react"
import StructuredData from "@/components/common/StructuredData"

const HomeStructuredData: FC = () => {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: "ILLA Cloud",
            url: "https://www.illacloud.com/#organization",
            logo: "https://www.illacloud.com/#logo",
            sameAs: [
              "https://twitter.com/illacloudhq",
              "https://github.com/illacloud/illa-builder",
              "https://www.illacloud.com/",
              "https://www.youtube.com/@illacloud",
              "https://www.linkedin.com/company/illacloud/",
            ],
          },
          {
            "@type": "WebSite",
            name: "Open source AI Agent community｜ILLA Cloud",
            url: "https://illa.ai",
          },
        ],
      }}
    />
  )
}

HomeStructuredData.displayName = "HomeStructuredData"
export default HomeStructuredData
