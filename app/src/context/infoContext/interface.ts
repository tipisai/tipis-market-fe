import { ReactNode } from "react"
import { ICurrentUserInfo } from "@/services/Client/users"

export interface Tag {
  name: string
  icon?: string
}

export interface InfoContextInject {
  userInfo: ICurrentUserInfo | undefined
  isMobile: boolean
  setUserInfo: (userInfo: ICurrentUserInfo) => void
}

export interface InfoProviderProps
  extends Omit<InfoContextInject, "setUserInfo"> {
  children: ReactNode
}
