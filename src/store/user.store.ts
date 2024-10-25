import { TUser } from "@/types/auth.types"
import { create } from "zustand"

export type TUserdata = {
  username: TUser["user_name"] | null
  first_name: TUser["first_name"] | null
  last_name: TUser["last_name"] | null
}

interface IUserStore extends TUserdata {
  setUserdata: (userdata: TUserdata) => void
  clearUserdata: () => void
}

export const userStore = create<IUserStore>((set) => ({
  username: null,
  first_name: null,
  last_name: null,

  setUserdata(userdata: Partial<IUserStore>) {
    set({
      username: userdata.username,
      first_name: userdata.first_name,
      last_name: userdata.last_name,
    })
  },

  clearUserdata() {
    set({ username: null, first_name: null, last_name: null })
  },
}))
