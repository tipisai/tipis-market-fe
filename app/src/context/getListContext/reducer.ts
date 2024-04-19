import { INITIAL_PAGE } from "@/constants/page"
import { PRODUCT_SORT_BY } from "@/interface/common"
import {
  DASH_BOARD_UI_STATE_ACTION_TYPE,
  IDashBoardUIState,
  TDashboardUIStateAction,
} from "./interface"

export const INIT_DASH_BOARD_UI_STATE: IDashBoardUIState = {
  page: INITIAL_PAGE,
  sortedBy: PRODUCT_SORT_BY.POPULAR,
  search: undefined,
  hashTag: undefined,
  isOfficial: false,
}

export const reducer = (
  state: IDashBoardUIState,
  action: TDashboardUIStateAction,
): IDashBoardUIState => {
  let newState = { ...state }
  switch (action.type) {
    case DASH_BOARD_UI_STATE_ACTION_TYPE.SET_PAGE: {
      newState = {
        ...state,
        page: action.payload,
      }
      break
    }
    case DASH_BOARD_UI_STATE_ACTION_TYPE.SET_SORTED_BY: {
      newState = {
        ...state,
        page: INITIAL_PAGE,
        sortedBy: action.payload,
      }
      break
    }
    case DASH_BOARD_UI_STATE_ACTION_TYPE.SET_SEARCH: {
      newState = {
        ...state,
        page: INITIAL_PAGE,
        search: action.payload,
      }
      break
    }

    case DASH_BOARD_UI_STATE_ACTION_TYPE.SET_HASH_TAG: {
      newState = {
        ...state,
        page: INITIAL_PAGE,
        hashTag: action.payload,
      }
      break
    }

    case DASH_BOARD_UI_STATE_ACTION_TYPE.SET_RECOMMEND_TAG: {
      newState = {
        ...state,
        page: INITIAL_PAGE,
        sortedBy: PRODUCT_SORT_BY.POPULAR,
        search: undefined,
        hashTag: action.payload,
        isOfficial: false,
      }
      break
    }
    case DASH_BOARD_UI_STATE_ACTION_TYPE.RESET_PARAMS: {
      newState = INIT_DASH_BOARD_UI_STATE
      break
    }
    case DASH_BOARD_UI_STATE_ACTION_TYPE.SET_IS_OFFICIAL: {
      newState = {
        ...state,
        page: INITIAL_PAGE,
        isOfficial: action.payload,
      }
      break
    }
  }
  return newState
}
