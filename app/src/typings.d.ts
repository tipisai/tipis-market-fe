declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.svg?react" {
  import * as React from "react"

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
  export default ReactComponent
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string
      NEXT_PUBLIC_CLOUD_URL: string
      NEXT_PUBLIC_BUILDER_URL: string
      NEXT_PUBLIC_MARKET_URL: string
      NEXT_PUBLIC_INSTANCE_ID: string
      NEXT_PUBLIC_DEV: string
    }
  }
}
