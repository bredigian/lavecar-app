import { API_URL } from "@/const/api"

export const getAllWithWorkhours = async () => {
  const options: RequestInit = {
    method: "GET",
  }
  const PATH = `${API_URL}/v1/weekdays`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error(data.error.message)

  return data
}

export const getAllWithAssignedReserves = async () => {
  const options: RequestInit = {
    method: "GET",
  }
  const PATH = `${API_URL}/v1/weekdays/unavailable-workhours`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error(data.error.message)

  return data
}
