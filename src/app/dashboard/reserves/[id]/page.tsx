import {
  Calendar,
  CreditCard,
  Hash,
  Phone,
  SendHorizonal,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { DateTime } from "luxon"
import { HandleReserveStatusDialog } from "@/sections/reserve-detail-dialog"
import Link from "next/link"
import PaymentStatusSwitch from "@/sections/reserve-payment-status-switch"
import Screen from "@/components/ui/screen"
import { TReserve } from "@/types/reserves.types"
import Title from "@/components/ui/title"
import { getReserveDetail } from "@/services/reserves.service"

type TProps = {
  params: { id: TReserve["id"] }
}

export default async function AdminReserveDetail({ params }: TProps) {
  const { id } = params
  const detail = await getReserveDetail(id)

  if (detail instanceof Error)
    return (
      <Screen className="gap-8">
        <section className="flex items-center justify-between w-full">
          <Title>
            No se encontró la reserva
            <br />#{id}
          </Title>
          <CrossCircledIcon className="!size-16" />
        </section>
        <Link href={"/dashboard/reserves"} className="w-full">
          <Button variant="default" className="w-full">
            Volver al inicio
          </Button>
        </Link>
      </Screen>
    )

  const {
    user_name,
    user_phone,
    user_email,
    number,
    date,
    status,
    payment_status,
    payment_id,
  } = detail

  const datetime = DateTime.fromISO(date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  return (
    <Screen className="items-start gap-8">
      <h4 className="font-medium flex items-center gap-2 text-xl">
        <Hash className="size-6" />
        <span>{number.toString().padStart(6, "0")}</span>
      </h4>
      <article className="flex items-start justify-between w-full">
        <section className="flex flex-col gap-4">
          <div className="font-medium flex items-center gap-2">
            <UserIcon className="size-6" />
            <span>{user_name}</span>
          </div>
          <div className="font-medium flex items-center gap-2">
            <Calendar className="size-6" />
            <span>{datetime.toLocaleString(DateTime.DATE_FULL)}</span>
          </div>
          <div className="font-medium flex items-center gap-2">
            <Phone className="size-6" />
            <span>{user_phone}</span>
          </div>
          {user_email && (
            <div className="font-medium flex items-center gap-2">
              <SendHorizonal className="size-6" />
              <span>{user_email}</span>
            </div>
          )}
        </section>
        <section className="flex flex-col text-4xl bg-black text-white items-end p-2 rounded-xl">
          <span className="w-fit">{datetime.hour.toString()}</span>
          <span className="w-fit">
            {datetime.minute.toString().padStart(2, "0")}
          </span>
        </section>
      </article>
      <section className="flex items-center justify-between w-full">
        <div className="font-medium flex items-center gap-2">
          <CreditCard className="size-6" />
          <span>Estado de pago</span>
        </div>
        <PaymentStatusSwitch
          id={id}
          payment_id={payment_id}
          payment_status={payment_status}
        />
      </section>
      <section className="flex flex-col gap-4 w-full">
        <HandleReserveStatusDialog
          id={id}
          actual_status={status}
          disabled={status === "COMPLETED"}
        />
      </section>
    </Screen>
  )
}
