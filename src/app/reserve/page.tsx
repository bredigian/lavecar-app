import Paragraph from "@/components/ui/paragraph"
import { ReserveForm } from "@/sections/reserve-form"
import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"
import { getAllWithAssignedReserves } from "@/services/weekdays.service"

export default async function Reserve() {
  const weekdays = await getAllWithAssignedReserves()

  return (
    <Screen style={{ minHeight: `calc(100svh - 69px` }} className="gap-8">
      <section className="space-y-4">
        <Title>Reservar</Title>
        <Paragraph>
          Seleccione la fecha y complete los siguientes datos
        </Paragraph>
      </section>
      <ReserveForm weekdays={weekdays} />
    </Screen>
  )
}
