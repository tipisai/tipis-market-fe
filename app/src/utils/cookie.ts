import { GetServerSidePropsContext } from "next"

export function setCookie(
  name: string,
  value: string,
  days: number,
  path = "",
) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  let cookie = `${name}=${value};expires=${expires.toUTCString()}`
  if (path) {
    cookie += `;path=${path}`
  }
  document.cookie = cookie
}

export function getCookie(name: string) {
  const cookies = document.cookie.split("; ")
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=")
    if (cookie[0] === name) {
      return cookie[1]
    }
  }
  return null
}

export function removeCookie(name: string) {
  setCookie(name, "", -1)
}

export function getCookieFormReqHeader(
  headers: GetServerSidePropsContext["req"]["headers"],
  name: string,
) {
  const cookies = headers?.cookie?.split("; ")
  if (!cookies) return null
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=")
    if (cookie[0] === name) {
      return cookie[1]
    }
  }
  return null
}
