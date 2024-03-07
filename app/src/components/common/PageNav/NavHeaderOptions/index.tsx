import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { CurrentUserInfo } from "@illa-public/public-types"
import { ConfigProvider } from "antd"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useContext, useEffect } from "react"
import AvatarSetting from "@/components/common/AvatarSetting"
import { cloudUrl } from "@/constants/path"
import { InfoContext } from "@/context/infoContext"
import { useUtmParams } from "@/hooks/useUtmParams"
import { GTagCategory, GTagEvent } from "@/interface/common"
import { sendTagEvent } from "@/utils/gtag"
import { linkStyle } from "./style"

interface NavHeaderOptionsProps {
  userInfo: CurrentUserInfo | undefined
}

export const NavHeaderOptions: FC<NavHeaderOptionsProps> = ({ userInfo }) => {
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)
  const { isMobile } = useContext(InfoContext)
  const router = useRouter()
  const loginURL = useUtmParams(
    `${cloudUrl}?redirectURL=${encodeURIComponent(
      process.env.ILLA_MARKET_URL + router.asPath,
    )}`,
  )

  const registerURL = useUtmParams(
    `${cloudUrl}/register?redirectURL=${encodeURIComponent(
      process.env.ILLA_MARKET_URL + router.asPath,
    )}`,
  )
  const handleLogin = () => {
    sendTagEvent({
      action: GTagEvent.CLICK,
      category: GTagCategory.LOGIN_CLICK,
    })
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "login" })
  }

  const handleRegister = () => {
    sendTagEvent({
      action: GTagEvent.CLICK,
      category: GTagCategory.SIGN_IN_CLICK,
    })
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "sign_up" })
  }

  useEffect(() => {
    if (userInfo && userInfo.userID) {
      sendTagEvent({
        action: GTagEvent.CLICK,
        category: GTagCategory.LOGIN_SIGN_SHOW,
      })
    }
  }, [userInfo])

  return (
    <>
      {userInfo && userInfo.userID ? (
        <AvatarSetting />
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentFontSizeLG: 14,
              },
            },
          }}
        >
          <Link href={loginURL} onClick={handleLogin} css={linkStyle}>
            <Button
              size={isMobile ? "middle" : "large"}
              type={isMobile ? "primary" : "default"}
            >
              {t("login")}
            </Button>
          </Link>
          {!isMobile && (
            <Link href={registerURL} css={linkStyle} onClick={handleRegister}>
              <Button size="large" type="primary">
                {t("sign-up")}
              </Button>
            </Link>
          )}
        </ConfigProvider>
      )}
    </>
  )
}
