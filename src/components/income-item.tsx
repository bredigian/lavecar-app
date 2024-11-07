import { DollarSign, Plus } from "lucide-react"

import { DateTime } from "luxon"
import { TIncome } from "@/types/incomes.types"
import { TReserve } from "@/types/reserves.types"

type TProps = {
  item: TReserve | TIncome
  isForHome?: boolean
}

export default function IncomeItem({ item, isForHome }: TProps) {
  const date = DateTime.fromISO(item.date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const INCOME_VALUE = Number(
    isForHome ? (item as TIncome).value : (item as TReserve).value
  ).toLocaleString("es-AR")

  return (
    <li className="flex flex-col gap-2 w-full">
      {isForHome && (
        <small className="leading-none opacity-75">
          {date.toLocaleString(DateTime.DATE_SHORT)}
        </small>
      )}
      <div className="flex items-center justify-between w-full">
        <span className="leading-tight">
          {isForHome
            ? (item as TIncome).reserve?.user_name
            : (item as TReserve).user_name}
        </span>
        <span className="text-green-600 flex items-center text-lg">
          <Plus size={16} />
          <DollarSign size={20} />
          {INCOME_VALUE}
        </span>
      </div>
    </li>
  )
}
