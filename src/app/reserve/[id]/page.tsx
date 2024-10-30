import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import {
  PAYMENT_STATUS,
  RESERVE_STATUS,
  TReserve,
} from "@/types/reserves.types"
import { cn, toReserveOfNumberToString } from "@/lib/utils"
import {
  handlePaymentStatusById,
  verifyStatusById,
} from "@/services/payments.service"

import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import { GeneratePayment } from "@/sections/payment-reserve"
import Link from "next/link"
import Map from "@/components/map"
import Screen from "@/components/ui/screen"
import Title from "@/components/ui/title"
import { getReserveDetail } from "@/services/reserves.service"
import revalidate from "@/lib/actions"

type TParam = {
  id: TReserve["id"]
}

type TProps = {
  params: TParam
  searchParams: {
    preference_id: string
    payment_id: string
    status: PAYMENT_STATUS
    message_status: string
  }
}

export default async function Reserve({ params, searchParams }: TProps) {
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
        <Link href={"/"} className="w-full">
          <Button variant="default" className="w-full">
            Volver al inicio
          </Button>
        </Link>
      </Screen>
    )

  const { payment_id, message_status } = searchParams

  if (payment_id && payment_id !== "null") {
    const data = await verifyStatusById(payment_id)
    if (!(data instanceof Error)) {
      const { status } = data
      const STATUS = status?.toUpperCase() as keyof typeof PAYMENT_STATUS
      if (STATUS !== detail.payment_status) {
        await handlePaymentStatusById(detail.id, STATUS, payment_id)
        await revalidate("reserves")
      }
    }
  }

  const date = DateTime.fromISO(detail.date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const isPayed = detail.payment_status === "APPROVED"
  return (
    <Screen style={{ minHeight: `calc(100svh - 69px` }} className="gap-8 pt-8">
      <section className="flex items-center w-full justify-between">
        <Title>
          ¡Turno #{toReserveOfNumberToString(detail.number)}
          <br />
          reservado!
        </Title>
        <CheckCircledIcon className="size-16" />
      </section>
      <p className="text-sm">
        {Number(message_status) === 200
          ? "Enviamos un mensaje por WhatsApp con los datos de la reserva."
          : "Tené en cuenta el numero de reserva indicado arriba para una futura búsqueda del turno."}
      </p>
      <section className="flex flex-col gap-4 w-full">
        <h2 className="font-semibold">Resumen</h2>
        <div className="flex items-start w-full justify-between">
          <ul className="flex flex-col gap-3">
            <li className="text-sm">
              {date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
            </li>
            <li className="text-sm">{detail.user_name}</li>
            {detail.user_email && (
              <li className="text-sm">{detail.user_email}</li>
            )}
            <li className="text-sm">{detail.user_phone}</li>
          </ul>
          <div className="flex flex-col items-end gap-3">
            <span className="bg-yellow-200 font-medium text-sm py-1.5 px-2 rounded-md">
              {RESERVE_STATUS[detail.status]}
            </span>
            <span
              className={cn(
                "font-medium text-sm py-1.5 px-2 rounded-md",
                isPayed ? "bg-green-500" : "bg-yellow-200"
              )}
            >
              {PAYMENT_STATUS[detail.payment_status]}
            </span>
          </div>
        </div>
      </section>
      <GeneratePayment
        disabled={isPayed}
        reserve={detail}
        paymentId={payment_id}
      />
      <p className="text-sm">
        Deberias entregar el vehículo a las{" "}
        <span className="font-semibold">
          {date.minus({ minutes: 15 }).toLocaleString(DateTime.TIME_SIMPLE)}
        </span>{" "}
        en la siguiente ubicación:
      </p>
      <Map />
    </Screen>
  )
}
