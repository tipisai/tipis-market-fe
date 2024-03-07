import Head from "next/head"
import { useRouter } from "next/router"
import { FC } from "react"

interface SocialMediaProps {
  title: string
  description: string
}

export const SocialMedia: FC<SocialMediaProps> = ({ title, description }) => {
  const router = useRouter()
  return (
    <Head>
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta
        key="og:url"
        property="og:url"
        content={`https://illa.ai${router.pathname}`}
      />
    </Head>
  )
}
