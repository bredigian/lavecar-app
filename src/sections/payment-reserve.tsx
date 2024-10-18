"use client"

import { generatePayment, verifyStatusById } from "@/services/payments.service"

import { Button } from "@/components/ui/button"
import CreditCard from "@/components/icons/credit-card"
import { DateTime } from "luxon"
import { ReloadIcon } from "@radix-ui/react-icons"
import { SECURE_API_URL } from "@/const/api"
import { TPreferenceBody } from "@/types/payments.types"
import { TReserve } from "@/types/reserves.types"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import { useState } from "react"

type TProps = {
  disabled: boolean
  reserve: TReserve
  paymentId?: string
}

export const GeneratePayment = ({ disabled, reserve, paymentId }: TProps) => {
  const { id, user_email, date, user_name, user_phone, payment_status } =
    reserve
  const [submitting, setSubmitting] = useState(false)
  const pathname = usePathname()

  const datetime = DateTime.fromISO(date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const handleGeneratePayment = async () => {
    if (disabled) return

    setSubmitting(true)

    if (paymentId) {
      try {
        const { status } = (await verifyStatusById(paymentId)) as {
          status: string
        }

        if (status.toUpperCase() === "APPROVED") {
          toast.error("El pago ya fue realizado. Por favor, recargá la página.")
          setSubmitting(false)

          return
        }
      } catch (e) {
        console.error("Ocurrió un error verificando el pago:", e)
      }
    }

    const body: TPreferenceBody = {
      auto_return: "all",
      back_urls: {
        success: `${window.location.host}${pathname}`,
        pending: `${window.location.host}${pathname}`,
        failure: `${window.location.host}${pathname}`,
      },
      notification_url: `${SECURE_API_URL}/v1/payments/notifications`,
      items: [
        {
          id,
          title: "Lavado de vehículo",
          description: `Pago de reserva de lavado de vehiculo del día ${datetime.toLocaleString(
            DateTime.DATETIME_MED
          )}`,
          quantity: 1,
          unit_price: 12500,
        },
      ],
      payer: {
        phone: {
          number: user_phone,
        },
        email: user_email,
        name: user_name,
      },
    }
    try {
      const { init_point } = await generatePayment(body)
      window.location.href = init_point as string
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }

    setSubmitting(false)
  }

  return (
    <Button
      disabled={submitting || disabled || payment_status === "APPROVED"}
      onClick={
        !disabled || payment_status !== "APPROVED"
          ? () => handleGeneratePayment()
          : () => null
      }
      className="w-full space-x-2"
    >
      {!submitting ? (
        <CreditCard color="#ffffff" size={16} />
      ) : (
        <ReloadIcon className="size-4 animate-spin" />
      )}
      <span>Pagar con Mercado Pago</span>
    </Button>
  )
}
