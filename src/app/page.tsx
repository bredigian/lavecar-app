import { HaveReserveDialog, WhereWeAreDialog } from "@/sections/home-dialog"

import AdminAccess from "@/sections/home-admin"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"
import Screen from "@/components/ui/screen"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

// type TProps = {
//   searchParams: {
//     token_id: string
//     expired: string
//   }
// }

export default async function Home() {
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
      <Suspense fallback={<Skeleton className="w-52 h-9" />}>
        <AdminAccess />
      </Suspense>
    </Screen>
  )
}
