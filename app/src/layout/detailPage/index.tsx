import { FC, ReactNode } from "react"
import { DetailNav } from "@/components/common/PageNav"
import { contentContainerStyle, contentStyle } from "./style"

export interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div css={contentContainerStyle}>
      <DetailNav />
      <main css={contentStyle}>{children}</main>
    </div>
  )
}
export default Layout
