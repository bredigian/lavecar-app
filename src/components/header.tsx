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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { LogOutIcon, User } from "lucide-react"

import { Button } from "./ui/button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import logo from "@/assets/logo.png"
import { userStore } from "@/store/user.store"

type TProps = {
  logoSize?: string
  className?: string
  backButton?: boolean
  isForAdmin?: boolean
}

export default function Header({
  className,
  logoSize,
  backButton,
  isForAdmin,
}: TProps) {
  const { first_name, last_name, username } = userStore()

  return (
    <header className={className}>
      {backButton && (
        <Link href={"/"}>
          <Button size="icon" variant="secondary">
            <ChevronLeftIcon className="size-6" />
          </Button>
        </Link>
      )}
      <Image
        src={logo}
        alt="Logo de LaveCAR"
        className={cn("object-contain w-fit", logoSize ?? "h-10")}
      />
      {isForAdmin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"default"}>
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2">
            <DropdownMenuLabel>
              {first_name} {last_name}
            </DropdownMenuLabel>
            <small className="pl-2">@{username}</small>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Drawer>
                <DrawerTrigger className="flex items-center gap-2">
                  <LogOutIcon size={16} />
                  Cerrar sesión
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Ya tengo un turno</DrawerTitle>
                    <DrawerDescription>
                      A continuación ingrese el número de reserva
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
