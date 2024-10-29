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
        className="p-8 z-50 flex items-center w-full justify-between sticky top-0 bg-white"
        logoSize="h-6"
        isForAdmin
      />
      {children}
      <Navbar />
    </>
  )
}
