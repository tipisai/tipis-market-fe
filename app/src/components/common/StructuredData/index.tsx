import Head from "next/head"
import { FC } from "react"

interface StructuredDataProps {
  data: any
}

const StructuredData: FC<StructuredDataProps> = ({ data }) => (
  <Head>
    <script
      key="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  </Head>
)

export default StructuredData
