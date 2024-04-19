import { FC } from "react"
import { MediaLayout } from "@/layout/mediaLayout"
import { EntranceNavMobile } from "./mobile"
import { EntranceNavPC } from "./pc"

export const EntranceNav: FC = () => {
  return (
    <MediaLayout
      desktopPage={<EntranceNavPC />}
      mobilePage={<EntranceNavMobile />}
    />
  )
}
