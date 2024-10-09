import { API_URL } from "@/const/api"
import { TError } from "@/types/errors.types"
import { TPreferenceBody } from "@/types/payments.types"

export const generatePayment = async (body: TPreferenceBody) => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }
  const PATH = `${API_URL}/v1/payments`

  const res = await fetch(PATH, options)
  const data: TPreferenceBody | TError = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return data as TPreferenceBody
}
