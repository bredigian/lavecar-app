import {
  AuthAsAdminDialog,
  HaveReserveDialog,
  WhereWeAreDialog,
} from "@/sections/home-dialog"

import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"
import Screen from "@/components/ui/screen"

type TProps = {
  searchParams: {
    token_id: string
    expired: string
  }
}

export default function Home({ searchParams }: TProps) {
  console.log(searchParams)
  return (
    <Screen className="h-dvh justify-center gap-8">
      <div className="flex flex-col items-center gap-8 grow justify-center">
        <Header />
        <section className="grid grid-cols-4 gap-4">
          <Link className="col-span-full" href="/reserve">
            <Button className="w-full" type="button">
              Quiero reservar un turno
            </Button>
          </Link>
          <HaveReserveDialog />
          <WhereWeAreDialog />
        </section>
      </div>
      <AuthAsAdminDialog />
    </Screen>
  )
}
