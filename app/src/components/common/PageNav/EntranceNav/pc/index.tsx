import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import Link from "next/link"
import { FC, useContext } from "react"
import Logo from "@/assets/public/illa-logo-puple.svg?react"
import { CreateTeamButton } from "@/components/common/CreateTeamButton"
import { NavHeaderOptions } from "@/components/common/PageNav/NavHeaderOptions"
import { InfoContext } from "@/context/infoContext"
import { EntranceNavProps } from "../interface"
import {
  createGroupButtonStyle,
  flexStyle,
  logoStyle,
  navStyle,
  rightHeaderStyle,
} from "./style"

export const EntranceNavPC: FC<EntranceNavProps> = () => {
  const { userInfo } = useContext(InfoContext)

  const { track } = useContext(MixpanelTrackContext)

  const handleLogoClick = () => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, { element: "logo" })
  }

  return (
    <div css={navStyle}>
      <Link
        css={flexStyle}
        href={`${process.env.ILLA_CLOUD_URL}`}
        onClick={handleLogoClick}
      >
        <Logo css={logoStyle} />
      </Link>
      <div css={rightHeaderStyle}>
        {userInfo && userInfo.userID && (
          <div css={createGroupButtonStyle}>
            <CreateTeamButton />
          </div>
        )}
        <NavHeaderOptions userInfo={userInfo} />
      </div>
    </div>
  )
}
