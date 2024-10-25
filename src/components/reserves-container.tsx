import { getReservesOfDate } from "@/services/reserves.service"

type TProps = {
  date: Date
}

export default async function ReservesContainer({ date }: TProps) {
  const data = await getReservesOfDate(date)

  if (data instanceof Error) return <span>{data.message}</span>

  console.log(data)

  if (data.length === 0) return <span>No hay reservas para hoy.</span>

  return (
    <ul>
      {data.map((reserve) => (
        <li key={reserve.id}>{reserve.user_name}</li>
      ))}
    </ul>
  )
}
