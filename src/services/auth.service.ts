import { API_URL } from "@/const/api"
import { ISOStringFormat } from "date-fns"
import { TError } from "@/types/errors.types"
import { TUser } from "@/types/auth.types"
import { TUserdata } from "@/store/user.store"

export type TAuthData = {
  access_token: string
  expires_in: Date | ISOStringFormat
  userdata: TUserdata
}

export const signin = async (payload: TUser) => {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      username: payload.user_name,
      user_name: undefined,
    }),
    headers: { "Content-Type": "application/json" },
  }
  const PATH = `${API_URL}/v1/auth`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return data as TAuthData
}

export const verifySession = async (token: string) => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["session"], revalidate: 3600 },
  }
  const PATH = `${API_URL}/v1/auth/session`
  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) return new Error((data as TError).message)

  return data as TAuthData
}

export const signout = async (token: string) => {
  const options: RequestInit = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }
  const PATH = `${API_URL}/v1/auth/session`

  const res = await fetch(PATH, options)
  const data = await res.json()
  if (!res.ok) throw new Error((data as TError).message)

  return { ok: true }
}
