import { FC } from "react"
import { MediaLayout } from "@/layout/mediaLayout"
import { BannerProps } from "./interface"
import { BannerMobile } from "./mobile"
import { BannerPC } from "./pc"

export const Banner: FC<BannerProps> = (props) => {
  return (
    <MediaLayout
      desktopPage={<BannerPC {...props} />}
      mobilePage={<BannerMobile {...props} />}
    />
  )
}
