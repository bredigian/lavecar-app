import { DollarSign, Plus } from "lucide-react"

import { DateTime } from "luxon"
import { Separator } from "./ui/separator"
import { TReserve } from "@/types/reserves.types"
import { getIncomes } from "@/services/finances.service"

type TReserveByDate = {
  [date: string]: TReserve[]
}

export default async function IncomesContainer() {
  const data = await getIncomes()

  if (data instanceof Error)
    return <span className="leading-none">{data.message}</span>

  const groupedByDate = Object.entries(
    data.reduce<TReserveByDate>((acc, reserve) => {
      const date = DateTime.fromISO(reserve.date as string)
        .set({
          hour: 0,
          minute: 0,
          millisecond: 0,
        })
        .setZone("America/Argentina/Buenos_Aires")
        .setLocale("es-AR")
        .toLocaleString(DateTime.DATE_SHORT)

      if (!acc[date]) acc[date] = []
      acc[date].push(reserve)

      return acc
    }, {})
  )

  return (
    <section className="mt-8 w-full space-y-4">
      {groupedByDate.map((group) => {
        const date = group[0]
        const reserves = group[1] as TReserve[]

        return (
          <article key={date + "_incomes"} className="w-full space-y-2">
            <div className="flex items-center justify-center">
              <Separator className="max-w-24" />
              <span className="text-primary text-sm mx-2 opacity-50 font-medium">
                {date}
              </span>
              <Separator className="max-w-24" />
            </div>
            <ul className="space-y-1">
              {reserves.map((reserve) => (
                <li
                  key={reserve.id}
                  className="flex items-start justify-between w-full"
                >
                  <span className="text-lg">{reserve.user_name}</span>
                  <span className="text-green-600 flex items-center text-lg">
                    <Plus size={16} />
                    <DollarSign size={20} />
                    12.500
                  </span>
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </section>
  )
}
