export interface BannerProps {
  titleBefore: string
  titleAfter: string
  description: string
  feature: string
  search?: string
  handleSearchChange?: (value?: string) => void
  onSearch?: () => void
}
