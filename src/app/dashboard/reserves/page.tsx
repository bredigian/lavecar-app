import { Card, CardContent } from "@/components/ui/card"

import DatePicker from "@/components/date-picker"
import { DateTime } from "luxon"
import Paragraph from "@/components/ui/paragraph"
import ReservesContainer from "@/components/reserves-container"
import Screen from "@/components/ui/screen"
import { Suspense } from "react"
import Title from "@/components/ui/title"

type TProps = {
  searchParams: { date: string }
}

export default function DashboardReserves({ searchParams }: TProps) {
  const date =
    searchParams?.date ??
    DateTime.now()
      .setZone("America/Argentina/Buenos_Aires")
      .setLocale("es-AR")
      .toISODate()

  return (
    <Screen className="items-start gap-6">
      <section className="space-y-4">
        <Title>Turnos</Title>
        <Paragraph>Filtrá los turnos por día seleccionado</Paragraph>
      </section>
      <DatePicker dateParam={date} />
      <Suspense key={date}>
        <Card className="w-full">
          <CardContent className="mt-6">
            <ReservesContainer date={DateTime.fromISO(date).toJSDate()} />
          </CardContent>
        </Card>
      </Suspense>
    </Screen>
  )
}
