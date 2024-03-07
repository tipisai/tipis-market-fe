import { PRODUCT_SORT_BY } from "@/interface/common"

interface SortOption {
  label: string
  value: string
  hidden?: boolean
}
export interface ContentHeaderProps {
  sort: PRODUCT_SORT_BY
  sortOptions: SortOption[]
  handleSortChange: (value: unknown) => void
  tagList: string[]
  activeTag: string | undefined
  handleCloseTag: () => void
  handleTagChange: (name: string | undefined) => void
}
