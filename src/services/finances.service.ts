import { API_URL } from "@/const/api"
import { TError } from "@/types/errors.types"
import { TReserve } from "@/types/reserves.types"

export const getIncomes = async () => {
  const options: RequestInit = { method: "GET", next: { tags: ["reserves"] } }
  const PATH = `${API_URL}/v1/finances`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error((data as TError).message)

  return data as TReserve[]
}
