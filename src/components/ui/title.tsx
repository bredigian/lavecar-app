import { ReactNode } from "react"

type TProps = {
  children: ReactNode
}

export default function Title({ children }: TProps) {
  return (
    <h1 className="scroll-m-20 text-xl font-semibold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}
