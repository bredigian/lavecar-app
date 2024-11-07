import { DollarSign, Plus } from "lucide-react"

import { DateTime } from "luxon"
import { TReserve } from "@/types/reserves.types"

type TProps = {
  item: TReserve
}

export default function IncomeItem({ item }: TProps) {
  const date = DateTime.fromISO(item.date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  return (
    <li className="flex flex-col gap-2 w-full">
      <small className="leading-none opacity-75">
        {date.toLocaleString(DateTime.DATE_SHORT)}
      </small>
      <div className="flex items-center justify-between w-full">
        <span className="leading-tight">{item.user_name}</span>
        <span className="text-green-600 flex items-center text-lg">
          <Plus size={16} />
          <DollarSign size={20} />
          12.500
        </span>
      </div>
    </li>
  )
}
