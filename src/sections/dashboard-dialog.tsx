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
import Cookies from "js-cookie"
import { LogOutIcon } from "lucide-react"
import revalidate from "@/lib/actions"
import { signout } from "@/services/auth.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignoutDialog() {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()

  const handleSignout = async () => {
    try {
      const access_token = Cookies.get("access_token")
      if (!access_token) {
        push("/")
        return
      }

      const { ok } = await signout(access_token)
      if (ok) {
        Cookies.remove("access_token")
        toast.success("La sesión se ha cerrado.", { position: "top-center" })
        await revalidate("session")
        push("/")
      }
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center gap-2 px-2 py-1.5">
        <LogOutIcon size={16} />
        <span className="text-sm">Cerrar sesión</span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cerrar sesión</DrawerTitle>
          <DrawerDescription>¿Estás seguro?</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <Button onClick={handleSignout}>Salir</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
