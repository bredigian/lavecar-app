import { API_URL } from "@/const/api"
import { TReserve } from "@/types/reserves.types"

export const reserve = async (payload: TReserve) => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }
  const PATH = `${API_URL}/v1/reserves`
  const res = await fetch(PATH, options)

  const data = await res.json()
  if (!res.ok) throw new Error(data.error.message)

  return data
}
