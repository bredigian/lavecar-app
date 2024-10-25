import Header from "@/components/header"
import Navbar from "@/components/navbar"
import { ReactNode } from "react"

type TProps = {
  children: ReactNode
}

export default function AdminLayout({ children }: TProps) {
  return (
    <>
      <Header
        className="pt-8 px-8 flex items-center w-full justify-between"
        logoSize="h-6"
        isForAdmin
      />
      {children}
      <Navbar />
    </>
  )
}
