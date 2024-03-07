import { formatLanguage } from "@illa-public/utils"
import { NextRequest, NextResponse } from "next/server"
import { fetchUserInfoByToken } from "./services/Server/users"

const PUBLIC_FILE = /\.(.*)$/ // anything having a file extension.
const getIsInternalRoute = (url: string) => {
  if (url.startsWith("/_next")) return true // next internal routes
  if (url.includes("/api/")) return true // nextjs api routes
  return PUBLIC_FILE.test(url) // static files
}

export async function middleware(request: NextRequest) {
  if (getIsInternalRoute(request.nextUrl.pathname)) return
  const { searchParams } = request.nextUrl
  const cookieToken = request.cookies.get("ILLA_TOKEN")
  let token = searchParams.get("token")
  const currentLocal = request.nextUrl.locale
  let lang: string = "en-US"
  const browserLang = formatLanguage(
    request.headers.get("accept-language")?.split(",")[0] || "",
  )

  if (!token && cookieToken && cookieToken.value) {
    token = cookieToken.value
  }

  if (token) {
    try {
      const userInfo = await fetchUserInfoByToken(token)
      lang = userInfo.language ?? lang
      if (currentLocal !== lang) {
        request.nextUrl.locale = lang
      }
      const response =
        currentLocal !== lang
          ? NextResponse.redirect(request.nextUrl)
          : NextResponse.next()
      response.cookies.set("ILLA_TOKEN", token)
      response.cookies.set("ILLA_LANG", lang)
      return response
    } catch (e) {
      const cookieLang = request.cookies.get("ILLA_LANG")
      if (cookieLang && cookieLang.value) {
        lang = cookieLang.value
      }
      if (currentLocal !== lang) {
        request.nextUrl.locale = lang
        const response = NextResponse.redirect(request.nextUrl)
        response.cookies.delete("ILLA_TOKEN")
        response.cookies.set("ILLA_LANG", lang)
        return response
      }
    }
  } else {
    if (currentLocal !== browserLang) {
      request.nextUrl.locale = browserLang
      const response = NextResponse.redirect(request.nextUrl)
      response.cookies.set("ILLA_LANG", browserLang)
      return response
    }
  }
}
