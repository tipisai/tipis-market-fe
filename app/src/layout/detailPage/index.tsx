import { FC, ReactNode } from "react"
import { DetailNav } from "@/components/common/PageNav"
import { contentContainerStyle, contentStyle, mainStyle } from "./style"

export interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div css={contentContainerStyle}>
      <DetailNav />
      <main css={mainStyle}>
        <div css={contentStyle}>{children}</div>
      </main>
    </div>
  )
}
export default Layout
