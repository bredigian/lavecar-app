import ReserveItem from "./reserve-item"
import { getReservesOfDate } from "@/services/reserves.service"

type TProps = {
  date: Date
}

export default async function ReservesContainer({ date }: TProps) {
  const data = await getReservesOfDate(date)

  if (data instanceof Error) return <span>{data.message}</span>

  if (data.length === 0) return <span>No hay reservas</span>

  return (
    <ul className="flex flex-col gap-8">
      {data.map((reserve) => (
        <ReserveItem key={reserve.id} reserve={reserve} />
      ))}
    </ul>
  )
}
