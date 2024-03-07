import { AxiosResponse } from "axios"

interface ICancelError {
  message: string
}

export const isCancelError = (
  error: unknown,
): error is AxiosResponse<ICancelError> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    error.message === "canceled"
  )
}
