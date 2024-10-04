import Header from "@/components/header"
import { ReactNode } from "react"

type TProps = {
  children: ReactNode
}

export default function Layout({ children }: TProps) {
  return (
    <>
      <Header
        className="pt-8 px-8 flex items-center w-full justify-between"
        logoSize="h-6"
        backButton
      />
      {children}
    </>
  )
}
