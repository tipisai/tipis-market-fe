import { FC, ReactNode } from "react"
import { EntranceNav } from "@/components/common/PageNav"
import { contentContainerStyle, contentStyle } from "./style"

export interface LayoutProps {
  children: ReactNode
  search?: string
  handleSearchChange?: (value?: string) => void
  onSearch?: () => void
}

const Layout: FC<LayoutProps> = ({
  children,
  search,
  onSearch,
  handleSearchChange,
}) => {
  return (
    <div css={contentContainerStyle}>
      <EntranceNav
        search={search}
        handleSearchChange={handleSearchChange}
        onSearch={onSearch}
      />
      <main css={contentStyle}>{children}</main>
    </div>
  )
}
export default Layout
