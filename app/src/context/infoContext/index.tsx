import { FC, createContext, useState } from "react"
import { InfoContextInject, InfoProviderProps } from "./interface"

export const InfoContext = createContext<InfoContextInject>(
  {} as InfoContextInject,
)

export const InfoProvider: FC<InfoProviderProps> = (props) => {
  const { userInfo, isMobile, children } = props
  const [currentUserInfo, setUserInfo] = useState(userInfo)
  return (
    <InfoContext.Provider
      value={{
        userInfo: currentUserInfo,
        isMobile,
        setUserInfo,
      }}
    >
      {children}
    </InfoContext.Provider>
  )
}
