import { API_URL } from "@/const/api"
import { TError } from "@/types/errors.types"
import { TWashing } from "@/types/washes.types"

export const getWashes = async () => {
  const options: RequestInit = { method: "GET", next: { tags: ["washes"] } }
  const PATH = `${API_URL}/v1/washes`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error((data as TError).message)

  return data as TWashing[]
}

export const create = async (payload: TWashing) => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  }
  const PATH = `${API_URL}/v1/washes`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return data as TWashing
}

export const deleteById = async (id: TWashing["id"]) => {
  const options: RequestInit = {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  }
  const PATH = `${API_URL}/v1/washes`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return data as TWashing
}
