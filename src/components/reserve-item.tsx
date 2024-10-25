import {
  ArrowRightIcon,
  CheckIcon,
  DollarSignIcon,
  RefreshCwIcon,
} from "lucide-react"
import {
  PAYMENT_STATUS,
  RESERVE_STATUS,
  TReserve,
} from "@/types/reserves.types"

import { Button } from "./ui/button"
import { DateTime } from "luxon"
import Link from "next/link"
import { cn } from "@/lib/utils"

type TProps = {
  reserve: TReserve
}

export default function ReserveItem({ reserve }: TProps) {
  const { id, number, status, payment_status, user_name } = reserve

  const date = DateTime.fromISO(reserve.date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const created_at = DateTime.fromISO(reserve.created_at as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const isPayed = payment_status === "APPROVED"
  const isDone = status === "COMPLETED"

  return (
    <li key={reserve.id} className="flex flex-col gap-2">
      <div className="flex items-center w-full justify-between opacity-50">
        <small>#{number.toString().padStart(6, "0")}</small>
        <small>{created_at.toLocaleString(DateTime.DATETIME_SHORT)}</small>
      </div>
      <section className="flex items-center w-full justify-between">
        <span className="font-medium">{user_name}</span>
        <span className="font-medium text-xl">
          {date.toLocaleString(DateTime.TIME_24_SIMPLE)}hs
        </span>
      </section>
      <section className="flex items-center w-full gap-2 justify-between">
        <div
          className={cn(
            "font-medium text-sm py-1.5 px-2 rounded-md flex items-center gap-2 h-9 text-ellipsis overflow-hidden",
            isDone ? "bg-green-500" : "bg-yellow-200"
          )}
        >
          {!isDone ? <RefreshCwIcon size={16} /> : <CheckIcon size={16} />}
          <span className="text-nowrap text-ellipsis overflow-hidden">
            {RESERVE_STATUS[status]}
          </span>
        </div>
        <div
          className={cn(
            "font-medium text-sm py-1.5 px-2 rounded-md flex items-center gap-2 h-9 text-ellipsis overflow-hidden",
            isPayed ? "bg-green-500" : "bg-yellow-200"
          )}
        >
          <DollarSignIcon size={16} />
          <span className="text-nowrap text-ellipsis overflow-hidden">
            {PAYMENT_STATUS[payment_status]}
          </span>
        </div>
        <Link href={`/dashboard/reserves/${id}`}>
          <Button size={"icon"} className="">
            <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </section>
    </li>
  )
}
