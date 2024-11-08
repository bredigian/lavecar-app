"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { Plus, Trash2 } from "lucide-react"

import { AddWashingForm } from "./washes-form"
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { TWashing } from "@/types/washes.types"
import { deleteById } from "@/services/washes.service"
import revalidate from "@/lib/actions"
import { toast } from "sonner"
import { useState } from "react"

export const AddWashingDialog = () => {
  const [open, handleOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          Agregar tipo de lavado
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nuevo tipo de lavado</DrawerTitle>
          <DrawerDescription>
            Completa el siguente formulario para agregar el nuevo tipo
          </DrawerDescription>
        </DrawerHeader>
        <AddWashingForm handleDialog={() => handleOpen(false)} />
      </DrawerContent>
    </Drawer>
  )
}

type TProps = {
  id: TWashing["id"]
}

export const DeleteWashingDialog = ({ id }: TProps) => {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteById(id)
      setOpen(false)

      await revalidate("washes")
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
    setDeleting(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="p-1 text-sm flex items-center gap-2">
        <Trash2 size={16} />
        Eliminar
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>¿Estás seguro?</DrawerTitle>
          <DrawerDescription>
            Esta acción no puede revertirse.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant={"outline"}>Cancelar</Button>
          </DrawerClose>
          <Button
            disabled={deleting}
            variant={"destructive"}
            onClick={handleDelete}
          >
            {!deleting ? (
              "Eliminar"
            ) : (
              <>
                <ReloadIcon className="size-4 animate-spin" />
                Eliminando
              </>
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
