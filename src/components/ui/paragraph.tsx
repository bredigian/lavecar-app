import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TProps = {
  children: ReactNode
  disableMarginTop?: boolean
}

export default function Paragraph({ children, disableMarginTop }: TProps) {
  return (
    <p
      className={cn(
        "leading-5",
        !disableMarginTop && "[&:not(:first-child)]:mt-6"
      )}
    >
      {children}
    </p>
  )
}
