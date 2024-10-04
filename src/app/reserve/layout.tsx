import Header from "@/components/header"
import { ReactNode } from "react"

type TProps = {
  children: ReactNode
}

export default function Layout({ children }: TProps) {
  return (
    <>
      <Header className="pt-8" logoSize="h-6" />
      {children}
    </>
  )
}
