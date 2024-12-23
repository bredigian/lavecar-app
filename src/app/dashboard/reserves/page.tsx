import { Card, CardContent } from "@/components/ui/card"
import { RedirectType, redirect } from "next/navigation"

import DatePicker from "@/components/date-picker"
import { DateTime } from "luxon"
import Paragraph from "@/components/ui/paragraph"
import ReservesContainer from "@/components/reserves-container"
import Screen from "@/components/ui/screen"
import { Suspense } from "react"
import Title from "@/components/ui/title"
import { cookies } from "next/headers"
import { verifySession } from "@/services/auth.service"

type TProps = {
  searchParams: { date: string }
}

export default async function DashboardReserves({ searchParams }: TProps) {
  const access_token = cookies().get("access_token")
  if (!access_token) redirect("/", RedirectType.replace)

  const data = await verifySession(access_token.value)

  if (data instanceof Error)
    redirect(
      `/?session=${access_token.value}&expired=true&message=${data.message}`,
      RedirectType.push
    )

  const date =
    searchParams?.date ??
    DateTime.now()
      .setZone("America/Argentina/Buenos_Aires")
      .setLocale("es-AR")
      .toISODate()

  return (
    <Screen
      style={{ minHeight: "calc(100svh - 184px)" }}
      className="items-start gap-6"
      authData={data}
    >
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
