import createEmotionServer from "@emotion/server/create-instance"
import { AppType } from "next/app"
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import createEmotionCache from "../shared/renderer"
import { MyAppProps } from "./_app"

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default function AppDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html>
      <Head>
        <link href="/favicon.ico" rel="icon" type="image/svg+xml" />
        <link href="/fonts/font.css" rel="stylesheet" />
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="@illaCloudHQ" />
        <meta
          key="twitter:image"
          name="twitter:image"
          content="https://cdn.illacloud.com/illa.ai/Site%20cover%20ai.png"
        />
        <meta
          key="og:image"
          property="og:image"
          content="https://cdn.illacloud.com/illa.ai/Site%20cover%20ai.png"
        />
        <meta
          name="google-site-verification"
          content="-cJKBQ7OQc_sl4xC_69ng8Oq1SMf4MXpiRZybJPqtqw"
        />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

AppDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
