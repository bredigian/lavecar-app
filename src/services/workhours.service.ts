import { TSimpleWorkhour, TWorkhour } from "@/types/workhours.types"

import { API_URL } from "@/const/api"
import { TError } from "@/types/errors.types"
import { TWeekday } from "@/types/weekdays.types"

export const getWorkhours = async () => {
  const options: RequestInit = { method: "GET", next: { tags: ["workhours"] } }
  const PATH = `${API_URL}/v1/workhours`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error((data as TError).message)

  return data as TSimpleWorkhour[]
}

export const getEnabledWorkhours = async () => {
  const options: RequestInit = { method: "GET", next: { tags: ["workhours"] } }
  const PATH = `${API_URL}/v1/workhours/enabled`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error((data as TError).message)

  return data as TWeekday[]
}

export const handleWorkhourStatus = async (payload: TWorkhour) => {
  const options: RequestInit = {
    method: !payload.isEnabled ? "POST" : "DELETE",
    body: JSON.stringify({ ...payload, isEnabled: undefined }),
    headers: { "Content-Type": "application/json" },
  }
  const PATH = `${API_URL}/v1/workhours`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return data as TWorkhour
}
