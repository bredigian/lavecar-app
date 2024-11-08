import Paragraph from "@/components/ui/paragraph"
import { ReserveForm } from "@/sections/reserve-form"
import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"
import { getAllWithAssignedReserves } from "@/services/weekdays.service"
import { getWashes } from "@/services/washes.service"

export default async function Reserve() {
  const weekdays = await getAllWithAssignedReserves()
  const washes = await getWashes()

  if (weekdays instanceof Error || washes instanceof Error)
    return (
      <Screen style={{ minHeight: `calc(100svh - 69px` }} className="gap-8">
        <section className="space-y-4">
          <Title>Reservar</Title>
          <Paragraph>
            {(weekdays as Error).message ?? (washes as Error).message}
          </Paragraph>
        </section>
      </Screen>
    )

  return (
    <Screen style={{ minHeight: `calc(100svh - 69px)` }} className="gap-8 pt-6">
      <section className="space-y-4">
        <Title>Reservar</Title>
        <Paragraph>
          Seleccione la fecha y complete los siguientes datos
        </Paragraph>
      </section>
      <ReserveForm weekdays={weekdays} washes={washes} />
    </Screen>
  )
}
