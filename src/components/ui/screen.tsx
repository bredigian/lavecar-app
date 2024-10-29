"use client"

import { CSSProperties, ReactNode, useEffect } from "react"
import { TUserdata, userStore } from "@/store/user.store"

import { TAuthData } from "@/services/auth.service"
import { cn } from "@/lib/utils"

type TProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  authData?: TAuthData
}

export default function Screen({
  children,
  className,
  style,
  authData,
}: TProps) {
  const { setUserdata, username } = userStore()

  useEffect(() => {
    if (!username) if (authData) setUserdata(authData?.userdata as TUserdata)
  }, [])

  return (
    <main
      className={cn("flex flex-col items-center px-8 pb-8", className)}
      style={style}
    >
      {children}
    </main>
  )
}
