import { API_URL } from "@/const/api"
import { TError } from "@/types/errors.types"
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

  const data: TReserve | TError = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return data as TReserve
}

export const getReserveDetail = async (
  id: TReserve["id"] | TReserve["number"],
  csr?: boolean
) => {
  const options: RequestInit = {
    method: "GET",
  }
  const PATH = `${API_URL}/v1/reserves/detail${
    typeof id === "string" ? `?id=${id}` : `?number=${id}`
  }`
  const res = await fetch(PATH, options)

  const data: TReserve | TError = await res.json()
  if (!res.ok) {
    if (csr) throw new Error((data as TError).message)

    return new Error((data as TError).message)
  }
  return data as TReserve
}
