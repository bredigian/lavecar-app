"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { TReserve } from "@/types/reserves.types"
import { handlePaymentStatusById } from "@/services/payments.service"
import revalidate from "@/lib/actions"
import { toast } from "sonner"

type TProps = {
  id: TReserve["id"]
  payment_id: TReserve["payment_id"]
  payment_status: TReserve["payment_status"]
}

export default function PaymentStatusSwitch({
  id,
  payment_id,
  payment_status,
}: TProps) {
  const IS_PAYED = payment_status === "APPROVED"

  const handlePaymentStatus = async () => {
    try {
      await handlePaymentStatusById(id, !IS_PAYED ? "APPROVED" : "PENDING")
      await revalidate("reserves")
      toast.success("Pago actualizado.")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="payment_status"
        disabled={payment_id ? true : false} //Si hay 'payment_id' significa que se pago mediante MP, y ya no se podria deshacer el pago, por eso se deshabilita el Switch. Si no hay 'payment_id' pero si esta 'check' significa que se pagó por fuera de MP, ejemplo: efectivo
        defaultChecked={payment_id ? true : IS_PAYED}
        onCheckedChange={handlePaymentStatus}
      />
      <Label htmlFor="payment_status">Completado</Label>
    </div>
  )
}
