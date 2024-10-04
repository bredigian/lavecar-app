import { HaveReserveDialog, WhereWeAreDialog } from "@/sections/home-dialog"

import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"
import Screen from "@/components/ui/screen"

export default function Home() {
  return (
    <Screen className="h-dvh justify-center gap-8">
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
    </Screen>
  )
}
