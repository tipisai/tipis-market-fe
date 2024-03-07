import createCache from "@emotion/cache"
import { px2Rem } from "../utils/stylis-plugin/px2rem"

const isBrowser = typeof document !== "undefined"

export default function createEmotionCache() {
  let insertionPoint

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({
    key: "illa-style",
    insertionPoint,
    stylisPlugins: [
      px2Rem({
        unit: "rem",
        remSize: 100,
      }),
    ],
  })
}
