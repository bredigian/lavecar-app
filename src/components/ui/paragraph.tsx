import { ReactNode } from "react"

type TProps = {
  children: ReactNode
}

export default function Paragraph({ children }: TProps) {
  return <p className="leading-5 [&:not(:first-child)]:mt-6">{children}</p>
}
