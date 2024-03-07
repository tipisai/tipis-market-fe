import {
  CLOUD_REQUEST_PREFIX,
  HTTP_REQUEST_PUBLIC_BASE_URL,
} from "@illa-public/illa-net/constant"

export const fetchUserInfoByToken = async (token: string) => {
  try {
    const response = await fetch(
      `${HTTP_REQUEST_PUBLIC_BASE_URL}${CLOUD_REQUEST_PREFIX}/users`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    )
    return await response.json()
  } catch (e) {
    throw e
  }
}
