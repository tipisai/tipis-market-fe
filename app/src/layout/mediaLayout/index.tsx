import { FC, ReactNode, useContext } from "react"
import { InfoContext } from "@/context/infoContext"

interface MediaLayoutProps {
  desktopPage: ReactNode
  mobilePage?: ReactNode
}

export const MediaLayout: FC<MediaLayoutProps> = (props) => {
  const { desktopPage, mobilePage } = props
  const { isMobile } = useContext(InfoContext)
  return <>{isMobile ? mobilePage : desktopPage}</>
}
