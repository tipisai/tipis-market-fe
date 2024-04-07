export enum PRODUCT_SORT_BY {
  POPULAR = "popular",
  LATEST = "latest",
  STARRED = "starred",
}

export interface ProductListParams {
  page: number
  limit: number
  sortedBy: PRODUCT_SORT_BY
  search?: string
  hashtags?: string
}

export type ModalActionType = "fork" | "create" | "run"

export interface CanEditResponse {
  canEdit: boolean
}
