import {
  Calendar,
  CalendarCheck,
  Car,
  CreditCard,
  DollarSign,
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
    price,
    WashingType,
  } = detail

  const datetime = DateTime.fromISO(date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const created_at = DateTime.fromISO(detail.created_at as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  return (
    <Screen
      style={{ minHeight: "calc(100svh - 184px)" }}
      className="items-start gap-8"
    >
      <h4 className="font-medium flex items-center gap-2 text-xl">
        <Hash className="size-6" />
        <span>{number.toString().padStart(6, "0")}</span>
      </h4>
      <section className="flex items-center gap-2">
        <CalendarCheck className="size-6" />
        <p>Creado el {created_at.toLocaleString(DateTime.DATETIME_SHORT)}</p>
      </section>
      <article className="flex items-center justify-between w-full">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <UserIcon className="size-6" />
            <span>{user_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-6" />
            <span>{datetime.toLocaleString(DateTime.DATE_FULL)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-6" />
            <span>{user_phone}</span>
          </div>
          {user_email && (
            <div className="flex items-center gap-2">
              <SendHorizonal className="size-6" />
              <span>{user_email}</span>
            </div>
          )}
        </section>
        <section className="flex flex-col text-6xl items-end rounded-xl">
          <span className="w-fit">
            {datetime.hour.toString().padStart(2, "0")}
          </span>
          <span className="w-fit">
            {datetime.minute.toString().padStart(2, "0")}
          </span>
        </section>
      </article>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Car className="size-6" />
            <span>{WashingType?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="size-6" />
            <span className="text-2xl">{price.toLocaleString("es-AR")}</span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <CreditCard className="size-6" />
            <span>Estado de pago</span>
          </div>
          <PaymentStatusSwitch
            id={id}
            payment_id={payment_id}
            payment_status={payment_status}
          />
        </div>
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
