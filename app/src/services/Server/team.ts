import {
  CLOUD_REQUEST_PREFIX,
  HTTP_REQUEST_PUBLIC_BASE_URL,
} from "@illa-public/illa-net"

export const fetchTeamsInfo = async (token?: string) => {
  const response = await fetch(
    `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}/teams/my`,
    {
      headers: {
        Authorization: token || "",
      },
    },
  )
  return await response.json()
}
