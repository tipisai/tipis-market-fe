import { FC } from "react"
import { MediaLayout } from "@/layout/mediaLayout"
import { EntranceNavProps } from "./interface"
import { EntranceNavMobile } from "./mobile"
import { EntranceNavPC } from "./pc"

export const EntranceNav: FC<EntranceNavProps> = (props) => {
  return (
    <MediaLayout
      desktopPage={<EntranceNavPC {...props} />}
      mobilePage={<EntranceNavMobile {...props} />}
    />
  )
}
