import { CurrentUserInfo } from "@illa-public/public-types"
import { ReactNode } from "react"

export interface Tag {
  name: string
  icon?: string
}

export interface InfoContextInject {
  userInfo: CurrentUserInfo | undefined
  isMobile: boolean
}

export interface InfoProviderProps extends InfoContextInject {
  children: ReactNode
}
