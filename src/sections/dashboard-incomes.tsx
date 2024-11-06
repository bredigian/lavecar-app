import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import Link from "next/link"
import { getIncomes } from "@/services/finances.service"

export default async function DashboardIncomes() {
  let data = await getIncomes()

  if (data instanceof Error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ingresos de la semana</CardTitle>
          <CardDescription>{data.message}</CardDescription>
        </CardHeader>
      </Card>
    )

  const now = DateTime.now()
  const first_day_week = now.endOf("week").set({ weekday: 1 })

  data = data.filter(
    (reserve) =>
      DateTime.fromISO(reserve.date as string).toMillis() >=
      first_day_week.toMillis()
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ingresos semanal</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <span className="leading-none">No hubo ingresos.</span>
        ) : (
          <ul className="flex flex-col gap-6 w-full">
            {data.map((item) => {
              const date = DateTime.fromISO(item.date as string)
                .setZone("America/Argentina/Buenos_Aires")
                .setLocale("es-AR")

              return (
                <li
                  key={item.id + "_income"}
                  className="flex flex-col gap-2 w-full"
                >
                  <small className="leading-none opacity-75">
                    {date.toLocaleString(DateTime.DATE_SHORT)}
                  </small>
                  <div className="flex items-center justify-between w-full">
                    <span className="leading-none">{item.user_name}</span>
                    <span className="text-green-600 flex items-center text-lg">
                      <Plus size={16} />
                      <DollarSign size={20} />
                      12.500
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Link href={"/dashboard/finances"} className="w-full">
          <Button className="w-full" variant={"secondary"}>
            Ver todos los ingresos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
