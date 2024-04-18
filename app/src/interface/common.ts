export enum PRODUCT_SORT_BY {
  POPULAR = "popular",
  LATEST = "latest",
  STARRED = "starred",
}

export interface ProductListParams {
  page: number
  limit: number
  sortedBy: PRODUCT_SORT_BY
  isOfficial: boolean
  search?: string
  hashtags?: string
}

export interface CanEditResponse {
  canEdit: boolean
}
