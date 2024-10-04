import { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type TProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Screen({ children, className, style }: TProps) {
  return (
    <main
      className={cn("flex flex-col items-center p-8", className)}
      style={style}
    >
      {children}
    </main>
  )
}
