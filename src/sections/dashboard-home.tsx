import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import Link from "next/link"
import ReservesContainer from "@/components/reserves-container"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export default function DashboardHome() {
  const today = DateTime.now()
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{today.toLocaleString(DateTime.DATE_FULL)}</CardTitle>
        <CardDescription>
          Estos son los turnos pendientes de hoy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-4" />}>
          <ReservesContainer date={today.toJSDate()} isHome />
        </Suspense>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={"/dashboard/reserves"}>
          <Button variant={"secondary"} className="w-full">
            Ver todos los turnos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
