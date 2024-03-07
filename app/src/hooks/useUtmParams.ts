import { useRouter } from "next/router"
import { addUrlParams } from "@/utils/urlParams"

export const useUtmParams = (url: string) => {
  const router = useRouter()
  const keys = ["utm_source", "utm_medium", "utm_campaign"]
  if (
    router?.query &&
    Object.keys(router?.query).some((key) => keys.includes(key))
  ) {
    const { utm_source, utm_medium, utm_campaign } = router.query
    return addUrlParams(url, { utm_source, utm_medium, utm_campaign } as Record<
      string,
      string | undefined
    >)
  } else {
    return url
  }
}
