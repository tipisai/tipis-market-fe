import { FC } from "react"
import { MediaLayout } from "@/layout/mediaLayout"
import { BannerMobile } from "./mobile"
import { BannerPC } from "./pc"

export const Banner: FC = () => {
  return (
    <MediaLayout desktopPage={<BannerPC />} mobilePage={<BannerMobile />} />
  )
}
