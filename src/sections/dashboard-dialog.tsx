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
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { useState } from "react"

export default function SignoutDialog() {
  const [open, setOpen] = useState(false)

  const handleSignout = async () => {
    try {
      console.log("signout...")
    } catch (error) {}
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center gap-2 px-2 py-1">
        <LogOutIcon size={16} />
        <span className="text-sm">Cerrar sesión</span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cerrar sesión</DrawerTitle>
          <DrawerDescription>¿Estás seguro?</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <Button>Salir</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
