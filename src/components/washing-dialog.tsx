"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"

import { AddWashingForm } from "./washes-form"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
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
