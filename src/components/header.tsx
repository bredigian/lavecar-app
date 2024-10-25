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
          <DropdownMenuContent>
            <DropdownMenuLabel>Administrador</DropdownMenuLabel>
            <small className="pl-2">administrator</small>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
