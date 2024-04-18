import { ReactNode } from "react"
import { ITempUserInfo } from "@/services/Client/users"

export interface Tag {
  name: string
  icon?: string
}

export interface InfoContextInject {
  userInfo: ITempUserInfo | undefined
  isMobile: boolean
  setUserInfo: (userInfo: ITempUserInfo) => void
}

export interface InfoProviderProps
  extends Omit<InfoContextInject, "setUserInfo"> {
  children: ReactNode
}
