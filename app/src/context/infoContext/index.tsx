import { FC, createContext } from "react"
import { InfoContextInject, InfoProviderProps } from "./interface"

export const InfoContext = createContext<InfoContextInject>(
  {} as InfoContextInject,
)

export const InfoProvider: FC<InfoProviderProps> = (props) => {
  const { userInfo, isMobile, children } = props
  return (
    <InfoContext.Provider
      value={{
        userInfo,
        isMobile,
      }}
    >
      {children}
    </InfoContext.Provider>
  )
}
