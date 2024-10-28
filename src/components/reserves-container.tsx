import { DateTime } from "luxon"
import ReserveItem from "./reserve-item"
import { getReservesOfDate } from "@/services/reserves.service"

type TProps = {
  date: Date
}

export default async function ReservesContainer({ date }: TProps) {
  const data = await getReservesOfDate(date)

  if (data instanceof Error) return <span>{data.message}</span>

  if (data.length === 0) return <span>No hay reservas</span>

  const sortedData = data.sort(
    (a, b) =>
      DateTime.fromISO(a.date as string).toMillis() -
      DateTime.fromISO(b.date as string).toMillis()
  )

  return (
    <ul className="flex flex-col gap-8">
      {sortedData.map((reserve) => (
        <ReserveItem key={reserve.id} reserve={reserve} />
      ))}
    </ul>
  )
}
