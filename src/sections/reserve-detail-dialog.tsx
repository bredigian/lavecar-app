"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { TReserve } from "@/types/reserves.types"
import { handleStatusById } from "@/services/reserves.service"
import revalidate from "@/lib/actions"
import { toast } from "sonner"
import { useState } from "react"

type TProps = {
  id: TReserve["id"]
  actual_status: TReserve["status"]
  disabled: boolean
}

export const HandleReserveStatusDialog = ({
  id,
  actual_status,
  disabled,
}: TProps) => {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleState = async () => {
    setSubmitting(true)
    try {
      await handleStatusById(
        id,
        actual_status === "PENDING" ? "COMPLETED" : "PENDING"
      )
      await revalidate("reserves")
      toast.success("Turno completado.")
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
    setSubmitting(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} className="w-full">
          Marcar como completado
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se avisará por WhatsApp al cliente que el vehículo está listo para
            retirar. Esta acción no se puede revertir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleState} disabled={submitting}>
            {submitting ? (
              <>
                <ReloadIcon className="size-4 animate-spin" />
                <span>Confirmando</span>
              </>
            ) : (
              "Confirmar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const HandleReservePaymentStatusDialog = () => {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleState = async () => {
    setSubmitting(true)
    console.log("Changing...")
    setSubmitting(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Generar link de pago</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se avisará por WhatsApp al cliente que el vehículo está listo para
            retirar. Esta acción no se puede revertir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleState} disabled={submitting}>
            {submitting ? (
              <>
                <ReloadIcon className="size-4 animate-spin" />
                <span>Confirmando</span>
              </>
            ) : (
              "Confirmar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
