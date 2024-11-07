import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import IncomeItem from "@/components/income-item"
import Link from "next/link"
import { getIncomes } from "@/services/incomes.service"

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
            {data.map((item) => (
              <IncomeItem key={item.id + "__income"} item={item} isForHome />
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Link href={"/dashboard/incomes"} className="w-full">
          <Button className="w-full" variant={"secondary"}>
            Ver todos los ingresos
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
