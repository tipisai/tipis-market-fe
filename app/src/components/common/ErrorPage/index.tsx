import { FC, ReactNode } from "react"
import { errorPageStyle } from "@/components/common/ErrorPage/style"

export interface ErrorPageProps {
  title: string
  des: string
  img: ReactNode
  children: ReactNode
}

export const ErrorPage: FC<ErrorPageProps> = (props) => {
  const { title, des, img, children } = props
  return (
    <div css={errorPageStyle}>
      {img}
      <span> {title} </span>
      <span>{des}</span>
      {children}
    </div>
  )
}
