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

export enum GTagEvent {
  CLICK = "click",
}

export enum GTagCategory {
  LOGIN_CLICK = "login_click",
  LOGIN_SIGN_SHOW = "login_sign_show",
  SIGN_IN_CLICK = "sign_in_click",
  CREATE_CLICK = "create_click",
  APP_CARD_CLICK = "app_card_click",
  CREATE_APP_CLICK = "create_app_click",
  CREATE_AGENT_CLICK = "create_agent_click",
  APP_RADIO_CLICK = "app_radio_click",
  SORT_CLICK = "sort_click",
  AGENT_CARD_CLICK = "agent_card_click",
  AGENT_DETAIL_RUN_CLICK = "agent_detail_run_click",
  AGENT_DETAIL_FORK_CLICK = "agent_detail_fork_click",
  AGENT_DETAIL_STAR_CLICK = "agent_detail_star_click",
  AGENT_DETAIL_SHARE_CLICK = "agent_detail_share_click",
  AGENT_DETAIL_SHARE_COPY_CLICK = "agent_detail_share_copy_click",
  AGENT_DETAIL_SHARE_SOCIAL_MEDIA_CLICK = "agent_detail_share_social_media_click",
}

export type ModalActionType = "fork" | "create" | "run"

export interface CanEditResponse {
  canEdit: boolean
}
