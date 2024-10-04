import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TProps = {
  children: ReactNode
  className?: string
}

export default function Screen({ children, className }: TProps) {
  return (
    <main className={cn("min-h-dvh flex flex-col items-center p-8", className)}>
      {children}
    </main>
  )
}
