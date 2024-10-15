"use client"

import { Button } from "@/components/ui/button"
import CreditCard from "@/components/icons/credit-card"
import { DateTime } from "luxon"
import { ReloadIcon } from "@radix-ui/react-icons"
import { SECURE_API_URL } from "@/const/api"
import { TPreferenceBody } from "@/types/payments.types"
import { TReserve } from "@/types/reserves.types"
import { generatePayment } from "@/services/payments.service"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import { useState } from "react"

type TProps = {
  disabled: boolean
  reserve: TReserve
}

export const GeneratePayment = ({ disabled, reserve }: TProps) => {
  const { id, user_email, date, user_name, user_phone } = reserve
  const [submitting, setSubmitting] = useState(false)
  const pathname = usePathname()

  const datetime = DateTime.fromISO(date as string)
    .setZone("America/Argentina/Buenos_Aires")
    .setLocale("es-AR")

  const handleGeneratePayment = async () => {
    if (disabled) return

    setSubmitting(true)

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
      disabled={submitting || disabled}
      onClick={!disabled ? () => handleGeneratePayment() : () => null}
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
