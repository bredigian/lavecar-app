import { API_URL } from "@/const/api"
import { TError } from "@/types/errors.types"
import { TWeekdayWithAssignedReserves } from "@/types/weekdays.types"

// export const getAllWithWorkhours = async () => {
//   const options: RequestInit = {
//     method: "GET",
//   }
//   const PATH = `${API_URL}/v1/weekdays`

//   const res = await fetch(PATH, options)
//   const data: TWeekday[] | TError = await res.json()
//   if (!res.ok) return new Error((data as TError).message)

//   return data as TWeekday[]
// }

export const getAllWithAssignedReserves = async () => {
  const options: RequestInit = {
    method: "GET",
    next: {
      tags: ["assigned_reserves"],
    },
  }
  const PATH = `${API_URL}/v1/weekdays/unavailable-workhours`

  const res = await fetch(PATH, options)
  const data: TWeekdayWithAssignedReserves[] | TError = await res.json()
  if (!res.ok) return new Error((data as TError).message)

  return data as TWeekdayWithAssignedReserves[]
}
