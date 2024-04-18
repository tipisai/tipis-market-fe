import { PRODUCT_SORT_BY } from "@/interface/common"

export interface IDashBoardUIState {
  page: number
  sortedBy: PRODUCT_SORT_BY
  search: string | undefined
  hashTag: string | undefined
  isOfficial: boolean
}

export enum DASH_BOARD_UI_STATE_ACTION_TYPE {
  SET_PAGE = "SET_PAGE",
  SET_SORTED_BY = "SET_SORTED_BY",
  SET_SEARCH = "SET_SEARCH",
  SET_HASH_TAG = "SET_HASH_TAG",
  SET_RECOMMEND_TAG = "SET_RECOMMEND_TAG",
  RESET_PARAMS = "RESET_PARAMS",
}

export interface IDashBoardUIStateBaseAction<T = unknown> {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE
  payload: T
}

export interface ISetPageAction extends IDashBoardUIStateBaseAction<number> {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_PAGE
}

export interface ISetSortedByAction
  extends IDashBoardUIStateBaseAction<PRODUCT_SORT_BY> {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_SORTED_BY
}

export interface ISetSearchAction
  extends IDashBoardUIStateBaseAction<string | undefined> {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_SEARCH
}

export interface ISetHashTagAction
  extends IDashBoardUIStateBaseAction<string | undefined> {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_HASH_TAG
}

export interface ISetRecommendTagAction
  extends IDashBoardUIStateBaseAction<string> {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE.SET_RECOMMEND_TAG
}

export interface IResetParamsAction extends IDashBoardUIStateBaseAction {
  type: DASH_BOARD_UI_STATE_ACTION_TYPE.RESET_PARAMS
}

export type TDashboardUIStateAction =
  | ISetPageAction
  | ISetSortedByAction
  | ISetSearchAction
  | ISetHashTagAction
  | ISetRecommendTagAction
  | IResetParamsAction
