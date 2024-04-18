import { Dispatch, FC, ReactNode, createContext, useReducer } from "react"
import { IDashBoardUIState, TDashboardUIStateAction } from "./interface"
import { INIT_DASH_BOARD_UI_STATE, reducer } from "./reducer"

interface IDashboardUIInject {
  dashboardUIState: IDashBoardUIState
  dispatch: Dispatch<TDashboardUIStateAction>
}

interface IDashBoardUIStateProviderProps {
  children: ReactNode
}

export const DashBoardUIStateContext = createContext({} as IDashboardUIInject)

export const DashboardUIStateProvider: FC<IDashBoardUIStateProviderProps> = ({
  children,
}) => {
  const [dashboardUIState, dispatch] = useReducer(
    reducer,
    INIT_DASH_BOARD_UI_STATE,
  )

  return (
    <DashBoardUIStateContext.Provider value={{ dashboardUIState, dispatch }}>
      {children}
    </DashBoardUIStateContext.Provider>
  )
}
