import { CacheProvider, EmotionCache, Global } from "@emotion/react"
import {
  ILLAMixpanel,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
} from "@illa-public/mixpanel-utils"
import { CurrentUserInfo } from "@illa-public/public-types"
import {
  initDateReport,
  isServerRender,
  sendConfigEvent,
} from "@illa-public/utils"
import { App as AntdApp } from "antd"
import { ConfigProvider } from "antd"
import { appWithTranslation } from "next-i18next"
import { AppContext } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import "@/api/http/base"
import defaultThemeToken from "@/assets/theme/default.json"
import { MOBILE_USER_AGENT } from "@/constants/regExp"
import { InfoProvider } from "@/context/infoContext"
import { fetchUserInfoByToken } from "@/services/Server/users"
import { globalStyles } from "@/style"
import { AppPropsWithLayout } from "@/types/nextjs"
import { track } from "@/utils/mixpanelHelper"
import Loading from "../components/PageLoading"
import createEmotionCache from "../shared/renderer"

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache
  language?: string
  token?: string
  userInfo?: CurrentUserInfo | undefined
  isMobile?: boolean
}

function MyApp({
  Component,
  pageProps,
  userInfo,
  isMobile = false,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  // Use the layout defined at the page level, if available
  const router = useRouter()
  useEffect(() => {
    initDateReport()
  }, [])

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  if (!isServerRender) {
    ILLAMixpanel.setDeviceID()
  }

  useEffect(() => {
    if (userInfo) {
      ILLAMixpanel.setUserID(userInfo.userID)
      const reportedUserInfo: Record<string, any> = {}
      Object.entries(userInfo).forEach(([key, value]) => {
        reportedUserInfo[`illa_${key}`] = value
      })
      ILLAMixpanel.setUserProperties(reportedUserInfo)
    } else {
      ILLAMixpanel.reset()
    }
  }, [userInfo])

  useEffect(() => {
    if (userInfo?.userID) {
      sendConfigEvent(userInfo?.userID)
    }
  }, [userInfo?.userID])

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.ILLA_ACTIVE,
      ILLA_MIXPANEL_PUBLIC_PAGE_NAME.PLACEHOLDER,
    )
  }, [])

  useEffect(() => {
    const handleRouteChangeStart = (
      _: string,
      options?: { shallow?: boolean },
    ) => {
      if (options && options.shallow) return
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = (
      _: string,
      options?: { shallow?: boolean },
    ) => {
      if (options && options.shallow) return
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeEnd)
    router.events.on("routeChangeError", handleRouteChangeEnd)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeEnd)
      router.events.off("routeChangeError", handleRouteChangeEnd)
    }
  }, [router.events])
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=0"
        />
        <link
          rel="canonical"
          href={`${process.env.ILLA_MARKET_URL}${
            router.locale === "en-US" ? "" : `/${router.locale}`
          }${router.asPath === "/" ? "" : router.asPath}`}
        />
      </Head>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <ConfigProvider theme={defaultThemeToken}>
        <CacheProvider value={emotionCache}>
          <Global styles={globalStyles} />
          <InfoProvider userInfo={userInfo} isMobile={isMobile}>
            <AntdApp component={false}>
              {getLayout(<Component {...pageProps} />)}
            </AntdApp>
          </InfoProvider>
        </CacheProvider>
      </ConfigProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookie = appContext.ctx.req?.headers?.["cookie"]
  const userAgent = appContext.ctx.req?.headers?.["user-agent"] || ""
  const token = appContext?.router?.query?.token

  let ILLA_LANG = "en-US"
  let ILLA_TOKEN = ""
  if (cookie) {
    const language = cookie
      .split(";")
      .find((c) => c.trim().startsWith("ILLA_LANG"))
    if (language) {
      ILLA_LANG = language.split("=")[1]
    }
    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("ILLA_TOKEN"))
    if (token) {
      ILLA_TOKEN = token.split("=")[1]
    }
  }
  if (token && typeof token === "string") {
    ILLA_TOKEN = token
  }

  let userInfo: CurrentUserInfo | undefined
  try {
    userInfo = await fetchUserInfoByToken(ILLA_TOKEN as string)
  } catch (e) {
    userInfo = undefined
  }

  return {
    language: ILLA_LANG,
    userInfo,
    isMobile: MOBILE_USER_AGENT.test(userAgent),
  }
}

export default appWithTranslation(MyApp)
