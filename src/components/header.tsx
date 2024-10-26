"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { Button } from "./ui/button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import SignoutDialog from "@/sections/dashboard-dialog"
import { User } from "lucide-react"
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
            <DropdownMenuItem asChild>
              <SignoutDialog />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
