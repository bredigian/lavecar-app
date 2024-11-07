import { DateTime } from "luxon"
import IncomeItem from "./income-item"
import { Separator } from "./ui/separator"
import { TReserve } from "@/types/reserves.types"
import { getIncomes } from "@/services/incomes.service"

type TReserveByDate = {
  [date: string]: TReserve[]
}

export default async function IncomesContainer() {
  const data = await getIncomes()

  console.log(data)

  if (data instanceof Error)
    return <span className="leading-none">{data.message}</span>

  const groupedByDate = Object.entries(
    data.reduce<TReserveByDate>((acc, income) => {
      const date = DateTime.fromISO(income.date as string)
        .set({
          hour: 0,
          minute: 0,
          millisecond: 0,
        })
        .setZone("America/Argentina/Buenos_Aires")
        .setLocale("es-AR")
        .toLocaleString(DateTime.DATE_SHORT)

      if (!acc[date]) acc[date] = []
      acc[date].push({ ...(income.reserve as TReserve), value: income.value })

      return acc
    }, {})
  )

  console.log(groupedByDate)

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
            <ul className="space-y-4">
              {reserves.map((reserve) => (
                <IncomeItem key={reserve.id + "__income"} item={reserve} />
              ))}
            </ul>
          </article>
        )
      })}
    </section>
  )
}
