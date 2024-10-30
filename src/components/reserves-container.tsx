import { DateTime } from "luxon"
import ReserveItem from "./reserve-item"
import { getReservesOfDate } from "@/services/reserves.service"

type TProps = {
  date: Date
  isHome?: boolean
}

export default async function ReservesContainer({ date, isHome }: TProps) {
  const data = await getReservesOfDate(date)

  if (data instanceof Error) return <span>{data.message}</span>

  if (data.length === 0) return <span>No hay reservas</span>

  let sortedData = data.sort(
    (a, b) =>
      DateTime.fromISO(a.date as string).toMillis() -
      DateTime.fromISO(b.date as string).toMillis()
  )

  sortedData = !isHome
    ? sortedData
    : sortedData.filter((reserve) => {
        const reserve_date = DateTime.fromISO(reserve.date as string)
        const now = DateTime.fromJSDate(date)
        if (reserve_date.toMillis() > now.toMillis()) return true

        return false
      })

  return (
    <ul className="flex flex-col gap-8">
      {sortedData.map((reserve) => (
        <ReserveItem key={reserve.id} reserve={reserve} />
      ))}
    </ul>
  )
}
