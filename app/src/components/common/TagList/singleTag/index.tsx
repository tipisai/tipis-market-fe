import { useSearchParams } from "next/navigation"
import { FC } from "react"
import { SEARCH_KEY } from "@/constants/page"
import { BaseTag } from "../components/baseTag"
import { containerStyle } from "./style"

interface SingleTagProps {
  onCloseTag?: () => void
}

export const SingleTag: FC<SingleTagProps> = ({ onCloseTag }) => {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get(SEARCH_KEY.CURRENT_HASH_TAG)
  return (
    <div css={containerStyle}>
      <BaseTag
        name={currentTag as string}
        isActive
        closable
        handleClose={onCloseTag}
      />
    </div>
  )
}
