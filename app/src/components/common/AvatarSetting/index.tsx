import { Avatar } from "@illa-public/avatar"
import Link from "next/link"
import { FC, useContext } from "react"
import { InfoContext } from "@/context/infoContext"
import { MediaLayout } from "@/layout/mediaLayout"

const AvatarSetting: FC = () => {
  const { userInfo } = useContext(InfoContext)

  const handleClickReport = () => {
    // track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "avatar" })
  }

  return (
    <MediaLayout
      desktopPage={
        <Link
          href={`${process.env.ILLA_CLOUD_URL}/setting/account`}
          onClick={handleClickReport}
        >
          <Avatar
            id={userInfo?.userID}
            name={userInfo?.nickname}
            avatarUrl={userInfo?.avatar}
          />
        </Link>
      }
      mobilePage={
        <Link
          href={`${process.env.ILLA_CLOUD_URL}/setting/account`}
          onClick={handleClickReport}
        >
          <Avatar
            id={userInfo?.userID}
            name={userInfo?.nickname}
            avatarUrl={userInfo?.avatar}
            size={32}
          />
        </Link>
      }
    />
  )
}

AvatarSetting.displayName = "AvatarSetting"
export default AvatarSetting
