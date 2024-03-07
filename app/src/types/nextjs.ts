import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { FC } from "react"
import type { ReactNode } from "react"

export interface CustomPageProps {
  getLayout?: (page: ReactNode) => ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> &
  CustomPageProps

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type PageProps<T = {}> = FC<T> & CustomPageProps
