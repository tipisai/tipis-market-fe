import { CurrentUserInfo } from "@illa-public/public-types"
import { Button } from "antd"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useContext } from "react"
import AvatarSetting from "@/components/common/AvatarSetting"
import { InfoContext } from "@/context/infoContext"
import { useUtmParams } from "@/hooks/useUtmParams"
import { linkStyle } from "./style"

interface NavHeaderOptionsProps {
  userInfo: CurrentUserInfo | undefined
}

export const NavHeaderOptions: FC<NavHeaderOptionsProps> = ({ userInfo }) => {
  const { t } = useTranslation()
  const { isMobile } = useContext(InfoContext)
  const router = useRouter()
  const loginURL = useUtmParams(
    `${process.env.ILLA_CLOUD_URL}?redirectURL=${encodeURIComponent(
      process.env.ILLA_MARKET_URL + router.asPath,
    )}`,
  )

  const registerURL = useUtmParams(
    `${
      process.env.ILLA_CLOUD_URL
    }/user/register?redirectURL=${encodeURIComponent(
      process.env.ILLA_MARKET_URL + router.asPath,
    )}`,
  )
  const handleLogin = () => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "login" })
  }

  const handleRegister = () => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "sign_up" })
  }

  return (
    <>
      {userInfo && userInfo.userID ? (
        <AvatarSetting />
      ) : (
        <>
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
        </>
      )}
    </>
  )
}
