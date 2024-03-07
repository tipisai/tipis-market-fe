import { FC } from "react"
import { MediaLayout } from "@/layout/mediaLayout"
import { ContentHeaderProps } from "./interface"
import { SortComponentMobile } from "./mobile"
import { SortComponentPC } from "./pc"

export const SortComponent: FC<ContentHeaderProps> = (props) => {
  return (
    <MediaLayout
      desktopPage={<SortComponentPC {...props} />}
      mobilePage={<SortComponentMobile {...props} />}
    />
  )
}
